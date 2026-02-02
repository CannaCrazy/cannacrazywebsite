/**
 * CannaCrazy Modals System
 * 
 * Manages all modal windows (product details, join form, pickup requests)
 * 
 * @package CannaCrazy
 * @version 1.0.0
 */

const cannaCrazyModals = {

    /**
     * Open Product Detail Modal
     */
    openProductModal: function (product) {
        const modal = document.getElementById('product-modal');
        const content = document.getElementById('product-modal-content');

        if (!modal || !content) return;

        // Build product detail HTML
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
                    
                    <button onclick="cannaCrazyCart.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')}); cannaCrazyModals.closeProductModal();" class="add-to-cart-btn" style="width: 100%; margin-top: 1rem;">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');
    },

    /**
     * Close Product Modal
     */
    closeProductModal: function () {
        const modal = document.getElementById('product-modal');
        if (modal) modal.classList.remove('active');
    },

    /**
     * Open Join Form Modal
     */
    openJoinModal: function () {
        const modal = document.getElementById('join-modal');
        if (modal) modal.classList.add('active');
    },

    /**
     * Close Join Modal
     */
    closeJoinModal: function () {
        const modal = document.getElementById('join-modal');
        if (modal) modal.classList.remove('active');
    },

    /**
     * Open Pickup/Info Request Modal
     */
    openPickupModal: function () {
        const modal = document.getElementById('pickup-modal');
        const cartItemsContainer = document.getElementById('pickup-cart-items');

        if (!modal) return;

        // Populate cart items in modal
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

    /**
     * Close Pickup Modal
     */
    closePickupModal: function () {
        const modal = document.getElementById('pickup-modal');
        if (modal) modal.classList.remove('active');
    },

    /**
     * Toggle Mobile Menu
     */
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

    /**
     * Initialize modal event listeners
     */
    init: function () {
        // Close modals when clicking overlay
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.classList.remove('active');
            }
        });

        // Handle form submissions
        const joinForm = document.getElementById('join-form');
        if (joinForm) {
            joinForm.addEventListener('submit', function (e) {
                e.preventDefault();
                // Here you can add AJAX submission to WordPress
                alert('Thank you for joining! We\'ll be in touch soon.');
                cannaCrazyModals.closeJoinModal();
                joinForm.reset();
            });
        }

        const pickupForm = document.getElementById('pickup-form');
        if (pickupForm) {
            pickupForm.addEventListener('submit', function (e) {
                e.preventDefault();
                // Here you can add AJAX submission to WordPress
                alert('Thank you! We\'ll get back to you with availability and details.');
                cannaCrazyModals.closePickupModal();
                pickupForm.reset();
            });
        }

        // Handle product card clicks
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

        // ESC key to close modals
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    cannaCrazyModals.init();
});
