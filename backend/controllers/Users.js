import UserAccount from "../models/User_account_Model.js";
import Team_member from "../models/Team_member_Model.js";
import Team_support from "../models/Team_support_Model.js";
import Access_level from "../models/Access_level.js";
import Level_assign from "../models/Level_assign_Model.js";

import Job from "../models/Job_it_Model.js";
import Tikket from "../models/Service_tikket_Model.js";
import Schedul_task from "../models/Schedul_task_Model.js";

import S_type from "../models/Service_type_Model.js";
import S_option from "../models/Service_options_Model.js";
import S_item from "../models/Service_items_Model.js";
import S_option_item from "../models/Service_option_item_Model.js";
import Tikket_item from "../models/Service_item_tikket_Model.js";

import Notebook_center from "../models/Notebook_center_Model.js";
import Data_book_round from "../models/Data_book_round_Model.js";
import DataBook from '../models/Data_Book_Model.js';

// import Position from "../models/Position_Model.js";
import Sec from "../models/Section_Model.js";

import Rootcase from "../models/Rootcase_Model.js";
import Rootitem from "../models/Rootitem_Model.js";

import Notes from "../models/Note.js";

// import Device from "../models/Device_Model.js";
// import DeviceDetail from "../models/Device_detail_Model.js";
// import DeviceType from "../models/Device_type_Model.js";
// import Loaction from "../models/Location_Model.js";

// import Schedu from '../models/Schedul_task_Model.js'

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import moment from "moment";
import dateShortcode from 'date-shortcode'

// // import moment from "moment";
// // import "moment-timezone";
// // const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-D HH:m:s")
// // moment().tz("Asia/Bangkok").format("YYYY-MM-D HH:m:s")
const formatDateTime = (datetime) => {
    var str = '{MM-DD-YYYY} GMT'    
    return dateShortcode.parse(str, datetime)
}  

const subName = (name) => {

    let Sname = ""

    if(name !== null && name !== "" && name !== 'undefined') {
      const fullName = name.split(' ')

      if(typeof fullName[1] !== 'undefined') {
        Sname = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1) +"  "+ fullName[1].charAt(0).toUpperCase() + '.'
  
      } else {
        Sname = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1)
  
      }
    }
   
    // const Sname = fullName.shift() +"  "+ fullName.pop().charAt(0) + '.'
    return Sname
}  

export const getUserAccountForSchedu = async(req, res) => {

    const color = [
                    "#23eb87" ,
                    "#ffc16a" ,
                    "#ff7670" ,
                    "#ff6cc7" ,
                    "#de6cff" ,
                    "#8c6eff" ,
                    "#6eaaff" ,
                    "#6bffff" ,
                    "#6bffff" ,
                    "#6dffac" ,
                ]

    try {
        const UserAccounts = await UserAccount.findAll({
            attributes: ['id_user','name_user','name_user_eng',`level_user`,`mail`,`role_id`],
            where:{
                [Sequelize.Op.and]: [
                    {
                        role_id : { 
                            [Sequelize.Op.or]: ['ROLE-IT-STAFF','ROLE-IT-MANAGER'] 
                        }  
                    }
                ]

            }
        });

        let arr = [];
        let n = 0;

        for(let i=0; i < UserAccounts.length; i++) {

            if( i >= 9 ) {
                n=0;
            }

            arr.push({
                id:UserAccounts[i].id_user,
                text:"" + subName(UserAccounts[i].name_user_eng),
                // color: color[n],
                level_user:UserAccounts[i].level_user,
            })

            n++;
        }

        res.json(arr);
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteDataBooking = async(req, res) => {

    const { book_id } = req.body;
    
    try {

        await DataBook.destroy({
            where:{
                book_id : book_id
            }
        });

        res.json("sussuss");
        
    } catch (error) {
        console.log(error);
    }
}

export const updateDataBooking = async(req, res) => {

    const {device_center_id, tel, borrower_id, borrower_name, startDate, endDate, dateSCH} = req.body;

    // console.log({device_center_id, tel, borrower_id, borrower_name, startDate, endDate})
    
    try {

        await DataBook.create(
            { 
                device_center_id : device_center_id,
                tel: tel, 
                borrower_id : borrower_id, 
                borrower_name: borrower_name, 
                startDate: startDate, 
                endDate: endDate,
                dateSCH: dateSCH
            }
        );

        res.json("sussuss");
        
    } catch (error) {
        console.log(error);
    }
}

export const getTeam_support = async(req, res) => {

    try {
        const Data_Team_support = await Team_support.findAll({
            attributes: ['team_id','team_name','team_objectives'],

        });

        res.json(Data_Team_support);

    } catch (error) {
        console.log(error);
    }
}

export const getTeamMember = async(req, res) => {
    Team_member.hasMany(UserAccount);
    Team_member.hasMany(Team_support);
    Team_member.hasMany(Access_level);


    try {
        const TeamMember = await Team_member.findAll({
            attributes: ['id_user','team','access_level','line_token'],
            include: [
              
                {
                    model: UserAccount,
                    attributes: ['id_user','name_user','name_user_eng','gender'],
                    required: true,
                    on: { 
                        '$team_member.id_user$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user') }
                    }
                },
                {
                    model: Team_support,
                    attributes: ['team_id','team_name','team_objectives'],
                    required: true,
                    on: { 
                        '$team_member.team$':  { [Sequelize.Op.eq]: Sequelize.col('team_supports.team_id') }
                    }
                },
                {
                    model: Access_level,
                    attributes: ['access_level_id','access_level_name','description'],
                    required: true,
                    on: { 
                        '$team_member.access_level$':  { [Sequelize.Op.eq]: Sequelize.col('access_levels.access_level_id') }
                    }
                }

            ]

        });
        
        let arr = []
        for(let i=0;i<TeamMember.length;i++) {
            arr.push(
                {
                    id_user:TeamMember[i].id_user,
                    username:TeamMember[i].account_users[0].name_user,
                    team_id:TeamMember[i].team_supports[0].team_id,
                    team_name:TeamMember[i].team_supports[0].team_name,
                    access_level_id:TeamMember[i].access_levels[0].access_level_id,
                    access_level:TeamMember[i].access_levels[0].access_level_name
                }
            )
        }

        res.json(arr);
        
    } catch (error) {
        console.log(error);
    }
}

export const getDataBook = async(req, res) => {
    // DataBook.hasMany(Data_book_round);
    // DataBook.hasMany(UserAccount);

    try {
        const Data_Book = await DataBook.findAll({

            attributes: ['book_id','device_center_id','tel','borrower_id','borrower_name','startDate','endDate'],
            order:[['book_id','DESC']],
            // include: [
              
            //     {
            //         model: Data_book_round,
            //         attributes: ['id_round','round_name','time_start','time_end'],
            //         required: true,
            //         on: { 
            //             '$data_book_center.round$':  { [Sequelize.Op.eq]: Sequelize.col('data_book_rounds.id_round') }
            //         }
            //     },
            //     {
            //         model: UserAccount,
            //         attributes: ['id_user','name_user','name_user_eng','gender'],
            //         required: true,
            //         on: { 
            //             '$data_book_center.reserve_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user') }
            //         }
            //     }

            // ]

        });

        res.json(Data_Book);

    } catch (error) {
        console.log(error);
    }
}

export const getDataBookCheckForAdding = async(req, res) => {
    
    const {dateSCH} = req.body;
    
    try {
        const Data_Book = await DataBook.findAll({
            attributes: ['book_id','device_center_id','tel','borrower_id','borrower_name','startDate','endDate','dateSCH'],
            where:{
                    [Sequelize.Op.and] : [
    
                        {   
                            dateSCH:  dateSCH
                        }
                    ]
    
                }
        });

        res.json(Data_Book);

    } catch (error) {
        console.log(error);
    }
}

export const getDataBookCurrentDate = async(req, res) => {

    try {
        const Data_Book = await DataBook.findAll({
            attributes: ['book_id','device_center_id','tel','borrower_id','borrower_name','startDate','endDate'],
            where: {
                day: moment().tz("Asia/Bangkok").format("YYYY-MM-D")
            }
        });

        res.json(Data_Book);
        
    } catch (error) {
        console.log(error);
    }
}

export const getData_book_round = async(req, res) => {

    try {
        const DataBookRound = await Data_book_round.findAll({
            attributes: ['`id_round','round_name','time_start','time_end']
        });

        res.json(DataBookRound);
        
    } catch (error) {
        console.log(error);
    }
}

export const CreateDeviceCenter = async(req, res) => {
    const {  device_name } = req.body;

    try {

        await Notebook_center.create({
            device_name : device_name,
            status: 1
        });

        res.json({msg: "Add device name : "+ device_name +" sucsess"});
        
    } catch (error) {
        console.log(error);
    }
}

export const DelDeviceCenter = async(req, res) => {
    const { device_center_id, device_name } = req.body;

    try {

        await Notebook_center.destroy({
            where:{
                device_center_id : device_center_id
            }
        });

        res.json({msg: "Remove device name : "+ device_name +" sucsess"});
        
    } catch (error) {
        console.log(error);
    }
}

export const UpdateNameNotebook_center = async(req, res) => {
    const { device_center_id, device_name } = req.body;

    try {
        await Notebook_center.update({ device_name: device_name },{
            where:{
                device_center_id : device_center_id
            }
        });

        res.json({msg: "Update sucsess"});

        
    } catch (error) {
        console.log(error);
    }
}

export const UpdateStatusNotebook_center= async(req, res) => { 
    const {device_center_id, status, device_name } = req.body;

    try {
        await Notebook_center.update({ status: status },{
            where:{
                device_center_id : device_center_id ,
            }
        });

        res.json({msg: status === true ? "Device name " + device_name + " : ON":  "Device name " + device_name+ " : OFF"});

    } catch (error) {
        console.log(error);
    }
}

