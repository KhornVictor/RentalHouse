type Lease = {
  leaseid: number;
  roomid: number;
  tenantid: number;
  moveindate: string;
  moveoutdate: string | null;
  depositamount: number;
};

export default Lease;
