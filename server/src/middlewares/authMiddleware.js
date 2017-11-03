import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
	const token = req.headers['token'] || req.body.token

	if (token){
		jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
			if(!error){
				req.token = decode;
				next();	
			}else{
				// console.lo(user.favoriteRecipe, 'hello')
				return res.status(400).send(error);
			}	
		});		
	}else{
		return res.send('Please send a token!'); 	
	}	
}

export default authMiddleware;