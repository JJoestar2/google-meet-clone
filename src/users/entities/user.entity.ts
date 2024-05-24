import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
      },
    timestamps: true
})
export class User {
    @Prop({
        type: String,
        unique: true,
    })
    id: string;

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