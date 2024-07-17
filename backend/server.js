import express from 'express'
// import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { Socket } from 'socket.io-client';
import ACTIONS from './Action.js';

const app = express()
const PORT = process.env.PORT || 5000;
const server = http.createServer(app)
const io = new Server(server)
import path from 'path';
import __dirname from 'path'


app.use(express.static("../frontned/dist"))
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,"dist","index.html"))
})

//  kon sa user ka username or uske socket id kay hai
const userSocketMap = {}

function getAllConnectedClients(roomId) {
    // jetne bhe socket ma room hai adapter ma jiske room id ya hai unko get karega
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    })
}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username
        socket.join(roomId)
        // notify all user when someone join
        const clients = getAllConnectedClients(roomId)
        console.log({ clients })
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        console.log('reciving', code)
        // khud ko chod kar jetha na bhe hai un sub ko code send kardho
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code })
    })

    // sending all code when new user join
    socket.on(ACTIONS.SYNC_CODE, ({ code, socketId }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE,{code})
    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms]
        // notify all to someone disconnected
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            })
        })
        // jo mapping hai usma sa delete karna hai
        delete userSocketMap[socket.id]
        //ager kese room sa officaly leave hona hai tho
        socket.leaveAll()


        //     const roomId = Object.keys(socket.rooms)[1]
        // const username = userSocketMap[socket.id]
        // socket.leave(roomId)
        // const clients = getAllConnectedClients(roomId)
        // clients.forEach(({socketId})=>{
        //     io.to(socketId).emit(ACTIONS.DISCONNECTED,{
        //         clients,
        //         username,
        //         socketId:socket.id
        //     });
        // });
        // delete userSocketMap[socket.id]
    })
})

// app.get("/",(req,res)=>{
//     res.sendFile("/dist/index.html")
//     // res.send("hello")
// })




server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


