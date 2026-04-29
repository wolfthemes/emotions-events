<?php

defined( 'ABSPATH' ) || exit;

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

