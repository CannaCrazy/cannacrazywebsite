/**
 * CannaCrazy Cart System
 * 
 * Manages shopping cart functionality using localStorage
 * Syncs with WordPress WhatsApp integration
 * 
 * @package CannaCrazy
 * @version 1.0.0
 */

const cannaCrazyCart = {
    cart: [],

    /**
     * Initialize cart from localStorage
     */
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

    /**
     * Add product to cart
     */
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

        // Show brief success notification
        this.showNotification(`${product.title} added to cart!`);
    },

    /**
     * Update quantity of item in cart
     */
    updateQuantity: function (productId, delta) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, (item.quantity || 1) + delta);
            this.saveCart();
            this.updateUI();
        }
    },

    /**
     * Remove item from cart
     */
    removeItem: function (productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateUI();
    },

    /**
     * Clear entire cart
     */
    clearCart: function () {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            this.saveCart();
            this.updateUI();
            this.toggleCart(false);
        }
    },

    /**
     * Save cart to localStorage
     */
    saveCart: function () {
        localStorage.setItem('cannacrazy_cart', JSON.stringify(this.cart));
    },

    /**
     * Update cart UI
     */
    updateUI: function () {
        const cartContainer = document.getElementById('cart-items-container');
        const emptyMessage = document.getElementById('empty-cart-message');
        const cartFooter = document.getElementById('cart-footer');
        const cartCount = document.getElementById('cart-count');
        const cartTotalItems = document.getElementById('cart-total-items');

        if (!cartContainer) return;

        // Update cart count badge
        const totalItems = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        if (cartTotalItems) {
            cartTotalItems.textContent = totalItems;
        }

        // Show/hide empty message
        if (this.cart.length === 0) {
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (cartFooter) cartFooter.style.display = 'none';
            cartContainer.innerHTML = '';
            return;
        }

        if (emptyMessage) emptyMessage.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'block';

        // Render cart items
        cartContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image || ''}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cannaCrazyCart.updateQuantity('${item.id}', -1)">−</button>
                        <span class="cart-item-quantity">${item.quantity || 1}</span>
                        <button class="quantity-btn" onclick="cannaCrazyCart.updateQuantity('${item.id}', 1)">+</button>
                        <button class="remove-item-btn" onclick="cannaCrazyCart.removeItem('${item.id}')" title="Remove item">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Toggle cart sidebar
     */
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

    /**
     * Send cart to WhatsApp
     */
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

    /**
     * Show notification
     */
    showNotification: function (message) {
        // Create notification element
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

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function () {
    cannaCrazyCart.init();

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

// Add CSS animations if not already in stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
