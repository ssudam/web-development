//File Created by Vamshi
//Importing the packages!!
var express      =  require("express"),
    bodyParser   =  require("body-parser"),
    mongoose     =  require("mongoose"),
    flash        =require("connect-flash"),
    app          =  express(),
    methodOverride=require("method-override"),
    passport     =  require("passport"),
    expressSession=require("express-session"),
    localStrategy=  require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    User         =require("./models/user"),
    yelpCamp     =  require("./models/campgrounds"),
    comment      =  require("./models/comment"),
    seedDB       =  require("./seeds");
    
var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes      =require("./routes/index");
//Mongo config 
mongoose.connect(process.env.DATABASEURL);
//APP CONFIG
app.set("view engine","ejs");
app.use(flash());
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true})); 
app.use(methodOverride("_method"));
// seedDB();//seed the database
//PASSPORT CONFIG
app.use(expressSession({
    secret:"login functionality",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next)
{
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("err");
    res.locals.success=req.flash("success");
    next();
});
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);






//Listen to the server!!
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The server has started!! :)");
})