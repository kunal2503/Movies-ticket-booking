const express =  require("express");
const cros = require("cors");
const connectDb = require("./config/connectdb");
const authRoutes = require("./routes/authRoutes");


const app = express();
const PORT =  5000;


app.use(cros({
    origin :"*"
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}));

connectDb()
.then(()=>{
    console.log("Connected successfully");
}) 
.catch((error)=>{
    console.log(error);
})

app.use("/auth",authRoutes);


app.get("/",(req,res)=>{
    console.log("Working fine");
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})