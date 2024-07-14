import { Avatar, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Client = ({ username }) => {
    return (
        <>
            <ListItem sx={{ display: 'inline', padding: "0px", margin: "0px" ,width:"4rem"}}>
                <Avatar alt="user"
                    variant="rounded"
                    name={username}
                />
                <Typography paragraph sx={{ fontWeight: '500' }}>{username}</Typography>
            </ListItem>
        </>
    )
}

export default Client