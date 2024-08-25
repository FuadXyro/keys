const favicon = require("serve-favicon");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const expressLayout = require("express-ejs-layouts");
const compression = require("compression");
const passport = require("passport");
const flash = require("connect-flash");
const Limiter = require("express-rate-limit");
const fileUpload = require("express-fileupload");
const cron = require("node-cron");
const time = require("moment-timezone");

const { hitCounter, getRoute } = require("./library/functions");
const { profilePath, user } = require("./library/settings");
const apirouter = require("./routing/api");
const userRouters = require("./routing/users");
const premiumRouters = require("./routing/premium");
const app = express();
const PORT = process.env.PORT || 1912;
const JSONdb = require("simple-json-db");
global.db = new JSONdb("./database$/storage.json");
app.use(
  Limiter({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    message: "Oops too many requests #Greats Farhannn",
  })
);

app.enable("trust proxy", 1);
app.set("json spaces", 2);
app.set("view engine", "ejs");
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  res.on("finish", () => {
    if (!getRoute(req)) {
    } else {
      hitCounter(1);
    }
  });
  next();
});

app.use(expressLayout);
app.use(fileUpload());
app.use(compression());
app.use(favicon("./views/favicon.ico"));
app.use(express.static("assets"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000,
    },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require("./library/config")(passport);
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

/*app.get("/", async (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});*/
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/home.html");
});

app.get("/biodata", (req, res) => {
  res.sendFile(process.cwd() + "/views/biodata.html");
});

app.get("/sewabot", (req, res) => {
  res.sendFile(process.cwd() + "/views/sewabot.html")
})

app.get("/prince", (req, res) => {
  let users;
  let text_running;
  if (!req.user) {
    text_running =
      "Update+Instagram+Stories;Silahkan+lapor;Bila+menemukan+bug;Terima+kasih.";
    users = {
      apikey: "APIKEY",
      url: profilePath,
    };
  } else {
    users = req.user;
    if (users.email == user)
      text_running =
        "Kamu+Terlalu+Berharga+Bagiku;Tetapi.....;Aku+Terlalu+Sepele+Bagimu.;😊😊😊";
    else
      text_running = `Welcome+${users.username}.;Silahkan+gunakan+rest+api;Dengan+bijak.`;
  }
  res.render("shop", {
    text_running,
    //hit_counter: hit,
    androUser: req.headers["sec-ch-ua-platform"],
    //users_count,
    apikey: users.apikey,
    profile: users.url,
    list: require("./database$/apis.json"),
    layout: "layouts/main",
  });
});

app.get("/docs", async (req, res) => {
  let users;
  let text_running;
  if (!req.user) {
    text_running =
      "Update+Instagram+Stories;Silahkan+lapor;Bila+menemukan+bug;Terima+kasih.";
    users = {
      apikey: "APIKEY",
      url: profilePath,
    };
  } else {
    users = req.user;
    if (users.email == user)
      text_running =
        "Kamu+Terlalu+Berharga+Bagiku;Tetapi.....;Aku+Terlalu+Sepele+Bagimu.;😊😊😊";
    else
      text_running = `Welcome+${users.username}.;Silahkan+gunakan+rest+api;Dengan+bijak.`;
  }
  res.render("docs", {
    text_running,
    //hit_counter: hit,
    androUser: req.headers["sec-ch-ua-platform"],
    //users_count,
    apikey: users.apikey,
    profile: users.url,
    list: require("./database$/apis.json"),
    layout: "layouts/main",
  });
});

app.use("/api", apirouter);
app.use("/users", userRouters);
app.use("/premium", premiumRouters);

app.listen(PORT, function() {
  console.log("Server running on port http://localhost:" + PORT);
});

cron.schedule(
  "0 0 * * *",
  async () => {
    let users = Object.values(global.db.JSON()).find((x) => x.limit == 0);
    users.limit = 15;
    global.db.set(`Member_${users.email}`, users);
    console.log(
      `[ ${time.tz("Asia/Jakarta").format("HH:mm")} ] Success Reset Limit`
    );
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);
process.on("unhandledRejection", (reason, p) => {
  console.log(" [AntiCrash] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(" [AntiCrash] :: Multiple Resolves");
  console.log(type, promise, reason);
});