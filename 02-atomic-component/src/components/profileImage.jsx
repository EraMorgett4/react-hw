import React from "react";

const ProfileImage = ({ src, alt }) => {
  return (
    <div className="user-profile">
      <img src={src} alt={alt} />
    </div>
  );
};

export default ProfileImage;
