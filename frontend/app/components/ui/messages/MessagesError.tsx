"use client";

import { useState, useEffect } from "react";
import "./animation.css";

interface MessagesErrorProps {
  text: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export default function MessagesError({
  text,
  isVisible = false,
  onClose,
}: MessagesErrorProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <>
      <div
        className={`w-auto h-auto absolute bottom-5 right-5 ${
          show ? "slide-in-error" : "slide-out-error"
        } ${show ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`flex items-center gap-3 rounded-full bg-linear-to-r from-red-500/20 to-red-600/10 border border-red-500/60 backdrop-blur-sm px-5 py-3 text-red-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105`}
        >
          <svg
            className="w-5 h-5 shrink-0 hover:scale-125 hover:text-red-100 cursor-pointer transition-all duration-200 animate-pulse"
            fill="currentColor"
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold">{text}</span>
        </div>
      </div>
    </>
  );
}
