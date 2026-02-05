<?php
/**
 * The template for displaying product archives
 * 
 * @package CannaCrazy
 */

get_header();
?>

<div class="relative z-10 min-h-screen text-white" style="padding-top: 120px;">
    
    <section style="padding: 3rem 1.5rem;">
        <div style="max-width: 1536px; margin: 0 auto;">
            
            <!-- Archive Header -->
            <div style="margin-bottom: 3rem; text-align: center;">
                <h1 style="font-size: clamp(3rem, 6vw, 6rem); margin-bottom: 1rem; font-family: 'Permanent Marker', cursive;">
                    <?php
                    if (is_tax('product_category')) {
                        single_term_title();
                    } elseif (is_tax('product_grade')) {
                        echo esc_html__('Grade: ', 'cannacrazy');
                        single_term_title();
                    } elseif (is_post_type_archive('product')) {
                        echo esc_html__('All Products', 'cannacrazy');
                    }
                    ?>
                </h1>
                <?php
                if (is_tax()) {
                    $term_description = term_description();
                    if ($term_description):
                ?>
                    <p style="font-size: 1.125rem; color: #9ca3af; max-width: 768px; margin: 0 auto;">
                        <?php echo wp_kses_post($term_description); ?>
                    </p>
                <?php endif; } ?>
            </div>
            
            <!-- Products Grid -->
            <?php if (have_posts()): ?>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                    <?php while (have_posts()): the_post(); ?>
                        <?php echo cannacrazy_get_product_card(get_the_ID()); ?>
                    <?php endwhile; ?>
                </div>
                
                <!-- Pagination -->
                <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 3rem;">
                    <?php
                    the_posts_pagination(array(
                        'mid_size'  => 2,
                        'prev_text' => __('← Previous', 'cannacrazy'),
                        'next_text' => __('Next →', 'cannacrazy'),
                        'before_page_number' => '<span class="screen-reader-text">' . __('Page ', 'cannacrazy') . '</span>',
                    ));
                    ?>
                </div>
            <?php else: ?>
                <div style="text-align: center; padding: 4rem 2rem;">
                    <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #6b7280;">
                        <?php esc_html_e('No products found', 'cannacrazy'); ?>
                    </h2>
                    <p style="color: #9ca3af; margin-bottom: 2rem;">
                        <?php esc_html_e('Check back soon for new drops!', 'cannacrazy'); ?>
                    </p>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="add-to-cart-btn" style="display: inline-block; max-width: 300px;">
                        <?php esc_html_e('Back to Home', 'cannacrazy'); ?>
                    </a>
                </div>
            <?php endif; ?>
            
        </div>
    </section>
    
</div>

<?php
get_footer();
?>
