import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {EnquiryType, EnquiryTypeRelations} from '../models';

export class EnquiryTypeRepository extends DefaultCrudRepository<
  EnquiryType,
  typeof EnquiryType.prototype.id,
  EnquiryTypeRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(EnquiryType, dataSource);
  }
}
