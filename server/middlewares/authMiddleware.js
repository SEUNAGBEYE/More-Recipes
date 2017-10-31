import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
	const token = req.headers['token'] || req.body.token

	if (token){
		jwt.verify(token, process.ENV.SECRET_KEY, (error, decode) => {
			if(!error){
				req.token = decode;
				next();	
			}
			return res.status(400).send(error);
		});		
	}
	return 'Please send a token!'
}

export default authMiddleware;