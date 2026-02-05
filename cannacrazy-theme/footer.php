<!-- Footer -->
<footer class="site-footer">
    <div class="footer-container">
        <div class="footer-copyright">
            &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?> • <?php esc_html_e('BORN IN THE STREETS', 'cannacrazy'); ?> • <?php esc_html_e('ALL RIGHTS RESERVED', 'cannacrazy'); ?>
        </div>

        <div class="footer-links">
            <a href="https://instagram.com/cannacrazy" target="_blank" rel="noopener noreferrer">
                <?php esc_html_e('Instagram', 'cannacrazy'); ?>
            </a>
            <a href="https://facebook.com/cannacrazy" target="_blank" rel="noopener noreferrer">
                <?php esc_html_e('Facebook', 'cannacrazy'); ?>
            </a>
            <a href="https://share.google/TjyLs40opB0T0vNAq" target="_blank" rel="noopener noreferrer" class="maps-link">
                <span><?php esc_html_e('Find Us', 'cannacrazy'); ?> 📍</span>
            </a>
        </div>
    </div>
</footer>

<!-- Mobile CTA -->
<?php if (is_front_page()): ?>
<div class="fixed bottom-6 left-6 right-6 z-[90] md:hidden">
    <button onclick="document.getElementById('shop').scrollIntoView({behavior: 'smooth'})" class="w-full py-5 bg-[#39FF14] text-black font-black text-xl rounded-2xl shadow-2xl border-2 border-black" style="width: 100%; padding: 1.25rem; background-color: #39FF14; color: black; font-weight: 900; font-size: 1.25rem; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); border: 2px solid black;">
        <?php esc_html_e('SHOP NOW', 'cannacrazy'); ?>
    </button>
</div>
<?php endif; ?>

<!-- Product Modal -->
<div class="modal-overlay" id="product-modal">
    <div class="modal-content" style="max-width: 800px; padding: 2rem;">
        <button class="modal-close" onclick="cannaCrazyModals.closeProductModal()">×</button>
        <div id="product-modal-content">
            <!-- Content populated by JavaScript -->
        </div>
    </div>
</div>

<!-- Join Form Modal -->
<div class="modal-overlay" id="join-modal">
    <div class="modal-content" style="max-width: 600px; padding: 2rem;">
        <button class="modal-close" onclick="cannaCrazyModals.closeJoinModal()">×</button>
        <div style="padding: 1rem;">
            <h2 class="text-4xl mb-4" style="font-size: 2.25rem; margin-bottom: 1rem; font-family: 'Permanent Marker', cursive;">
                <?php esc_html_e('JOIN THE FAM', 'cannacrazy'); ?>
            </h2>
            <p class="body-font mb-6" style="margin-bottom: 1.5rem; color: #9ca3af;">
                <?php esc_html_e('Become a member of CannaCrazy and get exclusive access to new drops, events, and the best vibes.', 'cannacrazy'); ?>
            </p>
            <?php echo do_shortcode('[contact-form-7 id="join-form"]'); ?>
            <!-- If not using Contact Form 7, use WordPress comment form or custom form -->
            <form id="join-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="text" name="full_name" placeholder="<?php esc_attr_e('Full Name', 'cannacrazy'); ?>" required style="padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <input type="email" name="email" placeholder="<?php esc_attr_e('Email Address', 'cannacrazy'); ?>" required style="padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <input type="tel" name="phone" placeholder="<?php esc_attr_e('Phone Number', 'cannacrazy'); ?>" required style="padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <label style="display: flex; align-items: center; gap: 0.5rem; color: #9ca3af; font-size: 0.875rem;">
                    <input type="checkbox" name="age_confirm" required>
                    <?php esc_html_e('I confirm I am 21+ years old', 'cannacrazy'); ?>
                </label>
                <button type="submit" class="add-to-cart-btn" style="margin-top: 1rem;">
                    <?php esc_html_e('SUBMIT', 'cannacrazy'); ?>
                </button>
            </form>
        </div>
    </div>
</div>

<!-- Pickup/Information Request Modal -->
<div class="modal-overlay" id="pickup-modal">
    <div class="modal-content" style="max-width: 600px; padding: 2rem;">
        <button class="modal-close" onclick="cannaCrazyModals.closePickupModal()">×</button>
        <div style="padding: 1rem;">
            <h2 class="text-4xl mb-4" style="font-size: 2.25rem; margin-bottom: 1rem; font-family: 'Permanent Marker', cursive;">
                <?php esc_html_e('Request Information', 'cannacrazy'); ?>
            </h2>
            <p class="body-font mb-6" style="margin-bottom: 1.5rem; color: #9ca3af;">
                <?php esc_html_e('Fill out this form and we\'ll get back to you with availability and pickup details.', 'cannacrazy'); ?>
            </p>
            <form id="pickup-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="text" name="name" placeholder="<?php esc_attr_e('Your Name', 'cannacrazy'); ?>" required style="padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <input type="tel" name="phone" placeholder="<?php esc_attr_e('Phone Number', 'cannacrazy'); ?>" required style="padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <input type="email" name="email" placeholder="<?php esc_attr_e('Email (optional)', 'cannacrazy'); ?>" style="padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                <textarea name="message" rows="4" placeholder="<?php esc_attr_e('Additional notes...', 'cannacrazy'); ?>" style="padding: 0.75rem; border-radius: 0.5rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; resize: vertical;"></textarea>
                <div id="pickup-cart-items" style="background-color: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0;">
                    <!-- Cart items listed here -->
                </div>
                <button type="submit" class="add-to-cart-btn">
                    <?php esc_html_e('SEND REQUEST', 'cannacrazy'); ?>
                </button>
            </form>
        </div>
    </div>
</div>

<?php wp_footer(); ?>

<!-- Pass WhatsApp number to JavaScript -->
<script>
    window.cannaCrazySettings = {
        whatsappNumber: '<?php echo esc_js(get_theme_mod('cannacrazy_whatsapp', '')); ?>',
        siteName: '<?php echo esc_js(get_bloginfo('name')); ?>',
    };
</script>

</body>
</html>
