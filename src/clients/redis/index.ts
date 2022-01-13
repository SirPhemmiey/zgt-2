import * as redis from "redis";
import { getEnv } from "../../env";

const options: redis.ClientOpts = {
    host: getEnv().REDIS_HOST,
    port: Number(getEnv().REDIS_PORT) as unknown as number,
    auth_pass: getEnv().REDIS_PASSWORD,
}

const client = redis.createClient(options);

export const getRedisClient = () => client;
export const getRedisOptions = () => options;