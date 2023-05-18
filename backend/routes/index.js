import express from "express";
import {
    Login, Logout, getUserAccount, getServiceType, getServiceOption, AddNote, getNotes, CreateNote, getDataJobCutOfUser,
    getChartDataTikket, getDataJobCountCutOfUser, Job_CloseJOB, Job_OpenJOB, getRootitem, getRootcase,
    getDataTikketCut,getDataJob,getDataJobCut,getDataJobMemberCut, getProfileCut ,UpdateProfile, getDataAllUser, getDataTikket, LastJob,
    UpdateStatusTk, getDataTikketAll, UpdateItemTK, CreateJob, UpdateJob, CanceltaskJob,  getOptionItems, getItemOption, getSec, getNotebook_center,
    getData_book_round, getDataBookCurrentDate, getDataBook, getDataBookCheckForAdding, getTeamMember, getDataUserForDeviceCenter,
    updateDataBooking, deleteDataBooking, getUserAccountForSchedu,getDataJobForSchedu, Job_upDateAssignDetail,getDataAllServiceDetail,getDataOptionDetail,
    getAllItem, UpdateAllDetailServiceOption, RemoveServiceOption ,RemoveServiceType, CreateServiceOption, UpdateStatusServiceOption, LastOption, LastS_type,
    CreateNewServiceType, UpdateNameNotebook_center, UpdateNameServiceType, UpdateNameOption, UpdateWhoApprOption, UpdateTeamSupOption, getTeam_support,
    DelDeviceCenter, CreateDeviceCenter, UpdateStatusNotebook_center
    

} from "../controllers/Users.js";
import { Send_Email,Change_Verify} from "../controllers/VerifyEmail.js"
import {finddatachat,updatechatbot,deletechatbot,addchatbot,trainchatbot}  from '../controllers/chatbot/Chatbotconfic.js'
import { Updatejoblate } from "../controllers/datajob/UpdateJob.js";
import { addUserAccout,checkUserAccount,forGotPassWord,checkEmail} from "../controllers/register/Register.js"
import {GetHistory,GetHistoryrequest } from "../controllers/history/history.js";
import {updatepass,updateprofile} from '../controllers/editprofile/editprofile.js'
import {requestvalue} from '../controllers/request/Reqeust.js'
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Notebookfind,ServiceTypefind,ServiceOptionfind ,userAllfind,userAllrole,upDateRole} from "../controllers/confic/confic.js";
const router = express.Router();



router.get('/token', refreshToken);
router.get('/getUserAccount', getUserAccount);
router.get('/getTeamMember', getTeamMember);
router.get('/getDataUserForDeviceCenter', getDataUserForDeviceCenter);
router.get('/getUserAccountForSchedu', getUserAccountForSchedu);
router.get('/getDataJobForSchedu', getDataJobForSchedu);

// router.get('/users', verifyToken, getUsers);

router.post('/getDataJobCountCutOfUser', getDataJobCountCutOfUser);
router.post('/getDataJobCutOfUser', getDataJobCutOfUser);
router.post('/getDataJobMemberCut', getDataJobMemberCut);

