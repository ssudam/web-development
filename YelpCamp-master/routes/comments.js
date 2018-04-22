var express=require("express");
var yelpCamp=require("../models/campgrounds");
var comment=require("../models/comment");
var middleware=require("../middleware");
var router=express.Router({mergeParams:true});
//show comment
router.get("/new",middleware.isLoggedIn,function(req,res)
{
    yelpCamp.findById(req.params.id,function(err,campground)
    {
        if(err)
        {     
            console.log(err);
        }
        else
        {
          res.render("comments/new",{campground:campground});  
        }
    });
    
});
//post
router.post("/",middleware.isLoggedIn,function(req,res)

{
    yelpCamp.findById(req.params.id,function(err,campground)
    {
        if(err)
        {   
            req.flash("err","Something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            // req.body.comment
            comment.create(req.body.comment,function(err,comment)
            {
                if(err)
                {
                     
                    console.log(err);
                }
                else
                {
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment._id);
 
                    campground.save();
                   
                    req.flash("success","Comment added successfully");
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
    
});
//comment edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res)
{
    yelpCamp.findById(req.params.id,function(err,foundCampground)
    {
        if(err|| !foundCampground)
        {
            req.flash("err","Campground not found");
            return res.redirect("back");
        }
        comment.findById(req.params.comment_id,function(err,foundComment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
             res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
        
    });
    });
    
    
    
});
//comment update route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res)
{
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment)
    {
        if(err)
        {     
            res.redirect("back");
        }
        else
        {
            
            res.redirect("/campgrounds/"+req.params.id);
           
        }
    });
});
//comments destroy
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res)
{
    comment.findByIdAndRemove(req.params.comment_id,function(err)
    {
        if(err)
        {
            res.redirect("back");
        }
        else
        {   req.flash("success","Comment has been deleted!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


module.exports=router;