import { Avatar, Box, Button, ButtonGroup, List, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Client from '../components/Client.jsx'
import Editor from '../components/Editor.jsx'

const EditorPage = () => {
   const [clints, setClints] = useState([
      { socketID: 1, username: "user 1" },
      { socketID: 2, username: "user 2" },
      { socketID: 3, username: "user 3" },
   ])
   return (
      <Stack direction={"row"} sx={{ height: "100vh",border:"1px solid orange" }} >
         <Box sx={{height:"100%",borde:"1px solid red"}}>
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
                  <List component={"div"} sx={{ display: "flex",flexWrap:"wrap", border: "1px solid red"}}>
                     {
                        clints.map((clints) => (

                           <Client key={clints.socketID} username={clints.username} />
                        ))
                     }
                  </List>
               </Stack>
            </Box>
            <ButtonGroup sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.2rem" }}>
               <Button variant="contained" color="success">Copy Room ID</Button>
               <Button variant="contained" >Leave</Button>
            </ButtonGroup>
         </Box>
         <Box  >
            <Editor />
         </Box>
      </Stack>
   )
}

export default EditorPage