// router.post('/getDataTikketAllofUser', getDataTikketAllofUser);
// router.post('/HistoryNCCUT', HistoryNCCUT);
// router.get('/getDeviceType', getDeviceType);
// router.get('/getDeviceDetail', getDeviceDetail);
// router.post('/CreateDevice', CreateDevice);
// router.post('/UpdateDevice', UpdateDevice);
// router.post('/getDataDeviceCut', getDataDeviceCut);
// router.post('/UpdateDeviceProfile', UpdateDeviceProfile);
router.get('/getDataBook', getDataBook);
router.post('/updateDataBooking', updateDataBooking);
router.post('/deleteDataBooking', deleteDataBooking);
router.post('/getDataBookCheckForAdding', getDataBookCheckForAdding);
router.get('/getDataBookCurrentDate', getDataBookCurrentDate);
router.get('/getData_book_round', getData_book_round);
router.get('/getNotebook_center', getNotebook_center);
router.post('/DelDeviceCenter', DelDeviceCenter);
router.post('/CreateDeviceCenter', CreateDeviceCenter);
router.get('/getRootitem', getRootitem);
router.get('/getRootcase', getRootcase);
router.post('/UpdateProfile', UpdateProfile);
// router.post('/CreateProfile', CreateProfile);
// router.get('/getEmpProfile', getEmpProfile);
router.get('/getDataAllUser', getDataAllUser);
router.post('/getProfileCut', getProfileCut);
// router.post('/getProfileIDCut', getProfileIDCut);
// router.get('/getAllProfileCut', getAllProfileCut);
// router.get('/getDataAllEmp', getDataAllEmp);
// router.get('/getDataAllEmpIT', getDataAllEmpIT);
// router.get('/getDept', getDept);
router.get('/getSec', getSec);
// router.get('/getLoaction', getLoaction);
// router.get('/getPos', getPos);
// router.get('/getDataProfile', getUsers);
router.post('/RemoveServiceType', RemoveServiceType);
router.post('/CreateNewServiceType', CreateNewServiceType);
router.get('/LastS_type', LastS_type);
router.get('/getServiceType', getServiceType);
router.get('/getServiceOption', getServiceOption);
router.get('/getDataAllServiceDetail', getDataAllServiceDetail);
router.post('/getDataOptionDetail', getDataOptionDetail);
// router.post('/getDataJobCount', getDataJobCount);
router.post('/CreateJob', CreateJob);
router.post('/UpdateJob', UpdateJob);
router.post('/CanceltaskJob', CanceltaskJob);
router.post('/Job_OpenJOB', Job_OpenJOB);
router.post('/Job_CloseJOB', Job_CloseJOB);
router.post('/Job_upDateAssignDetail', Job_upDateAssignDetail);
router.get('/getDataJob', getDataJob);
router.post('/getDataJobCut', getDataJobCut);
router.get('/LastJob', LastJob);
router.get('/getOptionItems', getOptionItems);
router.post('/UpdateItemTK', UpdateItemTK);
router.post('/getItemOption', getItemOption);
router.get('/getAllItem', getAllItem);
// router.get('/LastItem', LastItem);
// router.post('/UpdateDetailItem', UpdateDetailItem);
// router.post('/DelDataItem', DelDataItem);
// router.post('/CreateItem', CreateItem);
router.get('/getChartDataTikket', getChartDataTikket);
// router.post('/CreateTikket', CreateTikket);
router.post('/UpdateStatusTk', UpdateStatusTk);
router.post('/getDataTikketCut', getDataTikketCut);
router.post('/getDataTikketAll', getDataTikketAll);
router.post('/getDataTikket', getDataTikket);
// router.get('/LastTikket', LastTikket);
// router.post('/CreateItemTK', CreateItemTK);
router.post('/getnotes', getNotes);
router.post('/createnote', CreateNote);
router.post('/notes', AddNote);
// router.post('/users', Register);
// router.post('/UpdateErp_prom', UpdateErp_prom);
// router.post('/AddErp_prom', AddErp_prom);
// router.post('/geterp_prom', geterp_prom);
// router.get('/getAllerp_prom', getAllerp_prom);
router.post('/login', Login);
router.delete('/logout', Logout);

// router.post('/UpdateDataServiceDetail', UpdateDataServiceDetail);
router.post('/UpdateAllDetailServiceOption', UpdateAllDetailServiceOption);
router.post('/RemoveServiceOption', RemoveServiceOption);
router.post('/CreateServiceOption', CreateServiceOption);
router.get('/LastOption', LastOption);
router.post('/UpdateStatusServiceOption',UpdateStatusServiceOption);


router.post('/UpdateNameOption',UpdateNameOption);
router.post('/UpdateWhoApprOption',UpdateWhoApprOption);
router.post('/UpdateTeamSupOption',UpdateTeamSupOption);
router.post('/UpdateNameServiceType',UpdateNameServiceType);
router.post('/UpdateNameNotebook_center',UpdateNameNotebook_center);
router.post('/UpdateStatusNotebook_center',UpdateStatusNotebook_center);
router.get('/getnotebookall',Notebookfind);
router.get('/getservicetypeall',ServiceTypefind);
router.get('/getserviceoptionall',ServiceOptionfind);
router.get('/getuserall',userAllfind);
router.get('/getrollall',userAllrole);
router.get('/getTeam_support', getTeam_support);
router.get('/verifyemail',Send_Email);
router.get('/verifycomplete',Change_Verify);
// router.post('/UpdateDataServiceDetail', UpdateDataServiceDetail);
// router.post('/UpdateAllDetailServiceOption', UpdateAllDetailServiceOption);

// router.post('/checkNotebook',CheckNotebook);
// router.get('/findnameemp',FindnameEmp);
// router.get('/findschedudata',Findschedudata);
// router.post('/addschedu',Addschedu);
// router.post('/upschedu',Upschedu);
// router.post('/delschedu',Delschedu);
// router.post('/checknote',Checknote);
// router.get('/HistoryNC',HistoryNC);
// router.post('/testw',Testwhere);
// router.get('/formatSchedudata',formatSchedudata);
router.get('/findchat',finddatachat);
router.post('/updatechat',updatechatbot);
router.post('/deletechat',deletechatbot);
router.post('/addchat',addchatbot);
router.get('/sendtraindata',trainchatbot);
router.post('/updatejoblate',Updatejoblate);
router.post('/adduseraccout',addUserAccout);
router.post('/checkuseraccout',checkUserAccount);
router.get('/history',GetHistory);
router.post('/updatepass',updatepass);
router.post('/updateprofiledata',updateprofile);
router.get('/historyrequest',GetHistoryrequest);
router.post('/request',requestvalue);
router.post('/upDateRole',upDateRole);
router.post('/forgotpwd',forGotPassWord);
router.post('/checkEmail',checkEmail);
export default router;