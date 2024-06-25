import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";
import { AbstractDocument } from "src/database/abstract.schema";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends AbstractDocument {
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
    })
    password: string;

    @Prop({
        type: String,
        required: false,
    })
    avatar: string;

    // TODO add rooms array 
}

export const UserSchema = SchemaFactory.createForClass(User);