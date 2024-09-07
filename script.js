const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const recipesDiv = document.getElementById('recipes');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(meals) {
    recipesDiv.innerHTML = '';
    if (meals) {
        meals.forEach(meal => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';

            recipeCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><a href="${meal.strSource}" target="_blank">Recipe Source</a></p>
            
            `;

            recipesDiv.appendChild(recipeCard);
        });
    } else {
        recipesDiv.innerHTML = '<p>No recipes found.</p>';
    }
}

