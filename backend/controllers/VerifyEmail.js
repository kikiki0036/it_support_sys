import UserAccount from "../models/User_account_Model.js";
import useFetch from "./useFetch.js";

export const Send_Email = async (req, res) => {
    try {
        let url = "http://localhost:3000/verify-email?id="
        const user_accout = await UserAccount.findAll({
            attributes: ['id_user', 'name_user_eng', `mail`, `verify_email`],
            where: {
                id_user: req.body.id_user
            },
        });
        url = url + user_accout[0].id_user;
        let message = "กดลิ้งเพื่อยืนยันตัวตน";
        let html = "<p>" + message + "</p><a href=\"" + url + "\">คลิ๊กที่นี่</a>";
        let param = {
            "receive": user_accout[0].mail,
            "title": "Verify E-mail",
            "msg": html
        }
        res.json(useFetch(param, "http://127.0.0.1:5000/send_em"));
    } catch (error) {
        console.log(error);
    }
}

export const Change_Verify = async (req, res) => {
    try {
        console.log(req.query.status)
        await UserAccount.update({ verify_email: true }, {
            where: {
                id_user: req.query.status
            }
        })
        res.json({ msg: "complete" });
    } catch (error) {
        console.log(error);
    }
}

export function sendEmail(name, mail, id_user) {
    let url = "http://localhost:3000/verify-email?id=";
    url = url + id_user;
    let message = "กดลิ้งเพื่อยืนยันตัวตน";
    let html = "<p>" + message + "</p><a href=\"" + url + "\">คลิ๊กที่นี่</a>";
    let param = {
        "receive": mail,
        "title": "Verify E-mail",
        "msg": html
    }
    useFetch(param, "http://127.0.0.1:5000/send_em");
}

export async function verifyEmail(id) {
    await UserAccount.update({ verify_email: true }, {
        where: {
            id_user: id
        }
    })
}