import Interest, { InterestAttributes } from "../../models/interest";

export class InterestDao {

    constructor() { }

    async deleteAll() {
        //@ts-ignore
        return Interest.destroy({truncate: { cascade: true }, where: {}});
    }

    async create(doc: InterestAttributes) {
        return Interest.create(doc);
    }

    async getAll() {
        return Interest.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
        })
    }
}