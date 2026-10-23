// =========================
// NAVIGATION
// =========================

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const page = item.getAttribute("href");

        if (page) {
            window.location.href = page;
        }

    });

});


// =========================
// CART
// =========================

const cartButton = document.querySelector("#cartButton");

let cartCount =
    Number(localStorage.getItem("cartCount")) || 0;

const cartCountElement =
    document.querySelector("#cartCount");


function updateCartCount() {

    cartCountElement.textContent = cartCount;

    localStorage.setItem(
        "cartCount",
        cartCount
    );

}


updateCartCount();


cartButton.addEventListener("click", () => {

    window.location.href = "./cart.html";

});


// =========================
// ADD TO CART
// =========================

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product =
            button.dataset.product;

        cartCount++;

        updateCartCount();


        // Button feedback

        const originalText =
            button.textContent;

        button.textContent =
            "✓ Added to Cart";

        button.disabled = true;


        setTimeout(() => {

            button.textContent =
                originalText;

            button.disabled = false;

        }, 1200);


        console.log(
            product + " added to cart"
        );

    });

});


// =========================
// NEWSLETTER
// =========================

const newsletterForm =
    document.querySelector("#newsletterForm");


newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const email =
        document.querySelector("#email").value.trim();


    if (email === "") {
        return;
    }


    alert(
        "Thank you for subscribing!"
    );


    newsletterForm.reset();

});


// =========================
// CATEGORY CLICK
// =========================

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach((card) => {

    card.addEventListener("click", () => {

        window.location.href =
            "./product.html";

    });

});