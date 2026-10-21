require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error(err.message));

const Client = mongoose.model("Client", {
    nom: String,
    email: String,
});

app.get("/", (req, res) => {
    res.send("Backend CRM Badr actif ✅");
});

app.get("/api/clients", async (req, res) => {
    res.json(await Client.find());
});

app.post("/api/clients", async (req, res) => {
    res.json(await Client.create(req.body));
});

if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Serveur lancé");
    });
}

module.exports = app;