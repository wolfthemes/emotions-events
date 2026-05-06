<?php

defined( 'ABSPATH' ) || exit;

function emotions_enqueue_scripts() {
	$version = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? time() : '1.0.1';

	wp_enqueue_style( 'emotions-app', get_stylesheet_directory_uri() . '/build/styles.css', array(), $version );

	wp_enqueue_script( 'emotions-app', get_stylesheet_directory_uri() . '/build/app.js', array( 'wp-element' ), $version, true );

	if ( is_checkout() ) {

		$cart_event_data = [];
		foreach ( WC()->cart->get_cart() as $cart_item ) {
			$product_id = $cart_item['product_id'];

			$cart_event_data[ $product_id ] = [
				'date' => emotions_get_event_date_string( $product_id ),
			];
		}

		wp_localize_script( 'emotions-app', 'emotionsCheckout', [
			'eventData' => $cart_event_data,
			'nonce'     => wp_create_nonce('wc_store_api'),
		]);
	}
}
add_action( 'wp_enqueue_scripts', 'emotions_enqueue_scripts', 999 );

/**
*
*/
function emotions_output_animated_text() {

	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	if ( is_wc_endpoint_url( 'order-received' ) ) {
		echo wolf_core_marquee_text(
			array(
				'text'          => 'DANKE &bull; DANKE &bull; DANKE &bull;',
				'direction'     => 'right',
				'marquee_speed' => '80',
			)
		);
		return;
	}

	if ( is_checkout() ) {

		echo wolf_core_marquee_text(
			array(
				'text' => 'TICKET &bull; TICKET &bull; TICKET &bull;',
				'direction' => 'right',
				'marquee_speed' => '80',
			)
		);
	}
}
add_action( 'aurenza_content_start', 'emotions_output_animated_text', 99 );



add_filter('woocommerce_checkout_cart_item_quantity', function( $quantity, $cart_item) {
	$product = $cart_item['data'];
	return sprintf(
		'<input type="number" class="qty-input" value="%s" min="1" max="%s" data-cart-key="%s">',
		$cart_item['quantity'],
		$product->get_stock_quantity() ?: 99,
		$cart_item['key']
	);
}, 10, 2);

