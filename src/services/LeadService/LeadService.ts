import { InterestDao } from "./InterestDao";
import { LeadDao } from "./LeadDao";

export interface LeadRequestForm {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    message: string;
}
//private interestDao: InterestDao
export class LeadService {

    constructor(private leadDao: LeadDao, private interestDao: InterestDao) {}

    async getAllLeads() {
        return this.leadDao.getAll();
    }

    async deleteById(id: string): Promise<boolean> {
        const deleteInterestPromise = this.interestDao.deleteById(id);
        const deleteLeadPromise = this.leadDao.deleteById(id);
        await Promise.all([deleteInterestPromise, deleteLeadPromise]);
        return Promise.resolve(true);
    }

    async deleteAll() {
        const deleteInterestPromises = this.interestDao.deleteAll();
        const deleteLeadPromises = this.leadDao.deleteAll();
        await Promise.all([deleteInterestPromises, deleteLeadPromises]);
    }


    async submitLeadRequest(doc: LeadRequestForm) {
        await this.createLead({
            email: doc.email,
            phone: doc.phone,
            first_name: doc.first_name,
            last_name: doc.last_name,
            message: doc.message
        });
        return true;
    }

    async createLead(doc: LeadRequestForm) {
        const leadId = `${doc.phone}_${doc.email}`;
        
        const createLeadPromise = this.leadDao.findOrCreate(leadId, {
            id: leadId,
            first_name: doc.first_name,
            last_name: doc.last_name,
            email: doc.email,
            phone: doc.phone
        });
        const createInterestPromise = await this.interestDao.create({
            lead_id: leadId,
            message: doc.message,
        });
        console.log({doc, leadId});
        await Promise.all([createLeadPromise, createInterestPromise]).catch((err) => {
            console.log({errorOccred: err.message});
        });
        return true;
    }
}