<?php
/**
 * The template for displaying all single pages
 *
 * @package CannaCrazy
 */

get_header();
?>

<div class="relative z-10 min-h-screen text-white pt-32 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
        <?php
        while (have_posts()) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header mb-8 text-center">
                    <?php the_title('<h1 class="entry-title text-5xl md:text-7xl font-[Permanent Marker] text-[#39FF14] mb-4">', '</h1>'); ?>
                </header>

                <div class="entry-content prose prose-invert prose-lg max-w-none">
                    <?php
                    the_content();

                    wp_link_pages(
                        array(
                            'before' => '<div class="page-links">' . esc_html__('Pages:', 'cannacrazy'),
                            'after'  => '</div>',
                        )
                    );
                    ?>
                </div>
            </article>
            <?php
        endwhile; // End of the loop.
        ?>
    </div>
</div>

<?php
get_footer();
