<?php
/**
 * CORRECTED Custom Fields for Solutions & Tools CPTs
 *
 * This REPLACES the meta box section from wordpress-cpt-code.php
 * (everything from "// Add custom meta boxes" onward).
 *
 * Why: the field names used before (_solution_problem, _tool_features, etc.)
 * do not match what the Next.js frontend actually reads. The frontend expects
 * these exact field names at the ROOT of the REST API response:
 *
 * Solution: pain_point_name, pain_point_subtitle, problem_description,
 *           solution_overview, key_benefits, cta_button_text, time_saved,
 *           revenue_increase, cost_reduction, pricing_range, implementation_time
 *
 * Tool:     tool_tagline, tool_type, technology_stack, demo_available,
 *           demo_link, support_included, tool_features, pricing_model,
 *           base_price, setup_fee, monthly_fee, setup_time
 *
 * KEEP the CPT registration code (register_solutions_post_type,
 * register_tools_post_type, add_solutions_tools_to_rest) from
 * wordpress-cpt-code.php as-is — that part already works.
 */

// ============================================================
// Field definitions
// ============================================================

function uae_get_solution_fields() {
    return array(
        'pain_point_name'     => 'Pain Point Name (short, defaults to title if left blank)',
        'pain_point_subtitle' => 'Pain Point Subtitle',
        'problem_description' => 'Problem Description',
        'solution_overview'   => 'Solution Overview',
        'key_benefits'        => 'Key Benefits (one per line)',
        'cta_button_text'     => 'CTA Button Text',
        'time_saved'          => 'Time Saved (e.g. 10hrs/week)',
        'revenue_increase'    => 'Revenue Increase (e.g. 25%)',
        'cost_reduction'      => 'Cost Reduction (e.g. $500/month)',
        'pricing_range'       => 'Pricing Range (budget / standard / premium)',
        'implementation_time' => 'Implementation Time (e.g. 1-2 weeks)',
    );
}

function uae_get_tool_fields() {
    return array(
        'tool_tagline'      => 'Tool Tagline',
        'tool_type'         => 'Tool Type (e.g. automation, dashboard, ai, widget, integration, template)',
        'technology_stack'  => 'Technology Stack (comma-separated)',
        'demo_available'    => 'Demo Available (1 or 0)',
        'demo_link'         => 'Demo Link (URL)',
        'support_included'  => 'Support Included',
        'tool_features'     => 'Key Features (one per line, format: icon|title|description)',
        'pricing_model'     => 'Pricing Model (monthly / one_time / freemium)',
        'base_price'        => 'Base Price (number only, e.g. 49)',
        'setup_fee'         => 'Setup Fee',
        'monthly_fee'       => 'Monthly Fee',
        'setup_time'        => 'Setup Time (e.g. 1 day)',
    );
}

// ============================================================
// Register meta + expose at ROOT of REST response
// ============================================================

add_action('init', 'uae_register_solution_tool_meta');
function uae_register_solution_tool_meta() {
    foreach (array_keys(uae_get_solution_fields()) as $field) {
        register_post_meta('solution', $field, array(
            'show_in_rest' => true,
            'single'       => true,
            'type'         => 'string',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ));
    }

    foreach (array_keys(uae_get_tool_fields()) as $field) {
        register_post_meta('tool', $field, array(
            'show_in_rest' => true,
            'single'       => true,
            'type'         => 'string',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ));
    }
}

add_action('rest_api_init', 'uae_expose_solution_tool_fields_at_root');
function uae_expose_solution_tool_fields_at_root() {
    foreach (array_keys(uae_get_solution_fields()) as $field) {
        register_rest_field('solution', $field, array(
            'get_callback' => function ($post) use ($field) {
                return get_post_meta($post['id'], $field, true);
            },
            'update_callback' => function ($value, $post) use ($field) {
                return update_post_meta($post->ID, $field, sanitize_textarea_field($value));
            },
            'schema' => null,
        ));
    }

    foreach (array_keys(uae_get_tool_fields()) as $field) {
        register_rest_field('tool', $field, array(
            'get_callback' => function ($post) use ($field) {
                return get_post_meta($post['id'], $field, true);
            },
            'update_callback' => function ($value, $post) use ($field) {
                return update_post_meta($post->ID, $field, sanitize_textarea_field($value));
            },
            'schema' => null,
        ));
    }
}