export const getNotebook_center = async(req, res) => {

    const color = [
                    "#23eb87" ,
                    "#ffc16a" ,
                    "#ff7670" ,
                    "#ff6cc7" ,
                    "#de6cff" ,
                    "#8c6eff" ,
                    "#6eaaff" ,
                    "#6bffff" ,
                    "#6bffff" ,
                    "#6dffac" ,
                ]

    try {
        const NotebookCenter = await Notebook_center.findAll({
            where:{
                status:1
            },
            attributes: ['device_center_id','device_name','status'],
            
        });

        let arr = [];
        let n = 0;

        for(let i=0; i < NotebookCenter.length; i++) {

            if( i >= 9 ) {
                n=0;
            }

            arr.push({
                id: NotebookCenter[i].device_center_id,
                text:"Device : " + NotebookCenter[i].device_name,
                name: NotebookCenter[i].device_name,
                color: color[n],
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


export const getDataUserForDeviceCenter = async(req, res) => {

    try {
        const User = await UserAccount.findAll({
            attributes: ['id_user','name_user','name_user_eng','gender',`mail`],
            where: {
                id_user: {
                            [Sequelize.Op.ne]: "ADMIN001"
                        }
                    },
        });

        res.json(User);
        
    } catch (error) {
        console.log(error);
    }
}


export const getUserAccount = async(req, res) => {

    try {
        const User = await UserAccount.findAll({
            attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`,`password`,`refresh_token`,`role_id`],
            where: {
                id_user: {
                            [Sequelize.Op.ne]: "ADMIN001"
                        }
                    },
        });

        res.json(User);
        
    } catch (error) {
        console.log(error);
    }
}

// export const getDeviceType = async(req, res) => {
//     try {
//         const dataDeviceType = await DeviceType.findAll({
//             attributes:  ['type_id','type_name']
           
//         });

//         res.json(dataDeviceType);
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getLoaction = async(req, res) => {
//     try {
//         const dataLoaction = await Loaction.findAll({
//             attributes:  ['location_id','location']
           
//         });

//         res.json(dataLoaction);
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getDeviceDetail = async(req, res) => {
//     try {
//         const DataDeviceDetail = await DeviceDetail.findAll({
//             attributes: ['detail_id', 'brand', 'model', 'os_type', 'system_type']
           
//         });

//         res.json(DataDeviceDetail);
        
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const CreateDevice = async(req, res) => {
//     const { ipaddress, macaddress, detail_id, type_id, location, des, id_profile } = req.body;

//     try {

//         const lastDevice = await Device.findAll({ 
//             limit:1,
//             order:[['device_id','DESC']],
//             attributes: ['device_id','device_name', 'ipaddress', 'macaddress', 'detail_id', 'type_id', 'location', 'des', 'id_profile']

//         });

//         let id_index = parseInt((lastDevice[0].device_id).substring(3,))
//         let new_id = ""
//         let nameId = type_id
  
//         if ((id_index + 1) < 10) {
//             new_id = nameId + "0000"+ ( id_index + 1 ).toString()

//         } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
//             new_id = nameId + "000"+ ( id_index + 1 ).toString()

//         } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
//             new_id = nameId + "00"+ ( id_index + 1 ).toString()

//         } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
//             new_id = nameId + "0"+ ( id_index + 1 ).toString()

//         } else {
//             new_id = nameId + ( id_index + 1 ).toString()
//         }

//         await Device.create({
//             device_id : new_id,
//             device_name : new_id,
//             ipaddress : ipaddress === "" ? "-" : ipaddress ,
//             macaddress : macaddress === "" ? "-" : macaddress ,
//             detail_id : detail_id,
//             type_id : type_id,
//             location : location,
//             des : des,
//             id_profile : id_profile
            
//         });

//         res.json({msg: "Create detail " + new_id + " sucsess"});

//     } catch (error) {
//         console.log(error);
//     }
    
// }

// export const UpdateDevice = async(req, res) => {
//     const { device_id, device_name, ipaddress, macaddress, detail_id, type_id, location, des, id_profile } = req.body;

//     try {
//         await Device.update({ device_name: device_name, ipaddress: ipaddress, macaddress: macaddress, detail_id: detail_id, type_id: type_id, location: location, des: des, id_profile: id_profile },{
//             where:{
//                 device_id : device_id
//             }

//         });

//         res.json({msg: "Update detal device " + device_name + " sucsess"});

//     } catch (error) {
//         console.log(error);
//     }
    
// } 

// export const UpdateDeviceProfile = async(req, res) => {
//     const { device_id, id_profile, device_name} = req.body;

//     try {
//         await Device.update({ id_profile: id_profile },{
//             where:{
//                 device_id : device_id ,
//             }
//         });

//         res.json({msg: "Update profile device" + device_name + " sucsess"});

//     } catch (error) {
//         console.log(error);
//     }
    
// }

export const getRootcase = async(req, res) => {
    try {
        const DATARootcase = await Rootcase.findAll({
            attributes: ['rootcase','rootcase_name']
           
        });

        res.json(DATARootcase);
    } catch (error) {
        console.log(error);
    }
}

export const getRootitem = async(req, res) => {
    try {
        const DATARootitem = await Rootitem.findAll({
            attributes: ['rootitem','rootitem_name']
           
        });

        res.json(DATARootitem);
    } catch (error) {
        console.log(error);
    }
}

export const getOptionItems = async(req, res) => {
    try {
        const OptionItems = await S_option_item.findAll({
            attributes: ['id','id_option','id_item']
           
        });

        res.json(OptionItems);
    } catch (error) {
        console.log(error);
    }
}

export const getItemOption = async(req, res) => {
    try {
        S_option_item.hasMany(S_item);
        const ServiceOption = await S_option_item.findAll({
            where:{
                id_option: req.body.id_option
                // id_option: "IT000001-000001"
            },
            attributes: ['id','id_option','id_item'],
            include: [
              
                {
                    model: S_item,
                    attributes: ['title','description','input_type'],
                    required: true,
                    on: { 
                        '$service_option_item.id_item$':  { [Sequelize.Op.eq]: Sequelize.col('service_items.id_item') }
                    }
                },

            ]
        });

        res.json(ServiceOption);
    } catch (error) {
        console.log(error);
    }
}

// export const LastItem = async(req, res) => {
//     try {
//         const lastItem = await S_item.findAll({ 
//             limit:1,
//             order:[['id_item','DESC']],
//             attributes: ['id_item','title','description','input_type']

//         });
//         res.json(lastItem);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getAllItem = async(req, res) => {
    try {
        const ItemReq = await S_item.findAll({
            attributes: ['id_item','title','description','input_type'],
        });

        res.json(ItemReq);
    } catch (error) {
        console.log(error);
    }
}




// export const DelDataItem = async(req, res) => {
//     const {id_item, title} = req.body;

//     try {

//         await S_item.destroy({
//             where:{
//                 id_item : id_item
//             }
//         });

//         res.json({msg: "Remove item " + title + " sucsess"});

//     } catch (error) {
//         console.log(error);
//     }

// }

// export const UpdateDetailItem = async(req, res) => {
//     const { id_item, title, description } = req.body;

//     try {
//         await S_item.update({ title: title, description: description},{
//             where:{
//                 id_item : id_item ,
//             }
//         });

//         res.json({msg: "Update " + title + " sucsess"});

//     } catch (error) {
//         console.log(error);
//     }
    
// }

// export const CreateItem = async(req, res) => {
//     const { id_item, title, description, input_type } = req.body;

//     try {
//         await S_item.create({
//             id_item : id_item ,
//             title : title ,
//             description	: description,
//             input_type: input_type
            
//         });

//         res.json({msg: "Create " + title + " sucsess"});

//     } catch (error) {
//         console.log(error);
//     }
    
// }


// export const getDataDeviceCut = async(req, res) => {
//     const { id_profile } = req.body;

//     try {
//         Device.hasMany(DeviceType);
//         Device.hasMany(Loaction);
//         Device.hasMany(DeviceDetail);
//         UserITService.hasMany(Emp);

//         const Datadevice = await Device.findAll({
//             where:{
//                 id_profile : id_profile ,
//             },
//             order:[['no','ASC']],
//             adtributes:[ "no","device_id", "device_name","ipaddress","macaddress","detail_id","device_types","locations","des","id_profile"],
//             include: [
              
//                 {
//                     model: DeviceType,
//                     attributes:  ['type_id','type_name'],
//                     required: true,
//                     on: { 
//                         '$data_device.type_id$':  { [Sequelize.Op.eq]: Sequelize.col('device_types.type_id') }
//                     }
//                 },
//                 {
//                     model: Loaction,
//                     attributes:  ['location_id','location'],
//                     required: true,
//                     on: { 
//                         '$data_device.location$':  { [Sequelize.Op.eq]: Sequelize.col('locations.location_id') }
//                     }
//                 },
//                 {
//                     model: DeviceDetail,
//                     attributes:  ['detail_id','brand','model','os_type','system_type'],
//                     required: true,
//                     on: { 
//                         '$data_device.detail_id$': { [Sequelize.Op.eq]: Sequelize.col(`device_details.detail_id`) }
//                     }
//                 }
//             ]
//         });
//         res.json(Datadevice);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getDataDevice = async(req, res) => {
//     try {
//         Device.hasMany(DeviceType);
//         Device.hasMany(Loaction);
//         // Device.hasMany(UserITService);
//         Device.hasMany(DeviceDetail);

//         UserITService.hasMany(Emp);

//         const Datadevice = await Device.findAll({
//             adtributes:[ "no","device_id", "device_name","ipaddress","macaddress","detail_id","device_types","locations","des","id_profiles"],
//             order:[['no','ASC']],
//             include: [
              
//                 {
//                     model: DeviceType,
//                     attributes:  ['type_id','type_name'],
//                     required: true,
//                     on: { 
//                         '$data_device.type_id$':  { [Sequelize.Op.eq]: Sequelize.col('device_types.type_id') }
//                     }
//                 },
//                 {
//                     model: Loaction,
//                     attributes:  ['location_id','location'],
//                     required: true,
//                     on: { 
//                         '$data_device.location$':  { [Sequelize.Op.eq]: Sequelize.col('locations.location_id') }
//                     }
//                 },
//                 // {
//                 //     model: UserITService,
//                 //     attributes: ['id_profile','id_emp','profile_name'],
//                 //     required: true,
//                 //     on: { 
//                 //         '$data_device.id_profile$':  { [Sequelize.Op.eq]: Sequelize.col('user_profiles.id_profile') }
//                 //     },
//                 //     include: [
//                 //         {
//                 //             model: Emp,
//                 //             attributes: ['id_emp','emp_name','emp_nameEng'],
//                 //             // attributes: ['id_emp','gender','emp_name','emp_nameEng','birth','dept','section','position','level'],
//                 //             required: true,
//                 //             on: { 
//                 //                 '$user_profiles.id_emp$':  { [Sequelize.Op.eq]: Sequelize.col(`user_profiles.data_emps.id_emp`) }
//                 //             },
//                 //         }
//                 //     ]
//                 // },
//                 {
//                     model: DeviceDetail,
//                     attributes:  ['detail_id','brand','model','os_type','system_type'],
//                     required: true,
//                     on: { 
//                         '$data_device.detail_id$': { [Sequelize.Op.eq]: Sequelize.col(`device_details.detail_id`) }
//                     }
//                 }
//             ]
//         });
//         res.json(Datadevice);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const UpdateNameServiceType = async(req, res) => {
    const { id_type, title } = req.body;

    try {
        await S_type.update({ title: title },{
            where:{
                id_type : id_type
            }
        });

        res.json({msg: "Update sucsess"});

        
    } catch (error) {
        console.log(error);
    }
}

export const RemoveServiceType = async(req, res) => {
    const { id_type, title } = req.body;

    try {
        await S_type.destroy({
            where:{
                id_type : id_type ,
            }
        });

        res.json({msg: "Remove " + 'service " '+ title +  ' " sucsess'});

    } catch (error) {
        console.log(error);
    }
}

export const CreateNewServiceType = async(req, res) => {
    const { id_type, title } = req.body;

    try {
        await S_type.create({
            // id_type : id_type ,
            title : title ,

        });

        res.json({msg: "Create " + 'service " '+ title +  ' " sucsess'});

    } catch (error) {
        console.log(error);
    }
}

export const LastS_type = async(req, res) => {
    try {
        const lastS_type = await S_type.findAll({ 
            limit:1,
            order:[['id_type','DESC']],
            attributes: ['id_type','title'],                  

        });
        res.json(lastS_type);
    } catch (error) {
        console.log(error);
    }
}

export const UpdateTeamSupOption = async(req, res) => {
    const { id_option, team_approve } = req.body;

    try {
        await S_option.update({ team_support: team_approve },{
            where:{
                id_option : id_option
            }
        });

        res.json({msg: "Update sucsess"});

        
    } catch (error) {
        console.log(error);
    }
}

export const UpdateWhoApprOption = async(req, res) => {
    const { id_option, manager_approve } = req.body;

    try {
        await S_option.update({ manager_approve: manager_approve },{
            where:{
                id_option : id_option
            }
        });

        res.json({msg: "Update sucsess"});

        
    } catch (error) {
        console.log(error);
    }
}

export const UpdateNameOption = async(req, res) => {
    const { id_option, title } = req.body;

    try {
        await S_option.update({ title: title },{
            where:{
                id_option : id_option
            }
        });

        res.json({msg: "Update sucsess"});

        
    } catch (error) {
        console.log(error);
    }
}

export const getServiceOption = async(req, res) => {
    try {
        const ServiceOption = await S_option.findAll({
            where:{status:1},
            attributes: ['id_option','title','status','manager_approve','team_approve','id_type'],                  

        });

        res.json(ServiceOption);
    } catch (error) {
        console.log(error);
    }
}

export const LastOption = async(req, res) => {
    try {
        
        const lastOption = await S_option.findAll({ 
            limit:1,
            order:[['id_option','DESC']],
            attributes: ['id_option','title','status','id_type'],                  

        });
        res.json(lastOption);
    } catch (error) {
        console.log(error);
    }
}

export const CreateServiceOption = async(req, res) => {
    const { id_option, title, id_type,status, objItems } = req.body;

    try {

        await S_option.create({
            id_option : id_option ,
            title : title ,
            status : status,	
            id_type	: id_type
        });

        // for( let i=0; i < objItems.length; i++ ) {

        //     await S_option_item.create({
        //         id_option : id_option ,
        //         id_item : objItems[i].id_item
        //     });

        // }

        res.json({msg: "Create " + title + " sucsess"});

    } catch (error) {
        console.log(error);
    }

    
}

export const RemoveServiceOption = async(req, res) => {
    const {id_option, title} = req.body;

    try {

        await S_option_item.destroy({
            where:{
                id_option : id_option ,
            }
        });

    } catch (error) {
        console.log(error);
    }
    
    try {

        await S_option.destroy({
            where:{
                id_option : id_option ,
            }
        });

        res.json({msg: "Remove " + title + " sucsess"});

    } catch (error) {
        console.log(error);
    }
}

export const getServiceType = async(req, res) => {
    try {
        const ServiceType = await S_type.findAll({
            where:{status:1},
            attributes: ['id_type','title','status'],                  

        });
        res.json(ServiceType);
    } catch (error) {
        console.log(error);
    }
}

export const getDataAllServiceDetail = async(req, res) => {
    S_type.hasMany(S_option);
    S_option.hasMany(S_option_item);
    S_option_item.hasMany(S_item);


    try {
        const ServiceDetail = await S_type.findAll({
            attributes: ['id_type','title'], 
            include: [
                {
                    model: S_option,
                    attributes: ['id_option','title','status','id_type'],                  
                    required: true,
                    on: { 
                        '$service_type.id_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.id_type`) }
                    },
                    include: [
                        {
                            model: S_option_item,
                            attributes: ['id_option','id_item'],
                            required: true,
                            on: { 
                                '$service_options.id_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.service_option_items.id_option`) }
                            },
                            include: [
                                {
                                    model: S_item,
                                    attributes: ['id_item','title','description','input_type'],
                                    required: true,
                                    on: { 
                                        '$service_options.service_option_items.id_item$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.service_option_items.service_items.id_item`) }
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]  
        });
        res.json(ServiceDetail);
    } catch (error) {
        console.log(error);
    }
}

export const getDataOptionDetail = async(req, res) => {
    const { id_option } = req.body;

    S_option.hasMany(S_option_item);
    S_option_item.hasMany(S_item);

    let OptionDetail

    try {
        OptionDetail = await S_option.findAll({
       
            attributes: ['id_option','title','status','id_type'],      
            where:{
                id_option : id_option
            },            
            include: [
                {
                    model: S_option_item,
                    attributes: ['id_option','id_item'],
                    required: true,
                    on: { 
                        '$service_options.id_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_option_items.id_option`) }
                    },
                    include: [
                        {
                            model: S_item,
                            attributes: ['id_item','title','description','input_type'],
                            required: true,
                            on: { 
                                '$service_option_items.id_item$':  { [Sequelize.Op.eq]: Sequelize.col(`service_option_items.service_items.id_item`) }
                            },
                        }
                    ]
                }
            ]
     
        });

        if(OptionDetail.length === 0) {

            OptionDetail = await S_option.findAll({
       
                attributes: ['id_option','title','status','id_type'],      
                where:{
                    id_option : id_option
                }
               
            });

            OptionDetail =[
                {
                    "id_option": OptionDetail[0].id_option,
                    "title": OptionDetail[0].title,
                    "status": OptionDetail[0].status,
                    "id_type": OptionDetail[0].id_type,
                    "service_option_items": []
                }
            ]
        
        }
        
        res.json(OptionDetail);

    } catch (error) {
        console.log(error);
    }
}

export const UpdateAllDetailServiceOption = async(req, res) => {
    const { id_option, title,  status, id_type, objItems, delItems } = req.body;

    try {

        await S_option.update({ title: title, status: status, id_type: id_type },{
            where:{
                id_option : id_option ,
            }
        });

        for( let i=0; i < delItems.length; i++ ) {

            await S_option_item.destroy({
                where:{
                    [Sequelize.Op.and]: [{id_option : id_option  }, {  id_item : delItems[i] }]
                }
    
            });
        
        }

        for( let i=0; i < objItems.length; i++ ) {

            await S_option_item.create({
                id_option : id_option ,
                id_item : objItems[i]
            });

        }

        res.json({msg: "Update " + title + " sucsess"});

    } catch (error) {
        console.log(error);
    }

}

export const UpdateStatusServiceOption = async(req, res) => {
    const {id_option, status, title } = req.body;

    try {
        await S_option.update({ status: status },{
            where:{
                id_option : id_option ,
            }
        });

        res.json({msg: status === true ? "Service option " + title + " : ON":  "Service option" + title+ " : OFF"});

    } catch (error) {
        console.log(error);
    }

}

// export const UpdateDataServiceDetail = async(req, res) => {
//     // const {id_option, title, whoAppr, status, id_type} = req.body;
//     const {status, whoAppr } = req.body;

//     try {
//         for( let i=0; i < status.length; i++ ) {

//             await S_option.update({ status: !(status[i].status) },{
//                 where:{
//                     id_option : status[i].id_option ,
//                 }
//             });
//         }

//         for( let i=0; i < whoAppr.length; i++ ) {
            
//             let newData;
//             if(whoAppr[i].whoAppr === "manager") {
//                 newData = "sr.manager" 
//             } else {
//                 newData = "manager" 
//             }
//             await S_option.update({ whoAppr: newData },{
//                 where:{
//                     id_option : whoAppr[i].id_option ,
//                 }
//             });
//         }

//         res.json({msg: "Edit sucsess"});

//     } catch (error) {
//         console.log(error);
//     }

// }

// export const getDataJobCount = async(req, res) => {
//     try {
//         const JobCountPending = await Job.findAndCountAll({ 
//             where:{
//                 status: 'pending'
//             },
//             // offset: 0,
//             limit: 0
//             // attributes: ['count']

//         });
//         const JobCountOpen = await Job.findAndCountAll({ 
//             where:{
//                 status: 'inprogress'
//             },
//             limit: 0

//         });
//         const JobCountDelay = await Job.findAndCountAll({ 
//             where:{
//                 status: 'delay'
//             },
//             limit: 0
//         });
//         const JobCountFinish = await Job.findAndCountAll({ 
//             where:{
//                 status: 'finish'
//             },
//             limit: 0
//         });
//         res.json({"pending":JobCountPending, "inprogress":JobCountOpen, "delay":JobCountDelay, "finish":JobCountFinish});
//     } catch (error) {
//         console.log(error);
//     }
// }


export const getDataJobCountCutOfUser = async(req, res) => {
    const { assign, dateNow } = req.body;
    console.log(req.body);
    Job.hasMany(Schedul_task);

    try {
        const JobCountPending = await Job.findAndCountAll({
            where:{               
                [Sequelize.Op.and]: [
                    {status : 'pending'}, 
                    // {job_date: dateNow }
                ]
            },
            limit: 0,
            attributes:  ['job_no','job_date','status'],
            include: [ 
                        {
                            model: Schedul_task,
                            attributes: ['job_no','assign','level_assign'],
                            required: true,
                            where:{               
                                assign : assign
                            },
                            on: {
                                '$job_it.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('schedul_tasks.job_no')}
                            },
                        }
                    ]

        });

        const JobCountOpen = await Job.findAndCountAll({
            where:{               
                [Sequelize.Op.and]: [
                    {status : 'inprogress'}, 
                    // {job_date: dateNow }
                ]

            },
            limit: 0,
            attributes:  ['job_no','job_date','status'],
            include: [  {
                            model: Schedul_task,
                            attributes: ['job_no','assign','level_assign'],
                            required: true,
                            where:{               
                                assign : assign
                            },
                            on: {
                                '$job_it.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('schedul_tasks.job_no')}
                            },
                        }
                    ]
        });

        const JobCountDelay = await Job.findAndCountAll({
            where:{               
                [Sequelize.Op.and]: [
                    {status : 'delay'}, 
                    // {job_date: dateNow }
                ]

            },
            limit: 0,
            attributes:  ['job_no','job_date','status'],
            include: [  {
                            model: Schedul_task,
                            attributes: ['job_no','assign','level_assign'],
                            required: true,
                            where:{               
                                assign : assign
                            },
                            on: {
                                '$job_it.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('schedul_tasks.job_no')}
                            },
                        }
                    ]
        });

        const JobCountFinish = await Job.findAndCountAll({
            where:{
                [Sequelize.Op.and]: [
                    {status : 'finish'}, 
                    // {job_date: dateNow }
                ]

            },
            limit: 0,
            attributes:  ['job_no','job_date','status'],
            include: [  {
                            model: Schedul_task,
                            attributes: ['job_no','assign','level_assign'],
                            required: true,
                            where:{               
                                assign : assign
                            },
                            on: {
                                '$job_it.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('schedul_tasks.job_no')}
                            },
                        }
                    ]
        });
        
        // const JobCountPending = await Schedul_task.findAndCountAll({ 
        //     where:{
        //         [Sequelize.Op.and]: [{assign : req.body.assign  }, {  status: 'pending' }]
        //     },
        //     attributes: ['job_no','assign','level_assign'],
        //     // offset: 0,
        //     limit: 0
        //     // attributes: ['count']
        // });

        // const JobCountOpen = await Schedul_task.findAndCountAll({ 
        //     where:{
        //         [Sequelize.Op.and]: [{assign : req.body.assign  }, {  status: 'inprogress' }]
        //     },
        //     attributes: ['job_no','assign','level_assign'],
        //     limit: 0

        // });

        // const JobCountDelay = await Schedul_task.findAndCountAll({ 
        //     where:{
        //         [Sequelize.Op.and]: [{assign : req.body.assign  }, {  status: 'delay' }]
        //     },
        //     attributes: ['job_no','assign','level_assign'],
        //     limit: 0
        // });

        // const JobCountFinish = await Schedul_task.findAndCountAll({ 
        //     where:{
        //         [Sequelize.Op.and]: [{assign : req.body.assign  }, {  status: 'finish' }]
        //     },
        //     attributes: ['job_no','assign','level_assign'],
        //     limit: 0
        // });

        res.json({"pending":JobCountPending, "inprogress":JobCountOpen, "delay":JobCountDelay, "finish":JobCountFinish});

    } catch (error) {
        console.log(error);

    }
}

export const LastJob = async(req, res) => {
    try {
        const lastJob = await Job.findAll({ 
            limit:1,
            order:[['createdAt','DESC']],
            attributes:  ['job_no','approve_by','assign_detail','job_date', 'open_date', 'startDate', 'endDate', 'close_date','rootcase','rootitem','solutionnote','status', 'tikket_no'],

        });

        if(lastJob.length <= 0) {
            res.json([{
                job_no: "JOB000000-000000"
            }]);

        } else {
            res.json(lastJob);

        }
        
    } catch (error) {
        console.log(error);
    }
}

export const CreateJob = async(req, res) => {
    
    const { job_no,approve_by, assign_detail, open_date,startDate, 
            endDate, close_date, rootcase, rootitem,solutionnote, 
            status, tikket_no, job_date, createJob_by, assign,
            job_assistant
          } = req.body;


    try {

        const NewData =  await Job.create({
            job_no: job_no,
            approve_by: approve_by,
            assign_detail: assign_detail,
            // job_date: job_date,
            open_date: open_date,
            startDate: startDate,
            endDate: endDate,
            close_date: close_date,
            rootcase: rootcase,
            rootitem: rootitem,
            solutionnote: solutionnote,
            status: status,
            tikket_no: tikket_no
        });


        await Tikket.update({ createJob_by: createJob_by },{
            where:{
                tikket_no : tikket_no
            }

        });

        
        await Schedul_task.create({
            job_no: job_no,
            assign: assign,
            level_assign: 1,
        });

        for(let i=0; i<job_assistant.length; i++) {
            await Schedul_task.create({
                job_no: job_no,
                assign: job_assistant[i],
                level_assign: 2,
            });
        }


        res.json(NewData);

    } catch (error) {
        console.log(error);
    }
}

export const UpdateJob = async(req, res) => {
    const   { 
                job_no, startDate, endDate,

            } = req.body;

    try {
        await Job.update({ startDate: startDate, endDate: endDate },{
            where:{
                job_no : job_no
            }
        });
    
        res.json({msg: "Update success"});
        
    } catch (error) {
        console.log(error);
    }
}

// export const CancelJob = async(req, res) => {
//     const   { 
//                 job_no, assign

//             } = req.body;
      
//     try {
        
//         await Schedul_task.destroy({
//             where: {
//                 [Sequelize.Op.and]: [{assign : assign }, {  job_no : job_no }]
//             }
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

export const LastTikket = async(req, res) => {
    try {
        const lasttikket = await Tikket.findAll({ 
            limit:1,
            order:[['tikket_no','DESC']],
            attributes:  ['tikket_no'],
        });

        if(lasttikket.length > 0) {
            res.json(lasttikket);

        } else {
            res.json([{tikket_no:"tk000000-000000"}]);

        }
    } catch (error) {
        console.log(error);
    }
}

// export const CreateTikket = async(req, res) => {
    
//     // SELECT * FROM `job_it` ORDER BY job_no DESC LIMIT 1

//     const { tikket_no, requestor, tel, service_type, 
//             service_option, tikket_date, status, review_by,
//             createJob_by
//     } = req.body;

//     try {

//         await Tikket.create({
//             tikket_no: tikket_no,
//             requestor: requestor,
//             tel: tel,
//             service_type: service_type,
//             service_option: service_option,
//             tikket_date: tikket_date,
//             status: status,
//             review_by: review_by,
//             createJob_by: createJob_by
//             // createdAt: createdAt,
//             // updatedAt: updatedAt,
//         });
//         res.json({msg: "Create finish"});
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const CreateItemTK = async(req, res) => {
    
//     const { id_tk, id_item, value } = req.body;
//     try {
//         await Tikket_item.create({
//             id_tk: id_tk,
//             id_item: id_item,
//             value: value,
//         });
//         res.json({msg: "Create finish"});
//     } catch (error) {
//         console.log(error);
//     }
// }

export const UpdateStatusTk = async(req, res) => {
    const { tikket_no, status, review_by, comment } = req.body;
    try {

        await Tikket.update({ status: status,  review_by: review_by, comment: comment },{
            where:{
                tikket_no : tikket_no
            }

        });

        if(status === "waite") {
            res.json({msg: "Review" + " req. " + tikket_no + " again."});

        } else {
            res.json({msg: status.split(" ")[0].charAt(0).toUpperCase() + status.split(" ")[0].slice(1).toLowerCase() + " req. " + tikket_no});

        }
        
    } catch (error) {
        console.log(error);

    }
}


export const Job_OpenJOB = async(req, res) => {
    const { job_no, status, open_date } = req.body;
    try {

        await Job.update({ status: status, open_date: open_date },{
            where:{
                job_no : job_no
            }
        });

        res.json({msg: "OPEN REQ. " + job_no});

    } catch (error) {
        console.log(error);

    }
}

export const Job_CloseJOB = async(req, res) => {
    const { job_no, status, close_date, rootcase, rootitem, solutionnote } = req.body;
    try {

        await Job.update({ status: status, close_date: close_date, rootcase: rootcase, rootitem: rootitem, solutionnote: solutionnote },{
            where:{
                job_no : job_no
            }

        });

        res.json({msg: "CLOSE REQ. " + job_no});

    } catch (error) {
        console.log(error);
    }
}

export const Job_upDateAssignDetail = async(req, res) => {
    const { job_no, assign_detail } = req.body;
    try {

        await Job.update({ assign_detail: assign_detail },{
            where:{
                job_no : job_no
            }
        });

        res.json({msg: "Update job no. " + job_no + " success "});

    } catch (error) {
        console.log(error);

    }
}

export const CanceltaskJob = async(req, res) => {
    const { tikket_no, job_no, assign, level_assign  } = req.body;
    try {

        if(level_assign === 1) {

            await Schedul_task.destroy({
                where: {
                    job_no : job_no
                }
            });

            await Job.destroy({ 
                where: {
                    job_no: job_no
                }
            });

            await Tikket.update({ createJob_by: null },{
                where:{
                    tikket_no : tikket_no
                }
            });

        } else {

            await Schedul_task.destroy({
                where: {
                    [Sequelize.Op.and]: [{assign : assign }, {  job_no : job_no }]
    
                }
            });

        }

        res.json({msg: "Cancel job success "});

    } catch (error) {
        console.log(error);

    }
}

export const UpdateItemTK = async(req, res) => {
    
    const { id_tk, arr_itemAndV } = req.body;
    try {
        for( let i=0; i < arr_itemAndV.length; i++ ) {
            await Tikket_item.update({ value: arr_itemAndV[i].value },{
                where:{
                    [Sequelize.Op.and]: [{id_tk : id_tk }, {  id_item : arr_itemAndV[i].id_item }]
                }

            });
            
        }

        res.json({msg: "Update TK. " + id_tk});
    } catch (error) {
        console.log(error);
    }
}


export const getChartDataTikket = async(req, res) => {
    try {
        const DataChart = await Tikket.findAll({ 
            order:[['tikket_date','ASC']],
            attributes:  ['tikket_date','status']

        });

        let ObjChartApprove = []
        let ObjChartReject = []

        let index;
        let date;

        for( let i=0; i < DataChart.length; i++ ) {

            date = formatDateTime(DataChart[i].tikket_date)

            // [2].slice(0,2) + "-" +  dateV.split("-")[1] + "-" + dateV.split("-")[0]
            if(DataChart[i].status === "approve") {

                if(ObjChartApprove.length > 0) {


                    index =  ObjChartApprove.findIndex(object => { 
                        return object.x === date})

                    if(index !== -1) {
                        ObjChartApprove[index].y = ObjChartApprove[index].y + 1

                    } else {
                        ObjChartApprove.push({
                            x:  date, 
                            y: 1
    
                        })
                    }

                    
                } else {
                    ObjChartApprove.push({
                        x:  date, 
                        y: 1

                    })
                }

            } else {
                if(DataChart[i].status === "reject") {
                    if(ObjChartReject.length > 0) {
                        index =  ObjChartReject.findIndex(object => { 
                            return object.x === date })
    
                        if(index !== -1) {
                            ObjChartReject[index].y = ObjChartReject[index].y + 1
    
                        } else {
                            ObjChartReject.push({
                                x: date,
                                y: 1
        
                            })
                        }
    
                        
                    } else {
                        ObjChartReject.push({
                            x:  date, 
                            y: 1
    
                        })
                    }
                }
              
            } 
        }

        if(DataChart.length <= 0) {
            res.json({ChartRej:[{}] , ChartAppr: [{}]});

        } else {
            res.json({ChartRej:ObjChartReject , ChartAppr: ObjChartApprove});

        }

    } catch (error) {
        console.log(error);

    }
}

export const getDataTikket = async(req, res) => {

    Tikket.hasMany(UserAccount);
    Tikket.hasMany(S_type);
    Tikket.hasMany(S_option);
    Tikket.hasMany(Tikket_item);

    try {
        const tikket = await Tikket.findAll({ 
            attributes:  ['tikket_no','requestor','section_req','tel','service_type','service_option','tikket_date','status','comment','review_by','createJob_by'],
            order:[['tikket_date','DESC']],
            where:{
                [Sequelize.Op.and]: [
                    { status : { [ Sequelize.Op.or ] : req.body.status } }, 
                    { createJob_by : req.body.createJob_by }
                ]
            },
            include: [
                {
                    model: UserAccount,
                    attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`],
                    required: true,
                    on: { 
                            [Sequelize.Op.or]: [
                                {'$service_tikket.requestor$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.review_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.createJob_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}
                            ]
                        },
                },
                {
                    model: S_type,
                    attributes: ['id_type','title'],
                    required: true,
                    on: { 
                        '$service_tikket.service_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_types.id_type`) }
                    },
                },
                {
                    model: S_option,
                    attributes: ['title','status','id_type'],
                    required: true,
                    on: { 
                        '$service_tikket.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.id_option`) }
                    },
                },
                {
                    model: Tikket_item,
                    attributes: ['tikket_no','title','value'],
                    required: true,
                    on: { 
                        '$service_tikket.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col(`service_item_tikkets.tikket_no`) }
                    },
                }, 
            ]
         
        });

        res.json(tikket);

    } catch (error) {
        console.log(error);

    }
}


export const getDataTikketAllofUser = async(req, res) => {
    
    const { id_user } = req.body;

    Tikket.hasMany(UserAccount);
    Tikket.hasMany(S_type);
    Tikket.hasMany(S_option);
    Tikket.hasMany(Tikket_item);

    try {
        const tikket = await Tikket.findAll({ 
            attributes:  ['tikket_no','requestor','section_req','tel','service_type','service_option','tikket_date','status','comment','review_by','createJob_by'],
            order:[['tikket_date','DESC']],
            where:{
                requestor : id_user
            },
            include: [
                {
                    model: UserAccount,
                    attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`],
                    required: true,
                    on: { 
                            [Sequelize.Op.or]: [
                                {'$service_tikket.requestor$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.review_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.createJob_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}
                            ]
                        },
                },
                {
                    model: S_type,
                    attributes: ['id_type','title'],
                    required: true,
                    on: { 
                        '$service_tikket.service_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_types.id_type`) }
                    },
                },
                {
                    model: S_option,
                    attributes: ['title','status','id_type'],
                    required: true,
                    on: { 
                        '$service_tikket.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.id_option`) }
                    },
                },
                {
                    model: Tikket_item,
                    attributes: ['tikket_no','title','value'],
                    required: true,
                    on: { 
                        '$service_tikket.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col(`service_item_tikkets.tikket_no`) }
                    },
                }, 
            ]
         
        });

        res.json(tikket);

    } catch (error) {
        console.log(error);

    }
}

export const getDataTikketAll = async(req, res) => {

    Tikket.hasMany(UserAccount);
    Tikket.hasMany(S_type);
    Tikket.hasMany(S_option);
    Tikket.hasMany(Tikket_item);

    try {
        const tikket = await Tikket.findAll({ 
            attributes:  ['tikket_no','requestor','section_req','tel','service_type','service_option','tikket_date','status','comment','review_by','createJob_by'],
            order:[['tikket_date','DESC']],
            where:{
                status : {
                            [ Sequelize.Op.or ] : req.body.status 
                         }
            },
            include: [
                {
                    model: UserAccount,
                    attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`],
                    required: true,
                    on: { 
                            [Sequelize.Op.or]: [
                                {'$service_tikket.requestor$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.review_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.createJob_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}
                            ]
                        },
                },
                {
                    model: S_type,
                    attributes: ['id_type','title'],
                    required: true,
                    on: { 
                        '$service_tikket.service_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_types.id_type`) }
                    },
                },
                {
                    model: S_option,
                    attributes: ['title','status','id_type'],
                    required: true,
                    on: { 
                        '$service_tikket.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.id_option`) }
                    },
                },
                {
                    model: Tikket_item,
                    attributes: ['tikket_no','title','value'],
                    required: true,
                    on: { 
                        '$service_tikket.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col(`service_item_tikkets.tikket_no`) }
                    },
                }, 
            ]
         
        });

        res.json(tikket);

    } catch (error) {
        console.log(error);

    }
}


