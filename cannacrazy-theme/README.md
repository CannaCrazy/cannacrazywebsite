# CannaCrazy WordPress Theme

A custom WordPress theme for the CannaCrazy Social Club, optimized for Hostinger Business Hosting with LiteSpeed caching support.

## Features

- ✅ **Custom Post Type**: Products with full metadata (potency, effects, strength, grades)
- ✅ **Taxonomy System**: Categories (Flower, Pre-rolls, Edibles, CBD) and Grades (Greenhouse, A, AA, AAA)
- ✅ **AI Budtender**: Google Gemini-powered product recommendations grounded in your WordPress inventory
- ✅ **Cart System**: LocalStorage-based shopping cart with WhatsApp integration
- ✅ **LiteSpeed Optimized**: Cache tags, ESI blocks, lazy loading
- ✅ **API Ready**: Hooks for Dutchie/Blaze inventory integration
- ✅ **Responsive Design**: Mobile-first approach with premium aesthetics
- ✅ **SEO Optimized**: Proper meta tags, semantic HTML, structured data ready

## Installation

### Method 1: Direct Upload to Hostinger

1. **Download/ZIP the theme:**
   - Navigate to the `cannacrazy-theme` folder on your computer
   - Right-click > "Send to" > "Compressed (zipped) folder"
   - Name it `cannacrazy-theme.zip`

2. **Upload to WordPress:**
   - Log into your WordPress Admin (yourdomain.com/wp-admin)
   - Navigate to: **Appearance > Themes > Add New**
   - Click **Upload Theme**
   - Choose the `cannacrazy-theme.zip` file
   - Click **Install Now**
   - After installation completes, click **Activate**

3. **Flush Permalinks:**
   - Go to **Settings > Permalinks**
   - Click **Save Changes** (this registers the `/product/` URLs)

### Method 2: FTP/SFTP Upload

1. Connect to your Hostinger account via FTP/SFTP
2. Navigate to `/public_html/wp-content/themes/`
3. Upload the entire `cannacrazy-theme` folder
4. Activate the theme from WordPress Admin

## Initial Setup

### 1. Configure WhatsApp Number

The theme integrates with WhatsApp for cart inquiries.

1. Go to **Appearance > Customize > Contact Settings**
2. Enter your WhatsApp number with country code (e.g., `27821234567`)
3. Click **Publish**

### 2. Set Up Google Gemini API (Budtender AI)

The AI Budtender requires a Google Gemini API key.

**Option A: Via wp-config.php (Recommended)**

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Edit `wp-config.php` in your WordPress root
3. Add this line before `/* That's all, stop editing! */`:
   ```php
   define('CANNACRAZY_GEMINI_API_KEY', 'your-api-key-here');
   ```

**Option B: Via WordPress Options**

1. Add this to your theme's `functions.php` or a custom plugin:
   ```php
   update_option('cannacrazy_gemini_api_key', 'your-api-key-here');
   ```

### 3. Create Navigation Menu

1. Go to **Appearance > Menus**
2. Create a new menu called "Primary Menu"
3. Add items: Home, About Us, Shop, FAQ
4. Assign it to the **Primary Menu** location
5. Save

### 4. Add Your First Products

1. In WordPress Admin, click **Products > Add New**
2. Enter the product title (e.g., "Graffiti Glaze")
3. Write a description in the main editor
4. Set a **Featured Image** (this will be the product photo)
5. Fill in **Product Details**:
   - **Potency**: e.g., "28% THC"
   - **Strength**: Select from Mild, Medium, Heavy, Nuclear
   - **Grow Type**: Indoor, Outdoor, or Greenhouse
   - **Effects**: Comma-separated (e.g., "Relaxed, Happy, Euphoric")
   - **Accent Color**: Choose a color for the product card
   - **In Stock**: Check the box if available
6. Assign **Categories** (Flower, Pre-roll, Edible, CBD)
7. Assign **Grades** (Greenhouse, A, AA, AAA)
8. Click **Publish**

### 5. Install LiteSpeed Cache Plugin

1. Go to **Plugins > Add New**
2. Search for "LiteSpeed Cache"
3. Install and activate the plugin
4. Go to **LiteSpeed Cache > Settings**
5. Recommended settings:
   - **Cache**: Enable
   - **CSS Combine**: On
   - **JS Combine**: On
   - **Image Lazy Loading**: On
   - **Object Cache**: On (if available on Hostinger)
6. Save and **Purge All** cache

## Theme Structure

