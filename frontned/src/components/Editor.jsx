import React, { useEffect, useRef } from 'react'
// import {codemirror} from 'codemirror'
// import "codemirror/mode/javascript/javascript";
// import "codemirror/theme/dracula.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import "codemirror/lib/codemirror.css";
// import CodeMirror from "codemirror";

const Editor = () => {
  const editor = useRef();
  

  return (
    <>
     <div name="" id="realtimeEditor" style={style} ref={editor}>dsjn</div>
    </>
  )
}

const style ={
  width:"22rem",
  height:"400px",
  border:"2px solid red"
}

export default Editor