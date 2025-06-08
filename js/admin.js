// Simulated login system
const loginBtn = document.getElementById("login-btn");
const loginSection = document.querySelector(".login-section");
const newsManagement = document.querySelector(".news-management");

loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        loginSection.classList.add("hidden");
        newsManagement.classList.remove("hidden");
    } else {
        alert("अवैध प्रवेश! कृपया योग्य माहिती द्या.");
    }
});

// News management functionality
const newsForm = document.getElementById("news-form");
const newsList = document.getElementById("news-list");

// ✅ FIX: Send news to MongoDB instead of just adding to the list
newsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const title = document.getElementById("news-title").value;
    const content = document.getElementById("news-content").value;
    const category = document.getElementById("news-category").value;
    const imageFile = document.getElementById("news-image").value || "";

    if (!title || !content) {
        alert("कृपया पूर्ण माहिती भरा!");
        return;
    }

    console.log("📤 Sending news data:", { title, content, category, imageFile });

    const response = await fetch("http://localhost:5000/add-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, image: imageFile })
    });

    if (response.ok) {
        alert("✅ News added successfully!");
        newsForm.reset();
        loadArticles(); // ✅ FIX: Refresh list after saving
    } else {
        alert("❌ Failed to add news!");
        console.error("❌ Error adding news:", response.statusText);
    }
});

// ✅ FIX: Load news from MongoDB instead of only displaying new entries
async function loadArticles() {
    console.log("🔎 Fetching news from MongoDB...");
    
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

// ✅ FIX: Delete news from MongoDB instead of just removing from UI
async function deleteArticle(id) {
    console.log(`🗑️ Deleting news article ID: ${id}`);

    const response = await fetch(`http://localhost:5000/delete-news/${id}`, { method: "DELETE" });

    if (response.ok) {
        alert("✅ News deleted successfully!");
        loadArticles(); // ✅ FIX: Refresh list after deletion
    } else {
        alert("❌ Failed to delete news!");
        console.error("❌ Error deleting news:", response.statusText);
    }
}

// ✅ Load articles when Admin Panel starts
document.addEventListener("DOMContentLoaded", loadArticles);
