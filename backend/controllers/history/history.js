import history from "../../models/History_model.js";
import historyemp from '../../models/Historyemp_model.js'
    export const GetHistory = async(req,res) =>{
        try {
            let query = "select job_it.job_no , account_user.name_user , job_it.endDate , job_it.close_date , job_it.assign_detail,job_it.status , service_type.title AS service_title , service_options.title "+
            "asservice_option_title from service_type join service_options join account_user join job_it join service_tikket where service_tikket.tikket_no = job_it.tikket_no and "+
            "service_tikket.service_type = service_type.id_type and service_options.id_option = service_tikket.service_option and account_user.id_user = job_it.approve_by "+
            "";
          
            const [results, metadata] = await history.sequelize.query(query)
            res.json(results);
        } catch (error) {
            console.log(error);
        }
    }



    export const GetHistoryrequest = async(req,res) =>{
        try {
            let q="select service_tikket.tikket_no,account_user.name_user,service_type.title AS service_type_title,service_options.title AS service_option_title,service_tikket.status,service_tikket.comment from service_tikket join account_user join service_type join service_options where service_tikket.requestor = account_user.id_user and service_tikket.service_type= service_type.id_type and service_tikket.service_option = service_options.id_option  ORDER BY `service_tikket`.`tikket_no` ASC"
            const [results, metadata] = await historyemp.sequelize.query(q)
            res.json(results);
            
        } catch (error) {
            console.log(error);
        }
    }