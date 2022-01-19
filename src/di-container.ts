

/**
 * this is going to be the base service where every other service or service container will inherit from
 * Things that can be put in the service here are configurable timezones, configurable currencies and other basic
 * configurations or settings that can be configurable and common to all "services/environments" etc
 */

import { InterestDao } from "./services/LeadService/InterestDao";
import { LeadDao } from "./services/LeadService/LeadDao";
import { LeadService } from "./services/LeadService/LeadService";

 export interface Service {
    //environment: ENV,
}

export interface ServiceContainer extends Service {
    leadService: LeadService,
}

const createContainer = () => {
    const leadDao = new LeadDao();
    const interestDao = new InterestDao();
    const leadService = new LeadService(leadDao, interestDao);

    const container: ServiceContainer = {
        leadService
    }
    return container;
};

const service = createContainer();

//to use the service container anywhere else out of context (using the this keyword)
export const getService = () => {
    return service;
};