export const getDataTikketCut = async(req, res) => {
    Tikket.hasMany(UserAccount);
    Tikket.hasMany(S_type);
    Tikket.hasMany(S_option);
    Tikket.hasMany(Tikket_item);
    // Tikket.hasMany(Tikket_item);
    // Tikket_item.hasMany(S_item);
    // S_option_item.hasMany(S_item);
    // Emp.hasMany(Sec);

    try {
        const tikket = await Tikket.findAll({ 
            attributes:  ['tikket_no','requestor','section_req','tel','service_type','service_option','tikket_date','status','comment','review_by','createJob_by'],
            order:[['tikket_date','DESC']],
            where:{
               
                [Sequelize.Op.and]: [{tikket_no : req.body.tikket_no  }, {  status: { [Sequelize.Op.or]:req.body.status } }]
            },
            include: [
                {
                    model: UserAccount,
                    attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`],
                    required: true,
                    on: { 
                            [Sequelize.Op.or]: [
                                {'$service_tikket.requestor$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.review_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}, 
                                {'$service_tikket.createJob_by$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}
                            ]
                        },
                },
                {
                    model: S_type,
                    attributes: ['id_type','title'],
                    required: true,
                    on: { 
                        '$service_tikket.service_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_types.id_type`) }
                    },
                },
                {
                    model: S_option,
                    attributes: ['title','status','id_type'],
                    required: true,
                    on: { 
                        '$service_tikket.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.id_option`) }
                    },
                },
                {
                    model: Tikket_item,
                    attributes: ['tikket_no','title','value'],
                    required: true,
                    on: { 
                        '$service_tikket.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col(`service_item_tikkets.tikket_no`) }
                    },
                }, 
            ]
            // include: [
            //     {
            //         model: Emp,
            //         attributes: ['id_emp','gender','emp_name','emp_nameEng','email',`dept`,`section`,`position`,`level`],
            //         required: true,
            //         on: { 
            //             '$service_tikket.requestor$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.id_emp`) }
            //         },
            //         include: [
            //             {
            //                 model: Sec,
            //                 attributes:  ['id','section'],
            //                 required: true,
            //                 on: { 
            //                     '$data_emps.section$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.sections.id`) }
            //                 }
            //             }
            //         ]
                     
            //     },
            //     {
            //         model: S_type,
            //         attributes: ['id_type','title'],
            //         required: true,
            //         on: { 
            //             '$service_tikket.service_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_types.id_type`) }
            //         },
            //     },
            //     {
            //         model: S_option,
            //         attributes: ['title','status','id_type'],
            //         required: true,
            //         on: { 
            //             '$service_tikket.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_options.id_option`) }
            //         },
            //     }, 
            //     {
            //         model: Tikket_item,
            //         attributes: ['id_tk','id_item','value'],
            //         required: true,
            //         on: { 
            //             '$service_tikket.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col(`item_tks.id_tk`) }
            //         },
            //         include: [
            //             {
            //                 model: S_item,
            //                 attributes: ['title','description','input_type'],
            //                 required: true,
            //                 on: { 
            //                     '$item_tks.id_item$':  { [Sequelize.Op.eq]: Sequelize.col(`item_tks.service_items.id_item`) }
            //                 },
            //             }
            //         ]
       
            //     }
            // ]
        });

        res.json(tikket);

    } catch (error) {
        console.log(error);

    }
}

