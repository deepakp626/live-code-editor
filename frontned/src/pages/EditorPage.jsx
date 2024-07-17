import { Avatar, Box, Button, ButtonGroup, List, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client.jsx'
import Editor from '../components/Editor.jsx'
import { initSocket } from '../../socket.js'
import ACTIONS from '../../Action.js'
import { useLocation,useNavigate,useParams ,Navigate} from 'react-router-dom'
import toast from 'react-hot-toast'

const EditorPage = () => {
   const socketRef = useRef(null);
   const codeRef = useRef(null)
   const location = useLocation()
   const reactNavigate = useNavigate()
   const {roomId} = useParams()
   console.log({roomId})
   const [clints, setClints] = useState([])
   console.log({clints})
   
   useEffect(() => {
      const init = async () => {
         socketRef.current = await initSocket()
         // handling socket connection errors 
         socketRef.current.on("connection_error",(err) => handalErrors(err))
         socketRef.current.on("connection_error",(err) => handalErrors(err))

         function handalErrors(e){
            console.log("Socket Error",e)
            toast.error("Socket Connection failed, Try again later")
           reactNavigate("/")
         }

         socketRef.current.emit(ACTIONS.JOIN,{
            roomId,
            username:location.state?.username
         })

         //Listening for joint event   
         socketRef.current.on(ACTIONS.JOINED,({clints,username,socketId})=>{
            if(username != location.state?.username){
               toast.success(`${username} joined the room`)
               console.log('username join', username )
            }
            console.log(clints)
            setClints(clints)

            // code ko sync karna jo new user ka editor par
             socketRef.current.emit(ACTIONS.SYNC_CODE,{
               code:codeRef.current,
               socketId
             })
         });

         // Listening for diconnected
         socketRef.current.on(ACTIONS.DISCONNECTED,({socketID,username})=>{
                  toast.success(`${username}  left the room`)
                  setClints((prev) => {
                     return prev.filter(clints => clints.socketID !== socketID)
                  })
         })
      }
      init();
      return  ()=>{
          socketRef.current?.disconnect()
            socketRef.current.off(ACTIONS.JOINED)
            socketRef.current.off(ACTIONS.DISCONNECTED)
      }
   }, [])

   const copyRoomId = async (e)=>{
      try {
         console.log(roomId)
         await navigator.clipboard.writeText(roomId)
         toast.success("Room Id has been copied to your clipboard")
      } catch (error) {
         toast.error("Could not copy room ID")
         console.log(error)
      }
   }

   const leaveRoom = ()=>{
      reactNavigate('/')
   }
  
   if(!location.state){
      return <Navigate to="/" />
   }
   return (
      <Stack direction={"row"} sx={{ height: "100vh", border: "1px solid orange" }} >
         <Box sx={{ height: "100%", borde: "1px solid red" }}>
            <Box>
               <Avatar variant={"rounded"} alt="The image" style={{
                  width: "100%",
                  height: 60,
                  borderBottom: "1px solid black"
               }} >
                  LOGO
               </Avatar>
            </Box>
            <Box>
               <Typography component={"h3"}>Connected</Typography>
               <Stack>
                  <List component={"div"} sx={{ display: "flex", flexWrap: "wrap", border: "1px solid red" }}>
                     {
                        clints?.map((clints) => (

                           <Client key={clints.socketID} username={clints.username} />
                        ))
                     }
                  </List>
               </Stack>
            </Box>
            <ButtonGroup sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.2rem" }}>
               <Button onClick={copyRoomId} variant="contained" color="success">Copy Room ID</Button>
               <Button onClick={leaveRoom} variant="contained" >Leave</Button>
            </ButtonGroup>
         </Box>
         <Box  >
            <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=> (codeRef.current = code)} />
         </Box>
      </Stack>
   )
}

export default EditorPage