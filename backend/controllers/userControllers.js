const { image } = require("../config/cloudinary");
const uploadImage = require("../middleware/upload");
const Users =  require("../model/user");
const Movies =  require("../model/movie");
const redisClient = require("../config/redisClient").redisClient;


exports.getUserInfo = async(req,res) =>{
    try{
        const userId =  req.params.id;
        if(!userId){
            return res.status(400).json({message : "userId not found"});
        }
        const userExist =  await Users.findById({_id : userId}).select("-password -__v"); 
        if(!userExist){
            return res.status(404).json({message : "User not Found"});
        }
        
        res.status(200).json({user : userExist});
    } catch(error){
        console.log(error);
        res.status(500).json({message : "internal server error"});
    }
}
exports.getAllUsers = (req,res) =>{

}
exports.editUser = async(req,res) =>{
    try{
        const id =  req.params.id;
        let imageUrl = "";
        if(!id){
            return res.status(400).json({message : "UsreId not found"});
        }
        const {email, username , profileImage} = req.body;
       
        const userExist =  await Users.findById({_id : id});
        if(!userExist){
            return res.status(404).json({message : "User not found"});
        }

        if(req.file.length !== 0 || req.file !== null || req.file !== undefined || req.file){ 
            imageUrl =  await uploadImage(req.file.buffer);
        }
        

        const updatedData = await Users.findByIdAndUpdate({_id : id}, {
            email : userExist.email,
            username : username.length === 0 ? userExist.username : username,
            profileImage : imageUrl.length === 0 ? userExist.profileImage : imageUrl
        })
        
        console.log(updatedData);

        res.status(200).json({message : "User Information updated successfully"});
    } catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"});
    }

}
exports.deleteUser = (req,res) =>{

}


exports.userWatchlist = (req,res) =>{
    
}