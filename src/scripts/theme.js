import React from "react";
import { createRoot } from '@wordpress/element';
import AutoBind from "auto-bind";

class Emotions {

	constructor() {
		AutoBind(this);


		console.log("Emotions start")

		this.addEventListener()
	}

	initQtyCounter() {
		this.observer = new MutationObserver(() => {
			const items = document.querySelectorAll('.wc-block-components-order-summary-item:not([data-qty-enhanced])');
			items.forEach(item => {
				item.dataset.qtyEnhanced = true;
				this.injectCounter(item);
			});
		});
		this.observer.observe(document.body, { childList: true, subtree: true });
	}

	injectCounter(item) {
		// Remove old injection inside description
		const cartItemsBlock = document.querySelector('.wp-block-woocommerce-checkout-order-summary-cart-items-block');
		if (!cartItemsBlock || cartItemsBlock.dataset.qtyEnhanced) return;
		cartItemsBlock.dataset.qtyEnhanced = true;

		const row = document.createElement('div');
		row.className = 'qty-counter-row';
		row.innerHTML = `
			<span class="qty-counter-label">MENGE</span>
			<div class="qty-counter-controls">
				<button class="qty-minus">−</button>
				<span class="qty-value">1</span>
				<button class="qty-plus">+</button>
			</div>
		`;
		cartItemsBlock.after(row);
	}

	checkoutEventDate() {
		if ( ! window.emotionsCheckout?.eventData ) return;

		console.log( window.emotionsCheckout.eventData )

		const productId = Object.keys( window.emotionsCheckout.eventData )[0];
		const date = window.emotionsCheckout.eventData[ productId ]?.date;

		console.log( date )

		if ( ! date ) return;

		const inject = () => {
			const items = document.querySelectorAll( '.wc-block-components-order-summary-item:not([data-date-injected])' );
			console.log( 'items found:', items.length );
			items.forEach( item => {
				const nameEl = item.querySelector( '.wc-block-components-product-name' );

				if ( ! nameEl ) return;

				const dateEl = document.createElement( 'span' );
				dateEl.className = 'emotions-checkout__event-date';
				dateEl.textContent = date;
				nameEl.insertAdjacentElement( 'beforebegin', dateEl );
				item.dataset.dateInjected = true;
			});
		};

		const observer = new MutationObserver( inject );
		observer.observe( document.body, { childList: true, subtree: true } );
		inject(); // catch already-rendered items
	}

	/**
	 * Functions to fire once the page is loaded
	 */
	pageLoaded() {
		if (document.body.classList.contains('woocommerce-checkout')) {
			this.checkoutEventDate();
        	this.initQtyCounter();
    	}
	}

	addEventListener() {
		window.addEventListener('load', this.pageLoaded);
	}
}

new Emotions()
