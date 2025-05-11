import React from "react";

const NotFound = () => {
  return (
    <div>
      <div className="flex justify-center h-screen w-screen items-center flex-col gap-6">
        <p className="text-red-400 text-5xl font-bold">404</p>
        <p className="text-black text-4xl">Page Not Found...</p>
      </div>
    </div>
  );
};

export default NotFound;
