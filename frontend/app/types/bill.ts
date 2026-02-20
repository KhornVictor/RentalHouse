type Bill = {
  billid: number;
  leaseid: number;
  billingmonth: string;
  electricityunits: number;
  electricityrate: number;
  waterunits: number;
  waterrate: number;
  paymentstatus: string;
};

export default Bill;
