const express = require("express");
const {getAllUsers, getUserInfo, editUser, deleteUser,likeMovie} = require("../controllers/userControllers")
const multer = require("multer");

const router =  express.Router();

const storage =  multer.memoryStorage();
const upload =  multer ({storage : storage});


router.get("/get-user-info/:id",getUserInfo);
router.get("/get-all-user/:id",getAllUsers);

router.put("/edit-user/:id",upload.single('profileImage'),editUser);
router.delete("/delete-user/:id" ,deleteUser);

 module.exports =  router;