import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {Faq, FaqRelations} from '../models';

export class FaqRepository extends DefaultCrudRepository<
  Faq,
  typeof Faq.prototype.id,
  FaqRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(Faq, dataSource);
  }
}
