import React from "react";
import ReactQuill from "react-quill";

import "../../../node_modules/react-quill/dist/quill.snow.css";
import { modules, formats } from "./constants";

const QuillEditor = props => {
    const handleChange = () => {};

    return (
      <>
        <h1>React-Quill 1.3.5</h1>
        <ReactQuill
          theme="snow"
          onChange={handleChange}
          value={props.value}
          modules={modules}
          formats={formats}
          readOnly={false}
          preserveWhitespace
          style={{ height: "200px" }}
        />
      </>
    );
}

export default QuillEditor

