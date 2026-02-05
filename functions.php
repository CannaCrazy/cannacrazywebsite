<?php
/**
 * CannaCrazy Theme Functions
 * 
 * @package CannaCrazy
 * @version 1.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * ===========================
 * THEME SETUP
 * ===========================
 */
function cannacrazy_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'cannacrazy'),
    ));
    
    // Set image sizes for products
    add_image_size('product-thumbnail', 350, 250, true);
    add_image_size('product-large', 800, 600, true);
}
add_action('after_setup_theme', 'cannacrazy_theme_setup');

/**
 * ===========================
 * ENQUEUE STYLES & SCRIPTS
 * ===========================
 */
function cannacrazy_enqueue_assets() {
    // Google Fonts
    wp_enqueue_style('cannacrazy-fonts', 'https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;700&family=Permanent+Marker&display=swap', array(), null);
    
    // Theme stylesheet
    wp_enqueue_style('cannacrazy-style', get_stylesheet_uri(), array(), '1.1.0');
    
    // Concatenated Main JavaScript
    wp_enqueue_script('cannacrazy-main', get_template_directory_uri() . '/js/main.js', array(), '1.1.0', true);
    
    // Localize script for AJAX & Settings
    wp_localize_script('cannacrazy-main', 'cannaCrazyAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('cannacrazy_nonce'),
    ));
    
    wp_localize_script('cannacrazy-main', 'cannaCrazyBudtender', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('cannacrazy_budtender_nonce'),
        'restUrl' => rest_url('cannacrazy/v1/'),
    ));
}
add_action('wp_enqueue_scripts', 'cannacrazy_enqueue_assets');

/**
 * ===========================
 * CUSTOM POST TYPE: PRODUCTS
 * ===========================
 */
function cannacrazy_register_products_cpt() {
    $labels = array(
        'name'                  => _x('Products', 'Post type general name', 'cannacrazy'),
        'singular_name'         => _x('Product', 'Post type singular name', 'cannacrazy'),
        'menu_name'             => _x('Products', 'Admin Menu text', 'cannacrazy'),
        'name_admin_bar'        => _x('Product', 'Add New on Toolbar', 'cannacrazy'),
        'add_new'               => __('Add New', 'cannacrazy'),
        'add_new_item'          => __('Add New Product', 'cannacrazy'),
        'new_item'              => __('New Product', 'cannacrazy'),
        'edit_item'             => __('Edit Product', 'cannacrazy'),
        'view_item'             => __('View Product', 'cannacrazy'),
        'all_items'             => __('All Products', 'cannacrazy'),
        'search_items'          => __('Search Products', 'cannacrazy'),
        'parent_item_colon'     => __('Parent Products:', 'cannacrazy'),
        'not_found'             => __('No products found.', 'cannacrazy'),
        'not_found_in_trash'    => __('No products found in Trash.', 'cannacrazy'),
        'featured_image'        => _x('Product Image', 'Overrides the "Featured Image" phrase', 'cannacrazy'),
        'set_featured_image'    => _x('Set product image', 'Overrides the "Set featured image" phrase', 'cannacrazy'),
        'remove_featured_image' => _x('Remove product image', 'Overrides the "Remove featured image" phrase', 'cannacrazy'),
        'use_featured_image'    => _x('Use as product image', 'Overrides the "Use as featured image" phrase', 'cannacrazy'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'product'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-cart',
        'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest'       => true, // Enable REST API for Gutenberg & external APIs
    );

    register_post_type('product', $args);
}
add_action('init', 'cannacrazy_register_products_cpt');

/**
 * ===========================
 * TAXONOMIES
 * ===========================
 */
function cannacrazy_register_taxonomies() {
    // Product Category (Flower, Pre-rolls, Edibles, CBD)
    $category_labels = array(
        'name'              => _x('Product Categories', 'taxonomy general name', 'cannacrazy'),
        'singular_name'     => _x('Category', 'taxonomy singular name', 'cannacrazy'),
        'search_items'      => __('Search Categories', 'cannacrazy'),
        'all_items'         => __('All Categories', 'cannacrazy'),
        'edit_item'         => __('Edit Category', 'cannacrazy'),
        'update_item'       => __('Update Category', 'cannacrazy'),
        'add_new_item'      => __('Add New Category', 'cannacrazy'),
        'new_item_name'     => __('New Category Name', 'cannacrazy'),
        'menu_name'         => __('Categories', 'cannacrazy'),
    );

    register_taxonomy('product_category', array('product'), array(
        'hierarchical'      => true,
        'labels'            => $category_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'category'),
        'show_in_rest'      => true,
    ));

    // Product Grade (Greenhouse, A, AA, AAA)
    $grade_labels = array(
        'name'              => _x('Product Grades', 'taxonomy general name', 'cannacrazy'),
        'singular_name'     => _x('Grade', 'taxonomy singular name', 'cannacrazy'),
        'search_items'      => __('Search Grades', 'cannacrazy'),
        'all_items'         => __('All Grades', 'cannacrazy'),
        'edit_item'         => __('Edit Grade', 'cannacrazy'),
        'update_item'       => __('Update Grade', 'cannacrazy'),
        'add_new_item'      => __('Add New Grade', 'cannacrazy'),
        'new_item_name'     => __('New Grade Name', 'cannacrazy'),
        'menu_name'         => __('Grades', 'cannacrazy'),
    );

    register_taxonomy('product_grade', array('product'), array(
        'hierarchical'      => true,
        'labels'            => $grade_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'grade'),
        'show_in_rest'      => true,
    ));
}
add_action('init', 'cannacrazy_register_taxonomies');

