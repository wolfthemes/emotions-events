async function fetchCart() {
    const res = await fetch( '/wp-json/wc/store/v1/cart', {
        headers: { 'Content-Type': 'application/json' }
    } );
    if ( ! res.ok ) return null;
    return res.json();
}

async function updateCartItem( key, quantity ) {
    const nonce = window.emotionsCheckout?.nonce ?? '';
    const res = await fetch( '/wp-json/wc/store/v1/cart/update-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Nonce': nonce
        },
        body: JSON.stringify( { key, quantity } )
    } );
    return res.ok;
}

function injectCounterRow( cartItemsBlock, cartItems ) {
    const item = cartItems[0];
    let currentQty = item.quantity;

    const row = document.createElement( 'div' );
    row.className = 'qty-counter-row';
    row.innerHTML = `
        <span class="qty-counter-label">MENGE</span>
        <div class="qty-counter-controls">
            <button class="qty-minus">−</button>
            <span class="qty-value">${ currentQty }</span>
            <button class="qty-plus">+</button>
        </div>
    `;
    cartItemsBlock.after( row );

    const valueEl  = row.querySelector( '.qty-value' );
    const minusBtn = row.querySelector( '.qty-minus' );
    const plusBtn  = row.querySelector( '.qty-plus' );

    async function handleUpdate( delta ) {
        const newQty = currentQty + delta;
        if ( newQty < 1 ) return;

        currentQty = newQty;
        valueEl.textContent = currentQty;

        console.log( 'updating to', currentQty, 'key:', item.key );
        const ok = await updateCartItem( item.key, currentQty );
        console.log( 'update result:', ok );

        if ( ! ok ) {
            currentQty -= delta;
            valueEl.textContent = currentQty;
            return;
        }

        window.wp.data.dispatch( 'wc/store/cart' ).invalidateResolutionForStore();
    }

    minusBtn.addEventListener( 'click', () => handleUpdate( -1 ) );
    plusBtn.addEventListener( 'click', () => handleUpdate( 1 ) );
}

export async function initQtyCounter() {
    const cart = await fetchCart();
    if ( ! cart || ! cart.items?.length ) return;

    const observer = new MutationObserver( () => {
        const cartItemsBlock = document.querySelector(
            '.wp-block-woocommerce-checkout-order-summary-cart-items-block'
        );
        if ( ! cartItemsBlock || cartItemsBlock.dataset.qtyEnhanced ) return;
        cartItemsBlock.dataset.qtyEnhanced = true;
        observer.disconnect();

        injectCounterRow( cartItemsBlock, cart.items );
    } );
    observer.observe( document.body, { childList: true, subtree: true } );
}
