import React from "react";
import { useIsOnline } from "@react-terra/hooks";

export const OnlineStatus = () => {
  const isOnline = useIsOnline();

  return (
    <aside
      className="OnlineStatus"
      style={{
        backgroundColor: isOnline ? "#A4F9AC" : "#FCBBBB"
      }}
    >
      {isOnline ? "You are online ✅" : "Please check your connection ❌"}
    </aside>
  );
};
