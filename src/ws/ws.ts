import { Server as SocketIOServer, Socket } from "socket.io";

export class WebSocketServer {
  io: SocketIOServer | null = null;
  constructor() {}

  initialize(server: any) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*", // Allow all origins
      },
    });
    console.log("Socket.IO server started");
    this.registerCallbacks();
  }

  registerCallbacks() {
    this.io?.on("connection", (socket: Socket) => {
      // console.log(`Socket ${socket.id} connected`);
      socket.on("disconnect", () => {
        // console.log(`Socket ${socket.id} disconnected`);
      });
      socket.on("event", (data: any) => {
        console.log(`Socket ${socket.id} emitted event '${data.event}' with data:`, data.data);
        socket.broadcast.emit(data.event, data.data);
      });
    });
  }

  emit(event: string, data: any) {
    this.io?.emit(event, JSON.stringify(data));
  }
}