```
cannacrazy-theme/
├── style.css                 # Theme stylesheet & metadata
├── functions.php             # Core theme functions, CPT, API hooks
├── header.php                # Header template
├── footer.php                # Footer template
├── index.php                 # Homepage template
├── single-product.php        # Individual product page
├── archive-product.php       # Product category/grade archives
├── js/
│   ├── cart.js               # Shopping cart functionality
│   ├── modals.js             # Modal windows
│   ├── budtender.js          # AI Budtender
│   └── background-effects.js # Visual effects
├── template-parts/
│   └── faq.php               # FAQ section
├── images/                   # Theme images
└── README.md                 # This file
```

## API Integration (Dutchie/Blaze)

The theme is prepared for external inventory API integration. Use these hooks in a custom plugin:

### Get Inventory Stock

```php
add_filter('cannacrazy_get_inventory_stock', 'my_dutchie_stock_check', 10, 3);
function my_dutchie_stock_check($in_stock, $post_id, $external_id) {
    if (empty($external_id)) return $in_stock;
    
    // Call Dutchie API
    $api_stock = my_dutchie_api_call($external_id);
    
    return $api_stock['inStock'] ? '1' : '0';
}
```

### Sync Product Data

```php
add_action('cannacrazy_sync_product_data', 'my_dutchie_sync');
function my_dutchie_sync() {
    // Fetch products from Dutchie
    $dutchie_products = my_dutchie_fetch_all();
    
    foreach ($dutchie_products as $product) {
        // Update WordPress products
        // ...
    }
}
```

### Modify Product Display

```php
add_filter('cannacrazy_before_product_display', 'my_custom_product_data', 10, 2);
function my_custom_product_data($product_data, $post_id) {
    // Inject real-time pricing from external API
    $product_data['price'] = my_api_get_price($post_id);
    
    return $product_data;
}
```

## Customization

### Change Colors

Edit `style.css` and search for:
- `#39FF14` - Neon Green (primary)
- `#BC13FE` - Purple (secondary)
- `#FBFF00` - Yellow (accent)
- `#00D2FF` - Blue (specialty)

### Add Custom Pages

Create a new PHP file in the theme root:
- `page-contact.php` - Custom contact page
- `page-events.php` - Events page

WordPress will automatically use these templates when you create pages with matching slugs.

### Modify Product Card Layout

Edit the `cannacrazy_get_product_card()` function in `functions.php`.

## Troubleshooting

### Products Not Showing

1. Go to **Settings > Permalinks**
2. Click **Save Changes** to flush rewrite rules
3. Clear LiteSpeed Cache

### Budtender AI Not Working

1. Verify API key is set correctly
2. Check browser console for JavaScript errors
3. Test the REST API endpoint directly: `/wp-json/cannacrazy/v1/products`

### Cart Not Persisting

- Check browser localStorage permissions
- Ensure JavaScript is not being blocked

### Images Not Loading

- Regenerate thumbnails with the "Regenerate Thumbnails" plugin
- Check file permissions on `/wp-content/uploads/`

## Performance Optimization

### For Hostinger LiteSpeed:

1. **Enable ESI**: In LiteSpeed Cache settings
2. **Use WebP Images**: Install "WebP Converter" plugin
3. **Minify Assets**: Enable CSS/JS combine in LiteSpeed Cache
4. **Database Optimization**: Install "WP-Optimize" plugin
5. **CDN**: Consider Cloudflare for global delivery

### Expected Performance:

- **PageSpeed Score**: 85-95+
- **Time to First Byte**: < 500ms
- **Fully Loaded**: < 2s

## Support & Development

### File Structure for GitHub

This theme is organized in a single folder for easy repository management:

```bash
git init
git add .
git commit -m "Initial commit: CannaCrazy WordPress theme"
git remote add origin your-github-repo-url
git push -u origin main
```

### Future Enhancements

- [ ] WooCommerce integration for full e-commerce
- [ ] Member login system
- [ ] Events calendar
- [ ] Loyalty points system
- [ ] Multi-language support (WPML)

## Credits

- **Design**: Based on CannaCrazy brand identity
- **Fonts**: Permanent Marker, Inter (Google Fonts)
- **Animations**: Custom CSS with GPU acceleration
- **AI**: Google Gemini API

## License

This theme is proprietary and licensed for use by CannaCrazy Social Club only.

---

**Version**: 1.0.0  
**Requires WordPress**: 5.8+  
**Requires PHP**: 7.4+  
**Tested up to**: WordPress 6.4  
**Author**: CannaCrazy Development Team
