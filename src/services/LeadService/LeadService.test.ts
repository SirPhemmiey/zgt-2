import { getService } from "../../di-container";

const service = getService();

const leadObject = {
    first_name: 'first lead name',
    last_name: 'last lead name',
    phone: '120233',
    message: 'i am interested in real estate',
    email: 'lead1@gmail.com'
};

// beforeAll(async () => {
//     await service.leadService.deleteAll().then(() => {
//         console.log('before database cleared!');
//     });
// }, 10000);

// afterAll(async () => {
//     await service.leadService.deleteAll().then(() => {
//         console.log('after database cleared!');
//     });
// }, 10000);

describe('POST /lead/create', () => {
    it('should create lead and interest', async () => {
        const response = await service.leadService.createLead(leadObject);
        expect(response).toBe(true);
    }, 5000);

    it('should ensure that no duplicate leads are created', async() => {
        await service.leadService.createLead(leadObject);
        const allLeads = await service.leadService.getAllLeads();
        const doesLeadExist = allLeads.filter((l) => l.email === leadObject.email);
        expect(doesLeadExist.length).toBe(1);

        //verify combination of ID
        expect(doesLeadExist[0]._id).toBe(`${leadObject.phone}_${leadObject.email}`);
    }, 5000);
});


describe('POST /lead/submit_request', () => {
    it('should submit lead request form', async () => {
        const requestForm = {
            first_name: 'first lead name',
            last_name: 'last lead name',
            phone: '120233',
            message: 'i am interested in real estate',
            email: 'lead1@gmail.com'
        };
        const response = await service.leadService.submitLeadRequest(requestForm);
        expect(response).toBe(true);
    }, 5000);
});


describe('GET /leads/all', () => {

    it('should return all leads', async () => {
        const response = await service.leadService.getAllLeads();
        expect(response).toBeInstanceOf(Array);
    });
});