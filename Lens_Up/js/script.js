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
