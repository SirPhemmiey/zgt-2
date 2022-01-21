

/**
 * this is going to be the base service where every other service or service container will inherit from
 * Things that can be put in the service here are configurable timezones, configurable currencies and other basic
 * configurations or settings that can be configurable and common to all "services/environments" etc
 */

import { getMongo } from "./clients/mongodb/mongo";
import { InterestDao } from "./services/LeadService/InterestDao";
import { InterestDaoMongo } from "./services/LeadService/InterestDaoMongo";
import { LeadDao } from "./services/LeadService/LeadDao";
import {LeadDaoMongo} from "./services/LeadService/LeadDaoMongo";
import { LeadService } from "./services/LeadService/LeadService";

 export interface Service {
    //environment: ENV,
}

export interface ServiceContainer extends Service {
    leadService: LeadService,
    leadDao: LeadDao,
    interestDao: InterestDao
}

const createContainer = () => {
    const leadDao = new LeadDaoMongo(getMongo());
    const interestDao = new InterestDaoMongo(getMongo());
    const leadService = new LeadService(leadDao, interestDao);

    const container: ServiceContainer = {
        leadService,
        leadDao,
        interestDao,
    }
    return container;
};

const service = createContainer();

//to use the service container anywhere else out of context (using the this keyword)
export const getService = () => {
    return service;
};
