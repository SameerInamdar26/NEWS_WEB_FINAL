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

const newsForm = document.getElementById("news-form");
const newsList = document.getElementById("news-list");

newsForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // ✅ Prevents page refresh

    console.log("📤 News submission started..."); // ✅ Debugging log

    const title = document.getElementById("news-title").value.trim();
    const content = document.getElementById("news-content").value.trim();
    const category = document.getElementById("news-category").value.trim();
    const imageInput = document.getElementById("news-image").files[0];

    if (!title || !content) {
        alert("❌ Title and content are required!");
        return;
    }

    let imageBase64 = "";
    if (imageInput) {
        const reader = new FileReader();
        reader.readAsDataURL(imageInput);
        await new Promise(resolve => reader.onload = () => {
            imageBase64 = reader.result;
            resolve();
        });
    }

    console.log("📤 Sending data:", { title, content, category, image: imageBase64 });

    try {
        const response = await fetch("http://localhost:5000/add-news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, category, image: imageBase64 })
        });

        console.log("📥 Response received:", response);

        if (response.ok) {
            alert("✅ News added successfully!");
            newsForm.reset();
            loadArticles(); 
        } else {
            alert("❌ Failed to add news!");
            console.error("❌ Error adding news:", response.statusText);
        }
    } catch (error) {
        console.error("❌ Network error:", error);
    }
});

async function loadArticles() {
    console.log("🔎 Fetching news from MongoDB...");
    
    newsList.innerHTML = "";

    try {
        const response = await fetch("http://localhost:5000/get-news");
        const articles = await response.json();

        articles.forEach(article => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${article.title}</strong> (${article.category}) - <button onclick="deleteArticle('${article._id}')">हटवा</button>`;
            newsList.appendChild(listItem);
        });
    } catch (error) {
        console.error("❌ Error loading news:", error);
    }
}

async function deleteArticle(id) {
    console.log(`🗑️ Deleting news ID: ${id}`);

    const response = await fetch(`http://localhost:5000/delete-news/${id}`, { method: "DELETE" });

    if (response.ok) {
        alert("✅ News deleted successfully!");
        loadArticles();
    } else {
        alert("❌ Failed to delete news!");
        console.error("❌ Error deleting news:", response.statusText);
    }
}

document.addEventListener("DOMContentLoaded", loadArticles);
