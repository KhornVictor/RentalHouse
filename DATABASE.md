Table Room {
  room_id int [pk]
  room_number varchar
  capacity int
  rent_amount decimal
  status varchar
  electricity_rate decimal
  water_rate decimal
}

Table Tenant {
  tenant_id int [pk]
  first_name varchar
  last_name varchar
  role varchar
  phone_number varchar
  avatar varchar
  email varchar
  status varchar
}

Table Lease {
  lease_id int [pk]
  room_id int [ref: > Room.room_id]
  tenant_id int [ref: > Tenant.tenant_id]
  move_in_date date
  move_out_date date
  rent_amount decimal
  deposit_amount decimal
}

Table Bill {
  bill_id int [pk]
  lease_id int [ref: > Lease.lease_id]
  billing_month date
  electricity_units decimal
  electricity_rate decimal
  water_units decimal
  water_rate decimal
  payment_status varchar
}