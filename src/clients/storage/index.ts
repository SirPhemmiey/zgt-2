import { Storage } from "@google-cloud/storage"; 
import { getEnv } from "../../env";

const config = JSON.parse(getEnv().SERVICE_ACCOUNT);

// console.log({projectId: config.project_id});

export const getStorage = () => {
    return new Storage({
        projectId: config.project_id,
        credentials: config,
    })
};