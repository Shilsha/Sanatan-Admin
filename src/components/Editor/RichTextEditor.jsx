

import React, { useState } from "react";
import { EditorState } from "draft-js";

import { convertToHTML } from "draft-convert";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect } from "react";

const RichTextEditor = ({ sendData, updatedata }) => {
    const [editorState, setEditorState] = useState( );
    const [convertedContent, setConvertedContent] = useState(null);

    const handleEditorChange = (state) => {
        setEditorState(state);
        let currentContentAsHTML = convertToHTML(state.getCurrentContent());
        sendData(currentContentAsHTML)
        console.log(        currentContentAsHTML       )


    };

    console.log(editorState,'editorState')
   
    // useEffect(() => {
    //     alert("run")
    //     if(updatedata?.length>0){
    //         // setEditorState(updatedata)
    //         console.log(updatedata, 'updatedatahmm')
    //     }

    // }, [updatedata])


    return (
        <>

            <Editor
                toolbar={{
                    options: ['inline', 'blockType', 'colorPicker', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history',]
                    
                }}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
            />

        </>
    );
};
export default RichTextEditor;

