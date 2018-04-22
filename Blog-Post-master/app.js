//Import packages!!
var express     = require("express"),
    app         = express(),
    expressSanitizer=require("express-sanitizer"),
    bodyParser  = require("body-parser"),
    methodOverride=require("method-override"),
    mongoose    = require("mongoose");
    
    //APP CONFIG
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/blog_app");
var blogSchema= new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}
});

var Blogs=mongoose.model("Blogs",blogSchema);

//RESTFUL ROUTES
//INDEX!!
app.get("/",function(req,res)
{
    res.redirect("/blogs");
});
app.get("/blogs",function(req,res)
{
    Blogs.find({},function(err,blogInfo)
    {
        if(err)
        {
            console.log("Something went wrong!!");
            console.log(err);
        }
        else
        {
          res.render("index",{blogData:blogInfo}); 
          
        }
    });
    
});

//NEW!!
app.get("/blogs/new",function(req,res)
{
    res.render("new");
});

//CREATE!!
app.post("/blogs",function(req,res)
{
    var title=req.body.title;
    var image=req.body.image;
    var body=req.body.body;
    var blogContent={title:title,image:image,body:body};
    blogContent.body=req.sanitize(blogContent.body);
    Blogs.create(blogContent,function(err,data)
    {
        if(err)
        {
            res.render("new");
        }
        else
        {
          res.redirect("/blogs");  
        }
    });
});
//SHOW!!
app.get("/blogs/:id",function(req,res)
{
    Blogs.findById(req.params.id,function(err,dataId)
    {
        if(err)
        {
            
            res.redirect("/blogs");
            
        }
        else
        {
        res.render("show",{blogId:dataId});     
        }
    });
});
//EDIT route!!
app.get("/blogs/:id/edit",function(req,res)
{
    Blogs.findById(req.params.id,function(err,dataId)
    {
        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
          res.render("edit",{blogId:dataId});  
        }
    });
    
});

//UPDATE route!!
app.put("/blogs/:id",function(req,res)
{
     var title=req.body.title;
    var image=req.body.image;
    var body=req.body.body;
    var blogContent={title:title,image:image,body:body};
    blogContent.body=req.sanitize(blogContent.body);
    Blogs.findByIdAndUpdate(req.params.id,blogContent,function(err,data)
    {
        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//DELETE route!!
app.delete("/blogs/:id",function(req,res)
{
    //delete and redirect
    Blogs.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            res.redirect("/blogs");
        }
        else
        {
           res.redirect("/blogs"); 
        }
    });
    
});





//listen to server 
app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("The application server has started!! :)");
});