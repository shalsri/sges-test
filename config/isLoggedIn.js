// is logged in middleware for the authentication used in all the routes,
// to check whether the user is logged in or not

function IsAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
       // next(new Error(401));
        res.send("unauthorized");
    }
}

module.exports = IsAuthenticated;