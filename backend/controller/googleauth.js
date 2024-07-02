const passport = require("passport");

// const CLIENT_URL = "http://localhost:3000/";

async function userGoogleLogin (req, res){
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  }
  module.exports = userGoogleLogin

  
  async function userGoogleLoginFaile (req, res){
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }
  module.exports = userGoogleLoginFaile
  
  async function userGoogleLogout (req, res){
    req.logout();
    res.redirect(CLIENT_URL);
  }
  module.exports = userGoogleLogout
  
  async function userGoogle(){ passport.authenticate("google", { scope: ["profile"] })}
  module.exports = userGoogle
  

  async function userGoogleCallBack () {
    passport.authenticate("google", {
      successRedirect: process.env.FRONTEND_URL,
      failureRedirect: "/login/failed",
    })
}
module.exports = userGoogleCallBack

