const Like =  require("../model/like");
const Movies =  require("../model/movie");
const Users =  require("../model/user");

exports.likeCounts = async(req,res) =>{
    try{
       const {movieId,userId} =  req.params;

       if(!movieId || !userId){
        return res.status(400).json({message : "MovieId is required"});
       }
       const movieExit =  await Movies.findById({_id: movieId});
       const userExist =  await Users.findById({_id : userId});
       if(!movieExit || !userExist){
        return res.status(404).json({message : "Movie not exist"})
       }
       const likesCount =  await Like.countDocuments({movieId : movieId}) 
       const userLike =  await Like.findOne({likedBy : userExist._id})
       if(!userLike){
        return res.status(200).josn({likes : likesCount,userLike : false})
       }
       res.status(200).json({likes : likesCount, userLike : true})
    }catch(error){
      console.log(error)
        res.status(500).json({message : "Internal server error"});
    }
}

exports.likeMovie = async (req, res) => {
  try {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const { like } = req.body;
    console.log(like)
    if (!userId || !movieId || typeof like !== "boolean") {
      return res.status(400).json({ message: "UserId or MovieId is required" });
    }

    const userExist = await Users.findById({ _id: userId });
    const moviesExist = await Movies.findById({ _id: movieId });
    if (!userExist || !moviesExist) {
      return res.status(404).json({ message: "User or Movie not found" });
    }
     

    if(like === true){
      const alreadyLiked =  await Like.findOne({movieId : moviesExist._id, likedBy : userExist._id});
      if(alreadyLiked){
        return res.status(400).json({message : "Movie already liked"});
      }
    const newLike = new Like({
          movieId : moviesExist._id,
          likedBy :  userExist._id,

        })
        await newLike.save();
        const likeCount =  await Like.countDocuments({movieId : moviesExist._id});
        return res.status(200).json({message : "Movie liked successfully",likes :likeCount, userLike : true});
    }
        await Like.findOneAndDelete({movieId : moviesExist._id, likedBy : userExist._id});
        const likeCount =  await Like.countDocuments({movieId : moviesExist._id});
        
      res.status(200).json({message : "Movie Unliked successfully",likes :likeCount, userLike : false});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
};
