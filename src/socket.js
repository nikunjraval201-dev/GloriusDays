import { io } from "socket.io-client";

// const socket = io("https://resturant-demo.onrender.com/api", {
//   autoConnect: true,
//   reconnection: true,          // default true છે, પણ explicit રાખો
//   reconnectionAttempts: Infinity,
//   reconnectionDelay: 1000,
//   reconnectionDelayMax: 5000,
//   timeout: 20000,               // connection timeout વધારો (cold start માટે)
//   transports: ["websocket", "polling"],  // fallback રાખો
// });

const socket =  io("https://south-delights.onrender.com", {
  autoConnect: true,
   withCredentials: true
});

export default socket;