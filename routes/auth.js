
//const upload = multer({ dest: 'uploads/' })
const { verifyReg } = require("../middleware");

const authController = require('../controllers/auth.controller')
const multer = require("multer");
const upload = multer({dest: 'avatar_uploads/'})

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/auth/register", upload.single('avatar'),
    [verifyReg.validateReg],authController.register);

    app.post("/auth/login", authController.login);
}

