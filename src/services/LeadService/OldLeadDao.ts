
/**
 * This is where direct calls to our database will be made
 */

import { LeadAttributes } from "../../models/lead";
import Lead, { LeadInput } from "../../models/lead";

 export class OldLeadDao {

    constructor() { }

    async deleteAll() {
        return Lead.destroy({ cascade: true, truncate: true });
    }

    async create(doc: LeadAttributes) {
        return Lead.create(doc);
    }

    async getLeadById(id: string) {
        return Lead.findByPk(id);
    }

    async findOrCreate(id: string, doc: Omit<LeadAttributes, 'message'>) {
        return Lead.findOrCreate({
            where: { id: id },
            defaults: {
                ...doc,
            }
        });
    }

    async getAll(): Promise<LeadAttributes[]>{
        return Lead.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            // include: {
            //     model: this.DB.Interest
            // }
        })
    }
}