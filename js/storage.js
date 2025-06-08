// Save news article to MongoDB
async function saveArticle(title, content, category) {
    const response = await fetch("http://localhost:5000/add-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, image: "" }) // Image handling can be added later
    });

    if (response.ok) {
        alert("✅ News added successfully!");
    } else {
        alert("❌ Failed to add news!");
    }
}

// Load news articles from MongoDB and display them
async function loadArticles() {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; // Clear the list

    const response = await fetch("http://localhost:5000/get-news");
    const articles = await response.json();

    articles.forEach(article => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${article.title}</strong> (${article.category}) - <button onclick="deleteArticle('${article._id}')">हटवा</button>`;
        newsList.appendChild(listItem);
    });
}

// Delete news article from MongoDB
async function deleteArticle(id) {
    await fetch(`http://localhost:5000/delete-news/${id}`, { method: "DELETE" });
    loadArticles(); // Refresh the list after deletion
}

// Load articles on page load
document.addEventListener("DOMContentLoaded", loadArticles);
