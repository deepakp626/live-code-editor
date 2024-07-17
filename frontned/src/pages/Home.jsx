import { Avatar, BottomNavigation, Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [rooomId, setRoomId] = useState("")
    const [username, setUsername] = useState("")
    const createRoom = () => {
        const id = uuidV4()
        setRoomId(id)
        toast.success("Craeted room ID")
    }

    const joinRoom = ()=>{
        if(!rooomId || !username){
            toast.error("room id and username is required")
            return ;
        }
        // Redirect
        navigate(`/editor/${rooomId}`,{
            state:{
                username,
            }
        })
    }

    const handalInputEnter = (e)=>{
        if(e.code == "Enter"){
            joinRoom()
        }
    }

    return (
        <>
            <Grid container justifyContent="center" sx={{ border: "2px solid red", }} >
                <Stack sx={{ gap: "1rem", padding: "0.5rem" }}>
                    <Avatar variant={"rounded"}
                        alt="The image" src={"data:image/jpeg;base64,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"}
                        style={{
                            width: "100%",
                            height: 100,
                        }} />
                    <Typography component={"h4"} sx={{ padding: "0px", margin: "0px", fontWeight: "600" }} >Past Invitation room ID</Typography>
                    <Stack>
                        <TextField sx={{ padding: "0.1rem 0px" }} value={rooomId}
                            onKeyUp={handalInputEnter}
                            onChange={(e) => setRoomId(e.target.value)}
                            id="outlined-basic" label="Room ID" variant="outlined" />

                        <TextField  
                        onKeyUp={handalInputEnter}
                         onChange={(e) => setUsername(e.target.value)}
                        value={username}
                         sx={{ padding: "0.1rem 0px" }} id="outlined-basic" label="Name" variant="outlined" />
                    </Stack>
                    <Button onClick={joinRoom} variant="contained">Join</Button>
                    <Typography component={"span"} paragraph>If you do not have invite then create  {" "}
                        <Link onClick={createRoom} href={""}>new room</Link> </Typography>
                </Stack>
            </Grid>
            <BottomNavigation>
                <Typography sx={{ textAlign: "center" }}>Build with ❤️ by <a href="https://github.com/deepakp626">deepakp626</a></Typography>
            </BottomNavigation>
        </>

    )
}

export default Home