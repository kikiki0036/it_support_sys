import React from 'react';

import './content_rigth.css'
import DatePickerExample from '../date-calendar/DatePickerCalendarExample';
// import Note from '../note/note'
import Editor from '../../components/Editor/Edit';
// import { compareSync } from 'bcrypt';


const content_rigth = (props) => {
    return (
        <div className="layout-component-option m_r">
            <h5 className="page-header cr">CALENDAR / NOTE</h5>
            <div className="col-12">
                <div className="row margin-t card-r-box">
                    <div className="col-12 del-p">
                        <div className="card-r cal">
                            {/* <div className="card__header"> */}
                            <DatePickerExample/>
                            {/* </div> */}
                        </div>
                    </div>

                    <div className="col-12 del-p note-box">
                        <div className="card-r cal">
                            {/* <Note/>  */}
                            <div className="content-note">
                                <p>NOTE</p>
                                <div className="note">
                                <Editor
                                    IDUser = {props.IDUser}
                                />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>               
            </div>
        </div>
    )
}

export default content_rigth

