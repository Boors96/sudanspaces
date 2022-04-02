const {db} = require("../models");
const {email_sender} = require("../models");
const multer = require("multer");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const fs = require("fs");

require("dotenv").config();
const User = db.User;
const Op = db.Sequelize.Op;

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, '/avatar_uploads/')
  },
  filename : function (req, file, cb) {
    cb(null, req.body.username + file.filename);
  }
});

const upload = multer({storage: storage}).single('avatar')


/*
const login_schema = Joi.object({
    email:Joi.string().required(),
    password: Joi.string().min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const contact_schema = Joi.object({
    email:Joi.string().required(),
    message: Joi.string().min(8).required()
});
*/

exports.register = async (req, res) => {
    
  console.log("12345678" + req.file);
    let verification_code = Math.floor(100000 + Math.random() * 900000);
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    let imageURL = process.env.DOMAIN + "/avatars_uploads/avatar-placeholder.png";
    if (req.body.avatar) {
      upload(rep, res, (err) =>{
        if(err){
          return res.status(400)({message: "Image upload was unseccessful!"})
        }
        console.log(req.file);
        
      });
        console.log("saved");
      imageURL = process.env.DOMAIN + req.body.username + req.avatar.filename;
    }
    console.log(imageURL);
    User.create({
        username: req.body.username,
        full_name: req.body.full_name,
        email: req.body.email,
        password: hashedPassword,
        verification_code : verification_code,
        image_url : imageURL
    }).then(user =>{
        

        const subject = "Wellcome to Sudanspaces";
        
        email_sender(user.email, user.full_name, subject, user.verification_code , 1);
        
        res.status(200).send({message: "User was registered successfully!"});
    }).catch(err => {
      console.log(err);
        res.status(500).send({ message: err.message });
      });

    
    
   
}

exports.login = (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          var token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
          });
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            image_url: user.image_url,
            accessToken: token
          });
        })
        .catch(err => {
          console.log(err)
          res.status(500).send({ message: err.message });
        });

    
}