/**
 * ===========================
 * CUSTOM FIELDS (META BOXES)
 * ===========================
 */
function cannacrazy_add_product_meta_boxes() {
    add_meta_box(
        'product_details',
        __('Product Details', 'cannacrazy'),
        'cannacrazy_product_details_callback',
        'product',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'cannacrazy_add_product_meta_boxes');

function cannacrazy_product_details_callback($post) {
    wp_nonce_field('cannacrazy_save_product_details', 'cannacrazy_product_details_nonce');
    
    $potency = get_post_meta($post->ID, '_product_potency', true);
    $strength = get_post_meta($post->ID, '_product_strength', true);
    $grow_type = get_post_meta($post->ID, '_product_grow_type', true);
    $effects = get_post_meta($post->ID, '_product_effects', true);
    $color = get_post_meta($post->ID, '_product_color', true);
    $price = get_post_meta($post->ID, '_product_price', true);
    $in_stock = get_post_meta($post->ID, '_product_in_stock', true);
    $external_id = get_post_meta($post->ID, '_product_external_id', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="product_potency"><?php _e('Potency', 'cannacrazy'); ?></label></th>
            <td>
                <input type="text" id="product_potency" name="product_potency" value="<?php echo esc_attr($potency); ?>" class="regular-text" placeholder="e.g., 28% THC or 10mg/pc" />
                <p class="description"><?php _e('THC/CBD percentage or dosage', 'cannacrazy'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="product_strength"><?php _e('Strength', 'cannacrazy'); ?></label></th>
            <td>
                <select id="product_strength" name="product_strength">
                    <option value=""><?php _e('Select Strength', 'cannacrazy'); ?></option>
                    <option value="Mild" <?php selected($strength, 'Mild'); ?>><?php _e('Mild', 'cannacrazy'); ?></option>
                    <option value="Medium" <?php selected($strength, 'Medium'); ?>><?php _e('Medium', 'cannacrazy'); ?></option>
                    <option value="Heavy" <?php selected($strength, 'Heavy'); ?>><?php _e('Heavy', 'cannacrazy'); ?></option>
                    <option value="Nuclear" <?php selected($strength, 'Nuclear'); ?>><?php _e('Nuclear', 'cannacrazy'); ?></option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="product_grow_type"><?php _e('Grow Type', 'cannacrazy'); ?></label></th>
            <td>
                <select id="product_grow_type" name="product_grow_type">
                    <option value=""><?php _e('Select Grow Type', 'cannacrazy'); ?></option>
                    <option value="Indoor" <?php selected($grow_type, 'Indoor'); ?>><?php _e('Indoor', 'cannacrazy'); ?></option>
                    <option value="Outdoor" <?php selected($grow_type, 'Outdoor'); ?>><?php _e('Outdoor', 'cannacrazy'); ?></option>
                    <option value="Greenhouse" <?php selected($grow_type, 'Greenhouse'); ?>><?php _e('Greenhouse', 'cannacrazy'); ?></option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="product_effects"><?php _e('Effects', 'cannacrazy'); ?></label></th>
            <td>
                <input type="text" id="product_effects" name="product_effects" value="<?php echo esc_attr($effects); ?>" class="regular-text" placeholder="e.g., Relaxed, Happy, Creative" />
                <p class="description"><?php _e('Comma-separated effects (e.g., Relaxed, Happy, Euphoric)', 'cannacrazy'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="product_color"><?php _e('Accent Color', 'cannacrazy'); ?></label></th>
            <td>
                <input type="color" id="product_color" name="product_color" value="<?php echo esc_attr($color ? $color : '#39FF14'); ?>" />
                <p class="description"><?php _e('Color for styling product card', 'cannacrazy'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="product_price"><?php _e('Price (optional)', 'cannacrazy'); ?></label></th>
            <td>
                <input type="text" id="product_price" name="product_price" value="<?php echo esc_attr($price); ?>" class="regular-text" placeholder="e.g., R250" />
                <p class="description"><?php _e('Display price (informational only)', 'cannacrazy'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="product_in_stock"><?php _e('In Stock', 'cannacrazy'); ?></label></th>
            <td>
                <input type="checkbox" id="product_in_stock" name="product_in_stock" value="1" <?php checked($in_stock, '1'); ?> />
                <label for="product_in_stock"><?php _e('Product is currently in stock', 'cannacrazy'); ?></label>
            </td>
        </tr>
        <tr>
            <th><label for="product_external_id"><?php _e('External API ID', 'cannacrazy'); ?></label></th>
            <td>
                <input type="text" id="product_external_id" name="product_external_id" value="<?php echo esc_attr($external_id); ?>" class="regular-text" placeholder="e.g., dutchie_12345" />
                <p class="description"><?php _e('ID for syncing with external inventory APIs (Dutchie, Blaze, etc.)', 'cannacrazy'); ?></p>
            </td>
        </tr>
    </table>
    <?php
}

function cannacrazy_save_product_details($post_id) {
    if (!isset($_POST['cannacrazy_product_details_nonce'])) {
        return;
    }
    if (!wp_verify_nonce($_POST['cannacrazy_product_details_nonce'], 'cannacrazy_save_product_details')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = array('product_potency', 'product_strength', 'product_grow_type', 'product_effects', 'product_color', 'product_price', 'product_external_id');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
    
    // Handle checkbox
    $in_stock = isset($_POST['product_in_stock']) ? '1' : '0';
    update_post_meta($post_id, '_product_in_stock', $in_stock);
}
add_action('save_post_product', 'cannacrazy_save_product_details');

/**
 * ===========================
 * LITESPEED CACHE OPTIMIZATION
 * ===========================
 */

// Add LiteSpeed Cache tags for products
function cannacrazy_litespeed_cache_tags() {
    if (!function_exists('litespeed_tag_add')) {
        return;
    }
    
    if (is_singular('product')) {
        litespeed_tag_add('product_' . get_the_ID());
    }
    
    if (is_post_type_archive('product') || is_tax(array('product_category', 'product_grade'))) {
        litespeed_tag_add('product_archive');
    }
}
add_action('wp', 'cannacrazy_litespeed_cache_tags');

// Purge cache when product is updated
function cannacrazy_purge_product_cache($post_id) {
    if (get_post_type($post_id) !== 'product') {
        return;
    }
    
    if (function_exists('litespeed_purge_single_post')) {
        litespeed_purge_single_post($post_id);
    }
}
add_action('save_post', 'cannacrazy_purge_product_cache');

/**
 * ===========================
 * OPTIMIZED PRODUCT QUERIES
 * ===========================
 */

// Get products by grade and optional category
function cannacrazy_get_products_by_grade($grade_slug, $category_slug = '', $limit = -1) {
    $tax_query = array(
        'relation' => 'AND',
        array(
            'taxonomy' => 'product_grade',
            'field'    => 'slug',
            'terms'    => $grade_slug,
        ),
    );

    if (!empty($category_slug)) {
        $tax_query[] = array(
            'taxonomy' => 'product_category',
            'field'    => 'slug',
            'terms'    => $category_slug,
        );
    }

    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => $limit,
        'tax_query'      => $tax_query,
        'meta_query'     => array(
            array(
                'key'     => '_product_in_stock',
                'value'   => '1',
                'compare' => '=',
            ),
        ),
        'orderby'        => 'menu_order title',
        'order'          => 'ASC',
    );
    
    // Allow filtering for API integration
    $args = apply_filters('cannacrazy_product_query_args', $args, $grade_slug);
    
    return new WP_Query($args);
}

// Get products ordered by custom strength order
function cannacrazy_get_edibles_by_strength($limit = -1) {
    // We want to fetch all edibles and verify their strength manually or via meta query
    // But since we can't easily sort by custom string values in SQL ('Mild' < 'Medium'),
    // We will do a meta key query and sort in PHP? Or just fetch specific strengths in order?
    // Fetching in order of strength groups is safer for display.
    
    // Let's return an array of queries or products? 
    // The user wants "Order them visually". A single grid sorted?
    // Let's try to get all and sort.
    
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => $limit,
        'tax_query'      => array(
            array(
                'taxonomy' => 'product_category',
                'field'    => 'slug',
                'terms'    => 'edible',
            ),
        ),
        'meta_query'     => array(
            array(
                'key'     => '_product_in_stock',
                'value'   => '1',
                'compare' => '=',
            ),
        ),
    );
    
    $query = new WP_Query($args);
    $products = $query->posts;
    
    // Define strength order
    $strength_order = array('Mild' => 1, 'Medium' => 2, 'Heavy' => 3, 'Nuclear' => 4);
    
    usort($products, function($a, $b) use ($strength_order) {
        $s1 = get_post_meta($a->ID, '_product_strength', true);
        $s2 = get_post_meta($b->ID, '_product_strength', true);
        
        $o1 = isset($strength_order[$s1]) ? $strength_order[$s1] : 99;
        $o2 = isset($strength_order[$s2]) ? $strength_order[$s2] : 99;
        
        return $o1 - $o2;
    });
    
    return $products; // Returns array of post objects, not WP_Query
}

// Get pinned/speciality products
function cannacrazy_get_speciality_products($limit = -1) {
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => $limit,
        'meta_query'     => array(
            'relation' => 'AND',
            array(
                'key'     => '_product_in_stock',
                'value'   => '1',
                'compare' => '=',
            ),
            array(
                'key'     => '_is_pinned',
                'value'   => '1',
                'compare' => '=',
            )
        ),
    );
    return new WP_Query($args);
}

// Get products by category
function cannacrazy_get_products_by_category($category_slug, $limit = -1) {
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => $limit,
        'tax_query'      => array(
            array(
                'taxonomy' => 'product_category',
                'field'    => 'slug',
                'terms'    => $category_slug,
            ),
        ),
        'meta_query'     => array(
            array(
                'key'     => '_product_in_stock',
                'value'   => '1',
                'compare' => '=',
            ),
        ),
        'orderby'        => 'menu_order title',
        'order'          => 'ASC',
    );
    
    return new WP_Query($args);
}

/**
 * ===========================
 * API INTEGRATION HOOKS
 * ===========================
 */

/**
 * Filter: Modify product data before display
 * Use this to inject real-time inventory from external APIs
 * 
 * @param array $product_data Product information
 * @param int $post_id Product post ID
 * @return array Modified product data
 */
function cannacrazy_filter_product_data($product_data, $post_id) {
    return apply_filters('cannacrazy_before_product_display', $product_data, $post_id);
}

/**
 * Action: Sync product inventory with external API
 * Hook into this to sync with Dutchie, Blaze, etc.
 * 
 * Example usage:
 * add_action('cannacrazy_sync_inventory', 'my_dutchie_sync_function');
 */
function cannacrazy_maybe_sync_inventory() {
    do_action('cannacrazy_sync_product_data');
}
add_action('init', 'cannacrazy_maybe_sync_inventory');

/**
 * Filter: Get inventory stock from external API
 * 
 * @param bool $in_stock WordPress stored value
 * @param int $post_id Product post ID
 * @param string $external_id External API ID
 * @return bool Stock status
 */
function cannacrazy_get_product_stock($post_id) {
    $in_stock = get_post_meta($post_id, '_product_in_stock', true);
    $external_id = get_post_meta($post_id, '_product_external_id', true);
    
    // Allow external APIs to override stock status
    return apply_filters('cannacrazy_get_inventory_stock', $in_stock, $post_id, $external_id);
}

/**
 * ===========================
 * REST API FOR BUDTENDER AI
 * ===========================
 */

// Register REST API endpoints
function cannacrazy_register_rest_routes() {
    register_rest_route('cannacrazy/v1', '/products', array(
        'methods'  => 'GET',
        'callback' => 'cannacrazy_rest_get_all_products',
        'permission_callback' => '__return_true',
    ));
    
    register_rest_route('cannacrazy/v1', '/budtender', array(
        'methods'  => 'POST',
        'callback' => 'cannacrazy_rest_budtender_recommend',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'cannacrazy_register_rest_routes');

// REST: Get all products (for Budtender AI)
function cannacrazy_rest_get_all_products($request) {
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'meta_query'     => array(
            array(
                'key'     => '_product_in_stock',
                'value'   => '1',
                'compare' => '=',
            ),
        ),
    );
    
    $query = new WP_Query($args);
    $products = array();
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            
            $effects = get_post_meta($post_id, '_product_effects', true);
            $effects_array = $effects ? array_map('trim', explode(',', $effects)) : array();
            
            $categories = wp_get_post_terms($post_id, 'product_category', array('fields' => 'names'));
            $grades = wp_get_post_terms($post_id, 'product_grade', array('fields' => 'names'));
            
            $products[] = array(
                'id'          => $post_id,
                'title'       => get_the_title(),
                'description' => get_the_excerpt(),
                'potency'     => get_post_meta($post_id, '_product_potency', true),
                'strength'    => get_post_meta($post_id, '_product_strength', true),
                'grow_type'   => get_post_meta($post_id, '_product_grow_type', true),
                'effects'     => $effects_array,
                'category'    => !empty($categories) ? $categories[0] : '',
                'grade'       => !empty($grades) ? $grades[0] : '',
                'color'       => get_post_meta($post_id, '_product_color', true),
                'image'       => get_the_post_thumbnail_url($post_id, 'product-thumbnail'),
            );
        }
        wp_reset_postdata();
    }
    
    return rest_ensure_response($products);
}

// REST: Budtender AI recommendation endpoint
function cannacrazy_rest_budtender_recommend($request) {
    $params = $request->get_json_params();
    $user_message = isset($params['message']) ? sanitize_text_field($params['message']) : '';
    
    if (empty($user_message)) {
        return new WP_Error('no_message', 'Message is required', array('status' => 400));
    }
    
    // Get Google Gemini API key from options or wp-config
    $api_key = defined('CANNACRAZY_GEMINI_API_KEY') ? CANNACRAZY_GEMINI_API_KEY : get_option('cannacrazy_gemini_api_key');
    
    if (empty($api_key)) {
        return new WP_Error('no_api_key', 'Google Gemini API key not configured', array('status' => 500));
    }
    
    // Get all available products
    $products_response = cannacrazy_rest_get_all_products($request);
    $products = $products_response->get_data();
    
    // Build context for AI
    $products_context = "Here are the products currently in stock:\n\n";
    foreach ($products as $product) {
        $products_context .= sprintf(
            "- %s (%s, %s): %s. Potency: %s, Strength: %s, Effects: %s\n",
            $product['title'],
            $product['category'],
            $product['grade'],
            $product['description'],
            $product['potency'],
            $product['strength'],
            implode(', ', $product['effects'])
        );
    }
    
    // Call Google Gemini API
    $prompt = "You are a helpful cannabis budtender at CannaCrazy. Based on what the customer wants, recommend products from our current inventory. Only recommend products that are listed below.\n\n" . $products_context . "\n\nCustomer request: " . $user_message . "\n\nProvide a friendly, concise recommendation with 1-3 product suggestions.";
    
    $response = wp_remote_post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' . $api_key, array(
        'headers' => array('Content-Type' => 'application/json'),
        'body'    => json_encode(array(
            'contents' => array(
                array('parts' => array(array('text' => $prompt)))
            )
        )),
        'timeout' => 30,
    ));
    
    if (is_wp_error($response)) {
        return new WP_Error('api_error', $response->get_error_message(), array('status' => 500));
    }
    
    $body = json_decode(wp_remote_retrieve_body($response), true);
    
    if (isset($body['candidates'][0]['content']['parts'][0]['text'])) {
        $recommendation = $body['candidates'][0]['content']['parts'][0]['text'];
        
        return rest_ensure_response(array(
            'success' => true,
            'recommendation' => $recommendation,
        ));
    }
    
    return new WP_Error('no_response', 'Failed to get AI recommendation', array('status' => 500));
}

