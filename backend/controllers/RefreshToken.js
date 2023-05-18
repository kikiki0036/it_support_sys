import User_Account from "../models/User_account_Model.js";
import User_role from "../models/User_role_Model.js";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);

        User_Account.hasMany(User_role);

        const User_login = await User_Account.findAll({
            where:{
                refresh_token: refreshToken
            },
            attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`,'tel',`password`,`refresh_token`,`role_id`],
            include: [
                        {
                            model: User_role,
                            attributes: ['role_id','role_name','description'],
                            required: true,
                            on: { 
                                '$account_user.role_id$':  { [Sequelize.Op.eq]: Sequelize.col(`user_roles.role_id`) }
                            },
                        }
                    ]
        });

        if(!User_login[0]) return res.sendStatus(403);

         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            
            const role = User_login[0].role_id;
            const user_name = User_login[0].name_user_eng;
            const mail = User_login[0].mail;
            const id_user = User_login[0].id_user;
            const tname=User_login[0].name_user;
            const tel= User_login[0].tel;

            const accessToken =  jwt.sign({id_user, user_name,tname,tel, mail, role}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s',
            });

            res.json({ accessToken });
        });

    } catch (error) {
        console.log(error);
    }
}