<?php
/**
 * WordPress CPT Registration for Solutions & Tools
 * Add this code to your child theme's functions.php file (wp-content/themes/hello-elementor-child/functions.php)
 * on your CPanal WordPress installation
 */

// Register Solutions Custom Post Type
function register_solutions_post_type() {
    $args = array(
        'labels' => array(
            'name' => 'Solutions',
            'singular_name' => 'Solution',
            'add_new' => 'Add New Solution',
            'add_new_item' => 'Add New Solution',
            'edit_item' => 'Edit Solution',
            'view_item' => 'View Solution',
            'all_items' => 'All Solutions',
            'search_items' => 'Search Solutions'
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'rest_base' => 'solutions',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-lightbulb',
        'capability_type' => 'post',
        'has_archive' => true,
        'rewrite' => array('slug' => 'solutions'),
    );
    register_post_type('solution', $args);
}
add_action('init', 'register_solutions_post_type');

// Register Tools Custom Post Type
function register_tools_post_type() {
    $args = array(
        'labels' => array(
            'name' => 'Tools',
            'singular_name' => 'Tool',
            'add_new' => 'Add New Tool',
            'add_new_item' => 'Add New Tool',
            'edit_item' => 'Edit Tool',
            'view_item' => 'View Tool',
            'all_items' => 'All Tools',
            'search_items' => 'Search Tools'
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'rest_base' => 'tools',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-admin-tools',
        'capability_type' => 'post',
        'has_archive' => true,
        'rewrite' => array('slug' => 'tools'),
    );
    register_post_type('tool', $args);
}
add_action('init', 'register_tools_post_type');

// Flush rewrite rules when plugin is activated (do this once after adding the code)
function flush_cpt_rewrite_rules() {
    register_solutions_post_type();
    register_tools_post_type();
    flush_rewrite_rules();
}
// Uncomment below and visit your WordPress admin once, then comment it out again
// add_action('admin_init', 'flush_cpt_rewrite_rules');

// Enable REST API for Solutions & Tools - Add featured images
function add_solutions_tools_to_rest() {
    $post_types = array('solution', 'tool');

    foreach ($post_types as $post_type) {
        register_rest_field($post_type,
            'featured_image_url',
            array(
                'get_callback' => function($post) {
                    $thumbnail_id = get_post_thumbnail_id($post['id']);
                    if ($thumbnail_id) {
                        return wp_get_attachment_image_url($thumbnail_id, 'full');
                    }
                    return null;
                },
                'schema' => null,
            )
        );
    }
}
add_action('rest_api_init', 'add_solutions_tools_to_rest');

// Add custom meta boxes for Solutions & Tools
add_action('add_meta_boxes', 'uae_add_solution_tool_meta_boxes');

function uae_add_solution_tool_meta_boxes() {
    // Solutions meta boxes
    add_meta_box(
        'solution_details_box',
        'Solution Details',
        'uae_solution_details_callback',
        'solution',
        'normal',
        'high'
    );

    // Tools meta boxes
    add_meta_box(
        'tool_details_box',
        'Tool Details',
        'uae_tool_details_callback',
        'tool',
        'normal',
        'high'
    );
}

// Solutions Meta Box Callback
function uae_solution_details_callback($post) {
    $problem_statement = get_post_meta($post->ID, '_solution_problem', true);
    $benefits = get_post_meta($post->ID, '_solution_benefits', true);
    $cta_text = get_post_meta($post->ID, '_solution_cta', true);

    ?>
    <div style="padding: 10px; background: #f9f9f9; border-left: 4px solid #0073aa; margin-bottom: 20px;">
        <h4>Problem Statement Format:</h4>
        <p>Enter a clear statement of the problem this solution solves</p>
    </div>

    <label style="display: block; margin-bottom: 10px;"><strong>Problem Statement:</strong></label>
    <textarea name="solution_problem" rows="4" style="width: 100%; margin-bottom: 20px;"><?php echo esc_textarea($problem_statement); ?></textarea>

    <label style="display: block; margin-bottom: 10px;"><strong>Key Benefits (one per line):</strong></label>
    <textarea name="solution_benefits" rows="6" style="width: 100%; margin-bottom: 20px; font-family: monospace;"><?php echo esc_textarea($benefits); ?></textarea>
    <p style="font-size: 12px; color: #666;">Example: Reduce processing time by 80% | Improve accuracy | Scale operations</p>

    <label style="display: block; margin-bottom: 10px;"><strong>CTA Button Text:</strong></label>
    <input type="text" name="solution_cta" value="<?php echo esc_attr($cta_text); ?>" style="width: 100%; padding: 8px;" placeholder="e.g., Learn More, Get Started, Schedule Demo" />
    <?php
}

// Tools Meta Box Callback
function uae_tool_details_callback($post) {
    $key_features = get_post_meta($post->ID, '_tool_features', true);
    $integrations = get_post_meta($post->ID, '_tool_integrations', true);
    $pricing = get_post_meta($post->ID, '_tool_pricing', true);

    ?>
    <div style="padding: 10px; background: #f9f9f9; border-left: 4px solid #0073aa; margin-bottom: 20px;">
        <h4>Tool Format:</h4>
        <p>Provide key features, integrations, and pricing information</p>
    </div>

    <label style="display: block; margin-bottom: 10px;"><strong>Key Features (one per line):</strong></label>
    <textarea name="tool_features" rows="6" style="width: 100%; margin-bottom: 20px; font-family: monospace;"><?php echo esc_textarea($key_features); ?></textarea>

    <label style="display: block; margin-bottom: 10px;"><strong>Integrations (comma-separated):</strong></label>
    <input type="text" name="tool_integrations" value="<?php echo esc_attr($integrations); ?>" style="width: 100%; padding: 8px; margin-bottom: 20px;" placeholder="e.g., Stripe, PayPal, Zapier" />

    <label style="display: block; margin-bottom: 10px;"><strong>Pricing Model:</strong></label>
    <input type="text" name="tool_pricing" value="<?php echo esc_attr($pricing); ?>" style="width: 100%; padding: 8px;" placeholder="e.g., Free + Premium, Usage-based" />
    <?php
}

// Save the meta box data
add_action('save_post', 'uae_save_solution_tool_meta');

function uae_save_solution_tool_meta($post_id) {
    // Check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save Solutions data
    if (isset($_POST['solution_problem'])) {
        update_post_meta($post_id, '_solution_problem', sanitize_textarea_field($_POST['solution_problem']));
    }
    if (isset($_POST['solution_benefits'])) {
        update_post_meta($post_id, '_solution_benefits', sanitize_textarea_field($_POST['solution_benefits']));
    }
    if (isset($_POST['solution_cta'])) {
        update_post_meta($post_id, '_solution_cta', sanitize_text_field($_POST['solution_cta']));
    }

    // Save Tools data
    if (isset($_POST['tool_features'])) {
        update_post_meta($post_id, '_tool_features', sanitize_textarea_field($_POST['tool_features']));
    }
    if (isset($_POST['tool_integrations'])) {
        update_post_meta($post_id, '_tool_integrations', sanitize_text_field($_POST['tool_integrations']));
    }
    if (isset($_POST['tool_pricing'])) {
        update_post_meta($post_id, '_tool_pricing', sanitize_text_field($_POST['tool_pricing']));
    }
}
