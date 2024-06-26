import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const CurrentUser = createParamDecorator<unknown, ExecutionContext>((data, context) => {
    return context.switchToHttp().getRequest<Request>().user;
});