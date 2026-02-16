"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/app/routers/routers";
import MessagesError from "../messages/MessagesError";
import MessagesSuccess from "../messages/MessagesSuccess";

const getUser = async () => {
  try {
    const response = await fetch("/data/users.json");
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const UserExist = async (username: string): Promise<boolean> => {
  const users = await getUser();
  return users.some((user: { username: string }) => user.username === username);
};

const PasswordMatch = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const users = await getUser();
  const user = users.find(
    (user: { username: string; password: string }) =>
      user.username === username,
  );
  return user ? user.password === password : false;
};

const mockLogin = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const users = await getUser();
  const user = users.find(
    (user: { username: string; password: string }) =>
      user.username === username && user.password === password,
  );
  return !!user;
};

export default function LoginCard() {
  const router = useRouter();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleLogin = async (
    username: string,
    password: string,
    event?: React.FormEvent,
  ) => {
    if (event) event.preventDefault();
    const success = await mockLogin(username, password);
    if (success) {
      console.log("Login successful!");
      setShowError(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      router.push(routes.homeDashboard.path);
    } else {
      if (username === "" && password.length > 0){
         setErrorText("Please enter your username.");
      }
      else if (password === "" && username.length > 0){
        setErrorText("Please enter your password.");
      }
      else if (username === "" || password === "") {
        setErrorText("Please enter both username and password.");
      }
      else if (!(await UserExist(username))){
        setErrorText("Username does not exist.");
        setUsername("");
        setPassword("");
      }
      else if (!(await PasswordMatch(username, password))){
        setErrorText("Incorrect password.");
        setPassword("");
      }
      else{ setErrorText("Invalid login credentials.");}
      setShowError(true);
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute inset-0 bg-linear-to-br from-slate-950/90 via-slate-950/70 to-slate-900/40" />
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Display Messages */}
      <MessagesError
        text={errorText}
        isVisible={showError}
        onClose={() => setShowError(false)}
      />

      <MessagesSuccess
        text="Authenticate successful!"
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-[28px] bg-linear-to-r from-cyan-400/40 via-purple-400/40 to-orange-400/40 p-px">
          <div className="grid w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] md:grid-cols-2">
            <div className="hidden min-h-130 flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.2),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,0.2),transparent_45%)] p-10 md:flex">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                RentalHouse
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Welcome back
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                Manage your rentals with clarity, speed, and insight.
              </p>
              <img
                src="https://assets-v2.lottiefiles.com/a/4c271a64-1167-11ee-8ab3-67521f0ca529/Lq3stVUtsl.gif"
                alt="Logo"
                className="mt-10 h-64 w-64 rounded-3xl object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center gap-6 bg-slate-950/80 px-8 py-12 text-white">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-200">
                  Account
                </span>
                <h3 className="mt-3 text-3xl font-semibold">Login</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Enter your credentials to access your dashboard.
                </p>
              </div>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. johndoe"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                    value={username}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") passwordInputRef.current?.focus();
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Password
                  </label>
                  <input
                    ref={passwordInputRef}
                    type="password"
                    value={password}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleLogin(username, password);
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-900/60"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-cyan-200 hover:text-cyan-100">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleLogin(username, password)}
                  className="mt-2 w-full rounded-full bg-linear-to-r from-cyan-400 via-purple-400 to-orange-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110"
                >
                  Login
                </button>
              </form>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="h-px flex-1 bg-white/10" />
                or continue with
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">

              {/* Google Button */}
              <button
                type="button"
                onClick={() => {
                  alert("Continuing with Google is not implemented in this demo.");
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                Google
              </button>

              {/* Microsoft Button */}
              <button
                type="button"
                onClick={() => {
                  alert("Continuing with Microsoft is not implemented in this demo.");
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                <img
                  src="https://www.svgrepo.com/show/448239/microsoft.svg"
                  alt="Microsoft"
                  className="w-4 h-4"
                />
                Microsoft
              </button>
            </div>

              <p className="text-sm text-slate-300">
                Don&apos;t have an account?{" "}
                <a href={routes.signup.path} className="text-cyan-200 hover:text-cyan-100">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
