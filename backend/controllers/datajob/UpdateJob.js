import Job from "../../models/Job_it_Model.js";

export const Updatejoblate = async(req,res) =>{
    try{
        const {Job_no,Status} = req.body;
        await Job.update({status : Status},{
            where:{
                    job_no : Job_no
            }
        })
        res.json({
            msg: "complete",
    });
    }catch (error) {
        res.json({
            msg: error
    });
    }
}