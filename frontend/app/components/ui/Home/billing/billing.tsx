import React from "react";
import NotFound from "../../error/notFound";

export default function Billing() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <NotFound text="Billing Page Not Found" backButtonVisible={false} />
    </div>
  );
}
