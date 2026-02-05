<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class('animated-bg min-h-screen'); ?>>
<?php wp_body_open(); ?>

<!-- Background Effects Container -->
<div id="background-effects"></div>

<header class="site-header">
    <div class="header-container">
        <!-- Main Site Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo">
            <?php 
            if (has_custom_logo()) {
                the_custom_logo();
            } else {
                echo 'CannaCrazy';
            }
            ?>
        </a>

        <!-- Main Navigation -->
        <nav class="main-navigation" role="navigation" aria-label="<?php esc_attr_e('Primary Menu', 'cannacrazy'); ?>">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class'     => 'main-navigation',
                'container'      => false,
                'fallback_cb'    => 'cannacrazy_default_menu',
            ));
            ?>
        </nav>

        <!-- Header Actions -->
        <div class="header-actions">
            <!-- Branded Cart Trigger (CC Logo 1) -->
            <button class="cart-button" onclick="cannaCrazyModals.openPickupModal()" aria-label="<?php esc_attr_e('Reserve / Select', 'cannacrazy'); ?>">
                <img src="<?php echo get_template_directory_uri(); ?>/Images/CC Logo 1.png" alt="Reserve" style="width: 3.5rem; height: 3.5rem; object-fit: contain; filter: drop-shadow(0 0 8px rgba(57, 255, 20, 0.5)); transition: all 0.3s ease;">
            </button>
            <span class="cart-count" id="cart-count" style="display: none;">0</span>

            <!-- Join Button -->
            <button class="join-button" onclick="cannaCrazyModals.openJoinModal()">
                <?php esc_html_e('JOIN THE FAM', 'cannacrazy'); ?>
            </button>

            <!-- Mobile Menu Toggle -->
            <button class="mobile-menu-toggle" onclick="cannaCrazyModals.toggleMobileMenu()" aria-label="<?php esc_attr_e('Toggle Menu', 'cannacrazy'); ?>">
                ☰
            </button>
        </div>
    </div>
</header>

<!-- Cart Sidebar -->
<div class="cart-sidebar" id="cart-sidebar">
    <div class="cart-header">
        <h2 class="cart-title"><?php esc_html_e('Your Cart', 'cannacrazy'); ?></h2>
        <button class="modal-close" onclick="cannaCrazyCart.toggleCart()" aria-label="<?php esc_attr_e('Close Cart', 'cannacrazy'); ?>">
            ×
        </button>
    </div>
    <div class="cart-items" id="cart-items-container">
        <!-- Cart items populated by JavaScript -->
    </div>
    <div class="cart-footer" id="cart-footer">
        <div class="cart-total">
            <span><?php esc_html_e('Total Items:', 'cannacrazy'); ?></span>
            <span id="cart-total-items">0</span>
        </div>
        <?php 
        $whatsapp_number = get_theme_mod('cannacrazy_whatsapp', '');
        if ($whatsapp_number): 
        ?>
            <button class="checkout-btn" onclick="cannaCrazyCart.sendToWhatsApp()">
                <?php esc_html_e('Send via WhatsApp', 'cannacrazy'); ?>
            </button>
        <?php else: ?>
            <button class="checkout-btn" onclick="cannaCrazyModals.openPickupModal()">
                <?php esc_html_e('Request Information', 'cannacrazy'); ?>
            </button>
        <?php endif; ?>
    </div>
    <div class="empty-cart" id="empty-cart-message">
        <p><?php esc_html_e('Your cart is empty', 'cannacrazy'); ?></p>
        <p><?php esc_html_e('Add some products to get started!', 'cannacrazy'); ?></p>
    </div>
</div>

<?php
// Default menu fallback
function cannacrazy_default_menu() {
    ?>
    <a href="<?php echo esc_url(home_url('/')); ?>" class="<?php echo is_front_page() ? 'current-menu-item' : ''; ?>">
        <?php esc_html_e('HOME', 'cannacrazy'); ?>
    </a>
    <?php
    $about_page = get_page_by_path('about');
    if ($about_page):
    ?>
        <a href="<?php echo esc_url(get_permalink($about_page)); ?>" class="<?php echo is_page('about') ? 'current-menu-item' : ''; ?>">
            <?php esc_html_e('ABOUT US', 'cannacrazy'); ?>
        </a>
    <?php endif; ?>
    <?php if (is_front_page()): ?>
        <a href="#shop"><?php esc_html_e('SHOP', 'cannacrazy'); ?></a>
        <a href="#faq"><?php esc_html_e('FAQ', 'cannacrazy'); ?></a>
    <?php endif; ?>
    <?php
}
?>
