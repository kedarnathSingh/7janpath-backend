import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'forex_db',
//   connector: 'postgresql',
//   url: 'postgres://postgres:Ashish@123@localhost:5432/forex',
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'Ashish@123',
//   database: 'forex'
// };
const config = {
  name: 'forex_db',
  connector: 'postgresql',
  url: 'postgres://postgres:Nxone@502824@89.116.32.199/forex_db',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Nxone@502824',
  database: 'forex_db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ForexDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'forex_db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.forex_db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
