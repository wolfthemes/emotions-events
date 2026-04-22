import React from "react";
import { createRoot } from '@wordpress/element';
import AutoBind from "auto-bind";
import TopBarBlock from "./modules/TopBarBlock"
import StickyMenu from "./modules/StickyMenu"
import MenuBlock from "./modules/MenuBlock"

class HireIt {

	constructor() {
		AutoBind(this);


		console.log("Hire It start")
		new TopBarBlock()
		new StickyMenu()

		this.addEventListener()
	}

	/**
	 * Functions to fire once the page is loaded
	 */
	pageLoaded() {

		new MenuBlock()
	}

	addEventListener() {
		window.addEventListener('load', this.pageLoaded);
	}
}

new HireIt()
