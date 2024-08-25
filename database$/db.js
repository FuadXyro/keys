"use strict";
const {
  limitCount,
  limitPremium,
  dateLimit,
  profilePath,
  adminEmail,
} = require("../library/settings");
//const { User } = require("./model");

function tanggal() {
  var myMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  var myDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum at",
    "Sabtu",
  ];
  var tgl = new Date();
  var day = tgl.getDate();
  var bulan = tgl.getMonth();
  var thisDay = tgl.getDay();
  var ThisDay = myDays[thisDay];
  var yy = tgl.getYear();
  var year = yy < 1000 ? yy + 1900 : yy;
  return `${ThisDay}, ${day} - ${myMonths[bulan]} - ${year}`;
}

exports.addUser = async (email, username, password, apikey) => {
  let obj = {
    id: await guidGenerator(),
    email,
    username,
    password,
    apikey,
    limiter: dateLimit,
    limit: limitCount,
    since: tanggal(),
    url: profilePath,
    premium: adminEmail.includes(email),
    verif: true,
    isOwner: adminEmail.includes(email),
  };
  let users = await global.db.get("USERS");
  if (!users) {
    global.db.set("USERS", [email]);
  } else {
    global.db.set("USERS", users.concat(email));
  }
  global.db.set(`Member_${email}`, obj);
};

exports.checkEmail = async (gmail) => {
  let users = await global.db.get(`Member_${gmail}`);
  if (!users) {
    return false;
  } else {
    return true;
  }
};

async function checkUsername(username) {
  let users = Object.values(global.db.JSON()).find(
    (x) => x.username == username
  );
  if (users) {
    return true;
  } else {
    return false;
  }
}
module.exports.checkUsername = checkUsername;

/*
async function resetAllLimit() {
  let users = await User.find({});
  users.forEach(async (data) => {
    let { premium, username } = data;
    if (premium !== null) {
      return User.updateOne(
        { username: username },
        { limit: limitPremium },
        function (err, res) {
          if (err) throw err;
        }
      );
    } else {
      return User.updateOne(
        { username: username },
        { limit: limitCount },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
  });
}
module.exports.resetAllLimit = resetAllLimit;
*/
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
