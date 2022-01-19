import { InterestDao } from "./InterestDao";
import { LeadDao } from "./LeadDao";

export interface LeadRequestForm {
    email: string;
    phone: number;
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
        const createInterestPromise = this.interestDao.create({
            lead_id: leadId,
            message: doc.message,
        });
        await Promise.all([createLeadPromise, createInterestPromise]).catch((err) => {
            console.log({errorOccred: err.message});
        });
        return true;
    }
}