import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {CityList, CityListRelations} from '../models';

export class CityListRepository extends DefaultCrudRepository<
  CityList,
  typeof CityList.prototype.id,
  CityListRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(CityList, dataSource);
  }
}
