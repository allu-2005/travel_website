const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS/JS/images from /public at the site root (e.g. /styles.css).
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Smart Travel Planner"
  });
});

const port = Number.parseInt(process.env.PORT, 10) || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

