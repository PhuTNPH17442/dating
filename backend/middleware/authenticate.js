const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    try {
        const token = req.headers.authenticate.slit('')[1]
        const decode = jwt.verify(token, 'secretValue')

        req.user = decode
        next()
    } catch (error) {
        res.json({
            message:'Authenticate Failed'
        })
    }
}
const verifyTokenAndUserAuthorization = (req, res, next) => {
    authenticate(req, res, () => {
      if (req.user.id === req.params.id|| req.user.admin) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  };
  
  const verifyTokenAndAdmin = (req, res, next) => {
    authenticate(req, res, () => {
      if (req.user.admin) {
        next();
      } else {
        res.status(403).json("You're not allowed to do that!");
      }
    });
  };

module.exports = {
    authenticate,verifyTokenAndAdmin,verifyTokenAndUserAuthorization
}