import Bill from "@/app/types/bill";
import User from "@/app/types/user";

const tableHeader = ["Avatar", "Name", "Phone"];

export default function TableData({
  tenants,
  onSelectTenant,
  selectedTenantId,
}: {
  tenants: User[];
  onSelectTenant?: (tenant: User) => void;
  selectedTenantId?: number;
}) {
  return (
    <div className="w-full rounded-lg shadow overflow-y-auto scrollbar-slate">
      <table className="w-full table-rounded">
        <thead>
          <tr className="border-b-2 border-gray-800">
            {tableHeader.map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-100"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body-scroll">
          {tenants.map((tenant, index) => {

            return (
              <tr
                key={tenant.userid}
                className={`border-b border-gray-800 transition-all duration-300 ease-in-out cursor-pointer ${
                  selectedTenantId === tenant.userid
                    ? "bg-slate-900/70"
                    : "hover:bg-gray-800"
                }`}
                style={
                  {
                    "--animation-delay": `${index * 0.05}s`,
                  } as React.CSSProperties
                }
                onClick={() => onSelectTenant?.(tenant)}
              >
                <td className="px-6 py-4">
                  <img
                    src={tenant.avatar}
                    alt={`${tenant.firstname} ${tenant.lastname}`}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_user_personalization&w=740&q=80";
                    }}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-200 font-medium">
                  {tenant.firstname} {tenant.lastname}
                </td>
                <td className="px-6 py-4 text-sm text-gray-200">
                  {tenant.phonenumber}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
