import mongoose from "mongoose";
import bluebird from "bluebird";
import { getEnv } from "../../env";

(<any>mongoose).Promise = bluebird;

//https://mongoosejs.com/docs/connections.html#options

const createConnection = (uri: string) => {
    const conn = mongoose.createConnection(uri);
    conn.on('error', console.error.bind(console, 'mongo connection error:'));
    conn.once('open', function callback() {
        return;
    });
   // conn.watch().on('change', change => console.log('change', change));
    return conn;
}

export const getMongo = (): mongoose.Connection => {
    return createConnection(getEnv().MONGO_URI);
}
