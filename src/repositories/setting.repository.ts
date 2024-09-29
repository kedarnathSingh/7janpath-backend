import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {Setting, SettingRelations} from '../models';

export class SettingRepository extends DefaultCrudRepository<
  Setting,
  typeof Setting.prototype.id,
  SettingRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(Setting, dataSource);
  }
}
