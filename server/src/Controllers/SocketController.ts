import { Server } from "socket.io"

class SocketController {
  private io: Server

  constructor(io: Server) {
    this.io = io

    io.on("connection", (socket) => {
      socket.on("send-chat-message", (msg) => {
        socket.broadcast.emit("chat-message", msg)
      })
    })
  }
}

export default SocketController
