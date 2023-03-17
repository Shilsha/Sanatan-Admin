import React, { useEffect, useState } from 'react';
import { ContentState, convertToRaw, convertFromRaw, convertFromHTML, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
function ContentEditor({ initialValue, sendData }) {

    const htmlToDraftBlocks = (html) => {
        const blocksFromHtml = htmlToDraft(html);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    }
    
    const [editorState, setEditorState] = useState(htmlToDraftBlocks(initialValue === null || initialValue === undefined ?"":initialValue))

   

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        sendData(draftToHtml(convertToRaw(editorState?.getCurrentContent())))
    };

    // 

    return (
        <div className="App">
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

export default ContentEditor;

