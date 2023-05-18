import Tikket from "../../models/Service_tikket_Model.js";
import ItemTK from "../../models/Service_item_tikket_Model.js";
import st from "../../models/Service_type_Model.js";
import so from "../../models/Service_option_Model.js";
import Count from "../../models/Count_model.js";
import UserAccount from "../../models/User_account_Model.js";
import { Sequelize } from "sequelize";
import moment from "moment";
export const requestvalue = async(req,res) =>{
    
    try {
        const {data} = req.body;
        console.log(data);
        let q1 = "SELECT `id_type` FROM `service_type` WHERE `title` = '"+data[4][1]+"'";
        const [service_type] = await st.sequelize.query(q1);
        let st_id = Object.values(service_type[0])[0]
        let q2 = "SELECT `id_option` FROM `service_options` WHERE `title` = '"+data[5][1]+"'";
        const service_option = await so.sequelize.query(q2);
        let so_id = Object.values(Object.values(service_option[0])[0])[0];
        let q3 = "SELECT `id_user` FROM `account_user` WHERE `name_user_eng` = '"+data[0][1]+"'";
        const user_accout = await UserAccount.sequelize.query(q3);
        let user_id = Object.values(Object.values(user_accout[0])[0])[0];
        let q = "SELECT COUNT(`tikket_no`) as num FROM `service_tikket` WHERE 1";
        const [number] = await Count.sequelize.query(q)
        const date = new Date();
        let b = moment(date).format('MM/DD/YY');
        let format = b.split("/");
        let count = 1;
        let id = "tk"+format[2]+format[1]+format[0]+"-"+(Object.values(number[0])[0]+count);
        let check = true;
        while(check){
            console.log("count",count);
            console.log("id",id);
            const checkPK = await Tikket.findAll({
                where: { tikket_no : id },
                attributes: ['tikket_no']
            })
            if(checkPK.length != 0){
                id = "tk"+format[2]+format[1]+format[0]+"-"+(Object.values(number[0])[0]+count);
                count++;
            }
            else{
                check = false;
            }
        }
        await Tikket.create({
            tikket_no : id,
            requestor : user_id,
            section_req : data[1][1],
            tel : data[3][1],
            service_type : st_id,
            service_option : so_id,
            tikket_date : date,
            status : "wait"
        })
        for(let i=6;i<data.length;i++){
            let temp = data[i][0].split("&");
            await ItemTK.create({
                tikket_no : id,
                title : temp[1],
                value : data[i][1],
            })
        }
        res.json({
            msg: "complete"
        });
        
    } catch (error) {
        console.log(error)
        res.json({
            msg: "error"
        });
    }
}