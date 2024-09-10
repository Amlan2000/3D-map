const authService= require("../service/login");


async function login(req,res)
{
    try{
        const {email,password} = req.body;
        const token = await authService.login(email,password);
        res.json({token: token});

    } catch( error)
    {
        res.status(401).json({message:"Invalid Credentials"});
    }
}

module.exports={login};