<?php
/**
 * Template for displaying single product
 * 
 * @package CannaCrazy
 */

get_header();
?>

<div class="relative z-10 min-h-screen text-white" style="padding-top: 120px;">
    <?php while (have_posts()): the_post(); ?>
        
        <article id="product-<?php the_ID(); ?>" <?php post_class('max-w-6xl mx-auto px-6 py-12'); ?> style="max-width: 1536px; margin: 0 auto; padding: 3rem 1.5rem;">
            
            <div style="display: grid; grid-template-columns: 1fr; gap: 3rem;">
                
                <!-- Product Image -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
                    <?php if (has_post_thumbnail()): ?>
                        <div style="border-radius: 2rem; overflow: hidden; border: 2px solid rgba(255, 255, 255, 0.1);">
                            <?php the_post_thumbnail('large', array('style' => 'width: 100%; height: auto; display: block;')); ?>
                        </div>
                    <?php endif; ?>
                    
                    <!-- Product Info -->
                    <div>
                        <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1.5rem; font-family: 'Permanent Marker', cursive; color: <?php echo esc_attr(get_post_meta(get_the_ID(), '_product_color', true) ?: '#39FF14'); ?>;">
                            <?php the_title(); ?>
                        </h1>
                        
                        <!-- Meta Tags -->
                        <div style="display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap;">
                            <?php
                            $potency = get_post_meta(get_the_ID(), '_product_potency', true);
                            $strength = get_post_meta(get_the_ID(), '_product_strength', true);
                            $grow_type = get_post_meta(get_the_ID(), '_product_grow_type', true);
                            $price = get_post_meta(get_the_ID(), '_product_price', true);
                            
                            if ($potency): ?>
                                <span class="product-tag"><?php echo esc_html($potency); ?></span>
                            <?php endif; ?>
                            
                            <?php if ($strength): ?>
                                <span class="product-tag"><?php echo esc_html($strength); ?></span>
                            <?php endif; ?>
                            
                            <?php if ($grow_type): ?>
                                <span class="product-tag"><?php echo esc_html($grow_type); ?></span>
                            <?php endif; ?>
                            
                            <?php if ($price): ?>
                                <span class="product-tag" style="background-color: #39FF14; color: black; font-weight: bold;">
                                    <?php echo esc_html($price); ?>
                                </span>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Categories & Grades -->
                        <?php
                        $categories = get_the_terms(get_the_ID(), 'product_category');
                        $grades = get_the_terms(get_the_ID(), 'product_grade');
                        ?>
                        
                        <div style="margin-bottom: 2rem;">
                            <?php if ($categories && !is_wp_error($categories)): ?>
                                <div style="margin-bottom: 0.75rem;">
                                    <strong style="color: #6b7280;">Category:</strong>
                                    <?php foreach ($categories as $category): ?>
                                        <a href="<?php echo esc_url(get_term_link($category)); ?>" style="color: #39FF14; text-decoration: none; margin-left: 0.5rem;">
                                            <?php echo esc_html($category->name); ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                            
                            <?php if ($grades && !is_wp_error($grades)): ?>
                                <div>
                                    <strong style="color: #6b7280;">Grade:</strong>
                                    <?php foreach ($grades as $grade): ?>
                                        <a href="<?php echo esc_url(get_term_link($grade)); ?>" style="color: #BC13FE; text-decoration: none; margin-left: 0.5rem;">
                                            <?php echo esc_html($grade->name); ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Description -->
                        <div style="font-size: 1.125rem; line-height: 1.8; color: #d1d5db; margin-bottom: 2rem;">
                            <?php the_content(); ?>
                        </div>
                        
                        <!-- Effects -->
                        <?php
                        $effects = get_post_meta(get_the_ID(), '_product_effects', true);
                        if ($effects):
                            $effects_array = array_map('trim', explode(',', $effects));
                        ?>
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; color: white;">
                                <?php esc_html_e('Effects:', 'cannacrazy'); ?>
                            </h3>
                            <div class="product-effects">
                                <?php foreach ($effects_array as $effect): ?>
                                    <span class="effect-tag"><?php echo esc_html($effect); ?></span>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <?php endif; ?>
                        
                        <!-- Stock Status -->
                        <?php
                        $in_stock = get_post_meta(get_the_ID(), '_product_in_stock', true);
                        ?>
                        <div style="margin-bottom: 2rem; padding: 1rem; background-color: <?php echo $in_stock === '1' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(239, 68, 68, 0.1)'; ?>; border-radius: 0.75rem; border-left: 4px solid <?php echo $in_stock === '1' ? '#39FF14' : '#ef4444'; ?>;">
                            <?php if ($in_stock === '1'): ?>
                                <strong style="color: #39FF14;">✓ In Stock</strong>
                            <?php else: ?>
                                <strong style="color: #ef4444;">✗ Out of Stock</strong>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Add to Cart Button -->
                        <?php if ($in_stock === '1'): ?>
                            <?php
                            $product_data = array(
                                'id' => get_the_ID(),
                                'title' => get_the_title(),
                                'description' => get_the_excerpt(),
                                'image' => get_the_post_thumbnail_url(get_the_ID(), 'product-thumbnail'),
                                'potency' => $potency,
                                'strength' => $strength,
                                'growType' => $grow_type,
                                'effects' => $effects_array ?? array(),
                                'color' => get_post_meta(get_the_ID(), '_product_color', true) ?: '#39FF14',
                            );
                            ?>
                            <button 
                                class="add-to-cart-btn" 
                                onclick="cannaCrazyCart.addToCart(<?php echo esc_attr(json_encode($product_data)); ?>)"
                                style="max-width: 400px; font-size: 1.25rem; padding: 1.25rem;"
                            >
                                <?php esc_html_e('Add to Cart', 'cannacrazy'); ?>
                            </button>
                        <?php endif; ?>
                        
                        <!-- Back to Shop -->
                        <div style="margin-top: 2rem;">
                            <a href="<?php echo esc_url(home_url('/#shop')); ?>" style="color: #6b7280; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: color 0.3s;">
                                ← <?php esc_html_e('Back to Shop', 'cannacrazy'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
        </article>
        
    <?php endwhile; ?>
</div>

<?php
get_footer();
?>
