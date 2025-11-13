// --- Shop By Shape Horizontal Scroll ---

const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const boxContainer = document.getElementById("boxContainer");

// Function to calculate scroll amount based on container width
function getScrollAmount() {
  const containerWidth = boxContainer.offsetWidth;
  // Scroll approx 1/3 of the container width
  return Math.floor(containerWidth / 3);
}

// Scroll right
rightArrow.addEventListener("click", () => {
  boxContainer.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
});

// Scroll left
leftArrow.addEventListener("click", () => {
  boxContainer.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
});

// Optional: drag to scroll (like a carousel)
let isDragging = false;
let startX;
let scrollLeft;

boxContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - boxContainer.offsetLeft;
  scrollLeft = boxContainer.scrollLeft;
});

boxContainer.addEventListener("mouseleave", () => {
  isDragging = false;
});

boxContainer.addEventListener("mouseup", () => {
  isDragging = false;
});

boxContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - boxContainer.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast multiplier
  boxContainer.scrollLeft = scrollLeft - walk;
});



document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js loaded successfully!");

    const categorySelect = document.getElementById("categorySelect");

    if (categorySelect) {
        categorySelect.addEventListener("change", function() {
            const selectedPage = this.value;
            console.log("➡ Redirecting to:", selectedPage);
            if (selectedPage) {
                // Redirect to the selected page
                window.location.href = selectedPage;
            }
        });
    } else {
        console.log("⚠️ categorySelect not found on this page");
    }
});


// const cartBtn = document.getElementById('cart-btn');
// if (cartBtn) {
//     cartBtn.addEventListener('click', () => {
//         // Because cart.html is in the same folder as current HTML
//         window.location.href = 'cart.html';
//     });
// }


// document.addEventListener('DOMContentLoaded', () => {

//     const cartSidebar = document.getElementById('cartSidebar');
//     const cartItems = document.getElementById('cartItems');
//     const totalPriceEl = document.getElementById('totalPrice');
//     const closeCartBtn = document.getElementById('closeCart');
//     const cartBtn = document.getElementById('cart-btn');

//     // Show cart sidebar when clicking cart icon
//     if (cartBtn) {
//         cartBtn.addEventListener('click', () => {
//             cartSidebar.classList.toggle('show');
//             renderCart();
//         });
//     }

//     // Close cart
//     if (closeCartBtn) {
//         closeCartBtn.addEventListener('click', () => {
//             cartSidebar.classList.remove('show');
//         });
//     }

//     // Add to cart buttons
//     const addButtons = document.querySelectorAll('.add-to-cart');
//     addButtons.forEach(button => {
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//             const name = button.getAttribute('data-name');
//             const price = parseInt(button.getAttribute('data-price'));
//             const image = button.getAttribute('data-image');

//             let cart = JSON.parse(localStorage.getItem('cart')) || [];

//             const existing = cart.find(item => item.name === name && item.image === image);
//             if (existing) existing.quantity += 1;
//             else cart.push({ name, price, image, quantity: 1 });

//             localStorage.setItem('cart', JSON.stringify(cart));

//             // Show cart sidebar automatically
//             cartSidebar.classList.add('show');
//             renderCart();
//         });
//     });

//     // Render cart items
//     function renderCart() {
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
//         cartItems.innerHTML = '';
//         let total = 0;

//         if (cart.length === 0) {
//             cartItems.innerHTML = '<p>No items in cart.</p>';
//         } else {
//             cart.forEach((item, index) => {
//                 total += item.price * item.quantity;

//                 const div = document.createElement('div');
//                 div.classList.add('cart-item');
//                 div.innerHTML = `
//                     <img src="${item.image}" alt="${item.name}">
//                     <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
//                     <button class="decrease">-</button>
//                     <button class="increase">+</button>
//                     <button class="remove">×</button>
//                 `;

//                 // Quantity + / -
//                 div.querySelector('.increase').addEventListener('click', () => {
//                     item.quantity += 1;
//                     localStorage.setItem('cart', JSON.stringify(cart));
//                     renderCart();
//                 });
//                 div.querySelector('.decrease').addEventListener('click', () => {
//                     if (item.quantity > 1) item.quantity -= 1;
//                     else cart.splice(index, 1);
//                     localStorage.setItem('cart', JSON.stringify(cart));
//                     renderCart();
//                 });

//                 // Remove item
//                 div.querySelector('.remove').addEventListener('click', () => {
//                     cart.splice(index, 1);
//                     localStorage.setItem('cart', JSON.stringify(cart));
//                     renderCart();
//                 });

//                 cartItems.appendChild(div);
//             });
//         }

//         totalPriceEl.textContent = `Total: ₹${total}`;
//     }

// });



document.addEventListener('DOMContentLoaded', () => {

    const cartSidebar = document.getElementById('cartSidebar');
    const cartItems = document.getElementById('cartItems');
    const totalPriceEl = document.getElementById('totalPrice');
    const closeCartBtn = document.getElementById('closeCart');
    const cartBtn = document.getElementById('cart-btn');

    // ===== 1. Open sidebar on clicking cart logo =====
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('show'); // open sidebar
            renderCart();                       // render cart items
        });
    }

    // ===== 2. Close sidebar =====
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('show');
        });
    }

    // ===== 3. Add to Cart buttons =====
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item already exists
            const existing = cart.find(item => item.name === name && item.image === image);
            if (existing) existing.quantity += 1;
            else cart.push({ name, price, image, quantity: 1 });

            localStorage.setItem('cart', JSON.stringify(cart));

            // Automatically open sidebar when adding product
            cartSidebar.classList.add('show');
            renderCart();
        });
    });

    // ===== 4. Render cart items in sidebar =====
    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>No items in cart.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;

                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <span>${item.name}</span>
                        <span>₹${item.price} x ${item.quantity}</span>
                    </div>
                    <div class="item-actions">
                        <button class="decrease">-</button>
                        <button class="increase">+</button>
                        <button class="remove">×</button>
                    </div>
                `;

                // Increase quantity
                div.querySelector('.increase').addEventListener('click', () => {
                    item.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                });

                // Decrease quantity
                div.querySelector('.decrease').addEventListener('click', () => {
                    if (item.quantity > 1) item.quantity -= 1;
                    else cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                });

                // Remove item
                div.querySelector('.remove').addEventListener('click', () => {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                });

                cartItems.appendChild(div);
            });
        }

        totalPriceEl.textContent = `Total: ₹${total}`;
    }

});
