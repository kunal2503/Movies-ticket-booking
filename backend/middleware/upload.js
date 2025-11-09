const multer =  require("multer");
const cloudinary = require("../config/cloudinary");


const uploadImage = (file) => {
            return new Promise((resolve, reject)=>{
                
            const stream = cloudinary.uploader.upload_stream({
                    folder : "Movies-Booking-System",
                    use_filename: true,}
            , (error, result) =>{
                if(error){
                    reject(error);
                } else{
                    resolve(result.secure_url);
                }
            }
            );
            stream.end(file)
            
        })
    }

module.exports =  uploadImage;