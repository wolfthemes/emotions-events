<?php
/**
 * This is the Aurenza child theme functions.php file.
 * You can use this file to overwrite existing functions, filter and actions to customize the parent theme.
 * https://wolfthemes.ticksy.com/article/11659/
 *
 * @package WordPress
 * @subpackage %NAME%
 */

/**
 * Add custom elements to theme
 *
 * @param array $elements Available page builder elements.
 * @return  array
 */
function wolftheme_add_available_wvc_elements( $elements ) {

	// $elements[] = 'text-slider';

	if ( class_exists( 'WooCommerce' ) ) {
		$elements[] = 'buy-button';
	}

	return $elements;
}
add_filter( 'wolf_core_element_list', 'wolftheme_add_available_wvc_elements', 44 );

add_filter( 'aurenza_loading_text', function( $text ) {

    return 'Nimm einen tiefen Atemzug';
} );
