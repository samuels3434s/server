const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's PORT

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Home Route
app.get("/", (req, res) => {
    res.send("🚀 Server is running on Render!");
});

// ✅ Load passwords from environment variables
const PASSWORDS = JSON.parse(process.env.PASSWORDS || "[]");

app.post("/verify-password", (req, res) => {
    const { password } = req.body;
    const now = new Date();

    const validPassword = PASSWORDS.find(
        (entry) => entry.password === password && now >= new Date(entry.start) && now <= new Date(entry.end)
    );

    if (validPassword) {
        return res.json({ success: true });
    } else {
        return res.json({ success: false, message: "Invalid or expired password" });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
