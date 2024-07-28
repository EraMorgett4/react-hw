import React from "https://esm.sh/react";
import ProfileImage from "./profileImage";
import ProfileName from "./profileName";
import LockIcon from "./lockIcon";
import AddIcon from "./addIcon";
import getPbImageURL from "../api/getPbImageURL";

const Profile = ({ user, profileIndex, isLocked, addable }) => {
  return (
    <li className="profile__form--item profileItem" data-locked={isLocked} data-profile-index={profileIndex}>
      <a className="item__form" href={addable ? "/src/pages/profileCreate/index.html" : "/"} role="button">
        {addable ? (
          //
          <ProfileImage src="img/gray.png" alt="프로필 추가" />
        ) : (
          //
          <ProfileImage src={getPbImageURL(user, `profileImg${profileIndex}`)} alt={`${user.username}의 프로필`} />
        )}
        {addable ? <AddIcon /> : <LockIcon isLocked={isLocked} />}
      </a>
      <ProfileName name={addable ? "프로필 추가" : user[`profileName${profileIndex}`]} />
    </li>
  );
};

export default Profile;
