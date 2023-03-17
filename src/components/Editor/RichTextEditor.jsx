import React, { useState } from "react";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const RichTextEditor = ({ sendData, updatedata }) => {
    const [editorState, setEditorState] = useState( );
    const [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        let currentContentAsHTML = convertToHTML(state.getCurrentContent());
        sendData(currentContentAsHTML)
            };
           // useEffect(() => {
    //     alert("run")
    //     if(updatedata?.length>0){
    //         // setEditorState(updatedata)
    //         
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

