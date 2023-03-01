import React, { useEffect, useState } from 'react';
import { ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
function TextEditor({ initialValue, sendData }) {
    
    // const _contentState = ContentState.createFromText(initialValue);
    
    
    const contentBlocks = convertFromHTML(initialValue);
    
    const sampleEditorContent = ContentState.createFromBlockArray(contentBlocks);
    const raw = convertToRaw(sampleEditorContent);  
    const [contentState, setContentState] = useState(raw); 
    const hello = (a) => {
        console.log(JSON.stringify(a),"Hello")
        setContentState(a)
        // console.log(a.blocks[0].text, 'html')
        // sendData(a.blocks[0].text)
    }
    return (
        <div className="App">
            <Editor
                toolbar={{
                    options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
                }}
                defaultContentState={contentState}
                // onEditorStateChange={hello}
                onContentStateChange={hello}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"

            />
        </div>
    )
}

export default TextEditor;

