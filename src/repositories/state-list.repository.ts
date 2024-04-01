import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {StateList, StateListRelations} from '../models';

export class StateListRepository extends DefaultCrudRepository<
  StateList,
  typeof StateList.prototype.id,
  StateListRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(StateList, dataSource);
  }
}
