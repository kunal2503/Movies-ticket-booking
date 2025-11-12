const dotenv =  require("dotenv");
dotenv.config();
const express =  require("express");
const cros = require("cors");
const {createClient} = require("redis")
const connectDb = require("./config/connectdb");
const authRoutes = require("./routes/authRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const userRoutes =  require("./routes/userRoutes");
const likeRoutes =  require("./routes/likeRoutes");
const bookingRoutes =  require("./routes/bookingRoutes");
const {redisClient, connectRedis} = require("./config/redisClient");

const app = express();
const PORT =  5000;

connectRedis()
.then(()=>{
    console.log("Redis connected successfully");
})
.catch((error)=>{
    console.log("Redis connection failed", error);
});





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
app.use("/movies",moviesRoutes);
app.use("/users",userRoutes);
app.use("/likes",likeRoutes);
app.use("/api",bookingRoutes);


app.get("/",(req,res)=>{
    console.log("Working fine");
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})