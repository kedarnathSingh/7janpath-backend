import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {BaseCurrency, BaseCurrencyRelations} from '../models';

export class BaseCurrencyRepository extends DefaultCrudRepository<
  BaseCurrency,
  typeof BaseCurrency.prototype.id,
  BaseCurrencyRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(BaseCurrency, dataSource);
  }
}
