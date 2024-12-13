const {getUser,makeToken} = require("../controllers/token");
function isAutheticated(req,res,next){
    let isauthUser = getUser(req.cookies.mycookie);
    if(isauthUser){
        next();
    }
    else{
        res.json({message:"User not logged in"});
    }
}
function islogout (req,res,next){
    let isauthUser = getUser(req.cookies.mycookie);
    if(isauthUser){
        res.json({message:"Already logged in"});
    }
    else{
        next();
    }

}
module.exports = {
    isAutheticated,islogout
}