export const getDataJobCutOfUser = async(req, res) => {
    try {
        Schedul_task.hasMany(Job);
        Job.hasMany(Tikket);
        // Job.hasMany(ErpRights);
        // //s
        // Job.hasMany(Rootcase);
        // Job.hasMany(Rootitem);
        Tikket.hasMany(UserAccount);
        // UserAccount.hasMany(Sec);
        //sm
        // Tikket.hasMany(S_type);
        Tikket.hasMany(S_option);
        // Tikket.hasMany(S_option_item);
        // Tikket.hasMany(Tikket_item);

        // Tikket_item.hasMany(S_item);
        // S_option_item.hasMany(S_item);

        const SchedulTasks = await Schedul_task.findAll({
            attributes: ['job_no','assign','level_assign'],
            where:{
                assign : req.body.assign
            },
            include: [
                {
                    model: Job,
                    attributes:  ['job_no','approve_by','assign_detail','job_date', 'open_date', 'startDate', 'endDate', 'close_date','rootcase','rootitem','solutionnote','status', 'tikket_no'],
                    required: true,
                    on: { 
                        '$schedul_task.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('job_its.job_no') }
                    },
                    where:{
                        [Sequelize.Op.and]: [
                            {status : { [Sequelize.Op.or]:req.body.status }}, 
                            // {job_date:  req.body.dateNow }
                        ]
                    },
                    include: [
                                {
                                    model: Tikket,
                                    attributes:  ['tikket_no', 'requestor', 'section_req', 'tel', 'service_type', 'service_option', 'tikket_date', 'status', 'review_by', 'createJob_by'],
                                    required: true,
                                    on: { 
                                        '$job_its.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col('job_its.service_tikkets.tikket_no') }
                                    },
                                    include: [
                                                {
                                                    model: UserAccount,
                                                    attributes: ['id_user', 'name_user', 'name_user_eng', 'gender', 'level_user', 'mail', `role_id`],
                                                    required: true,
                                                    on: { 
                                                        '$job_its.service_tikkets.requestor$' :  { [Sequelize.Op.eq]: Sequelize.col(`job_its.service_tikkets.account_users.id_user`) }
                                                    }
                                                },
                                                {
                                                    model: S_option,
                                                    attributes: ['title'],
                                                    required: true,
                                                    on: { 
                                                        '$job_its.service_tikkets.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`job_its.service_tikkets.service_options.id_option`) }
                                                    },
                                                }, 
                                    ]
                                },
                    ]
                },
            ]
        });

        // const job = await Job.findAll({
        //     where:{
        //         [Sequelize.Op.and]: [{assign_to : req.body.assign_to  }, {  status: { [Sequelize.Op.or]:req.body.status } }]

        //     },
        //     attributes:  ['job_no','assign_detail','job_date', 'open_date', 'start_date', 'target_date', 'close_date','rootcase','rootitem','solutionnote','status', 'tikket_no'],

        //     include: [
        //                 {
        //                     model: Tikket,
        //                     attributes:  ['tikket_no', 'requestor', 'section_req', 'tel', 'service_type', 'service_option', 'tikket_date', 'status', 'review_by', 'createJob_by'],
        //                     required: true,
        //                     on: { 
        //                         '$job_it.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col('service_tikkets.tikket_no') }
        //                     },
        //                     include: [
                                
        //                                 {
        //                                     model: UserAccount,
        //                                     attributes: ['id_user', 'name_user', 'name_user_eng', 'gender', 'level_user', 'mail', `password`, `refresh_token`, `role_id`],
        //                                     required: true,
        //                                     on: { 
        //                                         '$service_tikkets.requestor$' :  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.account_users.id_user`) }
        //                                     }
        //                                 },
        //                                 // {
        //                                 //     model: S_type,
        //                                 //     attributes: ['id_type','title'],
        //                                 //     required: true,
        //                                 //     on: { 
        //                                 //         '$service_tikkets.service_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.service_types.id_type`) }
        //                                 //     },
        //                                 // },
        //                                 {
        //                                     model: S_option,
        //                                     attributes: ['title'],
        //                                     required: true,
        //                                     on: { 
        //                                         '$service_tikkets.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.service_options.id_option`) }
        //                                     },
        //                                 }, 
        //                                 // {
        //                                 //     model: Tikket_item,
        //                                 //     attributes: ['id_tk','id_item','value'],
        //                                 //     required: true,
        //                                 //     on: { 
        //                                 //         '$service_tikkets.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.item_tks.id_tk`) }
        //                                 //     },
        //                                 //     include: [
        //                                 //         {
        //                                 //             model: S_item,
        //                                 //             attributes: ['title','description','input_type'],
        //                                 //             required: true,
        //                                 //             on: { 
        //                                 //                 '$service_tikkets.item_tks.id_item$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.item_tks.service_items.id_item`) }
        //                                 //             },
        //                                 //         }
        //                                 //     ]
        //                                 // },
        //                     ]
        //                 },
        //                 // {
        //                 //     model: ErpRights,
        //                 //     attributes: ['id_it','id_emp','it_name','line_token'],
        //                 //     required: true,
        //                 //     on: {
        //                 //         [Sequelize.Op.or]: [
        //                 //             {'$job_it.assign_by$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it')}}, 
        //                 //             {'$job_it.assign_to$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it')}}, 
        //                 //             {'$job_it.appove_by$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it')}}
        //                 //         ]
        //                 //     }
        //                 // },
        //                 // {
        //                 //     model: Rootcase,
        //                 //     attributes: ['rootcase_name'],
        //                 //     required: true,
        //                 //     on: {
        //                 //         '$job_it.rootcase$':  { [Sequelize.Op.eq]: Sequelize.col('rootcases.rootcase')}
        //                 //     }
        //                 // },
        //                 // {
        //                 //     model: Rootitem,
        //                 //     attributes: ['rootitem_name'],
        //                 //     required: true,
        //                 //     on: {
        //                 //         '$job_it.rootitem$':  { [Sequelize.Op.eq]: Sequelize.col('rootitems.rootitem')}
        //                 //     }
        //                 // }
        //             ]

        // });

        res.json(SchedulTasks);

    } catch (error) {
        console.log(error);
    }
}

