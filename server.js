const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("🚀 Backend is running!");
});

mongoose.connect("mongodb+srv://shabbirinamdarpress:9881642086@cluster0.pjkyxxf.mongodb.net/newsDB?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch(err => console.log("❌ MongoDB connection error:", err));

const NewsSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    image: String, // ✅ Stores Base64 image or URL
    createdAt: { type: Date, default: Date.now }
});

const News = mongoose.model("News", NewsSchema);

app.post("/add-news", async (req, res) => {
    try {
        console.log("📥 Received Request:", req.body); // ✅ Debugging log

        const { title, content, category, image } = req.body;

        if (!title || !content) {
            return res.status(400).send("❌ Title and content are required!");
        }

        const newNews = new News({ title, content, category, image });
        await newNews.save();

        console.log("✅ News Saved:", newNews);
        res.status(201).send("✅ News added successfully!");
    } catch (error) {
        console.error("❌ Error saving news:", error);
        res.status(500).send("❌ Error adding news!");
    }
});

app.get("/get-news", async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).send("❌ Error fetching news!");
    }
});

app.delete("/delete-news/:id", async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.status(200).send("✅ News deleted successfully!");
    } catch (error) {
        res.status(500).send("❌ Error deleting news!");
    }
});

app.listen(5000, () => console.log(`🚀 Server running on port 5000`));
