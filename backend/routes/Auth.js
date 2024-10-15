const express = require("express");
const jwt = require("jsonwebtoken");
const Authmodel = require("../models/Auth");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     //Specify the upload directory
    cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        console.log(file.originalname)
    // Define the file name format
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
 //Create a multer instance with the storage strategy
const upload = multer({ storage: storage });

router.post("/signup", async function (req, res) {
    const { fullname, email, password } = req.body
    let isUserExist = await Authmodel.Authmodel.findOne({ email: email })
    if (isUserExist) {
        res.send({ message: "user alredy exist", success: false })
    }
    const newUser = new Authmodel.Authmodel({ ...req.body, active: true })
    const createdUser = await newUser.save();
    res.send({ message: "User signup successfully", success: true })
})

router.post("/login", async function (req, res) {
    const { fullName, email, password } = req.body
    let isUserExist = await Authmodel.Authmodel.findOne({ email: email })
    if (isUserExist) {
        if (password === isUserExist.password) {
           
            if (isUserExist.active === false) {
                return res.send({ message: "Your account has been Deactivated", success: false })
            } else {
                let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "testkey")
                return res.send({ message: "User Logged in Successfully", success: true, token: token, email: isUserExist.email, userId: isUserExist._id, role: isUserExist.role })
            }

        } else {
            return res.send({ message: "Invalid credentials", success: false })
        }

    } else {
        return res.send({ message: "User Not Exist", success: false })
    }
})

router.get("/profile/:email", async function (req, res) {
    let user = await Authmodel.Authmodel.findOne({ email: req.params.email })
    res.send(user)

})

router.get("/users", async function (req, res) {
    let users = await Authmodel.Authmodel.find()
    res.send(users)

})

router.put("/change", async function (req, res) {
    const { email, currentpassword, newpassword } = req.body
    let user = await Authmodel.Authmodel.findOne({ email })
    if (user) {
        user.password = newpassword;
        let updateduser = await user.save();
        res.send(updateduser)
    } else {
        res.send({ message: "user not exist", success: false })
    }
})
router.put("/active_deactive", async function (req, res) {
    const { id, active } = req.body
    const updateduser = await Authmodel.Authmodel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { active: active })
    res.send(updateduser)
})
router.post("/profileupload/:email", upload.single('profile'), async function (req, res) {
    // const url = req.protocol + '://' + req.get('host')
    const updatedUser = await Authmodel.Authmodel.updateOne({email:req.params.email},{profilepic:req.file.filename})
    res.send(updatedUser)
})


module.exports = router