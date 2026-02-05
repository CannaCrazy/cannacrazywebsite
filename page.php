<?php
/**
 * The template for displaying all single pages (About, etc.)
 *
 * @package CannaCrazy
 */

get_header();
?>

<main class="site-main" style="min-height: 100vh;">
    <!-- Dynamic Hero Section (Matching Home) -->
    <section class="hero-section" style="padding-top: 15rem; padding-bottom: 5rem; text-align: center;">
        <div class="hero-content">
            <h1 class="hero-title fade-in-up" style="font-family: 'Permanent Marker', cursive; font-size: clamp(3rem, 7vw, 8rem); margin-bottom: 1rem; color: white;">
                <?php 
                // Colorize last word of title or just make it all pop
                $title = get_the_title();
                echo esc_html($title); 
                ?>
            </h1>
            
            <div class="trust-indicator fade-in-up" style="margin-top: 2rem;">
                <span class="trust-line"></span>
                <span style="color: #39FF14;">EST. 2024 • CANNACRAZY CO.</span>
                <span class="trust-line"></span>
            </div>
        </div>
    </section>

    <!-- Content Section -->
    <section class="page-content fade-in-up" style="max-width: 1024px; margin: 0 auto; padding: 0 1.5rem 8rem;">
        <div class="content-wrapper" style="background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 2rem; padding: 3rem;">
            <?php
            while (have_posts()) :
                the_post();
                
                // WP Content
                the_content();

            endwhile;
            ?>
        </div>
    </section>
</main>

<style>
/* Page Specific Overrides */
.page-content p {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.8;
    color: #e5e7eb;
}
.page-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    margin-top: 3rem;
    color: #39FF14;
}
.page-content h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    color: #BC13FE;
}
.page-content ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    list-style: disc;
}
.page-content li {
    margin-bottom: 0.5rem;
}
</style>

<?php
get_footer();
