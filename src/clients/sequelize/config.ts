import { Dialect, Sequelize } from 'sequelize'
import { getEnv } from '../../env';

const dbName = getEnv().MYSQL_DATABASE as string;
const dbUser = getEnv().MYSQL_USER as string;
const dbHost = getEnv().MYSQL_HOSTNAME;
const dbDriver = getEnv().MYSQL_DRIVER as Dialect;
const dbPassword = getEnv().MYSQL_PASSWORD;
const dbPort = getEnv().MYSQL_PORT;

console.log({dbName, dbUser, dbPassword, dbHost, dbDriver, dbPort});

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  port: Number(dbPort) || 3306
});

export default sequelizeConnection;
