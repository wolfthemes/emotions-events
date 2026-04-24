<?php

defined( 'ABSPATH' ) || exit;

function emotions_enqueue_scripts() {
	$version = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? time() : '1.0.0';

	wp_enqueue_style( 'emotions-app', get_stylesheet_directory_uri() . '/build/styles.css', array(), $version );

	wp_enqueue_script( 'emotions-app', get_stylesheet_directory_uri() . '/build/app.js', array( 'wp-element' ), $version, true );
}
add_action( 'wp_enqueue_scripts', 'emotions_enqueue_scripts', 999 );

/**
*
*/
function emotions_output_animated_text() {

	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	if ( ! is_checkout() ) {
		return;
	}

	echo wolf_core_marquee_text(
		array(
			'text' => 'TICKET &bull; TICKET &bull; TICKET &bull;',
			'direction' => 'right',
			'marquee_speed' => '80',
		)
	);
}
add_action( 'aurenza_content_start', 'emotions_output_animated_text', 99 );