export const getDataJob = async(req, res) => {
    try {
        Schedul_task.hasMany(Job);
        Job.hasMany(Tikket);
        Tikket.hasMany(UserAccount);
        Tikket.hasMany(S_option);

        const SchedulTasks = await Schedul_task.findAll({
            attributes: ['job_no','assign','level_assign'],
            include: [
                {
                    model: Job,
                    attributes:  ['job_no','approve_by','assign_detail','job_date', 'open_date', 'startDate', 'endDate', 'close_date','rootcase','rootitem','solutionnote','status', 'tikket_no'],
                    required: true,
                    on: { 
                        '$schedul_task.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('job_its.job_no') }
                    },
                    include: [
                                {
                                    model: Tikket,
                                    attributes:  ['tikket_no', 'requestor', 'section_req', 'tel', 'service_type', 'service_option', 'tikket_date', 'status', 'review_by', 'createJob_by'],
                                    required: true,
                                    on: { 
                                        '$job_its.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col('job_its.service_tikkets.tikket_no') }
                                    },
                                    include: [
                                                {
                                                    model: UserAccount,
                                                    attributes: ['id_user', 'name_user', 'name_user_eng', 'gender', 'level_user', 'mail', `role_id`],
                                                    required: true,
                                                    on: { 
                                                        '$job_its.service_tikkets.requestor$' :  { [Sequelize.Op.eq]: Sequelize.col(`job_its.service_tikkets.account_users.id_user`) }
                                                    }
                                                },
                                                {
                                                    model: S_option,
                                                    attributes: ['title'],
                                                    required: true,
                                                    on: { 
                                                        '$job_its.service_tikkets.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`job_its.service_tikkets.service_options.id_option`) }
                                                    },
                                                }, 
                                    ]
                                },
                    ]
                },
            ]
        });

        // let arr = []

        // for(let i=0; i < SchedulTasks.length; i++) {
        //     arr.push(
        //         {
        //             id_user: SchedulTasks[i].assign,
        //             level_assign: SchedulTasks[i].level_assign,
        //             job_its: SchedulTasks[i].job_its[0].job_no,
        //             serviceOption: SchedulTasks[i].job_its[0].service_tikkets[0].service_options[0].title,
        //             startDate: SchedulTasks[i].job_its[0].start_date,
        //             endDate: SchedulTasks[i].job_its[0].target_date,
        //         }
        //     )
        // }

    

        res.json(SchedulTasks);

    } catch (error) {
        console.log(error);
    }
}

