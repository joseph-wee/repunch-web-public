import React, { useEffect } from "react";

const useCancel = () => {
  useEffect(() => {
    console.log();
  }, []);
  return <div>cancel</div>;
};

export default useCancel;
