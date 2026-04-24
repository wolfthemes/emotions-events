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

	/**
	 * Functions to fire once the page is loaded
	 */
	pageLoaded() {
		if (document.body.classList.contains('woocommerce-checkout')) {
        	this.initQtyCounter();
    	}
	}

	addEventListener() {
		window.addEventListener('load', this.pageLoaded);
	}
}

new Emotions()
