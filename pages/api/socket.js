import { Server } from "socket.io";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default function SocketHandler(_, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);
    });
  });

  res.end();
}
