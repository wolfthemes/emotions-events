
export default class TopBarBlock {

	constructor() {
		if ( document.getElementById( "top-bar-block" ) ) {

			window.addEventListener('resize', function() {
				let topBar = document.getElementById( "top-bar-block" );
				let body = document.querySelector( "body" );

				if ( topBar ) {

					let topBarHeight = topBar.clientHeight;
					let header = document.querySelector( ".site-header" );
					let menuHeight = document.querySelector( ".menu-container" ).clientHeight

					//console.log(topBarHeight)
					document.querySelector("html").style.setProperty('--top-bar-height', topBarHeight + "px");
					document.querySelector("html").style.setProperty('--nav-search-form-height', topBarHeight + "px");

					if ( ! body.classList.contains( "menu-style-absolute" ) ) {
						header.style.height = menuHeight + topBarHeight + "px";
					}
				}
		    });
			window.dispatchEvent(new Event('resize'));
		}
	}
}
