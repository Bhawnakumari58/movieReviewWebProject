const express=require("express");
const path=require("path");
const app=express();
const port=process.env.PORT || 8000;

const staticPath=path.join(__dirname,"../public");

app.set('view engine', 'hbs');
app.use(express.static(staticPath));

app.get("/",(req,res)=>{
    res.render('index');
})

app.get("*",(req,res)=>{
    res.render('404error');
})

app.listen(port,()=>{
    console.log(`listining to the port ${port}`);
})