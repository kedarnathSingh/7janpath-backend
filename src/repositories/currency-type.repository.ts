import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {CurrencyType, CurrencyTypeRelations} from '../models';

export class CurrencyTypeRepository extends DefaultCrudRepository<
  CurrencyType,
  typeof CurrencyType.prototype.id,
  CurrencyTypeRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(CurrencyType, dataSource);
  }
}
