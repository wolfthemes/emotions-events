<?php
defined( 'ABSPATH' ) || exit;

global $sasoEventtickets;

$order_items = $order->get_items();
$first_item  = reset( $order_items );
$product     = $first_item ? $first_item->get_product() : null;

$ticket_id = '';
foreach ( $order->get_items() as $item ) {
	$ticket_id = $item->get_meta( '_saso_eventtickets_public_ticket_ids' );
	if ( $ticket_id ) {
break;
	}
}

$ticket_base_url = WP_PLUGIN_URL . '/event-tickets-with-ticket-scanner/ticket/';
$ticket_url      = $ticket_id ? $ticket_base_url . $ticket_id : '';
$pdf_url         = $ticket_id ? $ticket_base_url . $ticket_id . '?pdf' : '';

$date_str = $product ? $sasoEventtickets->getTicketHandler()->displayTicketDateAsString(
	$product->get_id(),
	get_option( 'date_format' ),
	get_option( 'time_format' )
) : '';
?>

<div class="emotions-order-received">

	<?php do_action( 'woocommerce_before_thankyou', $order->get_id() ); ?>

	<div class="emotions-order-received__inner">

		<!-- LEFT PANEL -->
		<div class="emotions-order-received__left">

			<h2 class="emotions-order-received__title">
				<?php esc_html_e( 'Wie schön, dass du dabei bist!', 'emotions' ); ?>
			</h2>

			<div class="emotions-order-received__message">
				<p class="emotions-order-received__intro">
				<span class="emotions-order-received__highlight">
					<?php esc_html_e( 'Danke, dass du dir Zeit für dich nimmst.', 'emotions' ); ?>
				</span>
					<?php esc_html_e( 'Für dein Innenleben. Für deine Emotionen.', 'emotions' ); ?>
				</p>
				<p><?php esc_html_e( 'Mit deinem Ticketkauf unterstützt du nicht nur dich selbst, sondern auch ein österreichisches Herzensunternehmen mit einer großen Vision und dem Wunsch, echte Begegnung und spürbare Momente zu schaffen. Danke, dass du das möglich machst.', 'emotions' ); ?></p>
				<p>
					<?php esc_html_e( 'Bis wir uns sehen: Wenn du magst, hör schon jetzt in unsere', 'emotions' ); ?>
					<a href="#" class="emotions-order-received__link">Spotify Playlist</a>
					<?php esc_html_e( 'rein und stimm dich auf das Event ein.', 'emotions' ); ?>
				</p>
			</div>

			<p class="emotions-order-received__confirmation">
				<?php esc_html_e( 'Deine Bestätigung und', 'emotions' ); ?>
				<?php if ( $ticket_url ) : ?>
					<a href="<?php echo esc_url( $ticket_url ); ?>" target="_blank" class="emotions-order-received__link"><?php esc_html_e( 'dein Ticket', 'emotions' ); ?></a>
				<?php else : ?>
					<span class="emotions-order-received__link"><?php esc_html_e( 'dein Ticket', 'emotions' ); ?></span>
				<?php endif; ?>
				<?php esc_html_e( 'wurden bereits per', 'emotions' ); ?>
				<span class="emotions-order-received__link"><?php esc_html_e( 'E-Mail', 'emotions' ); ?></span>
				<?php esc_html_e( 'an dich geschickt.', 'emotions' ); ?>
			</p>

			<p class="emotions-order-received__outro">
				<?php esc_html_e( 'Falls du bei der E-Mail-Adresse vertippt hast, kein Stress — du kannst dein Ticket unten direkt herunterladen und abspeichern.', 'emotions' ); ?></p>

			<?php if ( $pdf_url ) : ?>
			<a href="<?php echo esc_url( $pdf_url ); ?>" target="_blank" class="emotions-order-received__btn">
				<?php esc_html_e( 'Ticket als PDF herunterladen', 'emotions' ); ?>
				<span>↓</span>
			</a>
			<?php endif; ?>

			<div class="emotions-order-received__pattern">
				<img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/img/logo-pattern.png' ); ?>">
			</div>

		</div>

		<!-- RIGHT PANEL -->
		<div class="emotions-order-received__right">

			<h3 class="emotions-order-received__summary-title">
				<?php esc_html_e( 'Bestellübersicht', 'emotions' ); ?>
			</h3>

			<?php if ( $product ) : ?>
			<div class="emotions-order-received__product">
				<div class="emotions-order-received__product-image">
					<?php echo $product->get_image( 'medium' ); ?>
					<span class="emotions-order-received__product-qty">
						<?php echo esc_html( $first_item->get_quantity() ); ?>
					</span>
				</div>
				<div class="emotions-order-received__product-info">
					<?php if ( $date_str ) : ?>
						<span class="emotions-order-received__product-date"><?php echo esc_html( $date_str ); ?></span>
					<?php endif; ?>
					<h4><?php echo esc_html( $first_item->get_name() ); ?></h4>
					<?php
					$variation_id = $first_item->get_variation_id();
								if ( $variation_id ) :
									$variation      = wc_get_product( $variation_id );
									$variation_name = $variation ? implode( ', ', $variation->get_variation_attributes() ) : '';
									if ( $variation_name ) :
										?>
						<span class="emotions-order-received__product-variation"><?php echo esc_html( $variation_name ); ?></span>
					<?php
					endif;
				endif;
				?>
				</div>

			</div>
			<?php endif; ?>

			<div class="emotions-order-received__details">
				<div class="emotions-order-received__detail-row">
					<span><?php esc_html_e( 'Vor- & Nachname', 'emotions' ); ?></span>
					<span><?php echo esc_html( $order->get_billing_first_name() . ' ' . $order->get_billing_last_name() ); ?></span>
				</div>
				<div class="emotions-order-received__detail-row">
					<span><?php esc_html_e( 'E-Mail Adresse', 'emotions' ); ?></span>
					<span><?php echo esc_html( $order->get_billing_email() ); ?></span>
				</div>
				<div class="emotions-order-received__detail-row">
					<span><?php esc_html_e( 'Ticket- & Rechnungsnummer', 'emotions' ); ?></span>
					<span><?php echo esc_html( $order->get_order_number() ); ?></span>
				</div>
				<div class="emotions-order-received__detail-row">
					<span><?php esc_html_e( 'Menge', 'emotions' ); ?></span>
					<span><?php echo esc_html( $order->get_item_count() ); ?></span>
				</div>
				<div class="emotions-order-received__detail-row">
					<span><?php esc_html_e( 'Zahlungsmethode', 'emotions' ); ?></span>
					<span><?php echo esc_html( $order->get_payment_method_title() ); ?></span>
				</div>
				<div class="emotions-order-received__detail-row emotions-order-received__detail-row--total">
					<span><?php esc_html_e( 'Gesamtsumme', 'emotions' ); ?></span>
					<span><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></span>
				</div>

			</div>

		</div>

	</div>
</div>
