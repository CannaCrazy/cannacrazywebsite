/**
 * CannaCrazy Background Effects
 * 
 * Animated background effects (shimmer grid, particles)
 * 
 * @package CannaCrazy
 * @version 1.0.0
 */

const cannaCrazyEffects = {

    /**
     * Initialize background effects
     */
    init: function () {
        this.createShimmerEffect();
    },

    /**
     * Create shimmer grid effect
     */
    createShimmerEffect: function () {
        const bgElement = document.getElementById('background-effects');
        if (!bgElement) return;

        // Grid shimmer is handled by CSS
        // This function can be extended for particle effects if needed

        // Optional: Add subtle floating particles
        this.addParticles();
    },

    /**
     * Add floating particles (optional enhancement)
     */
    addParticles: function () {
        const bgElement = document.getElementById('background-effects');
        if (!bgElement) return;

        // Create a few subtle particles
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

        // Add CSS animation for particles
        if (!document.getElementById('particle-animation-style')) {
            const style = document.createElement('style');
            style.id = 'particle-animation-style';
            style.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(100vh) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    cannaCrazyEffects.init();
});
