import Bill from "@/app/types/bill";
import Lease from "@/app/types/lease";
import Room from "@/app/types/room";
import User from "@/app/types/user";

export default function SideBarData({
  tenant,
  lease,
  room,
  latestBill,
}: {
  tenant?: User;
  lease?: Lease;
  room?: Room;
  latestBill?: Bill;
}) {
  if (!tenant) {
    return (
      <div className="w-full h-full rounded-lg shadow flex items-center justify-center p-4">
        <p className="text-gray-600">Select a tenant to view details.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg shadow overflow-hidden">
      <div className="w-full h-[90%] flex flex-col gap-4 p-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col items-center pt-10">
          <div className="w-70 h-70 rounded-full bg-slate-700 shadow-lg shadow-slate-700/40 border-6 border-slate-900 overflow-hidden">
            <img
              src={tenant.avatar}
              alt={`${tenant.firstname} ${tenant.lastname}`}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_user_personalization&w=740&q=80";
              }}
            />
          </div>
          <div className="text-center w-full p-5">
            <p className="text-4xl font-semibold text-gray-100">
              {tenant.firstname} {tenant.lastname}
            </p>
            <p className="text-md text-gray-600">{tenant.email}</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="rounded-lg bg-gray-950/40 p-3">
            <p className="text-sm font-semibold text-gray-200 mb-2">Tenant</p>
            <p className="text-sm text-gray-400">Phone: {tenant.phonenumber}</p>
            <p className="text-sm text-gray-400">Status: {tenant.status}</p>
            <p className="text-sm text-gray-400">Username: {tenant.username}</p>
          </div>

          <div className="rounded-lg bg-gray-950/40 p-3">
            <p className="text-sm font-semibold text-gray-200 mb-2">Lease</p>
            {lease ? (
              <>
                <p className="text-sm text-gray-400">
                  Deposit: {lease.depositamount} $
                </p>
                <p className="text-sm text-gray-400">
                  Move in: {lease.moveindate}
                </p>
                {
                  lease.moveoutdate && (
                  <p className="text-sm text-gray-400">
                    Move out: {lease.moveoutdate}
                  </p>
                  )
                }
              </>
            ) : (
              <p className="text-sm text-gray-600">No lease found.</p>
            )}
          </div>

          <div className="rounded-lg bg-gray-950/40 p-3">
            <p className="text-sm font-semibold text-gray-200 mb-2">Room</p>
            {room ? (
              <>
                <p className="text-sm text-gray-400">Room: {room.roomnumber}</p>
                <p className="text-sm text-gray-400">
                  Capacity: {room.capacity}
                </p>
                <p className="text-sm text-gray-400">Status: {room.status}</p>
                <p className="text-sm text-gray-400">
                  Rent: {room.rentamount} $
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">No room assigned.</p>
            )}
          </div>

          <div className="rounded-lg bg-gray-950/40 p-3 mb-4">
            <p className="text-sm font-semibold text-gray-200 mb-2">
              Latest Bill
            </p>
            {latestBill ? (
              <>
                <p className="text-sm text-gray-400">
                  Month: {latestBill.billingmonth}
                </p>
                <p className="text-sm text-gray-400">
                  Status: {latestBill.paymentstatus}
                </p>
                <p className="text-sm text-gray-400">
                  Electricity: {latestBill.electricityunits} units
                </p>
                <p className="text-sm text-gray-400">
                  Water: {latestBill.waterunits} units
                </p>
                <p className="text-sm text-gray-400">
                  Electricity Bills:{" "}
                  {(latestBill.electricityunits * latestBill.electricityrate).toFixed(2)} $
                </p>
                <p className="text-sm text-gray-400">
                  Water Bills: {(latestBill.waterunits * latestBill.waterrate).toFixed(2)} $
                </p>
                <p className="text-sm text-gray-400">
                  Total:{" "}
                  {(
                    (room?.rentamount || 0) +
                    (latestBill.electricityunits * latestBill.electricityrate +
                      latestBill.waterunits * latestBill.waterrate)
                  ).toFixed(2)}{" "}
                  $
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">No bills found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[10%] p-4 flex flex-row gap-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200">
          Add
        </button>
        <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200">
          Update
        </button>
        <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-200">
          Delete
        </button>
      </div>
    </div>
  );
}
