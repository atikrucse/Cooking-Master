const searchBtn = document.getElementById('search-btn');
const searchResultContainer = document.getElementById('search-result-container');

searchBtn.addEventListener('click', function () {
    const searchKey = document.getElementById('search-key').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchKey}`)
        .then(res => res.json())
        .then(data => {

            data.meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                const mealInfo = `
                <div class="meal-div" data-id = "${meal.idMeal}">
                    <div class="meal-image">
                    <img src="${meal.strMealThumb}">
                    </div>
                    <div class="meal-info">
                        <h3>${meal.strMeal}</h3>
                        <button id="ingredientBtn">Get Ingredients</button>
                    </div>
                </div>
           `;
                mealDiv.innerHTML = mealInfo;
                searchResultContainer.appendChild(mealDiv);
            });

        })

});

//get meal recipe
const ingredientContainer = document.getElementById('ingredient-container');
searchResultContainer.addEventListener('click', function (event) {

    // Display Block None 
    const mainContainer = document.getElementById("main-container");
    mainContainer.style.display = 'none';
    const ingredientContainer = document.getElementById("ingredient-container");
    ingredientContainer.style.display = "block";


    event.preventDefault();
    let mealItem = event.target.parentElement.parentElement;
    //console.log(mealItem);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => {
            const mealData = data.meals;
            const meal = mealData[0];
            //console.log(meal);

            const ul = document.createElement('ul');
            const ingredientList = `
               
            <div id="ingredient">
                <div id="ingredient-image">
                    <img src="${meal.strMealThumb}">
                </div>
                <ul id="ingredient-list">
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                    <li>${meal.strIngredient6}</li>
                    <li>${meal.strIngredient7}</li>
                    <li>${meal.strIngredient8}</li>
                    <li>${meal.strIngredient9}</li>
                    <li>${meal.strIngredient10}</li>
                </ul>    
            </div>
               
            `;
            ul.innerHTML = ingredientList;
            ingredientContainer.appendChild(ul);

            //console.log(ingredient1);

        });

})



