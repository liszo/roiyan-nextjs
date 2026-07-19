<?php
/**
 * Register real WordPress taxonomies for Solution/Tool Category and
 * Target Audience, so they show up as checkbox meta boxes in wp-admin
 * (like native Categories) and are exposed via REST as arrays of term
 * IDs at the root of the post object - matching what lib/wordpress.ts
 * expects (solution.solution_category, tool.tool_category,
 * solution.target_audience / tool.target_audience).
 *
 * Add this to functions.php ALONGSIDE wordpress-custom-fields-fix.php
 * (don't replace it - these are additive).
 *
 * After adding this code:
 * 1. Visit WordPress Admin once so the taxonomies register (Settings ->
 *    Permalinks -> Save, to flush rewrite rules).
 * 2. Run wordpress-taxonomy-terms-migration.php ONCE (see that file) to
 *    auto-create the category/audience terms and assign them to all
 *    existing Solutions and Tools.
 */

add_action('init', 'uae_register_solution_category_taxonomy');
function uae_register_solution_category_taxonomy() {
    register_taxonomy('solution_category', array('solution'), array(
        'labels' => array(
            'name'          => 'Solution Categories',
            'singular_name' => 'Solution Category',
            'search_items'  => 'Search Categories',
            'all_items'     => 'All Categories',
            'edit_item'     => 'Edit Category',
            'update_item'   => 'Update Category',
            'add_new_item'  => 'Add New Category',
            'new_item_name' => 'New Category Name',
            'menu_name'     => 'Categories',
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rest_base'         => 'solution_category',
        'query_var'         => true,
        'rewrite'           => array('slug' => 'solution-category'),
    ));
}

add_action('init', 'uae_register_tool_category_taxonomy');
function uae_register_tool_category_taxonomy() {
    register_taxonomy('tool_category', array('tool'), array(
        'labels' => array(
            'name'          => 'Tool Categories',
            'singular_name' => 'Tool Category',
            'search_items'  => 'Search Categories',
            'all_items'     => 'All Categories',
            'edit_item'     => 'Edit Category',
            'update_item'   => 'Update Category',
            'add_new_item'  => 'Add New Category',
            'new_item_name' => 'New Category Name',
            'menu_name'     => 'Categories',
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rest_base'         => 'tool_category',
        'query_var'         => true,
        'rewrite'           => array('slug' => 'tool-category'),
    ));
}

add_action('init', 'uae_register_target_audience_taxonomy');
function uae_register_target_audience_taxonomy() {
    register_taxonomy('target_audience', array('solution', 'tool'), array(
        'labels' => array(
            'name'          => 'Target Audiences',
            'singular_name' => 'Target Audience',
            'search_items'  => 'Search Audiences',
            'all_items'     => 'All Audiences',
            'edit_item'     => 'Edit Audience',
            'update_item'   => 'Update Audience',
            'add_new_item'  => 'Add New Audience',
            'new_item_name' => 'New Audience Name',
            'menu_name'     => 'Target Audiences',
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rest_base'         => 'target_audience',
        'query_var'         => true,
        'rewrite'           => array('slug' => 'target-audience'),
    ));
}
