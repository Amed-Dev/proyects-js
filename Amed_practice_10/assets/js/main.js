async function includeHTML(url, targetElement) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlContent = await response.text();
    targetElement.innerHTML = htmlContent;
  } catch (error) {
    console.error("Error loading HTML:", error);
  }
}

async function loadHeader(activeNav) {
  const headerElement = document.querySelector("header");
  await includeHTML("./layout/header.html", headerElement);
  $(activeNav).toggleClass("active");
}

async function loadBanner() {
  const bannerElement = document.querySelector("#home");
  await includeHTML("./layout/banner.html", bannerElement);
  initializeSliders();
}

async function loadBooksSection() {
  const booksElement = document.querySelector("#books");
  await includeHTML("./layout/books.html", booksElement);
}

async function loadNutritionistSection() {
  const nutritionistElement = document.querySelector("#nutritionist");
  await includeHTML("./layout/nutritionist.html", nutritionistElement);
}

async function loadFooter() {
  const footerElement = document.querySelector("footer");
  await includeHTML("./layout/footer.html", footerElement);
}

async function loadRecipe() {
  try {
    const response = await fetch("./assets/data/recipes.json");
    if (response.ok) {
      let data = await response.json();
      showRecipes(data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    console.error(`Error loading data from server - ${e.message}`);
  }
}

// mostrar info de las recetas en HTML
function showRecipes(data) {
  //calcular las calorías totales de las recetas
  const calories = (C, P, G) => C * 4 + P * 4 + G * 9;
  let containerRecipes = document.querySelector("#recipesDetails");
  let contentRecipes = "";
  const recipes = data;

  recipes.forEach((recipe) => {
    let name = recipe[1];
    let category = recipe[2];
    let fats = recipe[4];
    let carbohydrates = recipe[3];
    let proteins = recipe[5];
    let totalCalories = calories(carbohydrates, proteins, fats);
    let itemCategory =
      category === "bebida"
        ? { color: "text-bg-info" }
        : category === "desayuno"
        ? { color: "text-bg-warning" }
        : category === "desayuno, snack"
        ? { color: "text-bg-success" }
        : category === "snack"
        ? { color: "text-bg-snack" }
        : category === "almuerzo"
        ? { color: "text-bg-secondary" }
        : { color: "text-bg-primary" };
    contentRecipes += `<div class="card col-3 col-md-6" style="width: 18rem;">
    <img src="${recipe[6]}" class="card-img-top" alt="${name}">
    <div class="card-body">
      <span class="badge rounded-pill ${itemCategory.color} text-capitalize">${category}</span>
      <p class="card-text fw-bold ">${name}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Grasas: ${fats} g</li>
      <li class="list-group-item">Carbohidratos: ${carbohydrates} g</li>
      <li class="list-group-item">Proteínas: ${proteins} g</li>
      <li class="list-group-item fw-semibold text-decoration-underline text-success-emphasis ">Calorías totales: ${totalCalories} cal</li>
    </ul>
  </div>`;
  });
  containerRecipes.innerHTML = contentRecipes;
}

function initializeSliders() {
  if (typeof $.fn.zoomSlider !== "undefined") {
    console.log("Initializing zoomSlider...");
    $("#demo-1").zoomSlider({
      src: [
        "./assets/img/banner1.jpg",
        "./assets/img/banner2.jpg",
        "./assets/img/banner3.jpg",
        "./assets/img/banner4.jpg",
      ],
      overlay: "plain",
    });
  } else {
    console.error("Zoom slider plugin not found");
  }
}

function scrollNavSets() {
  const currentTheme = localStorage.getItem("theme");
  let darkIcon = "./assets/img/icon-dark.png";
  let lightIcon = "./assets/img/icon2.png";
  let scroll = $(window).scrollTop();

  if (currentTheme) {
    if (scroll >= 80) {
      $("#site-header").addClass("nav-fixed");
      document.querySelector("#icon-site").src =
        currentTheme === "light" ? lightIcon : darkIcon;
    } else {
      $("#site-header").removeClass("nav-fixed");
      document.querySelector("#icon-site").src =
        currentTheme === "light" ? darkIcon : darkIcon;
    }
  }
}
