import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from "socket.io";

export interface AuthSocket extends Socket {}

@WebSocketGateway({ namespace: "room" })
export class RoomGateway
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RoomGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log("Initialized");
  }

  handleConnection(client: AuthSocket) {
    this.logger.log(`Client id: ${client.id} connected!`)
  }

  handleDisconnect(client: AuthSocket) {
    this.logger.log(`Client id: ${client.id} disconnected!`)
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() payload: any
  ): string {
    console.log(`${client.id} send a ${payload}`);
    return 'Hello world!';
  }
}
