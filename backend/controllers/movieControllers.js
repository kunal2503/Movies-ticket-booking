// const movie = require("../model/movie");
const Movies = require("../model/movie");
const Users = require("../model/user");
const uploadImage = require("../middleware/upload");
const Like = require("../model/like");

exports.getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movies.find();
    if (!allMovies) {
      return res.status(404).json({ message: "Movies not found" });
    }

    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.moviesDetails = async (req, res) => {
  try {
    const moviesId = req.params.id;
    console.log(moviesId);

    const movieDetails = await Movies.findById(moviesId);
    if (!movieDetails) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movieDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
  }
};
exports.editMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const likes = req.body.likes;

    const userExists = await Users.findById(req.body.userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const movieExits = await Movies.findById(movieId);
    if (!movieExits) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await movieExits.save();

    res.status(200).json(movieExits);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.addMovie = async (req, res) => {
  try {
    const { movieName, category, description } = req.body;

    if (!movieName || !category || !description || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = await uploadImage(req.file.buffer);
    if (!imageUrl) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const newMovie = new Movies({
      movieName,
      category,
      description,
      image: imageUrl,
    });
    await newMovie.save();

    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteMovie = () => {};

