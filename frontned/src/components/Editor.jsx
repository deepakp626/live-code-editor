import React, { useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client';
import ACTIONS from '../../Action';
// import {Codemirror} from 'codemirror'
// import "codemirror/mode/javascript/javascript";
// import "codemirror/theme/dracula.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import "codemirror/lib/codemirror.css";
// import {CodeMirror} from "codemirror";

const Editor = ({ socketRef, roomId ,onCodeChange}) => {
  const editorRef = useRef(null);

  // useEffect(()=>{
  //    editorRef.current = CodeMirror(editorRef.current, {
  //     lineNumbers: true,
  //     mode: "javascript",
  //     theme: "dracula",
  //     autoCloseTags: true,
  //     autoCloseBrackets: true
  // })
  // })


  useEffect(() => {
    async function init() {

      console.log(editorRef)
      editorRef.current.on("change", (instance, changes) => {
        // console.log("changes",changes)
        const { origin } = changes
        const code = instance.getValue();
        onCodeChange(code)
        //  console.log("code",code)

        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code
          })
        }
      })
    };
    init();

  }, [])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log("reciving", code)
        if (code != null) {
           editorRef.current.setValue(code)
        }
      })
    }

    // scoket ko off karna hotha hai component unmount hone par
    return ()=>{
      socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current])

  // editorRef.current.value('console.log("hello deepak")')
  // console.log(editorRef.current)

  const data = () => {
    // const ele = editorRef.current.valueOf()
    // console.log({ele})
    console.log(editorRef.current.value)
  }

  return (
    <>
      <textarea onChange={data} name="" id="realtimeEditor" style={style} ref={editorRef} >some text</textarea>
    </>
  )
}

const style = {
  width: "22rem",
  height: "400px",
  border: "2px solid red"
}

export default Editor