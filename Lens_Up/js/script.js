// --- Shop By Shape Horizontal Scroll ---
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const boxContainer = document.getElementById("boxContainer");

//  Run this code only if elements exist (prevents errors on retro/square pages)
if (leftArrow && rightArrow && boxContainer) {

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
}

// --- Category Redirect Dropdown ---
document.addEventListener("DOMContentLoaded", function () {
  console.log(" script.js loaded successfully!");

  const categorySelect = document.getElementById("categorySelect");

  if (categorySelect) {
    categorySelect.addEventListener("change", function () {
      const selectedPage = this.value;
      console.log("➡ Redirecting to:", selectedPage);
      if (selectedPage) {
        window.location.href = selectedPage;
      }
    });
  } else {
    console.log("categorySelect not found on this page");
  }
});

// --- Cart Sidebar Functionality ---
document.addEventListener("DOMContentLoaded", () => {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItems = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  const closeCartBtn = document.getElementById("closeCart");
  const cartBtn = document.getElementById("cart-btn");

  // ===== 1. Open sidebar on clicking cart logo =====
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      cartSidebar.classList.add("show");
      renderCart();
    });
  }

  // ===== 2. Close sidebar =====
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("show");
    });
  }

  // ===== 3. Add to Cart buttons =====
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const name = button.getAttribute("data-name");
      const price = parseInt(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(
        (item) => item.name === name && item.image === image
      );
      if (existing) existing.quantity += 1;
      else cart.push({ name, price, image, quantity: 1 });

      localStorage.setItem("cart", JSON.stringify(cart));

      // Automatically open sidebar when adding product
      cartSidebar.classList.add("show");
      renderCart();
    });
  });

  // ===== 4. Render cart items in sidebar =====
  function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>No items in cart.</p>";
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");
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
        div.querySelector(".increase").addEventListener("click", () => {
          item.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });

        // Decrease quantity
        div.querySelector(".decrease").addEventListener("click", () => {
          if (item.quantity > 1) item.quantity -= 1;
          else cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });

        // Remove item
        div.querySelector(".remove").addEventListener("click", () => {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });

        cartItems.appendChild(div);
      });
    }

    //totalPriceEl.textContent = `Total: ₹${total}`;
    // --- DISCOUNT LOGIC ---
    

    // --- DISCOUNT LOGIC based on TOTAL QUANTITY ---
      let totalQuantity = 0;
      cart.forEach(item => totalQuantity += item.quantity);

      let discount = 0;

      if (totalQuantity === 2) {
           discount = 0.10;
      } else if (totalQuantity === 4) {
           discount = 0.20;
      } else if (totalQuantity > 4) {
          discount = 0.30;
      }

    let discountAmount = total * discount;
    let finalTotal = total - discountAmount;

    // --- SHOW TOTAL IN SMALL FONT ---
    totalPriceEl.innerHTML = `
      <div style="font-size: 13px; line-height: 1.3;">
        <p>Subtotal: ₹${total}</p>
        <p>Discount (${discount * 100}%): -₹${discountAmount.toFixed(0)}</p>
        <strong>Final Total: ₹${finalTotal.toFixed(0)}</strong>
      </div>
    `;
  }
});

//bill
// --- Checkout Redirect ---
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "bill.html"; // only redirect
    });
  }
});



//login

// OPEN LOGIN POPUP WHEN USER ICON CLICKED
document.getElementById("login-btn").onclick = function () {
    document.getElementById("loginPopup").style.display = "flex";
};

// CLOSE FUNCTIONS
function closeLogin() { 
    document.getElementById("loginPopup").style.display = "none"; 
}

function closeRegister() { 
    document.getElementById("registerPopup").style.display = "none"; 
}

// SWITCH POPUPS
function openRegister() {
    closeLogin();
    document.getElementById("registerPopup").style.display = "flex";
}

function openLogin() {
    closeRegister();
    document.getElementById("loginPopup").style.display = "flex";
}

// EMAIL VALIDATION FUNCTION
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// PASSWORD VALIDATION FUNCTION (min 6 chars, letters + numbers)
function isValidPassword(pass) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);
}

// LOGIN VALIDATION
function submitLogin() {
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    if (email === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Invalid Email Address!");
        return;
    }

    if (!isValidPassword(pass)) {
        alert("Password must be at least 6 characters and include letters and numbers.");
        return;
    }

    closeLogin();
    setTimeout(() => { alert("Thanks for Login"); }, 200);
}

// REGISTER VALIDATION
function submitRegister() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPass").value.trim();

    if (name === "" || email === "" || pass === "") {
        alert("All fields are required!");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Invalid Email Address!");
        return;
    }

    if (!isValidPassword(pass)) {
        alert("Password must be at least 6 characters and include letters and numbers.");
        return;
    }

    closeRegister();

    // AFTER REGISTER → OPEN LOGIN POPUP
    setTimeout(() => {
        alert("Registration successful!");
        openLogin();  // automatically open login popup
    }, 200);
}


//navbar



