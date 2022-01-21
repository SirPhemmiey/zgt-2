
/**
 * This is where direct calls to our database will be made
 */

import { Schema, Document, Model, Connection, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { InterestAttributes, InterestAttributesExtended, InterestDao } from "./InterestDao";

const schema = new Schema(
    {
        message: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);


export class InterestDaoMongo implements InterestDao {

    model: Model<Document<InterestAttributesExtended>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<InterestAttributesExtended>>('Interest', schema);
    }
    
    deleteById(id: string) {
        const _id = new Types.ObjectId(id);
        return this.model.findOneAndRemove({_id: _id as any}).then((v) => {
            return;
        })
    }

    async create(doc: InterestAttributes): Promise<InterestAttributesExtended | undefined> {
        return this.model.create(doc)
            .then((res) => {
                if (!res) throw new Error('not results found');
                return res._id;
            });
    }

    async deleteAll() {
        return this.model.deleteMany({})
            .then(() => {
                return;
            })
    }
};

export const InterestSchema = schema;
export default mongoose.model<Document<InterestAttributesExtended>>('Interest', InterestSchema);

//module.exports = mongoose.model('Interest', InterestSchema);
