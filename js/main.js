/**
 * CannaCrazy Main JavaScript
 * 
 * Consolidated functionality for Cart, Modals, Budtender AI, and Background Effects
 * 
 * @package CannaCrazy
 * @version 1.1.0
 */

/* ==========================================================================
   CART SYSTEM
   ========================================================================== */
const cannaCrazyCart = {
    cart: [],

    init: function () {
        const saved = localStorage.getItem('cannacrazy_cart');
        if (saved) {
            try {
                this.cart = JSON.parse(saved);
                this.updateUI();
            } catch (e) {
                console.error('Failed to load cart:', e);
                this.cart = [];
            }
        }
    },

    addToCart: function (product) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateUI();
        this.toggleCart(true);
        this.showNotification(`${product.title} added to cart!`);
    },

    updateQuantity: function (productId, delta) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            this.cart = this.cart.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) };
                }
                return item;
            });
            this.saveCart();
            this.updateUI();
        }
    },

    removeItem: function (productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateUI();
    },

    clearCart: function () {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            this.saveCart();
            this.updateUI();
            this.toggleCart(false);
        }
    },

    saveCart: function () {
        localStorage.setItem('cannacrazy_cart', JSON.stringify(this.cart));
    },

    updateUI: function () {
        const cartContainer = document.getElementById('cart-items-container');
        const emptyMessage = document.getElementById('empty-cart-message');
        const cartFooter = document.getElementById('cart-footer');
        const cartCount = document.getElementById('cart-count');
        const cartTotalItems = document.getElementById('cart-total-items');

        // Update count badge regardless of container presence
        const totalItems = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        if (!cartContainer) return;

        if (cartTotalItems) {
            cartTotalItems.textContent = totalItems;
        }

        if (this.cart.length === 0) {
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (cartFooter) cartFooter.style.display = 'none';
            cartContainer.innerHTML = '';
            return;
        }

        if (emptyMessage) emptyMessage.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'block';

        cartContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image || ''}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cannaCrazyCart.updateQuantity(${item.id}, -1)">−</button>
                        <span class="cart-item-quantity">${item.quantity || 1}</span>
                        <button class="quantity-btn" onclick="cannaCrazyCart.updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item-btn" onclick="cannaCrazyCart.removeItem(${item.id})" title="Remove item">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    toggleCart: function (forceOpen) {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (!cartSidebar) return;

        if (forceOpen === true) {
            cartSidebar.classList.add('active');
        } else if (forceOpen === false) {
            cartSidebar.classList.remove('active');
        } else {
            cartSidebar.classList.toggle('active');
        }
    },

    sendToWhatsApp: function () {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const whatsappNumber = window.cannaCrazySettings?.whatsappNumber || '';
        if (!whatsappNumber) {
            alert('WhatsApp number not configured. Please use the Request Information button instead.');
            cannaCrazyModals.openPickupModal();
            return;
        }

        let message = `Hi! I'm interested in the following products from ${window.cannaCrazySettings?.siteName || 'CannaCrazy'}:\n\n`;
        this.cart.forEach(item => {
            message += `- ${item.title} (x${item.quantity || 1})\n`;
        });
        message += '\nCan you please provide more information on availability and pricing?';

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    },

    showNotification: function (message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #39FF14, #2de000);
            color: black;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(57, 255, 20, 0.3);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

/* ==========================================================================
   MODALS SYSTEM
   ========================================================================== */
const cannaCrazyModals = {
    openProductModal: function (product) {
        const modal = document.getElementById('product-modal');
        const content = document.getElementById('product-modal-content');

        if (!modal || !content) return;

        const effectsHTML = product.effects && product.effects.length > 0
            ? product.effects.map(effect => `<span class="effect-tag">${effect}</span>`).join('')
            : '';

        content.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
                ${product.image ? `<img src="${product.image}" alt="${product.title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 1rem;">` : ''}
                <div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem; font-family: 'Permanent Marker', cursive; color: ${product.color || '#39FF14'};">${product.title}</h2>
                    
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                        ${product.potency ? `<span class="product-tag">${product.potency}</span>` : ''}
                        ${product.strength ? `<span class="product-tag">${product.strength}</span>` : ''}
                        ${product.growType ? `<span class="product-tag">${product.growType}</span>` : ''}
                    </div>
                    
                    <p style="font-size: 1.125rem; line-height: 1.8; color: #d1d5db; margin-bottom: 1.5rem;">
                        ${product.description || ''}
                    </p>
                    
                    ${product.effects && product.effects.length > 0 ? `
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.75rem;">Effects:</h3>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                ${effectsHTML}
                            </div>
                        </div>
                    ` : ''}
                    
                    <button onclick='cannaCrazyCart.addToCart(${JSON.stringify(product).replace(/'/g, "&#39;")}); cannaCrazyModals.closeProductModal();' class="add-to-cart-btn" style="width: 100%; margin-top: 1rem;">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        modal.classList.add('active');
    },

    closeProductModal: function () {
        const modal = document.getElementById('product-modal');
        if (modal) modal.classList.remove('active');
    },

    openJoinModal: function () {
        const modal = document.getElementById('join-modal');
        if (modal) modal.classList.add('active');
    },

    closeJoinModal: function () {
        const modal = document.getElementById('join-modal');
        if (modal) modal.classList.remove('active');
    },

    openPickupModal: function () {
        const modal = document.getElementById('pickup-modal');
        const cartItemsContainer = document.getElementById('pickup-cart-items');

        if (!modal) return;

        if (cartItemsContainer && cannaCrazyCart.cart.length > 0) {
            cartItemsContainer.innerHTML = `
                <h4 style="margin-bottom: 0.75rem; font-weight: bold;">Your Cart:</h4>
                <ul style="list-style: none; padding: 0;">
                    ${cannaCrazyCart.cart.map(item => `
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            ${item.title} <span style="color: #6b7280;">(x${item.quantity || 1})</span>
                        </li>
                    `).join('')}
                </ul>
            `;
        }
        modal.classList.add('active');
    },

    closePickupModal: function () {
        const modal = document.getElementById('pickup-modal');
        if (modal) modal.classList.remove('active');
    },

    toggleMobileMenu: function () {
        const nav = document.querySelector('.main-navigation');
        if (nav) {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.backgroundColor = '#0a0a0a';
            nav.style.flexDirection = 'column';
            nav.style.padding = '1rem';
            nav.style.borderTop = '1px solid rgba(255,255,255,0.1)';
        }
    },

    init: function () {
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.classList.remove('active');
            }
        });

        const joinForm = document.getElementById('join-form');
        if (joinForm) {
            joinForm.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Thank you for joining! We\'ll be in touch soon.');
                cannaCrazyModals.closeJoinModal();
                joinForm.reset();
            });
        }

        const pickupForm = document.getElementById('pickup-form');
        if (pickupForm) {
            pickupForm.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Thank you! We\'ll get back to you with availability and details.');
                cannaCrazyModals.closePickupModal();
                pickupForm.reset();
            });
        }

        document.addEventListener('click', function (e) {
            const productCard = e.target.closest('.product-card');
            if (productCard && !e.target.closest('.add-to-cart-btn')) {
                try {
                    const productData = JSON.parse(productCard.dataset.product);
                    cannaCrazyModals.openProductModal(productData);
                } catch (error) {
                    console.error('Failed to parse product data:', error);
                }
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                    modal.classList.remove('active');
                });
                cannaCrazyCart.toggleCart(false);
            }
        });
    }
};

