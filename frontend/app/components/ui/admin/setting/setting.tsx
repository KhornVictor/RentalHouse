"use client";

import { useEffect, useState } from "react";
import User from "@/app/types/user";
import NavigationBarHome from "../navigationBarHome";
import ThemeToggle from "../../ThemeToggle";

type SettingProps = {
  user: User | null;
  onAvatarClick?: () => void;
};

export default function Setting({ user, onAvatarClick }: SettingProps) {
  const [authUser, setAuthUser] = useState<User | null>(user ?? null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const [billReminder, setBillReminder] = useState(true);
  const [maintenanceAlert, setMaintenanceAlert] = useState(true);
  const [emailNotification, setEmailNotification] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setAuthUser(user ?? null);
  }, [user]);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) return;

    try {
      setAuthUser(JSON.parse(stored) as User);
    } catch {
      setAuthUser(null);
    }
  }, []);

  useEffect(() => {
    if (!authUser) return;
    setFirstname(authUser.firstname || "");
    setLastname(authUser.lastname || "");
    setEmail(authUser.email || "");
    setPhone(authUser.phonenumber || "");
    setAvatar(authUser.avatar || "");
  }, [authUser]);

  const handleSaveProfile = () => {
    if (!authUser) {
      setMessage("No authenticated user found.");
      return;
    }

    setSavingProfile(true);

    const updatedUser: User = {
      ...authUser,
      firstname,
      lastname,
      email,
      phonenumber: phone,
      avatar,
    };

    localStorage.setItem("authUser", JSON.stringify(updatedUser));
    setMessage("Profile settings saved successfully.");
    setSavingProfile(false);
  };

  const handleSaveSecurity = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setSavingSecurity(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Password updated successfully.");
    setSavingSecurity(false);
  };

  return (
    <div className="w-full h-screen flex flex-col lg:px-10 px-6 py-6 overflow-hidden scrollbar-slate">
      <div className="w-full mb-6">
        <NavigationBarHome user={authUser} onAvatarClick={onAvatarClick} />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-slate space-y-6 pb-4">
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-500/50 shadow-2xl shadow-slate-600/50">
          <h2 className="text-xl font-bold text-white mb-1">
            Profile Settings
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Update your account information and contact details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm text-gray-300 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="First name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm text-gray-300 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="Last name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="Email address"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm text-gray-300 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="Phone number"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="avatar"
                className="block text-sm text-gray-300 mb-2"
              >
                Avatar URL
              </label>
              <input
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="https://example.com/avatar.png"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold transition"
            >
              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-500/50 shadow-2xl shadow-slate-600/50">
          <h2 className="text-xl font-bold text-white mb-1">Preferences</h2>
          <p className="text-sm text-gray-400 mb-6">
            Manage your alerts and visual preferences.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div>
                <p className="text-sm font-semibold text-gray-100">
                  Bill Reminder
                </p>
                <p className="text-xs text-gray-400">
                  Receive reminders for upcoming bills.
                </p>
              </div>
              <input
                type="checkbox"
                checked={billReminder}
                onChange={(e) => setBillReminder(e.target.checked)}
                className="h-4 w-4"
                title="Toggle bill reminder"
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div>
                <p className="text-sm font-semibold text-gray-100">
                  Maintenance Alerts
                </p>
                <p className="text-xs text-gray-400">
                  Get notified about maintenance requests.
                </p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceAlert}
                onChange={(e) => setMaintenanceAlert(e.target.checked)}
                className="h-4 w-4"
                title="Toggle maintenance alerts"
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div>
                <p className="text-sm font-semibold text-gray-100">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-400">
                  Receive system updates by email.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotification}
                onChange={(e) => setEmailNotification(e.target.checked)}
                className="h-4 w-4"
                title="Toggle email notifications"
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div>
                <p className="text-sm font-semibold text-gray-100">Theme</p>
                <p className="text-xs text-gray-400">
                  Switch between dark and light mode.
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-500/50 shadow-2xl shadow-slate-600/50">
          <h2 className="text-xl font-bold text-white mb-1">Security</h2>
          <p className="text-sm text-gray-400 mb-6">
            Change your account password.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm text-gray-300 mb-2"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="Current password"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm text-gray-300 mb-2"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="New password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveSecurity}
              disabled={savingSecurity}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-semibold transition"
            >
              {savingSecurity ? "Saving..." : "Update Password"}
            </button>
          </div>
        </div>

        {message && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-900/40 px-4 py-3 text-sm text-blue-100">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
