const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const users =  require("../model/user");

exports.signup = async(req,res)=>{
    try{
        const {username, email, password} =  req.body;
        if(!username || !email || !password){
            return res.status(400).json({message : "All fileds requireds."})
        };
        const userExist = await  users.findOne({email : email});
        if(userExist){
            return res.status(400).json({message : "User Already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await  bcrypt.hash(password,salt);
        const newUser = new users({
            username,
            email,
            password : hashedPassword
        });
        await newUser.save();
        const token =  jwt.sign({id : newUser._id},"kunal",{expiresIn: "7d"});
        res.status(200).json({message :"Account created"});
    } catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"});
    }
}

exports.signin = async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "Email and Pssword is required"});
        }
        const userExist = await users.findOne({email});
        if(!userExist) {
            return res.status(404).json({message : "User not found"});
        }
        const decode =  await bcrypt.compare(password, userExist.password);
        if(!decode){
            return res.status(400).json({message : "Wrong credentials"})
        }
        const token = jwt.sign({id:userExist._id},"kunal",{expiresIn : "7d"});
        res.status(200).json({message : "Login successfull"});
    } catch(error){
        return res.status(500).json({message : "Internal server error"});
    }
}