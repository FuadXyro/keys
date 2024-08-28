const express = require("express");
const cors = require("cors");
const path = require("path");
const chalk = require("chalk");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require('body-parser');
const ejs = require('ejs');


const config = require("./schema/config");
const docs = require("./schema/endpoint");
const api = require("./router/api");
const anim = require("./lib/print");
const { runtime } = require("./lib/functionals");

const app = express();

// Middleware Configuration
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use("/api", api);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));

// Route Handlers
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/about", (req, res, next) => {
res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get("/donate", (req, res, next) => {
  res.redirect("https://saweria.co/ZxKyuu7");
});

app.get("/developers", (req, res, next) => {
res.sendFile(path.join(__dirname, 'views', 'dev.html'));
});

app.get("/profile", (req, res, next) => {
res.sendFile(path.join(__dirname, 'views', 'profil.html'));
});

app.get("/feedback", (req, res, next) => {
res.sendFile(path.join(__dirname, 'views', 'feedback.html'));
});

app.get('/hidden/runtime', (req, res) => {
  res.json({
    status: true,
    depelopernya: 'Irull2nd',
    runtime: runtime(process.uptime()),
  })
})

app.use(
  "/playground",
  swaggerUi.serve,
  swaggerUi.setup(docs.swaggerDocument, docs.options),
);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the Server
app.listen(config.options.port, () => {
  console.log(chalk.cyan("Kyuu API - Base by @Irull2nd"));
  anim(`Server is running on http://localhost:${config.options.port}`);
});