export const getDataJobForSchedu = async(req, res) => {
    try {
        Schedul_task.hasMany(Job);
        Schedul_task.hasMany(Level_assign);
        Job.hasMany(Tikket);
        Tikket.hasMany(UserAccount);
        Tikket.hasMany(S_option);

        const SchedulTasks = await Schedul_task.findAll({
            attributes: ['job_no','assign','level_assign'],
            include: [
                {
                    model: Job,
                    attributes:  ['job_no','job_date', 'open_date', 'startDate', 'endDate', 'close_date','status', 'tikket_no'],
                    required: true,
                    on: { 
                        '$schedul_task.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('job_its.job_no') }
                    },
                    include: [
                                {
                                    model: Tikket,
                                    attributes:  ['tikket_no', 'requestor', 'section_req', 'tel', 'service_type', 'service_option', 'tikket_date', 'status', 'review_by', 'createJob_by'],
                                    required: true,
                                    on: { 
                                        '$job_its.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col('job_its.service_tikkets.tikket_no') }
                                    },
                                    include: [
                                                {
                                                    model: UserAccount,
                                                    attributes: ['id_user', 'name_user', 'name_user_eng', 'gender', 'level_user', 'mail', `role_id`],
                                                    required: true,
                                                    on: { 
                                                        '$job_its.service_tikkets.requestor$' :  { [Sequelize.Op.eq]: Sequelize.col(`job_its.service_tikkets.account_users.id_user`) }
                                                    }
                                                },
                                                {
                                                    model: S_option,
                                                    attributes: ['title'],
                                                    required: true,
                                                    on: { 
                                                        '$job_its.service_tikkets.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`job_its.service_tikkets.service_options.id_option`) }
                                                    },
                                                }, 
                                    ]
                                },
                    ]
                }
                ,
                {
                    model: Level_assign,
                    attributes: ['id','level_name'],
                    required: true,
                    on: { 
                        '$schedul_task.level_assign$':  { [Sequelize.Op.eq]: Sequelize.col('level_assigns.id') }
                    }
                }
            ]
        });

        let arr = [];
        for(let i=0; i < SchedulTasks.length; i++) {

            arr.push(
                {
                    job_no: SchedulTasks[i].job_no,
                    job_date: SchedulTasks[i].job_its[0].job_date,
                    startDate: SchedulTasks[i].job_its[0].startDate,
                    endDate: SchedulTasks[i].job_its[0].endDate,
                    tikket_no:  SchedulTasks[i].job_its[0].service_tikkets[0].tikket_no,
                    assign_by: SchedulTasks[i].job_its[0].service_tikkets[0].createJob_by,
                    assign: SchedulTasks[i].assign,
                    level_assign: SchedulTasks[i].level_assign,
                    approve_by:SchedulTasks[i].job_its[0].service_tikkets[0].review_by,
                    level_assign_name: SchedulTasks[i].level_assigns[0].level_name,
                    service_options: SchedulTasks[i].job_its[0].service_tikkets[0].service_options[0].title,
                    requestor: SchedulTasks[i].job_its[0].service_tikkets[0].account_users[0].name_user_eng,
                    mail: SchedulTasks[i].job_its[0].service_tikkets[0].account_users[0].mail,
                    section_req: SchedulTasks[i].job_its[0].service_tikkets[0].section_req,
                    tel: SchedulTasks[i].job_its[0].service_tikkets[0].tel,
                    color: "#f4f4f4",
                    status: SchedulTasks[i].job_its[0].status
                }
            )
           
        }

        res.json(arr);

    } catch (error) {
        console.log(error);
    }
}

// export const getDataJob = async(req, res) => {
//     try {
//         Job.hasMany(Tikket);
//         Job.hasMany(ErpRights);

//         //s
//         Job.hasMany(Rootcase);
//         Job.hasMany(Rootitem);

//         Tikket.hasMany(UserITService);

//         //sm
//         Tikket.hasMany(S_type);
//         Tikket.hasMany(S_option);
//         Tikket.hasMany(S_option_item);
//         Tikket.hasMany(Tikket_item);
//         Tikket_item.hasMany(S_item);

//         S_option_item.hasMany(S_item);
//         UserITService.hasMany(Emp);
//         Emp.hasMany(Sec);



//         const job = await Job.findAll({
//             where:{
//                 status: {
//                     [Sequelize.Op.or]:req.body.status
//                 }
//             },
//             include: [
//                         {
//                             model: Tikket,
//                             attributes:  ['tikket_no','requestor','tel','service_type','service_option','tikket_date','status','review_by'],
//                             required: true,
//                             on: { 
//                                 '$job_it.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col('service_tikkets.tikket_no') }
//                             },
//                             include: [
                                
//                                         {
//                                             model: Emp,
//                                             attributes: ['id_emp','gender','emp_name','emp_nameEng','email','password',`refresh_token`,'birth',`dept`,`section`,`position`,`level`,`type`],
//                                             required: true,
//                                             on: { 
//                                                 '$service_tikkets.requestor$' :  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.data_emps.id_emp`) }
//                                             },
//                                             include: [
//                                                 {
//                                                     model: Sec,
//                                                     attributes:  ['id','section'],
//                                                     required: true,
//                                                     on: { 
//                                                         '$service_tikkets.data_emps.section$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.data_emps.sections.id`) }
//                                                     }
//                                                 }
//                                             ]
                                            
//                                         },
//                                         {
//                                             model: S_type,
//                                             attributes: ['id_type','title'],
//                                             required: true,
//                                             on: { 
//                                                 '$service_tikkets.service_type$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.service_types.id_type`) }
//                                             },
//                                         },
//                                         {
//                                             model: S_option,
//                                             attributes: ['title','status','whoAppr','id_type'],
//                                             required: true,
//                                             on: { 
//                                                 '$service_tikkets.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.service_options.id_option`) }
//                                             },
//                                         }, 
//                                         {
//                                             model: Tikket_item,
//                                             attributes: ['id_tk','id_item','value'],
//                                             required: true,
//                                             on: { 
//                                                 '$service_tikkets.tikket_no$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.item_tks.id_tk`) }
//                                             },
//                                             include: [
//                                                 {
//                                                     model: S_item,
//                                                     attributes: ['title','description','input_type'],
//                                                     required: true,
//                                                     on: { 
//                                                         '$service_tikkets.item_tks.id_item$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.item_tks.service_items.id_item`) }
//                                                     },
//                                                 }
//                                             ]
//                                         },
//                                         // {
//                                         //     model: S_option_item,
//                                         //     attributes: ['id_option','id_item'],
//                                         //     required: true,
//                                         //     on: { 
//                                         //         '$service_tikkets.service_option$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.service_option_items.id_option`) }
//                                         //     },
//                                         //     include: [
//                                         //         {
//                                         //             model: S_item,
//                                         //             attributes: ['title','description','input_type'],
//                                         //             required: true,
//                                         //             on: { 
//                                         //                 '$service_tikkets.service_option_items.id_item$':  { [Sequelize.Op.eq]: Sequelize.col(`service_tikkets.service_option_items.service_items.id_item`) }
//                                         //             },
//                                         //         }
//                                         //     ]
//                                         // }
//                             ]
//                         },
//                         {
//                             model: ErpRights,
//                             attributes: ['id_it','id_emp','it_name','line_token'],
//                             required: true,
//                             on: {
//                                 // [Op.or]: [
//                                 //     { authorId: 12 },
//                                 //     { authorId: 13 }
//                                 // ]
//                                 [Sequelize.Op.or]: [
//                                     {'$job_it.assign_by$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it')}}, 
//                                     {'$job_it.assign_to$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it')}}, 
//                                     {'$job_it.appove_by$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it')}}
//                                 ]
//                             }
//                         //     on: { 
//                         //         id_it :  { [Sequelize.Op.eq]: Sequelize.col('job_it.appove_by')},
//                         //         // '$job_it.appove_by$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it')}
//                         //     }
//                         },
//                         {
//                             model: Rootcase,
//                             attributes: ['rootcase_name'],
//                             required: true,
//                             on: {
//                                 '$job_it.rootcase$':  { [Sequelize.Op.eq]: Sequelize.col('rootcases.rootcase')}
//                             }
//                         },
//                         {
//                             model: Rootitem,
//                             attributes: ['rootitem_name'],
//                             required: true,
//                             on: {
//                                 '$job_it.rootitem$':  { [Sequelize.Op.eq]: Sequelize.col('rootitems.rootitem')}
//                             }
//                         }
//                     ]

//         });
//         res.json(job);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getDataJobMemberCut = async(req, res) => {
    Schedul_task.hasMany(UserAccount);

    try {
        const SchedulTasks = await Schedul_task.findAll({
            attributes: ['job_no','assign','level_assign'],
            order: [
                ['level_assign', 'ASC'],
            ],
            where:{
                job_no : req.body.job_no
            },
            include: [
                {
                    model: UserAccount,
                    attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`],
                    required: true,
                    on: {
                        [Sequelize.Op.or]: [
                            {'$schedul_task.assign$':  { [Sequelize.Op.eq]: Sequelize.col('account_users.id_user')}}
                        ]
                    }
                },
            ]
        });

        res.json(SchedulTasks);

    } catch (error) {
        console.log(error);

    }
}

export const getDataJobCut = async(req, res) => {
    try {
        Job.hasMany(Schedul_task);
        Schedul_task.hasMany(UserAccount);
        Job.hasMany(UserAccount);
        Job.hasMany(Rootcase);
        Job.hasMany(Rootitem);

        const job = await Job.findAll({
            where:{               
               tikket_no : req.body.tikket_no

            },
            attributes:  ['job_no','approve_by','assign_detail','job_date', 'open_date', 'startDate', 'endDate', 'close_date','rootcase','rootitem','solutionnote','status', 'tikket_no'],
            include: [  {
                            model: Schedul_task,
                            attributes: ['job_no','assign','level_assign'],
                            required: true,
                            where:{               
                                level_assign : 1
                 
                            },
                            on: {
                                '$job_it.job_no$':  { [Sequelize.Op.eq]: Sequelize.col('schedul_tasks.job_no')}
                            },
                            include: [
                                {
                                    model: UserAccount,
                                    attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`],
                                    required: true,
                                    on: {
                                        [Sequelize.Op.or]: [
                                            {'$schedul_tasks.assign$':  { [Sequelize.Op.eq]: Sequelize.col('schedul_tasks.account_users.id_user')}}
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            model: Rootcase,
                            attributes: ['rootcase_name'],
                            required: true,
                            on: {
                                '$job_it.rootcase$':  { [Sequelize.Op.eq]: Sequelize.col('rootcases.rootcase')}
                            }
                        },
                        {
                            model: Rootitem,
                            attributes: ['rootitem_name'],
                            required: true,
                            on: {
                                '$job_it.rootitem$':  { [Sequelize.Op.eq]: Sequelize.col('rootitems.rootitem')}
                            }
                        }
                    ]

        });

        res.json(job);

    } catch (error) {
        console.log(error);

    }
}

// export const getDept = async(req, res) => {
//     try {
//         const dept = await Dept.findAll({});
//         res.json(dept);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getPos = async(req, res) => {
//     try {
//         const pos = await Position.findAll({});
//         res.json(pos);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getSec = async(req, res) => {
    try {
        const sec = await Sec.findAll({
            attributes:  ['id','section']
        });
        res.json(sec);
    } catch (error) {
        console.log(error);
    }
}

export const getDataAllUser = async(req, res) => {
    try {
    
        const AllUser = await UserAccount.findAll({
            where: {
                id_user: {
                    [Sequelize.Op.ne]: "ADMIN001"
                }
            },
            attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,'tel',`mail`,`password`,`role_id`]
          
        });

        res.json(AllUser);

    } catch (error) {
        console.log(error);

    }
}

// export const getDataAllEmp = async(req, res) => {
//     try {
//         Emp.hasMany(UserITService);
//         Emp.hasMany(Dept);
//         Emp.hasMany(Position);
//         Emp.hasMany(Sec);

//         // Emp.hasMany(Dept, { as: 'depts' , constraints: false});
//         // let attributes =;
//         const EmpS = await Emp.findAll({
//             where: {
//                 id_emp: {
//                     [Sequelize.Op.ne]: "000001"
//                 }
//             },
//             attributes: ['id_emp','gender','emp_name','emp_nameEng','birth',`dept`,`section`,`position`,`level`,`type`],
//             include: [
//                         {
//                             where: {
//                                 status_pf: "pf_on"
//                             },
//                             model: UserITService,
//                             attributes: ['id_profile','id_emp','profile_name','email','status_pf'],
//                             required: true,
//                             on: { 
//                                 '$data_emp.id_emp$':  { [Sequelize.Op.eq]: Sequelize.col(`user_profiles.id_emp`) }
//                             }
//                         },
//                         {

