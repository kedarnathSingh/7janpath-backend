import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {Contactus, ContactusRelations} from '../models';

export class ContactusRepository extends DefaultCrudRepository<
  Contactus,
  typeof Contactus.prototype.id,
  ContactusRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(Contactus, dataSource);
  }
}
