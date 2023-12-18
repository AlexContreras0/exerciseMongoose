const crypto = require("crypto");

const secret = "Bootcamp Alex";
const secret2 = "Alex bootcamp";

const hash = crypto.createHmac("sha256", secret).update(secret2).digest("hex");

console.log(hash);
