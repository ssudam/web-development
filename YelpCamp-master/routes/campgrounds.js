var express=require("express");
var router=express.Router();
var yelpCamp=require("../models/campgrounds");
var middleware=require("../middleware");
//Index route
router.get("/",function(req,res)
{
    
    //get all the campgrounds!!
    yelpCamp.find({},function(err,allCampgrounds)
    {
        if(err)
        {
            console.log("Something went wrong!!");
        }
        else
        {
            
           res.render("campgrounds/index",{campGroundList:allCampgrounds, currentUser:req.user}); 
        }
    });
   
});
//Campgrounds new!!

//New!
router.get("/new",middleware.isLoggedIn,function(req,res)
{
    
    res.render("campgrounds/new");
});
//SHOW route!!
router.get("/:id",function(req,res)
{
    //find the campground with the provided ID
    yelpCamp.findById(req.params.id).populate("comments").exec(function(err,foundCampground)
    {
        if(err || !foundCampground)
        {
            req.flash("err","Campground not found");
            res.redirect("back");
        }
            else
            {
                
               res.render("campgrounds/show",{campgroundData:foundCampground}); 
              
            }
        }
    );
    //render the show template with the campground!!
    
    
});


//Post route!!
//Create route!!
router.post("/",middleware.isLoggedIn,function(req,res)
{
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground={name:name,image:image,price:price,description:description,author:author};
    //Create  a campground and save it to the database!!
    yelpCamp.create(newCampground,function(err,newCreated)
    {
        if(err)
        {
            console.log("Something went Wrong!!");
            console.log(err);
        }
        else
        {
            
            res.redirect("/campgrounds");
        }
    });
});

//EDIT CAMPGROUND ROUTES
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res)
{  
            yelpCamp.findById(req.params.id,function(err,foundCampground)
            {
                
              res.render("campgrounds/edit",{campgroundInfo:foundCampground});
        
            });
            
        
       
    
    
});

//UPDATE CAMPGROUND ROUTES
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res)
{
    //find and update the campground
    
    yelpCamp.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground)
    {
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//DESTROY ROUTES!!
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res)
{
    yelpCamp.findByIdAndRemove(req.params.id,function(err)

    {
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});






module.exports=router;