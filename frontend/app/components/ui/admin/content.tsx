import React from "react";
import Dashboard from "./dashboard/dashboard";
import Announcement from "../admin/announcement/accouncement";
import Setting from "../admin/setting/setting";
import Billing from "../admin/billing/billing";
import Tenent from "./tenent/tenent";
import Rooms from "./room/room";
import User from "@/app/types/user";

type MainContentProps = {
  auth: User | null;
  selected: string;
  onAvatarClick?: () => void;
};

export default function MainContent({
  auth,
  selected,
  onAvatarClick,
}: MainContentProps) {
  if (selected === "Announcement") return <Announcement />;
  else if (selected === "Settings")
    return <Setting user={auth} onAvatarClick={onAvatarClick} />;
  else if (selected === "Billing")
    return <Billing user={auth} onAvatarClick={onAvatarClick} />;
  else if (selected === "Rooms")
    return <Rooms user={auth} onAvatarClick={onAvatarClick} />;
  else if (selected === "Tenants")
    return <Tenent user={auth} onAvatarClick={onAvatarClick} />;
  else return <Dashboard user={auth} onAvatarClick={onAvatarClick} />;
}
