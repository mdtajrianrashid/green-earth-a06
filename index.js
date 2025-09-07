// DOM elements
const categoryContainer = document.getElementById("categoryContainer");
const plantsContainer = document.getElementById("plantsContainer");
const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// Cart array
let cart = [];

// Fetch all plants from API
const fetchAllPlants = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    return data.plants; // array of plants
  } catch (err) {
    console.error("Error fetching plants:", err);
    return [];
  }
};

// Load categories and initial plants
const loadCategory = async () => {
  const plants = await fetchAllPlants();

  // Unique categories
  const categories = [...new Set(plants.map(p => p.category))];
  showCategory(categories);

  // Show all plants initially
  showPlantsByCategory(plants);
};

// Render categories in sidebar
const showCategory = (categories) => {
  categoryContainer.innerHTML = "";

  categories.forEach((cat, index) => {
    categoryContainer.innerHTML += `
      <li id="cat-${index}" class="category-item w-full text-left px-3 py-2 rounded cursor-pointer hover:bg-green-100">
        ${cat}
      </li>
    `;
  });

  // Category click handler
  categoryContainer.addEventListener("click", async (e) => {
    if (e.target.localName === "li") {
      const allLi = categoryContainer.querySelectorAll(".category-item");
      allLi.forEach(li => {
        li.classList.remove("bg-green-600", "text-white");
        li.classList.add("hover:bg-green-100");
      });

      e.target.classList.add("bg-green-600", "text-white");
      e.target.classList.remove("hover:bg-green-100");

      const plants = await fetchAllPlants();
      const filteredPlants = plants.filter(p => p.category === e.target.innerText);
      showPlantsByCategory(filteredPlants);
    }
  });
};

// Render plant cards
const showPlantsByCategory = (plants) => {
  if (plants.length === 0) {
    plantsContainer.innerHTML = "<p class='text-center text-gray-500'>No plants found in this category.</p>";
    return;
  }

  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const plantCard = document.createElement("div");
    plantCard.classList.add("bg-white", "rounded-lg", "shadow", "p-4", "flex", "flex-col");

    plantCard.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="rounded h-40 w-full object-cover">
      <div class="mt-3 flex flex-col justify-between flex-1">
        <h1 class="font-semibold text-lg">${plant.name}</h1>
        <p class="text-sm text-gray-600 mt-1 flex-1">${plant.description}</p>
        <div class="flex justify-between items-center mt-3">
          <span class="font-bold">৳${plant.price}</span>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">Add to Cart</button>
        </div>
      </div>
    `;

    // Add to Cart button
    const addBtn = plantCard.querySelector("button");
    addBtn.addEventListener("click", () => addToCart(plant));

    plantsContainer.appendChild(plantCard);
  });
};

// Add plant to cart
const addToCart = (plant) => {
  const existingItem = cart.find(item => item.id === plant.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }

  updateCartUI();
};

// Remove plant from cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};

// Update cart UI
const updateCartUI = () => {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";
    totalPriceEl.innerText = "৳0";
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("bg-green-50", "p-4", "rounded-lg", "flex", "justify-between", "items-center");

    cartItem.innerHTML = `
      <div class="flex flex-col justify-between rounded">
        <span class="font-semibold">${item.name}</span>
        <span class="text-gray-600">
          ৳${item.price} × <span class="plantQuantity">${item.quantity}</span>
        </span>
      </div>
      <div>
        <img src="./assets/Vector.png" alt="Remove" class="cursor-pointer removeBtn">
      </div>
    `;

    // Remove button
    const removeBtnEl = cartItem.querySelector(".removeBtn");
    removeBtnEl.addEventListener("click", () => removeFromCart(item.id));

    cartContainer.appendChild(cartItem);
  });

  // Update total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.innerText = `৳${total}`;
};

// Initialize page
loadCategory();

