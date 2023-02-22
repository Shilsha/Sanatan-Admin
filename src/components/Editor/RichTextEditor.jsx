

import React, { useState } from "react";
import { EditorState } from "draft-js";

import { convertToHTML } from "draft-convert";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ sendData }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);
    
    const handleEditorChange = (state) => {
        setEditorState(state);
        let currentContentAsHTML = convertToHTML(state.getCurrentContent());
        sendData(currentContentAsHTML)
        

    };
 

    return (
        <>

            <Editor
                toolbar={{
                    options: ['inline', 'blockType', 'list', 'textAlign', 'history'],

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

