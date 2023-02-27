import React, { useEffect, useState } from 'react';
import { ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

function TextEditor() {
   
    const _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
    const [contentState, setContentState] = useState(); // ContentState JSON
    console.log(contentState, 'html')
    // useEffect(() => {
    //     let html = convertToHTML(_contentState.getCurrentContent());
    //   console.log(html,'html')
    // }, [contentState]);


    return (
        <div className="App">
            <Editor
                defaultContentState={contentState}
                onContentStateChange={setContentState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>
    )
}

export default TextEditor;