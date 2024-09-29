import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ForexDbDataSource} from '../datasources';
import {Testimonial, TestimonialRelations} from '../models';

export class TestimonialRepository extends DefaultCrudRepository<
  Testimonial,
  typeof Testimonial.prototype.id,
  TestimonialRelations
> {
  constructor(
    @inject('datasources.forex_db') dataSource: ForexDbDataSource,
  ) {
    super(Testimonial, dataSource);
  }
}
