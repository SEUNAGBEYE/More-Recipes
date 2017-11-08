import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
	const token = req.headers['token'] || req.body.token
	if (process.env.NODE_ENV === 'test'){
    let userId = req.body.userId || 1
    console.log(userId);
    req.token = {userId: userId}
    next();
	}else{
    
    if (token){
  		jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
  			if(!error){
  				req.token = decode;
  				next();	
  			}else{
  				return res.status(400).json({status: 'fail', message: 'Token Not Valid'});
  			}	
  		});		
  	}else{
  		return res.send('Please send a token!'); 	
  	}
  }	
}

export default authMiddleware;