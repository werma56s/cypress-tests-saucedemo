class CartPage {
    // Hover over the cart icon to see cart details
    hoverCartIcon() {
        cy.wait(2000); // Czeka 2 sekundy
        cy.scrollTo('top');
        cy.get('#site-header-cart > li > a.cart-contents').realHover(); 
        cy.wait(2000); // Czeka 2 sekundy
    }

    // Verify cart icon details (price and product count)
    verifyCartIconDetails(price, productCount) {
        cy.wait(2000); // Czeka 2 sekundy
        cy.scrollTo('top');
        cy.get('a > span.woocommerce-Price-amount').contains(price); 
        cy.get('a > span.count').contains(productCount); 
    }

    // Verify if the cart displays the correct label
    verifyCartLabel(labelText) {
        cy.get('p.woocommerce-mini-cart__empty-message').contains(labelText); 
    }

    // Verify if the cart displays the correct label - Click cart icon
    verifyCartLabelClickCartIcon(labelText) {
        cy.get('div.cart-empty.woocommerce-info').contains(labelText); 
    }

    // Click the cart icon to open the cart details
    clickCartIcon() {
        cy.get('#site-header-cart').click(); // Zakładając, że ikona koszyka jest klikana za pomocą '.cart-icon'
    }

    // Verify cart information (e.g., "Koszyk" and "Wróć do sklepu")
    verifyCartInformation(info1, info2) {
        cy.get('h1.entry-title').should('contain', info1); 
        cy.get('a.button.wc-backward').should('contain', info2); 
    }

    // Verify details of a product in the cart (e.g., product name, price, total)
    verifyCartDetails(label1, label2, label3) {
        this.hoverCartIcon();
        cy.get('.woocommerce-mini-cart-item.mini_cart_item > a').eq(1).contains(label1).should('be.visible'); // Nazwa produktu
        this.hoverCartIcon();
        cy.get('span.quantity >span > bdi').contains(label2).should('be.visible'); // Cena produktu
        this.hoverCartIcon();
        cy.get('p.woocommerce-mini-cart__total.total > span > bdi').contains(label3).should('be.visible'); // Całkowita cena
    }

    verifyCartDetailsinCart(label1, label2, label3) {
        cy.get('.product-name').contains(label1).should('be.visible'); // Nazwa produktu
        cy.get('.product-price').contains(label2).should('be.visible'); // Cena produktu
        cy.get('.product-subtotal').contains(label3).should('be.visible'); // Całkowita cena
    }

    // Verify that the cart displays icons and buttons correctly
    verifyProductIconAndButtons(icon, button1, button2) {
        cy.get(`a.${icon}_from_cart_button`).should('be.visible'); // Sprawdza widoczność ikony
        cy.get(`p.woocommerce-mini-cart__buttons.buttons > a.button`).eq(0).contains(button1).should('be.visible'); // Sprawdza widoczność przycisku 1
        cy.get(`p.woocommerce-mini-cart__buttons.buttons > a.button`).eq(1).contains(button2).should('be.visible'); // Sprawdza widoczność przycisku 2
    }
    
    // Verify the summary and VAT details in the cart
    verifyCartSummaryDetails(summaryLabel, vatLabel, paymentButton) {
        cy.get('.cart_totals  > h2').should('have.text', summaryLabel); // Sprawdza podsumowanie
        cy.get('.includes_tax').contains(vatLabel); // Sprawdza VAT
        cy.get('a.checkout-button.button').contains(paymentButton); // Sprawdza przycisk płatności
    }

    deleteProduct(){
        this.clickCartIcon();
        cy.get("a.remove").realClick();
    }
}

export default new CartPage();