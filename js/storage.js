// Save articles to local storage
function saveArticle(title, content, category) {
    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles.push({ title, content, category });
    localStorage.setItem("articles", JSON.stringify(articles));
}

// Load articles from local storage
function loadArticles() {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; // Clear the list

    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles.forEach(article => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${article.title}</strong> (${article.category}) - <button onclick="deleteArticle('${article.title}')">हटवा</button>`;
        newsList.appendChild(listItem);
    });
}

// Delete an article from local storage
function deleteArticle(title) {
    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles = articles.filter(article => article.title !== title);
    localStorage.setItem("articles", JSON.stringify(articles));
    loadArticles(); // Refresh the list
}

// Load articles on page load
document.addEventListener("DOMContentLoaded", loadArticles);
