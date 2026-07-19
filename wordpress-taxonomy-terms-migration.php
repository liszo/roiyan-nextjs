<?php
/**
 * ONE-TIME migration: creates Solution Category, Tool Category, and
 * Target Audience terms, then assigns them to all 15 existing Solutions
 * (IDs 135-149) and 15 existing Tools (IDs 150-164).
 *
 * HOW TO RUN:
 * 1. Make sure wordpress-taxonomies-fix.php has already been added to
 *    functions.php (the taxonomies must be registered first).
 * 2. Add this ENTIRE file's code to the bottom of functions.php.
 * 3. Visit any page on your WordPress site once (front-end or admin) -
 *    it runs automatically on that single request via the check below.
 * 4. Remove this code from functions.php again immediately after
 *    confirming it ran (check Solutions/Tools category & audience
 *    checkboxes in wp-admin, or query wp_term_relationships).
 *
 * Safe to leave the trigger as-is even if you forget to remove it -
 * it checks a "uae_taxonomy_terms_migrated" option and only runs once.
 */

add_action('init', 'uae_run_taxonomy_terms_migration', 20);
function uae_run_taxonomy_terms_migration() {
    if (get_option('uae_taxonomy_terms_migrated')) {
        return;
    }

    // ---- Solution Categories ----
    $solution_categories = array(
        'Marketing', 'Sales & CRM', 'E-commerce', 'Customer Experience',
        'Operations', 'Finance', 'Client Management',
    );
    foreach ($solution_categories as $name) {
        if (!term_exists($name, 'solution_category')) {
            wp_insert_term($name, 'solution_category');
        }
    }

    // ---- Tool Categories ----
    $tool_categories = array(
        'Automation', 'Analytics & Dashboards', 'AI Tools',
        'Marketing Tools', 'Sales Tools', 'Customer Success', 'E-commerce Tools',
    );
    foreach ($tool_categories as $name) {
        if (!term_exists($name, 'tool_category')) {
            wp_insert_term($name, 'tool_category');
        }
    }

    // ---- Target Audiences (shared) ----
    $audiences = array(
        'Small Business', 'E-commerce', 'Agencies',
        'Freelancers & Consultants', 'SaaS Companies', 'Service Providers',
    );
    foreach ($audiences as $name) {
        if (!term_exists($name, 'target_audience')) {
            wp_insert_term($name, 'target_audience');
        }
    }

    // ---- Assign to Solutions ----
    $solution_map = array(
        135 => array('cat' => array('Marketing'), 'aud' => array('Small Business', 'Service Providers')),
        136 => array('cat' => array('Sales & CRM'), 'aud' => array('Small Business', 'Agencies')),
        137 => array('cat' => array('Operations'), 'aud' => array('Service Providers', 'Freelancers & Consultants')),
        138 => array('cat' => array('E-commerce'), 'aud' => array('E-commerce')),
        139 => array('cat' => array('E-commerce'), 'aud' => array('E-commerce')),
        140 => array('cat' => array('Marketing'), 'aud' => array('E-commerce', 'Small Business')),
        141 => array('cat' => array('Operations'), 'aud' => array('Agencies', 'Service Providers')),
        142 => array('cat' => array('Client Management'), 'aud' => array('Agencies', 'Freelancers & Consultants')),
        143 => array('cat' => array('Finance'), 'aud' => array('Freelancers & Consultants', 'Small Business')),
        144 => array('cat' => array('Marketing'), 'aud' => array('Freelancers & Consultants', 'Agencies')),
        145 => array('cat' => array('Finance'), 'aud' => array('Freelancers & Consultants', 'Agencies')),
        146 => array('cat' => array('Marketing'), 'aud' => array('Small Business', 'Agencies')),
        147 => array('cat' => array('Customer Experience'), 'aud' => array('SaaS Companies', 'E-commerce')),
        148 => array('cat' => array('Operations'), 'aud' => array('Small Business', 'Agencies')),
        149 => array('cat' => array('Marketing'), 'aud' => array('E-commerce', 'Small Business')),
    );

    foreach ($solution_map as $post_id => $terms) {
        if (get_post($post_id)) {
            wp_set_object_terms($post_id, $terms['cat'], 'solution_category', false);
            wp_set_object_terms($post_id, $terms['aud'], 'target_audience', false);
        }
    }

    // ---- Assign to Tools ----
    $tool_map = array(
        150 => array('cat' => array('Automation'), 'aud' => array('Agencies', 'Service Providers')),
        151 => array('cat' => array('Analytics & Dashboards'), 'aud' => array('SaaS Companies')),
        152 => array('cat' => array('Analytics & Dashboards'), 'aud' => array('Small Business', 'Agencies')),
        153 => array('cat' => array('Sales Tools'), 'aud' => array('E-commerce', 'SaaS Companies')),
        154 => array('cat' => array('Marketing Tools'), 'aud' => array('E-commerce', 'Small Business')),
        155 => array('cat' => array('Automation'), 'aud' => array('Agencies', 'Freelancers & Consultants')),
        156 => array('cat' => array('Marketing Tools'), 'aud' => array('Agencies', 'SaaS Companies')),
        157 => array('cat' => array('AI Tools'), 'aud' => array('Small Business', 'Agencies')),
        158 => array('cat' => array('Sales Tools'), 'aud' => array('Agencies', 'Freelancers & Consultants')),
        159 => array('cat' => array('Customer Success'), 'aud' => array('E-commerce', 'Small Business')),
        160 => array('cat' => array('E-commerce Tools'), 'aud' => array('E-commerce')),
        161 => array('cat' => array('Sales Tools'), 'aud' => array('Agencies', 'Service Providers')),
        162 => array('cat' => array('Customer Success'), 'aud' => array('Agencies', 'Service Providers')),
        163 => array('cat' => array('E-commerce Tools'), 'aud' => array('E-commerce')),
        164 => array('cat' => array('Marketing Tools'), 'aud' => array('Small Business', 'Agencies')),
    );

    foreach ($tool_map as $post_id => $terms) {
        if (get_post($post_id)) {
            wp_set_object_terms($post_id, $terms['cat'], 'tool_category', false);
            wp_set_object_terms($post_id, $terms['aud'], 'target_audience', false);
        }
    }

    update_option('uae_taxonomy_terms_migrated', true);
}
