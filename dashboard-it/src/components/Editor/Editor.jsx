import React,{useState ,useEffect } from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
// import "react-quill/dist/quill.snow.css";
// import '../../../node_modules/react-quill/dist/quill.snow.css'
import "./editor.css";

// import { useHistory } from "react-router-dom";
import axios from 'axios';

export const Editor = (props) => {

  // let history = useHistory();
  const [userInfo, setuserInfo] = useState({
    description: "load...",
    // description: props.postList[0].description,
    // description: "<p>TEST<p/>",
  }); 

  // console.log(datajob[0] + " d ");



  useEffect(() => {

    if (props.editPostID !== 'loading' && props.editPostID !== '' ) {
        const CreateNotes = async (e) => {
          // e.preventDefault();
          try {
              await axios.post('http://localhost:5000/createnote', {
                  id_user: props.editPostID,
                  description: ""
                  
              }).then(res => {  

                  setuserInfo(userInfo => ({ ...userInfo,
                    description: ""
                  }));

              })

          } catch (error) {
              console.log(error);
          }
      
        }  

        const viewPostId = async (e) => {
          // e.preventDefault();
          try {
              await axios.post('http://localhost:5000/getnotes', {
                id_user: props.editPostID

              }).then(res => {  
                 
                  if( res.data.length > 0 ) {

                    setuserInfo(userInfo => ({ ...userInfo,
                      description: res.data[0].description
                    }));

                  } else {
                    CreateNotes();

                  }

              })

          } catch (error) {
             
          }

        }  
        

        if(userInfo.description === "load..." || userInfo.description === "<p>load...</p>") {
          viewPostId();
          
        }
        
    }

  }, [props]);

  useEffect(() => {
    
    if ( ( props.editPostID !== 'loading' && props.editPostID !== '' ) && ( userInfo.description !== "load..." && userInfo.description !== "<p>load...</p>" )  ) {

      const PoemAddbooks = async () => {
        // e.preventDefault();
        try {
        
            await axios.post('http://localhost:5000/notes', {
              // id:props.editPostID,
              id_user: props.editPostID,
              // title: userInfo.title,
              description: userInfo.description
              // information: userInfo.information,
    
            });
        } catch (error) {
            console.log(error);
        }
      }

      PoemAddbooks();
    }

  },[userInfo]);

  const ondescription = (value) => {

    setuserInfo({ ...userInfo,
      description:value
    });
   
  } 

  return (
    <div className="text-editor">
    <EditorToolbar toolbarId={'t1'}/>
    <ReactQuill
      theme="snow"
      value={userInfo.description}
      onChange={ondescription}
      placeholder={"Write something ..."}
      modules={modules('t1')}
      formats={formats}
    />
    </div>
  );
};

export default Editor;