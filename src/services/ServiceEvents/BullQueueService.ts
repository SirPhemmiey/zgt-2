
//@ts-ignore
import Bull from 'bull';
import { getRedisOptions } from "../../clients/redis";

export class BullQueueService {

    createQueue(queueName: string) {
        const queue = new Bull(queueName, {
            redis: {
                port: getRedisOptions().port,
                host: getRedisOptions().host,
                password: getRedisOptions().auth_pass,
            }
        });
        return queue;
    }

    async addJobToQueue<T>(jobName: string, queue: Bull.Queue, data: T, options?: Bull.JobOptions) {
        const job = await queue.add(jobName, data, {
            ...options,
            attempts: 3,
            timeout: 2000 //ms
           // delay: 120000 //ms
        });
        return job;
    }

}
