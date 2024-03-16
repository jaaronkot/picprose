import React from "react";
export const ListboxWrapper = ({children}: { children: React.ReactNode }) => (
  <div className="w-full max-w-[200px] h-screen bg-slate-800">
    {children}
  </div>
);