//                             model: Dept,
//                             attributes:  ['id','dept'],
//                             required: true,
//                             //   as: 'depts',
//                             on: { 
//                                 '$data_emp.dept$':  { [Sequelize.Op.eq]: Sequelize.col('departments.id') }
//                             }
//                         },{ 

//                             model: Position,
//                             attributes:  ['id','position'],
//                             required: true,
//                             on: { 
//                                 '$data_emp.position$':  { [Sequelize.Op.eq]: Sequelize.col('positions.id') }
//                             }

//                         },{ 

//                             model: Sec,
//                             attributes:  ['id','section'],
//                             required: true,
//                             on: { 
//                                 '$data_emp.section$':  { [Sequelize.Op.eq]: Sequelize.col('sections.id') }
//                             }

//                         }
//                     ]

//         });
//         res.json(EmpS);
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const getDataAllEmpIT = async(req, res) => {
//     try {
//         ErpRights.hasMany(Emp);
//         Emp.hasMany(Dept);
//         Emp.hasMany(Position);
//         Emp.hasMany(Sec);
//         // let attributes =;
//         const EmpSIT = await ErpRights.findAll({
//             where: {
//                 id_it: {
//                     [Sequelize.Op.ne]: "IT000001"
//                 }
//             },
//             attributes: ['id_it','id_emp','it_name','line_token'],
//             required: true,
//             include: [
                
//                         {
//                             model: Emp,
//                             attributes: ['id_emp','gender','emp_name','emp_nameEng','email','password',`refresh_token`,'birth',`dept`,`section`,`position`,`level`,`type`],
//                             required: true,
//                             on: { 
//                                 '$erp_rights.id_emp$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.id_emp`) }
//                             },
//                             include: [
//                                 {
//                                     model: Dept,
//                                     attributes:  ['id','dept'],
//                                     required: true,
//                                     on: { 
//                                         '$data_emps.dept$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.departments.id`) }
//                                     }
//                                 },
//                                 {
//                                     model: Sec,
//                                     attributes:  ['id','section'],
//                                     required: true,
//                                     on: { 
//                                         '$data_emps.section$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.sections.id`) }
//                                     }
//                                 },
//                                 {
//                                     model: Position,
//                                     attributes:  ['id','position'],
//                                     required: true,
//                                     on: { 
//                                         '$data_emps.position$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.positions.id`) }
//                                     }
//                                 },
//                             ]

//                         }
                
//                     ]
//         });

//         res.json(EmpSIT);
//     } catch (error) {
//         console.log(error);
//     }
// }
// // where:{
// //     [Sequelize.Op.and]: [{id_option : id_option  }, {  id_item : delItems[i] }]
// // }


// export const getEmpProfile = async(req, res) => {
//     UserITService.hasMany(Emp);

//     try {
        
//         const EmpProfile = await UserITService.findAll({
//             where: {
//                 status_pf: "pf_on"
//             },
//             attributes: ['id_profile','id_emp','profile_name','email', 'password', 'status_pf'],
            
//             include: [
//                         {
//                             model: Emp,
//                             attributes: ['id_emp','emp_name','emp_nameEng'],
//                             required: true,
//                             on: { 
//                                 '$user_profile.id_emp$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.id_emp`) }
//                             },
//                         }
//             ]
//         });

//         res.json(EmpProfile);

//     } catch (error) {
//         console.log(error);
//     }
    
// }

// export const getAllProfileCut = async(req, res) => {
//     try {
//         const emps = await Emp.findAll({
//             attributes: ['id_emp','gender','emp_name','emp_nameEng','email','birth',`dept`,`section`,`position`,`level`,`type`],
//         });
//         res.json(emps);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getProfileCut = async(req, res) => {
    const { id_user } = req.body;

    try {
        const user = await UserAccount.findAll({
            where:{
                [Sequelize.Op.and]: [{id_user : { [Sequelize.Op.or]: id_user }  }]
            },
            attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,'tel',`mail`,`password`,`role_id`]
        });

      
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}

// export const getProfileIDCut = async(req, res) => {
//     const { id_profile, status_pf } = req.body;

//     try {
//         const emps = await UserITService.findAll({
//             where:{
//                 [Sequelize.Op.and]: [{id_profile : id_profile }, {  status_pf : status_pf }]
//             },
//             attributes: ['id_profile','id_emp','profile_name','email', 'password', 'status_pf']
//         });
//         res.json(emps)
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getUsers = async(req, res) => {
//     try {
//         const emps = await UserITService.findAll({
//             attributes: ['id_profile','id_emp','profile_name','email', 'password', 'status_pf']
//         });
//         res.json(emps);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getNotes = async(req, res) => {
    try {
        const notes = await Notes.findAll({
            // limit: 2,
            where:{
                id_user: req.body.id_user
            },
            // order: [
            //     ['id', 'DESC'],
            // ],
            attributes:['id','id_user','description']
        });
        // const note =  {
        //     id: posts[0].id,
        //     title: posts[0].title,
        //     description: posts[0].description,
        //     information: posts[0].information,
        // }
        res.json(notes);
    } catch (error) {
        console.log(error);
    }
}

export const CreateNote = async(req, res) => {

    const {id_user, description} = req.body;
    try {
       
        await Notes.create({
            id_user: id_user,
            description: description
        });

        res.json({msg: "Create"});
        
    } catch (error) {
        console.log(error + " B");
    }

}

export const AddNote = async(req, res) => {
    const {id_user, description} = req.body;
   
    try {
        await Notes.update({description: description},{
            where:{
                id_user :id_user
            }
        });

        res.json({msg: "edit"});

    } catch (error) {
        console.log(error);
    } 
   
}

