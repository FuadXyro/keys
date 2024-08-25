"use strict";

const __path = process.cwd();
const { dateLimit } = require("./settings");

module.exports = async function (req, res, next) {
  let apikey = req.query.apikey;
  if (!apikey)
    return res.json({
      status: false,
      creator: "FuadXyro",
      message: "masukkan parameter apikey",
    });
  let users = Object.values(global.db.JSON()).find((x) => x.apikey == apikey);
  let expired;
  if (!users) expired = dateLimit;
  else expired = users.limiter;
  let daysUser = new Date(expired).getTime();
  let daysNow = new Date().getTime();
  let distance = daysUser - daysNow;
  let result = Math.floor(distance / (1000 * 60 * 60 * 24));
  let validasi =
    !users || result < 1 || users.limit == 0 || users.apikey !== apikey;
  if (validasi) return res.sendFile(__path + "/views/apikey.html");
  const Limit = users.isOwner ? users.limit : users.limit - 1;
  users.limit = Limit;
  await global.db.set(`Member_${users.email}`, users);
  next();
};
