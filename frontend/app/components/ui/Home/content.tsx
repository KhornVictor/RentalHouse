import React from "react";
import Dashboard from "./dashboard/dashboard";
import Announcement from "./announcement/accouncement";
import Setting from "./setting/setting";
import Billing from "./billing/billing";

type AuthUser = {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  email: string;
  avatar: string;
};

type MainContentProps = {
  auth: AuthUser | null;
  selected: string;
  onAvatarClick?: () => void;
};

export default function MainContent({
  auth,
  selected,
  onAvatarClick,
}: MainContentProps) {
  if (selected === "Announcement") return <Announcement />;
  else if (selected === "Settings") return <Setting />;
  else if (selected === "Billing") return <Billing />;
  else return <Dashboard user={auth} onAvatarClick={onAvatarClick} />;
}
