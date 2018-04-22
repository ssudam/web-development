var yelpCamp=require("../models/campgrounds");
var comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next)
{
    

    //check if the user is logged in
        if(req.isAuthenticated())
        {
            yelpCamp.findById(req.params.id,function(err,foundCampground)
    {
        if(err || !foundCampground)
        {
            req.flash("err","campground not found");
            res.redirect("back");
        }
        else
        {
            //does not own the campground??
            if(foundCampground.author.id.equals(req.user._id))
            {
             next();  
            }
            else{
                req.flash("err","You dont have permission to do that")
                res.redirect("back");
            }
            
        }
        
    });
            
        }
        else
        {
           res.redirect("back");
        }

};
middlewareObj.checkCommentOwnership=function(req,res,next)
{
    

    //check if the user is logged in
        if(req.isAuthenticated())
        {
            comment.findById(req.params.comment_id,function(err,foundComment)
    {
        if(err || !foundComment)
        {
            req.flash("err","Comment not found")
            res.redirect("back");
        }
        else
        {
            //does not own the comment??
            if(foundComment.author.id.equals(req.user._id))
            {
             next();  
            }
            else{
               req.flash("err","You dont have permission to do that!!");
                res.redirect("back");
            }
        }
        
    });
        }
        else
        {
             req.flash("err","You need to be logged in to do that!!");
           res.redirect("back");
        }

};
middlewareObj.isLoggedIn=function(req,res,next)
{
    

    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("err","You need to be logged in to do that!");
    res.redirect("/login");
};


module.exports=middlewareObj;