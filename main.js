const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "494ac5a4";
const APP_key = "2b4943b16f8a52564fb316a35aa5f9dc"



 searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
     console.log(searchQuery);
    fetchAPI();
 });
async function fetchAPI(){
    const baseURL = `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_key}&type=public&q=${searchQuery}`; 
    const response =  await fetch(baseURL);
    const data = await response.json();
     generateHTML(data.hits);
     console.log(data);
    
   
}
function generateHTML(results){
    container.classList.remove("initial");
    let generatedHTML = "";
   /* this is a loop */
    results.map(result =>{
        let isKosher = result.recipe.healthLabels.includes("Kosher");
        let hasPork = result.recipe.ingredientLines.some(ingredient => ingredient.toLowerCase().includes("pork"));
        generatedHTML +=
        `
        <div class="item">
        <a href="${result.recipe.url}" target="_blank">
                 <img src="${result.recipe.image}" alt="">
                 </a>
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <p class="item-data">Cuisine: ${result.recipe.cuisineType}</p>
                    <p>Kosher: ${isKosher ? "<span style='color:green;'>✔️</span>" : "<span style='color:red;'>❌</span>"}</p>
                    <p>Pork: ${hasPork ? "<span style='color:green;'>✔️</span>" : "<span style='color:red;'>❌</span>"}</p>
                    
                    
                  
                </div>
                

            </div>
        `

    })
    searchResultDiv.innerHTML = generatedHTML;
    
}