// ============================================================
// Admin meta boxes (so you can edit these fields in wp-admin)
// ============================================================

add_action('add_meta_boxes', 'uae_add_solution_tool_meta_boxes_v2');
function uae_add_solution_tool_meta_boxes_v2() {
    add_meta_box(
        'solution_details_box_v2',
        'Solution Details',
        'uae_solution_details_callback_v2',
        'solution',
        'normal',
        'high'
    );

    add_meta_box(
        'tool_details_box_v2',
        'Tool Details',
        'uae_tool_details_callback_v2',
        'tool',
        'normal',
        'high'
    );
}

function uae_solution_details_callback_v2($post) {
    wp_nonce_field('uae_save_solution_tool_meta_v2', 'uae_meta_nonce');
    foreach (uae_get_solution_fields() as $field => $label) {
        $value = get_post_meta($post->ID, $field, true);
        $is_textarea = in_array($field, array('problem_description', 'solution_overview', 'key_benefits'));
        echo '<p style="margin-bottom:15px;"><label style="display:block;font-weight:bold;margin-bottom:5px;">' . esc_html($label) . '</label>';
        if ($field === 'pricing_range') {
            $pricing_options = array('budget' => 'Budget', 'standard' => 'Standard', 'premium' => 'Premium');
            echo '<select name="pricing_range" style="width:100%;padding:6px;">';
            foreach ($pricing_options as $option => $option_label) {
                echo '<option value="' . esc_attr($option) . '"' . selected($value, $option, false) . '>' . esc_html($option_label) . '</option>';
            }
            echo '</select>';
        } elseif ($is_textarea) {
            echo '<textarea name="' . esc_attr($field) . '" rows="4" style="width:100%;">' . esc_textarea($value) . '</textarea>';
        } else {
            echo '<input type="text" name="' . esc_attr($field) . '" value="' . esc_attr($value) . '" style="width:100%;padding:6px;" />';
        }
        echo '</p>';
    }
}

function uae_tool_details_callback_v2($post) {
    wp_nonce_field('uae_save_solution_tool_meta_v2', 'uae_meta_nonce');
    $tool_type_options = array('automation', 'dashboard', 'ai', 'widget', 'integration', 'template');
    foreach (uae_get_tool_fields() as $field => $label) {
        $value = get_post_meta($post->ID, $field, true);
        $is_textarea = ($field === 'tool_features');
        echo '<p style="margin-bottom:15px;"><label style="display:block;font-weight:bold;margin-bottom:5px;">' . esc_html($label) . '</label>';
        if ($field === 'tool_type') {
            echo '<select name="tool_type" style="width:100%;padding:6px;">';
            foreach ($tool_type_options as $option) {
                echo '<option value="' . esc_attr($option) . '"' . selected($value, $option, false) . '>' . esc_html(ucfirst($option)) . '</option>';
            }
            echo '</select>';
        } elseif ($field === 'pricing_model') {
            $pricing_options = array('monthly' => 'Monthly', 'one_time' => 'One-time', 'freemium' => 'Freemium');
            echo '<select name="pricing_model" style="width:100%;padding:6px;">';
            foreach ($pricing_options as $option => $option_label) {
                echo '<option value="' . esc_attr($option) . '"' . selected($value, $option, false) . '>' . esc_html($option_label) . '</option>';
            }
            echo '</select>';
        } elseif ($is_textarea) {
            echo '<textarea name="' . esc_attr($field) . '" rows="6" style="width:100%;font-family:monospace;">' . esc_textarea($value) . '</textarea>';
        } else {
            echo '<input type="text" name="' . esc_attr($field) . '" value="' . esc_attr($value) . '" style="width:100%;padding:6px;" />';
        }
        echo '</p>';
    }
}

add_action('save_post', 'uae_save_solution_tool_meta_v2');
function uae_save_solution_tool_meta_v2($post_id) {
    if (!isset($_POST['uae_meta_nonce']) || !wp_verify_nonce($_POST['uae_meta_nonce'], 'uae_save_solution_tool_meta_v2')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $post_type = get_post_type($post_id);
    $fields = array();
    if ($post_type === 'solution') {
        $fields = array_keys(uae_get_solution_fields());
    } elseif ($post_type === 'tool') {
        $fields = array_keys(uae_get_tool_fields());
    }

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_textarea_field($_POST[$field]));
        }
    }
}
