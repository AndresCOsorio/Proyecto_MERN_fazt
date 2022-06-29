const UserModel= require('../models/User');

const userCtrl = {};

userCtrl.getusers = async (req, res)=>{
    const users = await UserModel.find();
    res.json(users);
}
userCtrl.createusers = async (req, res)=>{
    const { username } = req.body;
    const newUser = new UserModel({username})
    await newUser.save();
    res.json({message: 'POST - Users Saved'});
}
userCtrl.getuser = async (req, res)=>{
    const user = await UserModel.findById(req.params.id);
    res.json(user);
}
userCtrl.updateuser = async (req, res)=>{
    await UserModel.findByIdAndUpdate(req.params.id , req.body);
    res.json({message: 'PUT - User Updated'});
}
userCtrl.deleteuser = async (req, res)=>{
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.json({Delete: user});
}

module.exports = userCtrl;