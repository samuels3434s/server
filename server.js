const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Add a basic route for the home page
app.get("/", (req, res) => {
    res.send("Server is running! 🚀");
});

// ✅ Password Verification API
const PASSWORDS = [
    { password: "lodalel", start: new Date("2025-03-15T16:49:00"), end: new Date("2027-03-15T16:53:00") },
    { password: "2", start: new Date("2025-03-15T16:51:00"), end: new Date("2025-03-15T16:57:00") },
    { password: "hi", start: new Date("2025-03-15T16:41:00"), end: new Date("2026-03-16T16:53:59") }
];

app.post("/verify-password", (req, res) => {
    const { password } = req.body;
    const now = new Date();

    const validPassword = PASSWORDS.find(
        (entry) => entry.password === password && now >= entry.start && now <= entry.end
    );

    if (validPassword) {
        return res.json({ success: true });
    } else {
        return res.json({ success: false, message: "Invalid or expired password" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
