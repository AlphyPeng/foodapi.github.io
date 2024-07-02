// navbar
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.querySelector('.navbar-menu');

menuIcon.addEventListener('click', function () {
    // menu nav
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    } else {
        navMenu.classList.add('active')
    }

    // menu icon
    if (menuIcon.classList.contains('change')) {
        menuIcon.classList.remove('change');
    } else {
        menuIcon.classList.add('change');
    }
});

// search meal 
const searchBtn = document.getElementById('search-btn');
const searchMeal = document.querySelector('.search-info');

searchBtn.addEventListener('click', function () {
    searchMeal.classList.add('search-active');
});

const searchBtnRemove = document.getElementById('recipe-close-btn');

searchBtnRemove.addEventListener('click', function () {
    searchMeal.classList.remove('search-active');
});


// home-recipe
const findRecipes = document.getElementById('find-recipes');

findRecipes.addEventListener('click', function () {
    searchMeal.classList.add('search-active');
});

//search for menu
const searchBut = document.querySelector('.search-but');
const menuMeal = document.querySelector('.menu-meal');


searchBut.addEventListener('click', function () {
    let searchInput = document.getElementById('search-input').value.trim();
    console.log(searchInput.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            if (data.meals) {
                data.meals.forEach(function (meal) {
                    html += `<div class="menu-item" data-id = "${meal.idMeal}">
                <div class="menu-img">
                    <img src="${meal.strMealThumb}"
                        alt="food">
                </div>
                <div class="rating-container">
                    <i class="fas fa-star fa-2x active"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                </div>
                <div class="menu-text">
                    <h3>${meal.strMeal}</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <button class="recipe-btn">Read More</button>
                </div>
            </div>`;
                });
            }

            if (searchInput === "") {
                let notFound = document.querySelector('.notFound');
                notFound.classList.add('show');
                    html += `<div class="menu-item" data-id = "${meal.idMeal}">
                <div class="menu-img">
                    <img src="${meal.strMealThumb}"
                        alt="food">
                </div>
                <div class="rating-container">
                    <i class="fas fa-star fa-2x active"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                </div>
                <div class="menu-text">
                    <h3>${meal.strMeal}</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <button class="recipe-btn">Read More</button>
                </div>
            </div>`;
            }
            if (!data.meals) {
                let notFound = document.querySelector('.notFound');
                notFound.classList.add('show');
                data.meals.forEach(function (meal) {
                    html += `<div class="menu-item" data-id = "${meal.idMeal}">
                <div class="menu-img">
                    <img src="${meal.strMealThumb}"
                        alt="food">
                </div>
                <div class="rating-container">
                    <i class="fas fa-star fa-2x active"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                    <i class="fas fa-star fa-2x"></i>
                </div>
                <div class="menu-text">
                    <h3>${meal.strMeal}</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <button class="recipe-btn">Read More</button>
                </div>
            </div>`;
                });
            }
            else {
                let notFound = document.querySelector('.notFound');
                notFound.classList.remove('show');
            }

            menuMeal.innerHTML = html;
        });
});

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`)
    .then(response => response.json())
    .then(data => {
        let menu = "";
        if (data.meals) {
            data.meals.forEach(function (meal) {
                menu += `<div class="menu-item" data-id = "${meal.idMeal}">
            <div class="menu-img">
                <img src="${meal.strMealThumb}"
                    alt="food">
            </div>
            <div class="rating-container">
                <i class="fas fa-star fa-2x active"></i>
                <i class="fas fa-star fa-2x"></i>
                <i class="fas fa-star fa-2x"></i>
                <i class="fas fa-star fa-2x"></i>
                <i class="fas fa-star fa-2x"></i>
            </div>
            <div class="menu-text">
                <h3>${meal.strMeal}</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <button class="recipe-btn">Read More</button>
            </div>
        </div>`;
            });
            menuMeal.innerHTML = menu;
        }
    });


//Menu Modal

//close modal
const menuDetails = document.querySelector('.menu-details-content');
const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', function () {
    menuDetails.parentElement.classList.remove('view-recipes');
    console.log('pogi')
})


menuMeal.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target);
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                mealRecipeModal(data.meals);
            }
            );
    }
});

function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let modal = `<h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instruction:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>`;

    menuDetails.innerHTML = modal;
    menuDetails.parentElement.classList.add('view-recipes')

}