// export const Register = async(req, res) => {
//     const { id_emp, profile_name, email, password, confPassword } = req.body;
//     if(password !== confPassword) return res.status(400).json({msg: "Confirm Password"});
//     // const salt = await bcrypt.genSalt();
//     // const hashPassword = await bcrypt.hash(password, salt);
//     try {
//         await UserITService.create({
//             id_emp: id_emp,
//             profile_name: profile_name,
//             email: email,
//             password: password
//         });
//         res.json({msg: "Register finish"});
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const CreateProfile = async(req, res) => {
//     const { id_emp, profile_name, email, password } = req.body;
   
//     try {
//         await UserITService.create({
//             id_profile: "PF" + id_emp + "_01",
//             id_emp: id_emp,
//             profile_name: profile_name,
//             email: email,
//             password: password,
//             status_pf: "pf_on",
//             refresh_token: "",
            
//         });

//         res.json({msg: "New Profile " + profile_name});

//     } catch (error) {
//         console.log(error);

//     }
// }


export const UpdateProfile = async(req, res) => {
    const { id_user, name_user, name_user_eng, mail } = req.body;
   
    try {
        await UserAccount.update({ name_user: name_user, name_user_eng: name_user_eng, mail: mail, }, {
            where: {
                id_user: id_user
            }
        });

        res.json({msg: "UPDATE DATA USER ID : " + id_user});
        
    } catch (error) {
        console.log(error);

    }
}


export const Login = async(req, res) => {

    try {
        let salt = " asdsadqwewqeqweasd1546832adfqwegdsa";
        const User_login = await UserAccount.findAll({
            where:{
                id_user : req.body.name
            },
            attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`,`password`,`refresh_token`,`role_id`,`verify_email`]
        });
        // let check_password = (atob(User_login[0].password).split(" "))[0];
        let check_password = (Buffer.from(User_login[0].password,'base64').toString().split(" "))[0];
        console.log("req.body.password",req.body.password);
        console.log("check_password",check_password);
        console.log("",User_login[0].password);
        if( req.body.password != check_password ) return res.status(400).json({msg: "Wrong Password"});
        if(User_login[0].verify_email == false) return res.status(400).json({msg: "This account isn't verify e-mail yet"});
        
        const userid  = User_login[0].id_user ;
        const user_name = User_login[0].user_name;
        const mail = User_login[0].mail;
        const role = User_login[0].role_id;

        const accessToken = jwt.sign({userid, user_name, mail, role}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userid, user_name, mail, role}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await UserAccount.update({refresh_token: refreshToken},{
            where:{
                id_user : userid
            }
        });

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({accessToken});

    } catch (error) {
        console.log(error);
       res.status(404).json({msg:"Username  is incorrect"});
    }
}

export const Logout = async(req, res) => {

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);

    const User = await UserAccount.findAll({
        where:{
            refresh_token: refreshToken
        },
        attributes: ['id_user','name_user','name_user_eng','gender',`level_user`,`mail`,`password`,`refresh_token`,`role_id`]
        
    });

    if(!User[0]) return res.sendStatus(204);
    const IDUser = User[0].id_user;

    await UserAccount.update({refresh_token: null},{
        where:{
            id_user: IDUser
        }
    });

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

// export const geterp_prom = async(req, res) => {
//     const {id_login} = req.body;
//     try {
//         const erp_prom = await ErpRights.findAll({
//             where:{
//                 id_it: id_login
//             },
//             attributes: ['manage_job', 'create_job', 'asst_job', 'approve_job', 'service_config', 'manageProfile', 'notebook_center']
//         });
//         res.json(erp_prom)
//         // res.json({data:[erp_prom[0].id_it,erp_prom[0].manage_job, erp_prom[0].create_job, erp_prom[0].asst_job, erp_prom[0].approve_job, erp_prom[0].service_config ]});
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getAllerp_prom = async(req, res) => {
//     try {
//         const erp_prom = await ErpRights.findAll({
//             attributes: ['id_it', 'id_emp', 'it_name','line_token', 'manage_job', 'create_job', 'asst_job', 'approve_job', 'service_config', 'manageProfile', 'notebook_center']
//         });

//         res.json(erp_prom)

//     } catch (error) {
//         console.log(error);
//     }
// }


// export const AddErp_prom = async(req, res) => {
//     const {id_profile, id_it, it_name} = req.body;

//     try {
//         await ErpRights.create({
//             id_profile : id_profile ,
//             id_it : id_it ,
//             it_name	: it_name,
//             line_token : null,
//             manage_job: true,
//             create_job: false,
//             asst_job: false,
//             approve_job: false,
//             service_config: false,
//             notebook_center: true
            
//         });

//         res.json({msg: "Add IT profile " + it_name.split(" ")[0].charAt(0).toUpperCase() + it_name.split(" ")[0].slice(1).toLowerCase() + " " + it_name.split(" ")[1].charAt(0).toUpperCase()+it_name.split(" ")[1].slice(1).toLowerCase() + " sucsess"});

//     } catch (error) {
//         console.log(error);
//     }
// }

// export const UpdateErp_prom = async(req, res) => {
//     const {id_it, value, update} = req.body;

//     try {

//         if( update == "manage_job" ) {
//             await ErpRights.update({ manage_job: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } else if( update == "create_job" ) {
//             await ErpRights.update({ create_job: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } else if( update == "asst_job" ) {
//             await ErpRights.update({ asst_job: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } else if( update == "approve_job" ) {
//             await ErpRights.update({ approve_job: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } else if( update == "manage_job" ) {
//             await ErpRights.update({ manage_job: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } else if( update == "service_config" ) {
//             await ErpRights.update({ service_config: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } else if( update == "manageProfile" ) {
//             await ErpRights.update({ manageProfile: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } else if( update == "notebook_center" ) {
//             await ErpRights.update({ notebook_center: value },{
//                 where:{
//                     id_it : id_it
//                 }
//             });

//         } 

//         // res.json(erp_prom)

//     } catch (error) {
//         console.log(error);
//     }
// }

// // "item_tks": [
// //     {
// //       "id_tk": "tk220213-000001",
// //       "id_item": "IT000001-000001",
// //       "value": "7-Zip",
// //       "service_items": [
// //         {
// //           "title": "โปรแกรม / program",
// //           "description": "เลือกโปรแกรมที่ต้องการใช้ สามารถเลือกได้มากกว่า 1 รายการ และหากนอกเหนือจากรายการที่มีอยู่ให้กรอกข้อมูลลงไปที่ช่อง",
// //           "input_type": "text"
// //         }
// //       ]
// //     },
// //     {
// //       "id_tk": "tk220213-000001",
// //       "id_item": "IT000001-000002",
// //       "value": "ITU00002",
// //       "service_items": [
// //         {
// //           "title": "ชื่อเครื่องคอมพิวเตอร์ / computer name",
// //           "description": "กรณีที่เป็น computer เครื่องใหม่ให้ระบุเป็น ITU9999 กรณีเป็น Notebook เครื่องใหม่ให้ระบุเป็น ITN",
// //           "input_type": "text"
// //         }
// //       ]
// //     },
// //     {
// //       "id_tk": "tk220213-000001",
// //       "id_item": "IT000001-000003",
// //       "value": " - ",
// //       "service_items": [
// //         {
// //           "title": "รายละเอียด / detaill",
// //           "description": "อธิบายรายละเอียดความต้องการของผู้ร้องขอ",
// //           "input_type": "text"
// //         }
// //       ]
// //     },
// //     {
// //       "id_tk": "tk220213-000001",
// //       "id_item": "IT000001-000004",
// //       "value": " - ",
// //       "service_items": [
// //         {
// //           "title": "ไฟล์แนบ / attach file",
// //           "description": "ขนาดของไฟล์ห้ามเกิน 5MB และสามารถเพิ่มได้มากกว่า 1 ไฟล์",
// //           "input_type": "text"
// //         }
// //       ]
// //     }
// // ],

// export const CheckNotebook = async (req, res) => {
//     try {

//         const { device_id, round, day, reserve_by} = req.body;
//         // let rb;
//         let B_reserve_by ;

//         if(reserve_by.substring(0,2) === "IT" ) {
//             B_reserve_by = reserve_by.substring(2)

//         } else {
//             B_reserve_by = reserve_by

//         }

//         const check_reserve_by = await DataBook.findAll({
//             where:{
//                 [Sequelize.Op.and] : [{  reserve_by : B_reserve_by }, { day : day }]

//             }

//         })

//         const data = await DataBook.findAll({
//             where:{
//                 [Sequelize.Op.and]: [{device_id : device_id }, {  round : round },{day:day}]
//             }
//         })
//         // res.json(data.length)
//         // res.json(data.length)
//         if (check_reserve_by.length == 0 && data.length == 0) {
//             if (isNaN(reserve_by)) {
//                 const user = await DataBook.create({ device_id: device_id, round: round, day: day, reserve_by: reserve_by.substring(2) });
//                 res.json("1")

//             } else {
//                 const user = await DataBook.create({ device_id: device_id, round: round, day: day, reserve_by: reserve_by });
//                 res.json("1")

//             }

//         } else {
//             res.json("0")

//         }
//         // const data = await DataBook.findAll({
//         // })
//         // for (let i = 0; i < data.length; i++) {
//         //     if (data[i].device_id == device_id && data[i].round == round && data[i].day == day) {
//         //         res.send("0")
//         //         rb = 0;
//         //         return;
//         //     }
//         // }
//         // if (rb != 0) {
//         //     if (isNaN(reserve_by)) {
//         //         await DataBook.create({ device_id: device_id, round: round, day: day, reserve_by: reserve_by.substring(2) });
//         //         res.send("1")
//         //         return;

//         //     }
//         //     await DataBook.create({ device_id: device_id, round: round, day: day, reserve_by: reserve_by });
//         //     res.send("1")
//         //     return;

//         // }


//     }
//     catch (error) {
//         res.send(error);
//         return;
//     }

//     // if (info[0].status == "empty") {
//     //     res.send("1")
//     //     await DataBook.update({ status: "use", reserve_by: reserve_by }, {
//     //         where: {
//     //             device_id: device_id,
//     //             round: round
//     //         }
//     //     });


//     // }
//     // else {
//     //     res.send("0")
//     // }


// }

// // export const CheckNotebookReserve_by = async (req, res) => {
// //     try {
// //         const { day, reserve_by } = req.body;
// //         let B_reserve_by ;
// //         if(reserve_by.substring(0,2) === "IT" ) {
// //             B_reserve_by = reserve_by.substring(2)
// //         } else {
// //             B_reserve_by = reserve_by
// //         }
// //         const data = await DataBook.findAll({
// //             where:{
// //                 [Sequelize.Op.and] : [{  reserve_by : B_reserve_by }, { day : day }]

// //             }

// //         })
   
// //         if (data.length > 0) {
// //             res.json(true)

// //         } else {
// //             res.json(false)
// //         }

// //     }
// //     catch (error) {
// //         res.send(error);
// //         return;
// //     }

// // }

// export const FindnameEmp = async (req, res) => {
//     try {
//         // { text: 'Low Priority', id: "IT001", color: blue },

//         const color = [

//             "#23eb87" ,
//             "#ffc16a" ,
//             "#ff7670" ,
//             "#ff6cc7" ,
//             "#de6cff" ,
//             "#8c6eff" ,
//             "#6eaaff" ,
//             "#6bffff" ,
//             "#6bffff" ,
//             "#6dffac" ,
//         ]

//         const data = await ErpRights.findAll({
//             where: {
//                 id_it: {
//                     [Sequelize.Op.ne]: "IT000001"
//                 }
//             },
//             attributes: ['id_profile', 'id_it', 'it_name','line_token', 'manage_job', 'create_job', 'asst_job', 'approve_job', 'service_config', 'manageProfile', 'notebook_center']

//         })

//         let newData = []
//         let indexColor;
//         for (let i = 0; i < data.length; i++) {
//             newData.push({ text: data[i].it_name.split(" ")[0].charAt(0).toUpperCase() + data[i].it_name.split(" ")[0].slice(1).toLowerCase() + " " + data[i].it_name.split(" ")[1].charAt(0).toUpperCase()+".", id: data[i].id_it, color: color[i]})
            
//             if(indexColor >= 10 ) {
//                 indexColor = 0;
//             }
//         }
        
//         res.json(newData)

//     } catch (error) {
//         res.send(error);
//     }

// }

// export const Findschedudata = async (req, res) => {

//     try {
//         const data = await Schedu.findAll({
//         })
//         res.json(data)

//     } catch (error) {
//         res.send(error);
//     }

// }

// const todate = (time) => {
//     return (moment(time).format());
    
// }

// export const formatSchedudata = async (req, res) => {
//     Job.hasMany(ErpRights);
    

//     try {
//         const data = await Job.findAll({
//             attributes:  ['job_no', 'appove_by', 'assign_by','assign_to', 'assign_detail','job_date', 'open_date', 'start_date', 'target_date', 'close_date', 'rootcase', 'rootitem', 'solutionnote', 'status', 'tikket_no', 'createdAt'],
//             include: [
//                 {
//                     model: ErpRights,
//                     attributes: ['id_it','id_emp','it_name','line_token'],
//                     required: true,
//                     on: { 
//                         '$job_it.assign_to$':  { [Sequelize.Op.eq]: Sequelize.col('erp_rights.id_it') }
//                     },
                  
//                 },
               
//             ]
//         })

//         let Schedudata = []

//         for (let i = 0; i < data.length; i++) {
//             Schedudata.push({
//                 allDay: false,
//                 endDate:data[i].target_date.toGMTString(), 
//                 notes: data[i].assign_detail !== null && data[i].assign_detail !== "" ? data[i].assign_detail : "-" ,
//                 priorityId: data[i].assign_to,
//                 startDate: data[i].start_date.toGMTString(),
//                 title: "JOB NO. : " + data[i].job_no
//                 // title: data[i].erp_rights[0].it_name.split(" ")[0].charAt(0).toUpperCase() + data[i].erp_rights[0].it_name.split(" ")[0].slice(1).toLowerCase() + " " + data[i].erp_rights[0].it_name.split(" ")[1].charAt(0).toUpperCase()+"."
//             })
            
//         }

//         res.json(Schedudata)

//     } catch (error) {
//         res.send(error);
//     }

// }



// export const Addschedu = async (req, res) => {
//     const s_id = req.body.s_id;
//     const notes = req.body.notes;
//     const time_start = req.body.time_start;
//     const time_end = req.body.time_end;
//     const title = req.body.title;
//     const owner_n = req.body.owner_n;

//     try {
//         const data = await Schedu.create({ s_id: s_id, notes: notes, time_start: time_start, time_end: time_end, title: title, owner_n: owner_n });
//         res.json(data)

//     } catch (error) {
//         res.send(error);
//     }


// }
// export const Upschedu = async (req, res) => {
//     const s_id = req.body.s_id;
//     const notes = req.body.notes;
//     const time_start = req.body.time_start;
//     const time_end = req.body.time_end;
//     const title = req.body.title;
//     const owner_n = req.body.owner_n;

//     await Schedu.update({ notes: notes, time_start: time_start, time_end: time_end, title: title, owner_n: owner_n }, {
//         where: {
//             s_id: s_id
//         }
//     });
//     res.send("ok")

// }

// export const Delschedu = async (req, res) => {
//     const s_id = req.body.s_id;
//     try {
//         await Schedu.destroy({
//             where: {
//                 s_id: s_id
//             }
//         });
//         res.json("ok")

//     } catch (error) {
//         res.send(error);
//     }

// }

// export const Checknote = async (req, res) => {
//     const day = req.body.day;
//     // const arr = []
//     DataBook.hasMany(Emp);
//     try {
//         const data = await DataBook.findAll({
//             where: {
//                 day: day
//             },
//             order:[['book_id','DESC']],
//             attributes: ['book_id', 'device_id', 'round', 'day', 'reserve_by'],
//             include: [
//                 {
//                     model: Emp,
//                     attributes: ['id_emp','emp_name','emp_nameEng'],
//                     required: true,
//                     on: { 
//                         '$data_book_center.reserve_by$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.id_emp`) }
//                     },
//                 }
//             ]

//         });

//         // for (let i = 0; i < data.length; i++) {
//         //     if (data[i].day == day) {
//         //         arr.push(data[i])
//         //     }
//         // }

//         res.json(data);
//     } catch (error) {
//        console.log(error);
//     }

// }


// export const HistoryNCCUT = async (req, res) => {
//     const { id_emp } = req.body;

//     DataBook.hasMany(Emp);
//     try {
//         const data = await DataBook.findAll({
//             where: {
//                 reserve_by: id_emp
//             },
//             attributes: ['book_id', 'device_id', 'round', 'day', 'reserve_by'],
//             order:[['book_id','DESC']],
//             include: [
//                 {
//                     model: Emp,
//                     attributes: ['id_emp','emp_name','emp_nameEng'],
//                     required: true,
//                     on: { 
//                         '$data_book_center.reserve_by$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.id_emp`) }
//                     },
//                 }
//             ]

//         });

//         res.json(data);
//     } catch (error) {
//         console.log(error);
//     }

// }

// export const HistoryNC = async (req, res) => {
//     DataBook.hasMany(Emp);
//     try {
//         const data = await DataBook.findAll({
//             attributes: ['book_id', 'device_id', 'round', 'day', 'reserve_by'],
//             order:[['book_id','DESC']],
//             include: [
//                 {
//                     model: Emp,
//                     attributes: ['id_emp','emp_name','emp_nameEng'],
//                     required: true,
//                     on: { 
//                         '$data_book_center.reserve_by$':  { [Sequelize.Op.eq]: Sequelize.col(`data_emps.id_emp`) }
//                     },
//                 }
//             ]

//         });

//         res.json(data);
//     } catch (error) {
//         console.log(error);
//     }

// }

// export const Testwhere = async (req, res) => {
//     const day = req.body.day;
//     try {

//         const data = await DataBook.query(
//             'SELECT * FROM projects WHERE status = :status',
//             {
//               replacements: { day: "2022-05-26" },
//               type: QueryTypes.SELECT
//             }
//           );

//         //   const data= await DataBook.findAll({
//         //     where: {
//         //         day:day
//         //     }
//         //   });
   
//         res.send(data);
//     } catch (error) {
//         res.send(error);
//     }

// }
