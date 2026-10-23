document.addEventListener("DOMContentLoaded", () => {

    const productGrid = document.getElementById("productGrid");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortProducts = document.getElementById("sortProducts");
    const noProducts = document.getElementById("noProducts");

    const cartBtn = document.getElementById("cartBtn");
    const cartCount = document.getElementById("cartCount");

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".nav-menu");

    const products = Array.from(
        document.querySelectorAll(".product-card")
    );


    /* =========================
       CART COUNT
    ========================= */

    let cart = JSON.parse(
        localStorage.getItem("shopzoneCart")
    ) || [];

    updateCartCount();


    function updateCartCount() {

        cartCount.textContent = cart.length;

    }


    /* =========================
       ADD TO CART
    ========================= */

    const addButtons = document.querySelectorAll(".add-cart");

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const product = {
                name: button.dataset.name,
                price: Number(button.dataset.price)
            };

            cart.push(product);

            localStorage.setItem(
                "shopzoneCart",
                JSON.stringify(cart)
            );

            updateCartCount();

            button.textContent = "✓ Added";
            button.classList.add("added");

            setTimeout(() => {
                button.textContent = "Add to Cart";
                button.classList.remove("added");
            }, 1200);

        });

    });


    /* =========================
       CART BUTTON
    ========================= */

    cartBtn.addEventListener("click", () => {

        window.location.href = "./cart.html";

    });


    /* =========================
       SEARCH + FILTER
    ========================= */

    function filterProducts() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const category =
            categoryFilter.value;

        let visibleProducts = products.filter(product => {

            const name =
                product.querySelector("h3")
                .textContent
                .toLowerCase();

            const productCategory =
                product.dataset.category;

            const matchesSearch =
                name.includes(searchText);

            const matchesCategory =
                category === "all" ||
                productCategory === category;

            return matchesSearch && matchesCategory;

        });


        /* =========================
           SORT
        ========================= */

        const sortValue = sortProducts.value;

        if (sortValue === "low") {

            visibleProducts.sort(
                (a, b) =>
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
            );

        }

        if (sortValue === "high") {

            visibleProducts.sort(
                (a, b) =>
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
            );

        }

        if (sortValue === "name") {

            visibleProducts.sort((a, b) => {

                const nameA =
                    a.querySelector("h3")
                    .textContent;

                const nameB =
                    b.querySelector("h3")
                    .textContent;

                return nameA.localeCompare(nameB);

            });

        }


        /* =========================
           DISPLAY PRODUCTS
        ========================= */

        products.forEach(product => {
            product.style.display = "none";
        });


        visibleProducts.forEach(product => {
            product.style.display = "block";
            productGrid.appendChild(product);
        });


        if (visibleProducts.length === 0) {
            noProducts.style.display = "block";
        } else {
            noProducts.style.display = "none";
        }

    }


    searchInput.addEventListener(
        "input",
        filterProducts
    );

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

    sortProducts.addEventListener(
        "change",
        filterProducts
    );


    /* =========================
       WISHLIST
    ========================= */

    const wishlistButtons =
        document.querySelectorAll(".wishlist");

    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent === "♡") {
                button.textContent = "♥";
                button.style.color = "#f04444";
            } else {
                button.textContent = "♡";
                button.style.color = "#555";
            }

        });

    });


    /* =========================
       MOBILE MENU
    ========================= */

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

});