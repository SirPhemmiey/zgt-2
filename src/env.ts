
import * as dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV}`, debug: true});
//require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
console.log(`currently using ${process.env.NODE_ENV} env`);


export enum ENV {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export interface SetUpEnv {
  PORT: string,
  NODE_ENV: string,
  MONGO_URI: string,
  REDIS_HOST: string
  REDIS_PASSWORD: string,
  REDIS_PORT: string,
  SERVICE_ACCOUNT: any
}

export const getEnv = (): SetUpEnv => {
  return {
    PORT: process.env.PORT ?? '',
    MONGO_URI: process.env.MONGO_URI ?? '',
    NODE_ENV: process.env.NODE_ENV ?? '',
    REDIS_HOST: process.env.REDIS_HOST ?? '127.0.0.1',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? '',
    REDIS_PORT: process.env.REDIS_PORT ?? '6379',
    SERVICE_ACCOUNT: process.env.SERVICE_ACCOUNT ?? ''
  }
}