"use client";

import { useState, useEffect } from "react";

interface MessagesSuccessProps {
  text: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export default function MessagesSuccess({
  text,
  isVisible = false,
  onClose,
}: MessagesSuccessProps) {
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
    <div
      className={`w-auto h-auto absolute bottom-5 right-5 transform transition-all duration-500 ease-in-out ${
        show
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 hover:scale-105 transition-all duration-300 rounded-full bg-green-500/10 border border-green-500/50 px-4 py-3 text-green-200">
        <svg
          className="w-5 h-5 shrink-0 hover:scale-110 hover:text-green-300 cursor-pointer"
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
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>
  );
}
