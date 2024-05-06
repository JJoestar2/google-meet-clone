import { INestApplicationContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";

export class CustomSocketIoAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService,
    ) {
        super(app);
    }

    createIoServer(port: number, options?: ServerOptions): any {
        const origin = this.configService.get("WEB_URL") || "*";
        const opts = { ...options, cors: { origin } };
        
        const server = super.createIOServer(port, opts);

        return server;
    }
}