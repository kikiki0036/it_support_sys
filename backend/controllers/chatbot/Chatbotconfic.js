import Chat from '../../models/Chat_data.js'
import axios from 'axios'
import history from '../../models/History_model.js';
export const finddatachat = async(req, res) => {
    try { 
        const data = await Chat.findAll({
            
            attributes: ['chat_id','tags','pattern','responses'],
        },);
        res.json(data);
        
    } catch (error) {
        console.log(error);
    }
}

export const updatechatbot = async(req,res) =>{
    try{
        const {Chat_id, Tags,Pattern,Responses} = req.body;
        await Chat.update({tags : Tags,pattern : Pattern,responses : Responses},{
            where:{
                    chat_id : Chat_id
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

export const deletechatbot = async(req,res) =>{
    try{
        const {Chat_id} = req.body;
        await Chat.destroy({
            where:{
                    chat_id : Chat_id
            }
        })
        res.json({
            msg: "complete"
    });
    }catch (error) {
        console.log(error);
        res.json({
            msg: error
    });
    }
}

export const addchatbot = async(req,res) =>{
    try{
        const {Tags,Pattern,Responses} = req.body;
        await Chat.create({
            tags : Tags,
            pattern : Pattern,
            responses : Responses
        }
        )
        res.json({
            msg: "complete"
    });
    }catch (error) {
        res.json({
            msg: error
    });
    }
}


export const trainchatbot = async(req,res) =>{
   
    await axios.get("http://127.0.0.1:5000/traindata").
    then(responce => {
        console.log(responce.status);
        return responce;
    })
    .catch(error => {
        return error;
    })
}