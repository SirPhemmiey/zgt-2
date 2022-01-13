

/**
 * this is going to be the base service where every other service or service container will inherit from
 * Things that can be put in the service here are configurable timezones, configurable currencies and other basic
 * configurations or settings that can be configurable and common to all "services/environments" etc
 */

import { getMongo } from "./clients/mongodb";
import { getStorage } from "./clients/storage";
import { AuthService } from "./services/AuthService/AuthService";
import { FileService } from "./services/FileService/FileService";
import { ParserService } from "./services/ParseService/ParserService";
import { TranslateService } from "./services/TranslationService/TranslateService";
import { UserDao } from "./services/UserService/UserDao";
import { UserDaoMongo } from "./services/UserService/UserDaoMongo";
import { UserService } from "./services/UserService/UserService";

 export interface Service {
    //environment: ENV,
}

export interface ServiceContainer extends Service {
    authService: AuthService,
    userDao: UserDao,
    userService: UserService,
    parserService: ParserService,
    fileService: FileService,
    translateService: TranslateService,
}

const createContainer = () => {
    const userDao = new UserDaoMongo(getMongo());
    const userService = new UserService(userDao);
    const authService = new AuthService(userDao);
    const fileService = new FileService({bucket: 'penciltest1'}, getStorage());
    const parserService = new ParserService();
    const translateService = new TranslateService();

    const container: ServiceContainer = {
        userDao,
        authService,
        userService,
        fileService,
        parserService,
        translateService,
    }
    return container;
};

const service = createContainer();

//to use the service container anywhere else out of context (using the this keyword)
export const getService = () => {
    return service;
};
