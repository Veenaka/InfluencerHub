const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//signup....controllers.................................................................................................................................................

//add new users

const AddUsers = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    let userRes = {
      email: req.body.email,
      password: hashPassword,
      category: req.body.category,
    };

    if (req.body.category === "influencer") {
      userRes = {
        ...userRes,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
    } else if (req.body.category === "business") {
      userRes = {
        ...userRes,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
      };
    }
    user = await new User(userRes).save();
    console.log("Print user");
    console.log(user);
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);
    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

//get all users...............................................................................................................................................................................

const getUsers = (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
};

//verify email by token........................................................................................................................................................................

const EmailVerify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log(token);
    if (!token) return res.status(400).send({ message: "Invalid link" });
    console.log("a");
    await User.findOneAndUpdate({ _id: user._id }, { verified: true });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

//get a particular user by id parameter.......................................................................................................................................................
const getById = async (req, res) => {
  try {
    User.findById(req.params.id, (result, err) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result.data);
      }
    });
  } catch (err) {
    res.json(err);
  }
};



const UpdateUser = async (req,res) =>{
    const {firstName,email,img,isFirstLogin,dob,product,address,fblink,instalink,businessName,paypal,phoneNo} = req.body
    const id = req.params.id
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{
           firstName,
           businessName,
            email,
            img,
            isFirstLogin:false,
            dob,
            product,
            fblink,
            address,
            instalink,
            paypal,
            phoneNo
           
        });
        user = await user.save();
    }
    catch(err){
        console.log(err);
    }
    if(!user){
      return  res.status(404).json({message:"Unable to update"})
    }
    return res.status(200).json({user});
 
}

exports.AddUsers = AddUsers;
exports.getById = getById;
exports.getUsers = getUsers;
exports.EmailVerify = EmailVerify;
exports.UpdateUser=UpdateUser