/* ==========================================================================
   BUDTENDER AI
   ========================================================================== */
const cannaCrazyBudtender = {
    isModalOpen: false,
    conversationHistory: [],

    openModal: function () {
        if (!document.getElementById('budtender-modal')) {
            this.createModal();
        }
        const modal = document.getElementById('budtender-modal');
        if (modal) {
            modal.classList.add('active');
            this.isModalOpen = true;
            const input = document.getElementById('budtender-input');
            if (input) input.focus();
        }
    },

    closeModal: function () {
        const modal = document.getElementById('budtender-modal');
        if (modal) {
            modal.classList.remove('active');
            this.isModalOpen = false;
        }
    },

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
                            Tell me what you're looking for and I'll recommend products from our specific inventory!
                        </p>
                    </div>
                    <div id="budtender-chat" style="flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                        <div class="budtender-message ai-message">
                            <strong style="color: #39FF14;">AI Budtender:</strong>
                            <p>Hey there! 👋 What kind of vibe are you going for today?</p>
                        </div>
                    </div>
                    <div style="padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
                        <form id="budtender-form" style="display: flex; gap: 0.75rem;">
                            <input type="text" id="budtender-input" placeholder="E.g., Something to help me relax..." required style="flex: 1; padding: 0.75rem 1rem; border-radius: 0.75rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; font-size: 1rem;" />
                            <button type="submit" id="budtender-submit" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #BC13FE, #39FF14); color: black; border: none; border-radius: 0.75rem; font-weight: bold; cursor: pointer;">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <style>
                .budtender-message { padding: 1rem; border-radius: 1rem; line-height: 1.6; }
                .ai-message { background-color: rgba(57, 255, 20, 0.1); border-left: 3px solid #39FF14; }
                .user-message { background-color: rgba(188, 19, 254, 0.1); border-left: 3px solid #BC13FE; text-align: right; }
                #budtender-chat::-webkit-scrollbar { width: 6px; }
                #budtender-chat::-webkit-scrollbar-thumb { background-color: #39FF14; border-radius: 10px; }
            </style>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const form = document.getElementById('budtender-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
    },

    sendMessage: async function () {
        const input = document.getElementById('budtender-input');
        const submitBtn = document.getElementById('budtender-submit');
        const chatContainer = document.getElementById('budtender-chat');
        if (!input || !submitBtn || !chatContainer) return;

        const message = input.value.trim();
        if (!message) return;

        this.addMessageToChat('user', message);
        input.value = '';
        submitBtn.disabled = true;

        // Thinking animation
        const originalBtnText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="thinking-dots">Thinking<span>.</span><span>.</span><span>.</span></span>';

        // Add thinking style if not exists
        if (!document.getElementById('thinking-style')) {
            const tStyle = document.createElement('style');
            tStyle.id = 'thinking-style';
            tStyle.textContent = `
                .thinking-dots span { animation: blink 1.4s infinite both; }
                .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
                .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
            `;
            document.head.appendChild(tStyle);
        }

        try {
            // Updated to use consolidated script handle if localized
            const restUrl = window.cannaCrazyBudtender?.restUrl || '/wp-json/cannacrazy/v1/';
            const response = await fetch(restUrl + 'budtender', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) throw new Error('Failed to get recommendation');
            const data = await response.json();

            if (data.success && data.recommendation) {
                this.addMessageToChat('ai', data.recommendation);
            } else {
                throw new Error('Invalid response');
            }
        } catch (error) {
            console.error('Budtender error:', error);
            this.addMessageToChat('ai', 'Sorry, I\'m having trouble connecting right now. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            const inputField = document.getElementById('budtender-input');
            if (inputField) inputField.focus();
        }
    },

    addMessageToChat: function (type, message) {
        const chatContainer = document.getElementById('budtender-chat');
        if (!chatContainer) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `budtender-message ${type === 'ai' ? 'ai-message' : 'user-message'}`;

        let content = message;
        if (type === 'ai') {
            content = message.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            messageDiv.innerHTML = `<strong style="color: #39FF14;">AI Budtender:</strong><p>${content}</p>`;
        } else {
            messageDiv.innerHTML = `<strong style="color: #BC13FE;">You:</strong><p>${content}</p>`;
        }
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    init: function () {
        this.restUrl = window.cannaCrazyBudtender?.restUrl || '/wp-json/cannacrazy/v1/';
    }
};

/* ==========================================================================
   BACKGROUND EFFECTS (SHIMMER)
   ========================================================================== */
const cannaCrazyEffects = {
    init: function () {
        this.createShimmerEffect();
    },
    createShimmerEffect: function () {
        const bgElement = document.getElementById('background-effects');
        if (!bgElement) return;
        // Basic particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'float-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background-color: rgba(57, 255, 20, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 20}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            bgElement.appendChild(particle);
        }

        if (!document.getElementById('particle-animation-style')) {
            const style = document.createElement('style');
            style.id = 'particle-animation-style';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(100vh) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

/* ==========================================================================
   SCROLL ANIMATIONS
   ========================================================================== */
const cannaCrazyAnimations = {
    init: function () {
        // Add animation classes to elements
        const elements = document.querySelectorAll('.product-card, .section-title, .info-card, .grade-title');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach((el, index) => {
            el.classList.add('fade-in-up');
            // Stagger delay based on index relative to parent or just random/sequence
            el.style.transitionDelay = `${(index % 5) * 0.1}s`;
            observer.observe(el);
        });
    }
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
    cannaCrazyCart.init();
    cannaCrazyModals.init();
    cannaCrazyBudtender.init();
    cannaCrazyEffects.init();
    cannaCrazyAnimations.init();

    // Close cart when clicking outside
    document.addEventListener('click', function (e) {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartButton = e.target.closest('.cart-button');
        if (cartSidebar && cartSidebar.classList.contains('active') &&
            !cartSidebar.contains(e.target) && !cartButton) {
            cannaCrazyCart.toggleCart(false);
        }
    });
});

// Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    
    /* Scroll Reveal Animations */
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
