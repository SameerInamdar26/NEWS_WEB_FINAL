// Load categories dynamically
const categoryList = document.getElementById("news-category");
const availableCategories = ["राजकारण", "मनोरंजन", "क्रीडा", "ताज्या बातम्या"];

availableCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryList.appendChild(option);
});

// Filter news articles by category
const filterButtons = document.querySelectorAll(".category-filter");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;
        filterArticles(selectedCategory);
    });
});

function filterArticles(category) {
    const articles = document.querySelectorAll(".news-article");
    articles.forEach(article => {
        article.style.display = article.dataset.category === category ? "block" : "none";
    });
}
