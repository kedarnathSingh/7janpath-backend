import {BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class EnquiryService {
  async calculateGst(amountData: any, data: any) {
    const amount: number = parseFloat(amountData);
    if (data) {
      let gst = 0;
      if (amount <= data[0].max_amount) {
        gst = Math.min(amount * data[0].gst, data[0].max_gst);
      } else if (amount <= data[1].max_amount) {
        gst = data[0].max_gst + Math.min((amount - data[0].max_amount) * data[1].gst, data[1].max_gst);
      } else {
        gst = data[1].max_gst + Math.min((amount - data[1].max_amount) * data[2].gst, data[2].max_gst);
      }
      if (gst < data[0].min_gst) {
        gst = data[0].min_gst;
      }
      //console.log(typeof +gst);
      return gst;
    }
  }
}
