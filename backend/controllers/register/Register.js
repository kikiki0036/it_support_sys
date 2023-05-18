import User_account_Model from "../../models/User_account_Model.js";
import { sendEmail } from "../VerifyEmail.js";
import { Sequelize } from "sequelize";
import useFetch from "../useFetch.js";

export const addUserAccout = async (req, res) => {
    try {
        const { Id_user, Name_user, Name_user_eng, Gender, Mail,tel, Password } = req.body;
        let salt = " asdsadqwewqeqweasd1546832adfqwegdsa";
        const encode = Buffer.from(Password+salt).toString('base64');
        
        await User_account_Model.create({
            id_user: Id_user,
            name_user: Name_user,
            name_user_eng: Name_user_eng,
            gender: Gender,
            level_user:"Emp",
            mail: Mail,
            password: encode,
            tel:tel,
            role_id:"ROLE-EMP"
        })
        sendEmail(Name_user_eng, Mail, Id_user);
        res.status(200)
        res.json({msg: "complete"});
    } catch (e) {
        res.status(400)
        res.json({ msg: "Error"});
    }
}

export const checkUserAccount = async (req, res) => {
    try {
        const { Id_user, Mail } = req.body
        const data = await User_account_Model.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { id_user: Id_user },
                    { mail: Mail }
                  ]
            },    attributes: ['id_user','mail'],
        })
        if(data.length != 0){
            res.status(200)
            res.json({ msg: "Complete" });
        }
        else{
            res.status(404);
            res.json({ msg: "Not found" });
        }
    } catch (err) {

        console.log(err);
        res.status(400)
        res.json({ msg: "Error" });
    }
}

export const forGotPassWord = async (req, res) => {
    try {
        let salt = " asdsadqwewqeqweasd1546832adfqwegdsa";
        let newPwd = makeid(8);
        let encryptPwd = Buffer.from(newPwd+salt).toString('base64');
        console.log("newPwd",newPwd);
        console.log("req.body.email",req.body.email);
        await User_account_Model.update({password : encryptPwd},{
            where:{ mail : req.body.email }
        })
        let message = "รหัสผ่านใหม่ของคุณ : "+ newPwd;
        let html = "<p>" + message + "</p>";
        let param = {
            "receive": req.body.email,
            "title": "Forgot Password",
            "msg": html
        }
        useFetch(param, "http://127.0.0.1:5000/send_em");
        res.json({ msg: "complete" });
    } catch (err) {
        res.status(400)
        res.json({
            msg: err
        });
        res.status(404).json({msg:"ID  is incorrect"});
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const checkEmail = async (req, res) => {
    try {
        const {Mail} = req.body
        const data = await User_account_Model.findAll({
            where: { mail: Mail },
            attributes: ['mail']
        })
        console.log("data")
        console.log(data.length)
        if(data.length != 0){
            console.log(1)
            res.status(200)
            res.json({ msg: "Complete" });
        }
        else{
            console.log(2)
            res.status(404);
            res.json({ msg: "Not found" });
        }
    } catch (err) {
        res.status(400)
        res.json({ msg: "Error" });
    }
}