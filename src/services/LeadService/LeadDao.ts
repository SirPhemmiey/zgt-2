
/**
 * This is where direct calls to our database will be made
 */

import Interest from "../../models/interest";
import Lead, { LeadAttributes, LeadInput } from "../../models/lead";

export class LeadDao {

    constructor() {}

    async create(doc: LeadInput) {
        return Lead.create(doc);
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
            include: {
                model: Interest
            }
        })
    }

    async getLeadById(id: string): Promise<LeadAttributes> {
        return Lead.findByPk(id).then((res) => {
            if (!res) {
                throw new Error('lead not found');
            }
            return res;
        });
    }

    async deleteById(id: string) {
        return Lead.destroy({where: { id: id }})
    }

    async deleteAll() {
        //@ts-ignore
        return Lead.destroy({truncate: { cascade: true }, where: {}});
    }
};