import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {CurrencySetting, CurrencySettingRelations} from '../models';

export class CurrencySettingRepository extends DefaultCrudRepository<
  CurrencySetting,
  typeof CurrencySetting.prototype.id,
  CurrencySettingRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(CurrencySetting, dataSource);
  }
}
