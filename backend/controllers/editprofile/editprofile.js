import UserAccount from "../../models/User_account_Model.js";

export const updatepass= async(req,res) =>{
    try{
        let salt = " asdsadqwewqeqweasd1546832adfqwegdsa";
        const {id_user,password} = req.body;
        let encryptPwd = btoa(password+salt);
        console.log("password",password)
        console.log("encryptPwd",encryptPwd)
        await UserAccount.update({password : encryptPwd},{
            where:{
                id_user : id_user
            }
        })
      
        res.json({
            msg: "complete",
    });
    }catch (error) {
        console.log(error);
        res.json({
            msg: error
    });
    }
}



export const updateprofile= async(req,res) =>{
    try{
        const {id_user,name_user,name_user_eng,mail,tel} = req.body;
        await UserAccount.update({name_user : name_user,name_user_eng:name_user_eng,mail:mail,tel:tel},{
            where:{
                id_user : id_user
            }
        })
        
        res.json({
            msg: "complete",
    });
    }catch (error) {
        console.log(error);
        res.json({
            msg: error
    });
    }
}