
/**
 * This is where direct calls to our database will be made
 */

import { emptyLead, LeadAttributes, LeadDao } from "./LeadDao";
import { Schema, model, Document, Model, Connection, Types } from 'mongoose';
import { mapToMongoDoc, mapToMongoDocs } from '../../utils/mongoUtils';
import * as mongoose from 'mongoose';

const schema = new Schema(
    {
        _id : {
            type : String,
            required : true
          },
        email: String,
        phone: String,
        interests: [{ type :  Schema.Types.ObjectId, ref: 'Interest', required: true }],
        first_name: String,
        last_name: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);


export class LeadDaoMongo implements LeadDao {

    model: Model<Document<LeadAttributes>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<LeadAttributes>>('Lead', schema);
    }

    async create(doc: LeadAttributes) {
        const _id = `${doc.phone}_${doc.email}`
        await this.model.findOneAndUpdate({
            _id: _id as any,
        }, {
            $set: doc as any,
        }, { upsert: true });
        return;
    }

    deleteById(id: string) {
        return this.model.findOneAndRemove({_id: id }).then((v) => {
            return;
        })
    }

    async getAll(): Promise<LeadAttributes[]> {
        //.populate('interests')
        return this.model.find({}).sort({createdAt: -1})
        .then((res) => {
            if (!res) throw new Error('not results found');
            return mapToMongoDocs<LeadAttributes>(res);
        })
    }

    async getLeadById(id: string): Promise<LeadAttributes> {
        return this.model.findById({_id: id}).then((res) => {
            if (!res) return emptyLead;
            return mapToMongoDoc<LeadAttributes>(res);
        })
    }

    async deleteAll() {
        return this.model.deleteMany({})
        .then(() => {
            return;
        })
    }
};

export const LeadSchema = schema;
export default mongoose.model<Document<LeadAttributes>>('Lead', LeadSchema);
//module.exports = mongoose.model('Lead', LeadSchema);
