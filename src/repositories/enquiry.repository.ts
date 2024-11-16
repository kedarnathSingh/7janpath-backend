import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {Enquiry, EnquiryRelations} from '../models';

export class EnquiryRepository extends DefaultCrudRepository<
  Enquiry,
  typeof Enquiry.prototype.id,
  EnquiryRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(Enquiry, dataSource);
  }
}
