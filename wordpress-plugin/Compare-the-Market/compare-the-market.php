
<?php
/**
 * Plugin Name: Compare the Market
 * Plugin URI: http://localhost/compare-the-market
 * Description: The test plugin prepared for Compare the Market Interview
 * Version: 1.0
 * Author: Yannick Lin
 * Author URI: http://www.yannicklin.net
 * Textdomain: compare_the_market
 * License: GPLv2
 */


/**
 * Register a Custom Taxonomy : Author
 */
function ctm_taxonomies_register_authors() {
    $labels = array(
      'name'              => _x( 'Authors', 'general name', 'compare_the_market' ),
      'singular_name'     => _x( 'Author', 'singular name', 'compare_the_market' ),
      'search_items'      => __( 'Search Authors', 'compare_the_market' ),
      'all_items'         => __( 'All Authors', 'compare_the_market' ),
      'parent_item'       => null,
      'parent_item_colon' => null,
      'edit_item'         => __( 'Edit Author', 'compare_the_market' ), 
      'update_item'       => __( 'Update Author', 'compare_the_market' ),
      'add_new_item'      => __( 'Add New Author', 'compare_the_market' ),
      'new_item_name'     => __( "New Author's Name", 'compare_the_market' ),
      'menu_name'         => __( 'Authors', 'compare_the_market' ),
    );
  
    register_taxonomy( 'ctm_authors',
        array('post'),
        array(
            'hierarchical'        => false,
            'labels'              => $labels,
            'show_ui'             => true,
            'show_admin_column'   => true,
            'query_var'           => true,
            'rewrite'             => array( 'slug' => 'author' ),
    ));
}
add_action( 'init', 'ctm_taxonomies_register_authors', 0 );



/**
 * Register a Custom Post Type : Book
 */
function ctm_cpt_register_books() {
    $labels = array(
        'name' => __('Books', 'compare_the_market'),
        'singular_name' => __('Book', 'compare_the_market'),
        'add_new_item' => __('Add New Book', 'compare_the_market'),
        'edit_item' => __('Edit Book', 'compare_the_market'),
        'new_item' => __('New Book', 'compare_the_market'),
        'view_item' => __('View Book', 'compare_the_market'),
        'search_items' => __('Search Books', 'compare_the_market'),
        'not_found' => __('No Books found', 'compare_the_market'),
        'not_found_in_trash' => __('No Books found in Trash', 'compare_the_market'),
      );

    register_post_type('ctm_book',
        array(
            'labels'                => $label,
            'description'           => __( 'Books Collection of Compare the Market', 'compare_the_market' ),
            'taxonomies'            => array( 'ctm_authors' ),
            'hierarchical'          => false,
            'menu_icon'             => plugins_url( 'images/image.png', __FILE__ ),
            'public'                => true,
            'supports' => array(
                'title',
                'editor',
                'excerpt',
                'custom-fields',
                'thumbnail',
                'page-attributes'
               ),
            'has_archive'           => true,
            'rewrite'               => array( 'slug' => 'books' ),
            'show_in_rest'          => true,
        )
    );
}
add_action('init', 'ctm_cpt_register_books', 1 );
