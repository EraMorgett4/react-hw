import React from "react";

const LockIcon = ({ isLocked }) => {
  if (!isLocked) return null;

  return (
    <div className="icon">
      <img src="/icons/lock.svg" alt="잠금 아이콘" />
    </div>
  );
};

export default LockIcon;
