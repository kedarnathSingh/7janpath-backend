import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {CountryList, CountryListRelations} from '../models';

export class CountryListRepository extends DefaultCrudRepository<
  CountryList,
  typeof CountryList.prototype.id,
  CountryListRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(CountryList, dataSource);
  }
}
