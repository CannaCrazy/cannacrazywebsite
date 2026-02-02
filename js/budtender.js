/**
 * CannaCrazy Budtender AI
 * 
 * Connects to WordPress REST API to get AI-powered product recommendations
 * Uses Google Gemini AI grounded in WordPress Products database
 * 
 * @package CannaCrazy
 * @version 1.0.0
 */

const cannaCrazyBudtender = {
    isModalOpen: false,
    conversationHistory: [],

    /**
     * Open Budtender Modal
     */
    openModal: function () {
        // Create modal if it doesn't exist
        if (!document.getElementById('budtender-modal')) {
            this.createModal();
        }

        const modal = document.getElementById('budtender-modal');
        if (modal) {
            modal.classList.add('active');
            this.isModalOpen = true;

            // Focus on input
            const input = document.getElementById('budtender-input');
            if (input) input.focus();
        }
    },

    /**
     * Close Budtender Modal
     */
    closeModal: function () {
        const modal = document.getElementById('budtender-modal');
        if (modal) {
            modal.classList.remove('active');
            this.isModalOpen = false;
        }
    },

    /**
     * Create Budtender Modal HTML
     */
    createModal: function () {
        const modalHTML = `
            <div class="modal-overlay" id="budtender-modal">
                <div class="modal-content" style="max-width: 700px; max-height: 80vh; display: flex; flex-direction: column;">
                    <button class="modal-close" onclick="cannaCrazyBudtender.closeModal()">×</button>
                    
                    <div style="padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <h2 style="font-size: 2rem; font-family: 'Permanent Marker', cursive; background: linear-gradient(135deg, #BC13FE, #39FF14); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            🤖 AI Budtender
                        </h2>
                        <p style="color: #9ca3af; margin-top: 0.5rem;">
                            Tell me what you're looking for and I'll recommend products from our current inventory!
                        </p>
                    </div>
                    
                    <div id="budtender-chat" style="flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                        <div class="budtender-message ai-message">
                            <strong style="color: #39FF14;">AI Budtender:</strong>
                            <p>Hey there! 👋 What kind of vibe are you going for today? Looking for something to relax, energize, or maybe help you sleep?</p>
                        </div>
                    </div>
                    
                    <div style="padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
                        <form id="budtender-form" style="display: flex; gap: 0.75rem;">
                            <input 
                                type="text" 
                                id="budtender-input" 
                                placeholder="E.g., Something to help me relax after work..."
                                required
                                style="flex: 1; padding: 0.75rem 1rem; border-radius: 0.75rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; font-size: 1rem;"
                            />
                            <button 
                                type="submit" 
                                id="budtender-submit"
                                style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #BC13FE, #39FF14); color: black; border: none; border-radius: 0.75rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease;"
                            >
                                Send
                            </button>
                        </form>
                        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.75rem; text-align: center;">
                            Powered by Google Gemini AI • Grounded in our live inventory
                        </p>
                    </div>
                </div>
            </div>
            
            <style>
                .budtender-message {
                    padding: 1rem;
                    border-radius: 1rem;
                    line-height: 1.6;
                }
                .ai-message {
                    background-color: rgba(57, 255, 20, 0.1);
                    border-left: 3px solid #39FF14;
                }
                .user-message {
                    background-color: rgba(188, 19, 254, 0.1);
                    border-left: 3px solid #BC13FE;
                    text-align: right;
                }
                #budtender-submit:hover {
                    transform: scale(1.05);
                }
                #budtender-submit:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                #budtender-chat::-webkit-scrollbar {
                    width: 6px;
                }
                #budtender-chat::-webkit-scrollbar-thumb {
                    background-color: #39FF14;
                    border-radius: 10px;
                }
            </style>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add form event listener
        const form = document.getElementById('budtender-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
    },

    /**
     * Send message to AI
     */
    sendMessage: async function () {
        const input = document.getElementById('budtender-input');
        const submitBtn = document.getElementById('budtender-submit');
        const chatContainer = document.getElementById('budtender-chat');

        if (!input || !submitBtn || !chatContainer) return;

        const message = input.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessageToChat('user', message);
        input.value = '';

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Thinking...';

        try {
            // Call WordPress REST API
            const response = await fetch(cannaCrazyBudtender.restUrl + 'budtender', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get recommendation');
            }

            const data = await response.json();

            if (data.success && data.recommendation) {
                this.addMessageToChat('ai', data.recommendation);
            } else {
                throw new Error('Invalid response from server');
            }

        } catch (error) {
            console.error('Budtender error:', error);
            this.addMessageToChat('ai', 'Sorry, I\'m having trouble connecting right now. Please try again or browse our products directly!');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send';
        }
    },

    /**
     * Add message to chat UI
     */
    addMessageToChat: function (type, message) {
        const chatContainer = document.getElementById('budtender-chat');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `budtender-message ${type === 'ai' ? 'ai-message' : 'user-message'}`;

        if (type === 'ai') {
            messageDiv.innerHTML = `
                <strong style="color: #39FF14;">AI Budtender:</strong>
                <p>${this.formatMessage(message)}</p>
            `;
        } else {
            messageDiv.innerHTML = `
                <strong style="color: #BC13FE;">You:</strong>
                <p>${message}</p>
            `;
        }

        chatContainer.appendChild(messageDiv);

        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    /**
     * Format AI message (preserve line breaks, etc.)
     */
    formatMessage: function (message) {
        return message
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    },

    /**
     * Initialize
     */
    init: function () {
        // Get REST URL from localized script
        this.restUrl = window.cannaCrazyBudtender?.restUrl || '/wp-json/cannacrazy/v1/';
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    cannaCrazyBudtender.init();
});
