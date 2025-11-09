const express =  require("express");
const {likeCounts,likeMovie} = require("../controllers/likeControllers")


const router = express.Router();

router.get("/like-count/:movieId/:userId",likeCounts);
router.post("/like-movie/:movieId/user/:userId",likeMovie);


module.exports =  router;