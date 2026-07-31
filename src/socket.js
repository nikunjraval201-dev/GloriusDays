import { io } from "socket.io-client";

const socket = io("https://resturant-demo.onrender.com/api/");

export default socket;