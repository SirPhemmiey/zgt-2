import { Connection, Model, Schema, Document, Types } from "mongoose";
import * as mongoose from 'mongoose';
import { emptyUserExtended, User, UserDao, UserExtended } from "./UserDao";

 
export const mapToMongoDoc = <T>(res: mongoose.Document<T>) => {
    return (res.toObject() as any) as T;
  }

export const schema = new Schema<Document<UserExtended>>({
    name: String,
    password: String,
    email: String,
}, {
    timestamps: true,
    versionKey: false,
});

export class UserDaoMongo implements UserDao {

    model: Model<Document<UserExtended>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<UserExtended>>("User", schema);
    }

    upsert(id: string, update: Partial<User>) {
        return this.model.findOneAndUpdate({
            _id: id as any,
        }, {
            $set: update as any,
        }, { upsert: true, new: true }).then((v) => {
            return
        })
    }

    getByEmail(form: { email: string;}): Promise<UserExtended> {
        return this.model.findOne({email: form.email}, 'password email').then((res) => {
           if (!res) return emptyUserExtended;
           return mapToMongoDoc<UserExtended>(res);
       })
   }
}

export const UserSchema = schema;
export default mongoose.model<Document<UserExtended>>("User", schema);