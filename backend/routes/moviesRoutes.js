const express =  require("express");
const {getAllMovies, moviesDetails, editMovie,addMovie, deleteMovie} = require("../controllers/movieControllers")
const multer =  require("multer");

const storage =  multer.memoryStorage();
const upload =  multer({storage : storage});

const router = express.Router();

router.get("/get-all-movies",getAllMovies);
router.get("/movie-details/:id",moviesDetails);
router.post("/edit-movie/:id",editMovie);
router.post("/add-movie",upload.single('image'),addMovie);

router.delete("/delete-movie/:id",deleteMovie);


module.exports =  router;


