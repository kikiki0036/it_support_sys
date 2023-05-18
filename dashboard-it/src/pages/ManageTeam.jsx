import React, { useState, useEffect, useCallback } from 'react'
import Paper from '@mui/material/Paper';
import moment from "moment";
import axios from 'axios';

import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing,
} from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  Resources,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Toolbar,
  ViewSwitcher,
  DragDropProvider,
  DateNavigator,
  TodayButton,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import { blue, orange } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';


  
const groupOrientation = viewName => viewName.split(' ')[0];

const grouping = [{
  resourceName: 'priorityId',
}];


const PREFIX = 'Demo';

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`,
};

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({ theme }) => ({
  [`&.${classes.todayCell}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  [`&.${classes.weekendCell}`]: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
  },
}));

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({ theme }) => ({
  [`&.${classes.today}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
  },
  [`&.${classes.weekend}`]: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
  },
}));

const TimeTableCell = (props) => {
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />;
  } if (date.getDay() === 0 || date.getDay() === 6) {
    return <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />;
  } return <StyledWeekViewTimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const { startDate, today } = props;

  if (today) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.today} />;
  } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />;
  } return <StyledWeekViewDayScaleCell {...props} />;
};


const ManageTeam = () => {

    const [listDataIT, setlistDataIT] = useState([]);
    const [Schedudata, setSchedudata] = useState([]);

    const DataIT = async () => {
        try {
            await axios.get('http://localhost:5000/FindnameEmp', { 
            }).then((res) => {  
              setlistDataIT(res.data);   

            })

        } catch (error) {
            console.log(error);
        }
    }

    const DataSchedudata = async () => {
      try {
          await axios.get('http://localhost:5000/formatSchedudata', { 
          }).then((res) => {  
            setSchedudata(res.data);   

          })

      } catch (error) {
          console.log(error);
      }
    }

    useEffect(() => {
      DataIT()
      DataSchedudata()

    },[]);

    const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD ")
    // const [dateTime, setdateTime] = useState(Datecurrent);

    // const currentDateChange = (currentDate) => { setdateTime({ currentDate }); }

    const resources = [{
        fieldName: 'priorityId',
        title: 'IT',
        instances:listDataIT.length > 0 ? listDataIT :  [{ text: 'loading...', id: "loading..", color: "#f5f5f5" }]
        // instances: [
        //   { text: 'Low Priority', id: "IT001", color: blue },
        //   { text: 'High Priority', id: "IT002", color: orange },
        //   { text: 'High Priority', id: "IT003", color: orange },
      
        // ],
      
    }];


    const [rdata, setdata] = useState(Schedudata);

    useEffect(() => {
      setdata(Schedudata)

    },[Schedudata]);

    const todatetime = (time) => {
      return (moment(time).format());
    }

    const todate = (time) => {
        return (moment(time).toDate());
    }

    // Mon Jun 13 2022 08:30:00 GMT+0700 (เวลาอินโดจีน)

    const convertDateform = (time) => {
        console.log(todatetime(time))
    }

    const [DataJobDetail, setDataJobDetail] = useState([]);  
    const [dataCreatejob, setdataCreatejob] = useState([]);  
    const [LastJobNo, setLastJobNo] = useState([]);  


    const GetDataJobDetail = async (tikketNo) => {
        try {
            await axios.post('http://localhost:5000/getDataTikketCut', {
                tikket_no: tikketNo,
                status: ["approve","waite","reject"]

            }).then((res) => {  
                setDataJobDetail(res.data);

            })
           

        } catch (error) {
            console.log(error);
        }
    }

    const LastJob = async () => {
        try {
          await axios.get('http://localhost:5000/LastJob', { }).then((res) => {  
            setLastJobNo(res.data);
          })
        } catch (error) {
          console.log(error);
        }
    }

    const DatecurrentforID = moment().tz("Asia/Bangkok").format("YYMMDD")

    useEffect(() => {
        const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")

        const CreateJOB = async (newID) => {

          // console.log(newID)
          // console.log(DataJobDetail[0].review_by)
          // console.log(localStorage.getItem('id_emp_login'))
          // console.log(dataCreatejob[0].priorityId)
          // console.log(dataCreatejob[0].notes)
          // console.log(dataCreatejob[0].startDate)
          // console.log(dataCreatejob[0].endDate)
          // console.log(DataJobDetail[0].tikket_no)
            try {
                await axios.post('http://localhost:5000/CreateJob', {

                    job_no: newID,  
                    appove_by: DataJobDetail[0].review_by,
                    assign_by: localStorage.getItem('id_emp_login'),
                    assign_to: dataCreatejob[0].priorityId,
                    assign_detail: dataCreatejob[0].notes,
                    job_date: Datecurrent,
                    open_date: null,
                    start_date: dataCreatejob[0].startDate,
                    target_date: dataCreatejob[0].endDate,
                    close_date: null,
                    rootcase: "-",
                    rootitem: "-",
                    solutionnote: null,
                    status: "pending",
                    tikket_no: DataJobDetail[0].tikket_no,

                }).then((res) => {  
                   DataSchedudata()
                   axios.defaults.withCredentials = false;
                   axios.post('https://flask-api-2.herokuapp.com/line_no', { 
                     'msg': " มีงานใหม่ หมายเลขงาน :" + newID,
                     'token': 'pVd50r1rKjKa0xPWl63fZOKrOBITVvik2SOMYs4RaoR',

                   }).then((response) => {});

                })

            } catch (error) {
                console.log(error);

            }
        }

        // CreateJOB();
        if(LastJobNo.length > 0) {
          let id_index = parseInt((LastJobNo[0].job_no).substring(8,))
          let new_id = ""
          let nameId = "RQ" + DatecurrentforID
          if ((id_index + 1) < 10) {
            new_id = nameId + "00000"+ ( id_index + 1 ).toString()

          } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
            new_id = nameId + "0000"+ ( id_index + 1 ).toString()

          } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
            new_id = nameId + "000"+ ( id_index + 1 ).toString()

          } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
            new_id = nameId + "00"+ ( id_index + 1 ).toString()

          } else if ((id_index + 1) >= 10000) {
            new_id = nameId + "0"+ ( id_index + 1 ).toString()
          } else {
            new_id = nameId + ( id_index + 1 ).toString()
          }

          // setNewidJOB(new_id)
          CreateJOB(new_id)
        }
    }, [LastJobNo])

    useEffect(() => {
      if(DataJobDetail.length > 0) {
        LastJob()

      }

    },[DataJobDetail]);

    const ConvertDateform = (time) => {
      return todatetime(time)
    }

    const commitChanges = ({ added, changed, deleted }) => {

        if (added.title !== undefined & added.notes != null) {
            setdataCreatejob([
                {
                    allDay: added.allDay,
                    endDate: ConvertDateform(added.endDate),
                    notes: added.notes,
                    priorityId: added.priorityId,
                    startDate: ConvertDateform(added.startDate),
                    title: added.title
                }
            ])

            // setdataCreatejob([
            //     ...dataCreatejob, {
            //         allDay: added.allDay,
            //         endDate: convertDateform (added.endDate),
            //         notes: added.notes,
            //         priorityId: added.priorityId,
            //         startDate: convertDateform (added.startDate),
            //         title: added.title
            //     }
            // ])

            GetDataJobDetail(added.title)

        }

        if (changed) {
            console.log(changed)
            
        }

        if (deleted !== undefined) {
            console.log(deleted)

        }
    }



    return (
        <div >
            <h2 className="page-header">
                {"work schedule".toUpperCase()}
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card-g table-scheduler">
                        <Paper >
                            <Scheduler
                                data={rdata}
                                height={660}
                            >
                               
                                <ViewState
                                    defaultCurrentDate={Datecurrent}
                                    // onCurrentDateChange={currentDateChange}
                                />
                              
                                <EditingState
                                    onCommitChanges={commitChanges}
                                />
                                <IntegratedEditing />

                                <GroupingState
                                    grouping={grouping}
                                    groupOrientation={groupOrientation}
                                />

                                <WeekView
                                    startDayHour={8}
                                    endDayHour={22}
                                    excludedDays={[0, 6]}
                                    timeTableCellComponent={TimeTableCell}
                                    dayScaleCellComponent={DayScaleCell}
                                    name="Vertical Orientation"
                                />

                                <WeekView
                                    startDayHour={8}
                                    endDayHour={22}
                                    excludedDays={[0, 6]}
                                    timeTableCellComponent={TimeTableCell}
                                    dayScaleCellComponent={DayScaleCell}
                                    name="Horizontal Orientation"
                                />

                                <Appointments />
                                
                                <Resources
                                    data={resources}
                                    width={200}
                                    mainResourceName="priorityId"
                                />

                                <ConfirmationDialog />
                                <AppointmentTooltip
                                    showOpenButton
                                    showDeleteButton
                                />
                                <AppointmentForm />

                                <IntegratedGrouping />
                                <GroupingPanel />
                                <Toolbar />
                                <DateNavigator/>
                                <TodayButton/>
                                <ViewSwitcher />
                                <DragDropProvider />
                            </Scheduler>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default ManageTeam