/**
 * ===========================
 * WHATSAPP INTEGRATION
 * ===========================
 */

// Add WhatsApp number to theme customizer
function cannacrazy_customize_register($wp_customize) {
    $wp_customize->add_section('cannacrazy_contact', array(
        'title'    => __('Contact Settings', 'cannacrazy'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('cannacrazy_whatsapp', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('cannacrazy_whatsapp', array(
        'label'    => __('WhatsApp Number', 'cannacrazy'),
        'section'  => 'cannacrazy_contact',
        'type'     => 'text',
        'description' => __('Enter WhatsApp number with country code (e.g., 27821234567)', 'cannacrazy'),
    ));
}
add_action('customize_register', 'cannacrazy_customize_register');

// Get WhatsApp link for cart
function cannacrazy_get_whatsapp_link($cart_items = array()) {
    $whatsapp_number = get_theme_mod('cannacrazy_whatsapp', '');
    
    if (empty($whatsapp_number)) {
        return '#';
    }
    
    $message = "Hi! I'm interested in the following products from CannaCrazy:\n\n";
    
    if (!empty($cart_items)) {
        foreach ($cart_items as $item) {
            $message .= "- " . $item['title'] . " (x" . $item['quantity'] . ")\n";
        }
    }
    
    $message .= "\nCan you please provide more information?";
    
    return 'https://wa.me/' . $whatsapp_number . '?text=' . urlencode($message);
}

/**
 * ===========================
 * UTILITY FUNCTIONS
 * ===========================
 */

// Get product card HTML
function cannacrazy_get_product_card($post_id) {
    $title = get_the_title($post_id);
    $description = get_the_excerpt();
    $image = get_the_post_thumbnail_url($post_id, 'product-thumbnail');
    $potency = get_post_meta($post_id, '_product_potency', true);
    $strength = get_post_meta($post_id, '_product_strength', true);
    $grow_type = get_post_meta($post_id, '_product_grow_type', true);
    $effects = get_post_meta($post_id, '_product_effects', true);
    $color = get_post_meta($post_id, '_product_color', true);
    
    $effects_array = $effects ? array_map('trim', explode(',', $effects)) : array();
    
    $product_data = array(
        'id' => $post_id,
        'title' => $title,
        'description' => $description,
        'image' => $image,
        'potency' => $potency,
        'strength' => $strength,
        'growType' => $grow_type,
        'effects' => $effects_array,
        'color' => $color ? $color : '#39FF14',
    );
    
    // Allow modification via filter
    $product_data = apply_filters('cannacrazy_before_product_display', $product_data, $post_id);
    
    ob_start();
    ?>
    <div class="product-card" data-product='<?php echo esc_attr(json_encode($product_data)); ?>'>
        <?php if ($image): ?>
            <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($title); ?>" class="product-image" loading="lazy">
        <?php endif; ?>
        <div class="product-info">
            <h3 class="product-title"><?php echo esc_html($title); ?></h3>
            <div class="product-meta">
                <?php if ($potency): ?>
                    <span class="product-tag"><?php echo esc_html($potency); ?></span>
                <?php endif; ?>
                <?php if ($grow_type): ?>
                    <span class="product-tag"><?php echo esc_html($grow_type); ?></span>
                <?php endif; ?>
            </div>
            <?php if ($description): ?>
                <p class="product-description"><?php echo esc_html($description); ?></p>
            <?php endif; ?>
            <?php if (!empty($effects_array)): ?>
                <div class="product-effects">
                    <?php foreach ($effects_array as $effect): ?>
                        <span class="effect-tag"><?php echo esc_html($effect); ?></span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <button class="add-to-cart-btn" onclick="cannaCrazyCart.addToCart(<?php echo esc_attr(json_encode($product_data)); ?>)">
                Add to Cart
            </button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// Flush rewrite rules on theme activation
function cannacrazy_rewrite_flush() {
    cannacrazy_register_products_cpt();
    cannacrazy_register_taxonomies();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'cannacrazy_rewrite_flush');
