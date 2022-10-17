const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

mongoose.connect(
    `mongodb+srv://milica:milica11@cluster0.h2pzh.mongodb.net/webpanorama?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("connected", function () {
    console.log("Connected successfully");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});