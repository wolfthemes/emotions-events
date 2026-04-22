export default class StickyMenu {

	constructor() {
		document.addEventListener("DOMContentLoaded", function () {

			const stickyMenuType = AlcesteParams.customStickyMenuType

			// console.log( stickyMenuType )
			const topBar = document.querySelector("#top-bar-block");

			if ( "none" === stickyMenuType || "" === stickyMenuType || ! topBar ) {
				return
			}

			const navBar = document.querySelector(".nav-bar");

			const adminBarOffset = document.body.classList.contains("admin-bar") ? 32 : 0; // Admin bar height (32px by default)
			const offset = topBar.offsetHeight
			let lastScrollY = window.scrollY;
			let isSticky = false;

			//console.log( offset )

			// Configuration option
			const alwaysSticky = "hard" === stickyMenuType; // Set to true for always sticky behavior

			const handleStickyMenu = () => {
				const currentScrollY = window.scrollY;

				if (alwaysSticky) {
					// Always sticky behavior
					if (currentScrollY > offset) {
						if (!isSticky) {
							navBar.style.position = "fixed";
							navBar.style.top = `${adminBarOffset}px`;
							navBar.style.width = "100%";
							navBar.style.zIndex = "1000"; // Ensure it stays on top
							navBar.classList.add("sticky");
							isSticky = true;
						}
					} else {
						if (isSticky) {
							navBar.style.position = "";
							navBar.style.top = "";
							navBar.style.width = "";
							navBar.style.zIndex = "";
							navBar.classList.remove("sticky");
							isSticky = false;
						}
					}
				} else {
					// Sticky only when scrolling up
					if (currentScrollY < lastScrollY && currentScrollY > offset) {
						if (!isSticky) {
							navBar.style.position = "fixed";
							navBar.style.top = `${adminBarOffset}px`;
							navBar.style.width = "100%";
							navBar.style.zIndex = "1000";
							navBar.classList.add("sticky");
							isSticky = true;
						}
					} else {
						if (isSticky || currentScrollY <= offset) {
							navBar.style.position = "";
							navBar.style.top = "";
							navBar.style.width = "";
							navBar.style.zIndex = "";
							navBar.classList.remove("sticky");
							isSticky = false;
						}
					}
				}

				lastScrollY = currentScrollY;
			};

			window.addEventListener("scroll", handleStickyMenu);
		});
	}
}
