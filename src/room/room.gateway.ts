import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { Server, Socket } from "socket.io";

export interface AuthSocket extends Socket {}

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    exceptionFactory: (validationErrors) => {
      const result = validationErrors.map((error) => ({
        property: error.property,
        message: error.constraints
          ? error.constraints[Object.keys(error.constraints)[0]]
          : "Bad Request",
      }));

      return new WsException({
        status: 400,
        errors: result,
        error: "Bad Request",
      });
    },
  })
)
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

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() payload: any
  ): string {
    console.log(`${client.id} send a ${payload}`);
    return 'Hello world!';
  }
}
