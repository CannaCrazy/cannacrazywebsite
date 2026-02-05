<?php
/**
 * The main template file
 * 
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * 
 * @package CannaCrazy
 */

get_header();
?>

<div class="relative z-10 min-h-screen text-white">
    
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-content">
            <h1 class="hero-title">
                <?php esc_html_e('ELEVATE YOUR', 'cannacrazy'); ?> <span class="highlight"><?php esc_html_e('HIGH', 'cannacrazy'); ?></span><br />
                <?php esc_html_e('GO KINDA CRAZY', 'cannacrazy'); ?>
            </h1>
            <p class="hero-description">
                <?php esc_html_e('WHEW! I am so incredibly hyped that you found your way to our corner of the internet! If you\'re looking for a place that\'s obsessed with the best vibes, the prettiest nugs, and a total passion for the plant, then you are exactly where you belong! Welcome to the CannaCrazy Social Club!', 'cannacrazy'); ?>
            </p>

            <!-- Budtender Integration -->
            <div style="margin-bottom: 5rem;">
                <button 
                    onclick="cannaCrazyBudtender.openModal()" 
                    class="px-12 py-6 bg-gradient-to-r from-[#BC13FE] to-[#39FF14] text-black text-2xl font-black rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)] relative overflow-hidden group"
                    style="padding: 1.5rem 3rem; background: linear-gradient(to right, #BC13FE, #39FF14); color: black; font-size: 1.5rem; font-weight: 900; border-radius: 1.5rem; border: none; cursor: pointer; box-shadow: 6px 6px 0px 0px rgba(255, 255, 255, 0.8); text-transform: uppercase; transition: all 0.3s ease;"
                >
                    <span class="relative z-10">🤖 <?php esc_html_e('ASK A BUDTENDER', 'cannacrazy'); ?></span>
                </button>
            </div>

            <div class="trust-indicator">
                <span class="trust-line"></span>
                <?php esc_html_e('Trusted by 10k+ Stoners', 'cannacrazy'); ?>
                <span class="trust-line"></span>
            </div>
        </div>
    </section>

    <!-- Info Blocks -->
    <section class="info-blocks">
        <div class="info-grid">
            <div class="info-card">
                <div class="info-icon green">
                    <span>✨</span>
                </div>
                <h2 class="info-title"><?php esc_html_e('The Best Vibes', 'cannacrazy'); ?></h2>
                <p class="info-description body-font">
                    <?php esc_html_e('Our energy is high, our jars are full, and our community is the best in the business.', 'cannacrazy'); ?>
                </p>
            </div>
            <div class="info-card">
                <div class="info-icon purple">
                    <span>🤝</span>
                </div>
                <h2 class="info-title"><?php esc_html_e('Community First', 'cannacrazy'); ?></h2>
                <p class="info-description body-font">
                    <?php esc_html_e('We believe in responsible enjoyment, education, and looking out for our family.', 'cannacrazy'); ?>
                </p>
            </div>
            <div class="info-card">
                <div class="info-icon yellow">
                    <span>🔑</span>
                </div>
                <h2 class="info-title"><?php esc_html_e('Exclusive Access', 'cannacrazy'); ?></h2>
                <p class="info-description body-font">
                    <?php esc_html_e('As a private social club, our members get the inside track on new drops, special events, and rare finds.', 'cannacrazy'); ?>
                </p>
            </div>
        </div>
    </section>

    <!-- Shop Sections with Graded Tunnels -->
    <section id="shop" class="shop-section">
        <div class="shop-container" style="display: flex; flex-direction: column; gap: 8rem;">

            <!-- FLOWER / BUD -->
            <div>
                <div class="section-header">
                    <h2 class="section-title"><?php esc_html_e('FLOWER / BUD', 'cannacrazy'); ?></h2>
                    <div class="section-subtitle hidden md:block">[ <?php esc_html_e('GRADED MENU', 'cannacrazy'); ?> ]</div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4rem;">
                    <!-- Greenhouse Tunnel -->
                    <div class="grade-tunnel greenhouse">
                        <h3 class="grade-title" style="color: #FBFF00;">
                            <?php esc_html_e('Greenhouse Selection', 'cannacrazy'); ?>
                        </h3>
                        <div class="product-scroll">
                            <?php
                            $greenhouse_query = cannacrazy_get_products_by_grade('greenhouse');
                            if ($greenhouse_query->have_posts()):
                                while ($greenhouse_query->have_posts()): $greenhouse_query->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280; padding: 2rem;">' . esc_html__('No products available in this grade.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                        </div>
                    </div>

                    <!-- Grade A Tunnel -->
                    <div class="grade-tunnel a">
                        <h3 class="grade-title" style="color: rgba(255, 255, 255, 0.5);">
                            <?php esc_html_e('Grade A', 'cannacrazy'); ?>
                        </h3>
                        <div class="product-scroll">
                            <?php
                            $grade_a_query = cannacrazy_get_products_by_grade('a');
                            if ($grade_a_query->have_posts()):
                                while ($grade_a_query->have_posts()): $grade_a_query->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280; padding: 2rem;">' . esc_html__('No products available in this grade.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                        </div>
                    </div>

                    <!-- Grade AA Tunnel -->
                    <div class="grade-tunnel aa">
                        <h3 class="grade-title" style="color: #BC13FE;">
                            <?php esc_html_e('Grade AA', 'cannacrazy'); ?>
                        </h3>
                        <div class="product-scroll">
                            <?php
                            $grade_aa_query = cannacrazy_get_products_by_grade('aa');
                            if ($grade_aa_query->have_posts()):
                                while ($grade_aa_query->have_posts()): $grade_aa_query->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280; padding: 2rem;">' . esc_html__('No products available in this grade.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                        </div>
                    </div>

                    <!-- Grade AAA Tunnel (Top Shelf) -->
                    <div class="grade-tunnel aaa">
                        <h3 class="grade-title" style="color: #39FF14; display: flex; align-items: center; gap: 1rem;">
                            <?php esc_html_e('Grade AAA', 'cannacrazy'); ?>
                            <span class="grade-badge"><?php esc_html_e('TOP SHELF', 'cannacrazy'); ?></span>
                        </h3>
                        <div class="product-scroll">
                            <?php
                            $grade_aaa_query = cannacrazy_get_products_by_grade('aaa');
                            if ($grade_aaa_query->have_posts()):
                                while ($grade_aaa_query->have_posts()): $grade_aaa_query->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280; padding: 2rem;">' . esc_html__('No products available in this grade.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SPECIALITY & PINNED STRAINS -->
            <div>
                <div class="section-header">
                    <h2 class="section-title neon-text-purple"><?php esc_html_e('SPECIALITY', 'cannacrazy'); ?></h2>
                    <div class="section-subtitle">[ <?php esc_html_e('PINNED & EXCLUSIVE', 'cannacrazy'); ?> ]</div>
                </div>
                <div class="product-scroll">
                    <?php
                    $speciality_query = cannacrazy_get_speciality_products();
                    if ($speciality_query->have_posts()):
                        while ($speciality_query->have_posts()): $speciality_query->the_post();
                            echo cannacrazy_get_product_card(get_the_ID());
                        endwhile;
                        wp_reset_postdata();
                    else:
                        echo '<p style="color: #6b7280; padding: 2rem;">' . esc_html__('No speciality items pinned at the moment.', 'cannacrazy') . '</p>';
                    endif;
                    ?>
                </div>
            </div>

            <!-- PRE-ROLLS (Graded) -->
            <div>
                <div class="section-header">
                    <h2 class="section-title" style="color: #39FF14;"><?php esc_html_e('PRE-ROLLS', 'cannacrazy'); ?></h2>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 4rem;">
                    <!-- Preroll Greenhouse -->
                    <div class="grade-tunnel greenhouse">
                         <h3 class="grade-title" style="color: #FBFF00;"><?php esc_html_e('Greenhouse Pre-Rolls', 'cannacrazy'); ?></h3>
                         <div class="product-scroll">
                            <?php
                            $pr_green = cannacrazy_get_products_by_grade('greenhouse', 'preroll');
                            if ($pr_green->have_posts()):
                                while ($pr_green->have_posts()): $pr_green->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280;">' . esc_html__('No greenhouse pre-rolls available.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                         </div>
                    </div>

                    <!-- Preroll Grade A -->
                    <div class="grade-tunnel a">
                         <h3 class="grade-title" style="color: rgba(255, 255, 255, 0.5);"><?php esc_html_e('Grade A Pre-Rolls', 'cannacrazy'); ?></h3>
                         <div class="product-scroll">
                            <?php
                            $pr_a = cannacrazy_get_products_by_grade('a', 'preroll');
                            if ($pr_a->have_posts()):
                                while ($pr_a->have_posts()): $pr_a->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280;">' . esc_html__('No Grade A pre-rolls available.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                         </div>
                    </div>

                    <!-- Preroll Grade AA -->
                    <div class="grade-tunnel aa">
                         <h3 class="grade-title" style="color: #BC13FE;"><?php esc_html_e('Grade AA Pre-Rolls', 'cannacrazy'); ?></h3>
                         <div class="product-scroll">
                            <?php
                            $pr_aa = cannacrazy_get_products_by_grade('aa', 'preroll');
                            if ($pr_aa->have_posts()):
                                while ($pr_aa->have_posts()): $pr_aa->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280;">' . esc_html__('No Grade AA pre-rolls available.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                         </div>
                    </div>
                     
                    <!-- Preroll Grade AAA -->
                     <div class="grade-tunnel aaa">
                         <h3 class="grade-title" style="color: #39FF14;"><?php esc_html_e('Grade AAA Pre-Rolls', 'cannacrazy'); ?></h3>
                         <div class="product-scroll">
                            <?php
                            $pr_aaa = cannacrazy_get_products_by_grade('aaa', 'preroll');
                            if ($pr_aaa->have_posts()):
                                while ($pr_aaa->have_posts()): $pr_aaa->the_post();
                                    echo cannacrazy_get_product_card(get_the_ID());
                                endwhile;
                                wp_reset_postdata();
                            else:
                                echo '<p style="color: #6b7280;">' . esc_html__('No Grade AAA pre-rolls available.', 'cannacrazy') . '</p>';
                            endif;
                            ?>
                         </div>
                    </div>
                </div>
            </div>

            <!-- VAPES (Placeholder) -->
            <div>
                <div class="section-header">
                    <h2 class="section-title" style="color: #00D2FF;"><?php esc_html_e('VAPES', 'cannacrazy'); ?></h2>
                </div>
                <div class="product-scroll">
                     <?php
                     $vapes_query = cannacrazy_get_products_by_category('vape');
                     if ($vapes_query->have_posts()):
                         while ($vapes_query->have_posts()): $vapes_query->the_post();
                             echo cannacrazy_get_product_card(get_the_ID());
                         endwhile;
                         wp_reset_postdata();
                     else:
                        // Placeholder content
                        echo '<div style="padding: 2rem; border: 1px dashed #333; border-radius: 1rem; width: 100%; text-align: center; color: #666;">Coming Soon...</div>';
                     endif;
                     ?>
                </div>
            </div>

            <!-- EDIBLES (Sorted by Strength) -->
            <div>
                <div class="section-header">
                    <h2 class="section-title" style="color: #FBFF00;"><?php esc_html_e('EDIBLES', 'cannacrazy'); ?></h2>
                    <div class="section-subtitle">[ <?php esc_html_e('SORTED: MILD TO NUCLEAR', 'cannacrazy'); ?> ]</div>
                </div>
                <div class="product-scroll">
                    <?php
                    $sorted_edibles = cannacrazy_get_edibles_by_strength();
                    if (!empty($sorted_edibles)):
                        foreach ($sorted_edibles as $post):
                            setup_postdata($post);
                            echo cannacrazy_get_product_card($post->ID);
                        endforeach;
                        wp_reset_postdata();
                    else:
                        echo '<p style="color: #6b7280; padding: 2rem;">' . esc_html__('No edibles available.', 'cannacrazy') . '</p>';
                    endif;
                    ?>
                </div>
            </div>

            <!-- CBD & WELLNESS (Vault Hidden Example) -->
            <div class="<?php echo (false) ? 'hidden-feature' : ''; /* Toggle Vault here using CSS class or PHP */ ?>">
                <div class="section-header">
                    <h2 class="section-title"><?php esc_html_e('CBD & WELLNESS', 'cannacrazy'); ?></h2>
                </div>
                <div class="product-scroll">
                    <?php
                    $cbd_query = cannacrazy_get_products_by_category('cbd');
                    if ($cbd_query->have_posts()):
                        while ($cbd_query->have_posts()): $cbd_query->the_post();
                            echo cannacrazy_get_product_card(get_the_ID());
                        endwhile;
                        wp_reset_postdata();
                    else:
                        echo '<p style="color: #6b7280; padding: 2rem;">' . esc_html__('No CBD products available.', 'cannacrazy') . '</p>';
                    endif;
                    ?>
                </div>
            </div>

        </div>
    </section>

    <!-- FAQ Section -->
    <?php get_template_part('template-parts/faq'); ?>

    <!-- Testimonials -->
    <section class="testimonials-section">
        <div class="testimonials-header">
            <h2 class="testimonials-title neon-text-green"><?php esc_html_e('WHAT THE FAM SAYS', 'cannacrazy'); ?></h2>
            <p style="text-align: center; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.875rem;">
                <?php esc_html_e('Real reviews from real stoners', 'cannacrazy'); ?>
            </p>
        </div>

        <div style="position: relative;">
            <div class="testimonial-track">
                <?php
                $testimonials = array(
                    array('name' => 'Justin Smit', 'review' => 'Probably the best smoke shop I\'ve ever been to. The service is amazing, stock always unique and new and the community that has been formed by the visitors and staff is unbelievable. I wish I could give them 10 stars.', 'stars' => 5),
                    array('name' => 'Fabian Spadino', 'review' => 'One of the greatest places and most friendly people I\'ve had the pleasure of meeting. Always willing to go that extra mile.', 'stars' => 5),
                    array('name' => 'Jarrod Hager', 'review' => 'Amazing family, amazing spot for some herb', 'stars' => 5),
                    array('name' => 'William Smith', 'review' => 'Beautiful place, absolutely amazing people and vibe 💯', 'stars' => 5),
                    array('name' => 'Marna Steinhobel', 'review' => 'The best service, the best people, the best vibes. You guys are awesome!', 'stars' => 5),
                );
                // Duplicate for seamless loop
                $testimonials = array_merge($testimonials, $testimonials);
                
                foreach ($testimonials as $testimonial):
                ?>
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <?php for ($i = 0; $i < $testimonial['stars']; $i++): ?>
                            <span class="star">★</span>
                        <?php endfor; ?>
                    </div>
                    <p class="testimonial-text">"<?php echo esc_html($testimonial['review']); ?>"</p>
                    <div class="testimonial-author">— <?php echo esc_html($testimonial['name']); ?></div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <h2 class="cta-title">
            <?php esc_html_e('DON\'T BE A', 'cannacrazy'); ?><br />
            <span class="highlight"><?php esc_html_e('STRANGER', 'cannacrazy'); ?></span>
        </h2>
        <p class="cta-description">
            <?php esc_html_e('JOIN 5,000+ CANNACRAZY MEMBERS GETTING EXCLUSIVE DEALS EVERY MONTH.', 'cannacrazy'); ?>
        </p>
        <button onclick="cannaCrazyModals.openJoinModal()" class="cta-button">
            <?php esc_html_e('ENLIST', 'cannacrazy'); ?>
        </button>
        <p class="cta-disclaimer">
            <?php esc_html_e('*Must be 21+. Enjoy responsibly.', 'cannacrazy'); ?>
        </p>
    </section>

</div>

<?php
get_footer();
?>
