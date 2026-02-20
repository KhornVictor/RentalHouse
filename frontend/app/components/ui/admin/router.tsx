import { FaHouseUser, FaMoneyBills, FaUser } from "react-icons/fa6";
import { GiBugleCall } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";


const listItems = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Tenants",
    icon: <FaUser />,
  },
  {
    name: "Announcement",
    icon: <GiBugleCall />,
  },
  {
    name: "Rooms",
    icon: <FaHouseUser />,
  },
  {
    name: "Billing",
    icon: <FaMoneyBills />,
  },
  {
    name: "Settings",
    icon: <IoMdSettings />,
  },
];

export { listItems };