import {io} from 'socket.io-client'
const VITE_REACT_APP_BACKEND_URL  = import.meta.env
console.log("backend test",import.meta.env.VITE_REACT_APP_BACKEND_URL)

// ya socket clint ka instance return karege
export const initSocket = async ()  =>{
    // ya option dena hotha hai doc ma lekha hai
    const option = {
        "force new connection":true,
        "reconnectionAttempts": "Infinity", // Avoid hanging on failed reconnects
        "timeout": 10000, // After this timeout reconnects will stop attempts
        "transports": ["websocket"]
    }
    return io(import.meta.env.VITE_REACT_APP_BACKEND_URL,option)    // BACKEND ka url dena hai yaha par
}
