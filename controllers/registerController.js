const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async(req,res) => {
    const userNameApi = req.headers['x-user-name'];
    const passwordApi = req.headers['x-password'];

    if (userNameApi !== 'Abdallah' || passwordApi !== '2612025') {
            return res.status(401).json({message: "Unauthorized"});
        }

    const {first_name, last_name, email, password} = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({message : "All Fields Are Required"});
    }

    if (password.length < 8) {
        return res.status(400).json({message : "Password Must Be More Than 8"});
    }


    const foundUser = await User.findOne({email:email}).exec();
    if (foundUser) {
        return res.status(401).json({message: "User Already Exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const new_user =  new User();
    new_user.first_name = first_name;
    new_user.last_name = last_name;
    new_user.email = email;
    new_user.password = hashedPassword;
    await new_user.save();

    const accessToken = jwt.sign({
        UserInfo : {
            id : new_user._id
        }
    }, process.env.ACCESS_TOKEN_SECRET , 
        {expiresIn : "15m"})
    const refreshToken = jwt.sign({
        UserInfo : {
            id : new_user._id
        }
    }, process.env.REFRESH_TOKEN_SECRET  , 
        {expiresIn : "7d"})
    res.cookie('jwt', refreshToken, {
        httpOnly : true,
        secure : true,
        sameSite : "None",
        maxAge : 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
        accessToken,
        email: new_user.email,
        frst_name: new_user.first_name,
        last_name: new_user.last_name,
    });
}


module.exports = {
    register
}