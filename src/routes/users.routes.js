const express = require ('express');
const bcrypt = require('bcrypt');
const db = require('../database');
const router = express.Router();
const passport=require('passport');

const salt = 10; 
const User=require('../models/users');
router.get ('/', async (req, res)=>{
    const user = await User.find();

    res.json(user); 
});

router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id);
    
    res.json(user);
});

router.post('/register',(req, res)=>{
	passport.authenticate('local-register',(err,user,info)=>{
		console.log('aca ni llega');
		if(!user){
			res.json({uploaded: "false", exists: "true"}, info);
			return;
		} else{
			res.json({uploaded: "true", exists: "false"}, user);
		}
	}
	)
});
	/*
    const user = req.body.user;
    const mail = req.body.mail;
    const pass = req.body.pass;
	
	User.find({'user': user})
		.then((list)=>{
			console.log(list.length)
			if(list.length != 0){
				res.json({uploaded: "false", exists: "true"});
			} else{
				bcrypt.hash(pass, salt)
				.then((hashedPass)=>{
					const newUser = new User ({user,mail, pass: hashedPass});
					return newUser;
				})
				.then((newUser)=>{
					newUser.save();
					res.json({uploaded: "true", exists: "false"});
				})
				.catch((err)=>{
					console.log("Error saving: ", err);
					res.json({uploaded: "false", exists: "unknow"});
					next();
				})
			}
		})
		.catch((err)=>{
			res.json({uploaded: "false", exists: "unknow"});
		})
});*/
  
router.post('/login', passport.authenticate('local-login',(err, user, info)=>{
	console.log("al menos pasa por el authenticator!!");
})
/*async (req, res)=>{
	const user = req.body.user;
	const pass = req.body.pass;
	const session = req.body.session;

	User.find({'user': user})
		.then((users)=>{
			if(users.length){
				const user = users[0];
				
				bcrypt.compare(pass, user.pass, (err, result)=>{
					if(result){	
						console.log("Correct password!");
						res.json([{login: "true", passMatch:"true"}, user]);
						//Iniciar session!!!!
						
					} else{
						console.log("Password don't match");
						res.json([{login: "true", passMatch: "false"}]);
						
					}
					
				})
			} else{
				res.json([{login: "false", passMatch: "false"}])
			}

		})
		.catch((err)=>{
			console.log(err);
			next();
		})
}
*/
)
module.exports = router;