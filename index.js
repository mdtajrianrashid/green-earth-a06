// DOM elements
const categoryContainer = document.getElementById("categoryContainer");
const plantsContainer = document.getElementById("plantsContainer");
const cartContainer = document.getElementById("plantName").parentElement.parentElement; // parent of cart item
const totalPriceEl = document.getElementById("totalPrice");
const removeBtn = document.getElementById("removeBtn");

// Cart array
let cart = [];

// Fetch all plants from API
const fetchAllPlants = () => {
  return fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => data.plants)
    .catch(err => {
      console.error("Error fetching plants:", err);
      return [];
    });
};

// Load categories
const loadCategory = async () => {
  const plants = await fetchAllPlants();

  // Get unique categories
  const categories = [...new Set(plants.map(p => p.category))];
  showCategory(categories);

  // Show all plants initially
  showPlantsByCategory(plants);
};

// Render categories
const showCategory = (categories) => {
  categoryContainer.innerHTML = "";

  categories.forEach((cat, index) => {
    categoryContainer.innerHTML += `
      <li id="cat-${index}" 
          class="category-item w-full text-left px-3 py-2 rounded cursor-pointer hover:bg-green-100">
        ${cat}
      </li>
    `;
  });

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

// Render plants grid
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

    // Add to Cart functionality
    const addBtn = plantCard.querySelector("button");
    addBtn.addEventListener("click", () => addToCart(plant));

    plantsContainer.appendChild(plantCard);
  });
};

// Add item to cart
const addToCart = (plant) => {
  const existingItem = cart.find(item => item.id === plant.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }

  updateCartUI();
};

// Remove item from cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};

// Update cart UI
const updateCartUI = () => {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";
    totalPriceEl.innerText = "৳0";
    return;
  }

  // For simplicity, only show the first item in sidebar (like your HTML example)
  const item = cart[0];
  cartContainer.innerHTML = `
    <div class="bg-green-50 p-4 rounded-lg flex justify-between items-center">
      <div class="flex flex-col justify-between rounded">
        <span id="plantName" class="font-semibold">${item.name}</span>
        <span class="text-gray-600">
          <span id="plantPrice">৳${item.price}</span> × <span class="plantQuantity">${item.quantity}</span>
        </span>
      </div>
      <div>
        <img id="removeBtn" src="./assets/Vector.png" alt="Remove" class="cursor-pointer">
      </div>
    </div>
  `;

  // Update total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.innerText = `৳${total}`;

  // Attach remove button event
  const removeBtnEl = document.getElementById("removeBtn");
  removeBtnEl.addEventListener("click", () => removeFromCart(item.id));
};

// Initialize page
loadCategory();
