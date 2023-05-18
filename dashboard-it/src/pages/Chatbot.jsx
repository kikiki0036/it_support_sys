import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Widget, addResponseMessage, markAllAsRead } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const Chatbot = () => {
    useEffect(() => {
      addResponseMessage(`BOT : ${"สวัสดีครับ ผู้ใช้ต้องการสอบถามหรือต้องการความช่วยเหลือในการใช้โปรแกรมต้องการดูพื้นฐานพิมพ์ !คำสั่ง เพื่อดูคำถามทั้งหมด"}`);
    }, []);
    
    const chat = (newMessage) => {
        axios.defaults.withCredentials = false;
        axios.post('http://127.0.0.1:5000/chatbot', { msg: newMessage }).then((response) => {
            console.log(response);
            addResponseMessage(`BOT : ${response.data}`);
        });
        
        markAllAsRead();
        // axios.defaults.withCredentials = true;
    };

    return (
       
        <Widget
            handleNewUserMessage={chat}
            title="แชทบอท"
            subtitle="สามารถสอบถามปัญหาได้"
            senderPlaceHolder="ใส่คำถามของคุณ"
        />
    )

}

export default Chatbot