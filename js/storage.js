// Save news article to MongoDB
async function saveArticle() {
    event.preventDefault(); // Prevent form submission reload

    const title = document.getElementById("news-title").value;
    const content = document.getElementById("news-content").value;
    const category = document.getElementById("news-category").value;
    const image = document.getElementById("news-image").value || ""; 

    if (!title || !content) {
        alert("❌ Title and content are required!");
        return;
    }

    console.log("📤 Sending news data:", { title, content, category, image });

    const response = await fetch("http://localhost:5000/add-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, image })
    });

    if (response.ok) {
        alert("✅ News added successfully!");
        document.getElementById("news-form").reset();
        loadArticles(); // Refresh news list after saving
    } else {
        alert("❌ Failed to add news!");
        console.error("❌ Error adding news:", response.statusText);
    }
}

// Load news articles from MongoDB and display them
async function loadArticles() {
    console.log("🔎 Fetching news from MongoDB...");
    
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; // Clear previous list

    try {
        const response = await fetch("http://localhost:5000/get-news");

        if (!response.ok) {
            throw new Error(`❌ HTTP error! Status: ${response.status}`);
        }

        const articles = await response.json();
        console.log("📋 Loaded news articles:", articles);

        articles.forEach(article => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${article.title}</strong> (${article.category}) - <button onclick="deleteArticle('${article._id}')">हटवा</button>`;
            newsList.appendChild(listItem);
        });
    } catch (error) {
        console.error("❌ Error loading news:", error);
    }
}

// Delete news article from MongoDB
async function deleteArticle(id) {
    console.log(`🗑️ Deleting news article ID: ${id}`);

    const response = await fetch(`http://localhost:5000/delete-news/${id}`, { method: "DELETE" });

    if (response.ok) {
        alert("✅ News deleted successfully!");
        loadArticles(); // Refresh list after deletion
    } else {
        alert("❌ Failed to delete news!");
        console.error("❌ Error deleting news:", response.statusText);
    }
}

// Load articles when Admin Panel starts
document.addEventListener("DOMContentLoaded", loadArticles);
document.getElementById("news-form").addEventListener("submit", saveArticle);
