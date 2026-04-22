
export default class MenuBlock {

	constructor() {
		this.init()
	}

	init() {
		var _this = this

		document.querySelectorAll(
		"#site-navigation-primary-desktop .mega-menu-block > .menu-link"
		).forEach(function (link) {
			_this.wrapper( link )
			_this.Hover(link )
			_this.fetchBlocks(link )

		});
	}

	wrapper( link ) {

		// Create outer wrapper
		const panel = document.createElement("div");
		panel.className = "mega-menu-panel";

		// Create inner wrapper
		const inner = document.createElement("div");
		inner.className = "mega-menu-panel-inner";

		panel.appendChild(inner);

		// Insert right after the link
		link.insertAdjacentElement("afterend", panel);
	}

	Hover(link) {
		const menuItem = link.parentElement; // The .mega-menu-block li element
		menuItem.addEventListener('mouseenter', () => {

			// Find the mega-menu-panel
			const panel = menuItem.querySelector(':scope > .mega-menu-panel');

			if (panel) {
				panel.style.display = 'block';

				// Add hover class after a short delay for transition
				setTimeout(() => {
					menuItem.classList.add('hover');
				}, 100);
			}
		});

		menuItem.addEventListener('mouseleave', () => {
			menuItem.classList.remove('hover');

			// Reset display style
			const panel = menuItem.querySelector(':scope > .mega-menu-panel');
			if (panel) {
				panel.removeAttribute('style');
			}
		});
	}

	fetchBlocks(link) {
		const blockId = link.dataset.menuItemBlock;
		const blockUrl = link.dataset.menuItemBlockUrl;
		const container = link.parentElement.querySelector(".mega-menu-panel-inner");

		// Skip if no block ID
		if (!blockId) {
			return;
		}

		const _this = this

		fetch(blockUrl).then(function (response) {

            // The API call was successful!
            return response.text();
        }).then(function (html) {
            // Convert the HTML string into a document object
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            _this.refreshContent(doc, blockUrl, container)

        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
	}

    refreshContent(doc, blockUrl, container) {
        var content = doc.querySelector('#content .entry-content');
        // var count = doc.getElementById('work-result-count').innerHTML;
        container.innerHTML = "";

        if (null == content) {
            content = this.htmlToElement("<div'>Nothing found<div>");
        }

        container.append(content)
    }

    htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

	addEventListener() {

	}
}
