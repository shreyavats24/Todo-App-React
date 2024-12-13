const jwt = require("jsonwebtoken");
const secret = process.env.Token;
function makeToken(userObj) {
  // console.log("token",userObj);
  const payload = {
    email: userObj.username,
    id: userObj.user_id,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

 function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
    return null;
  }
}
// console.log(data("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjk1MDY5MDIsImV4cCI6MTcyOTUxMDUwMn0.mFSCS2E0_bgGlRx775Kmg-77S2b5Z09CdmSueMfJ-hg"));

module.exports = {
  makeToken,
  getUser,
};
