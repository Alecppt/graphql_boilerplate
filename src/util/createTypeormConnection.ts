import {
  getConnectionOptions,
  createConnection,
  getConnectionManager,
} from 'typeorm';

export const createTypeormConnection = async () => {
  if (getConnectionManager().has('default')) {
    return getConnectionManager().get('default');
  }
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: 'default' });
};
