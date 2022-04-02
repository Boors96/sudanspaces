const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    app.get("/", (req, res)=> {
       res.render("index")
    });

    app.get("/about", (req, res)=> {
        res.render("about" )
    });

    app.get("/login", (req, res)=> {
        res.render("login" )
    });

    app.get("/reset", (req, res)=> {
        res.render("recoverPwd")
    });

    app.get("/reset", (req, res)=> {
        res.render("")
    });
    
    app.get("/register", (req, res)=> {
        res.render("register")
    });

    app.get("/register", (req, res)=> {
        res.render("register")
    });



    app.get("/news", (req, res)=> {
        
        res.render("news", [authJwt.verifyToken(req, res)],
        controller.userBoard(req, res))
        
    });

    app.get("/maps", (req, res)=> {
        
        res.render("mpas", [authJwt.verifyToken(req, res)],
        controller.userBoard(req, res))
        
    });

    app.get("/profile", (req, res)=> {
        res.render("profile", [authJwt.verifyToken(req, res)],
        controller.userBoard(req, res))
    });
}
