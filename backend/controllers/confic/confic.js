import Notebook_center from "../../models/Notebook_center_Model.js";
import S_type from "../../models/Service_type_Model.js";
import S_option from "../../models/Service_options_Model.js";
import UserAccount from '../../models/User_account_Model.js'
import Role from '../../models/User_role_Model.js';

export const Notebookfind = async(req, res) => {
    try {
        const NotebookCenter = await Notebook_center.findAll({
            attributes: ['device_center_id','device_name','status']
        });
        let arr = [];
        let n = 0;
        for(let i=0; i < NotebookCenter.length; i++) {
            if( i >= 9 ) {
                n=0;
            }
            arr.push({
                id: NotebookCenter[i].device_center_id,
                name: NotebookCenter[i].device_name,
                status: NotebookCenter[i].status,
                id_device :NotebookCenter[i].device_center_id,
            })
            n++;
        }
        res.json(arr);
    } catch (error) {
        console.log(error);
    }
}

export const ServiceTypefind = async(req, res) => {
    try {
        const ServiceType = await S_type.findAll({
            attributes: ['id_type','title','status'],                  
        });
        res.json(ServiceType);
    } catch (error) {
        console.log(error);
    }
}

export const ServiceOptionfind = async(req, res) => {
    try {
        const ServiceOption = await S_option.findAll({
            attributes: ['id_option','title','status','manager_approve','team_approve','id_type'],                  
        });
        res.json(ServiceOption);
    } catch (error) {
        console.log(error);
    }
}

export const userAllfind = async(req, res) => {
    try {
        const data = await UserAccount.findAll({
            attributes: ['id_user','name_user','role_id'],                  
        });
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

export const userAllrole = async(req, res) => {
    try {
        const data = await Role.findAll({
            attributes: ['role_id','role_name'],                  
        });
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

export const upDateRole = async(req,res) =>{
    try{
        const {id_User,role_Id} = req.body;
        await UserAccount.update({role_id : role_Id},{
            where:{
                id_user : id_User
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