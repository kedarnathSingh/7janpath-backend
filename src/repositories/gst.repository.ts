import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {Gst, GstRelations} from '../models';

export class GstRepository extends DefaultCrudRepository<
  Gst,
  typeof Gst.prototype.id,
  GstRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(Gst, dataSource);
  }
}
