<?php

defined( 'ABSPATH' ) || exit;

function emotions_get_event_date_string( $product_id ) {
    global $sasoEventtickets;
    if ( ! $sasoEventtickets ) return '';

    $handler = $sasoEventtickets->getTicketHandler();
    $date_str = $handler->displayTicketDateAsString(
        $product_id,
        'd.m.y',
        'H:i'
    );

    if ( ! $date_str ) return '';

    // displayTicketDateAsString returns "start - end" when dates differ
    // We only want the start portion
    $parts = explode( ' - ', $date_str );
    $start = trim( $parts[0] );

    // Append "Uhr" if time is present (H:i format contains ":")
    if ( strpos( $start, ':' ) !== false ) {
        // Date and time are concatenated by the plugin — split them
        // Expected raw format: "30.04.26, 18:00" after our format strings
        $start .= ' Uhr';
    }

    return $start;
}
