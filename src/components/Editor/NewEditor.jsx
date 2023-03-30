import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
const NewEditor = ({ sendData}) => {
    const [editorState, setEditorState] = useState( );
   const onEditorStateChange = (editorState) => {
            setEditorState(editorState);
            let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            sendData(currentContentAsHTML)
            console.log(currentContentAsHTML,"currentContentAsHTML")
                };
  return (
    <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          
        />
    </div>
  )
}

export default NewEditor