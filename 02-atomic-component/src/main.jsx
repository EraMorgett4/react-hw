import React from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom";
import LockIcon from "./components/lockIcon";
import ProfileImage from "./components/profileImage";
import ProfileName from "./components/profileName";

// Mock data
const profiles = [
  {
    isLocked: true,
    imgSrc: "/img/EraMorgetta.png",
    alt: "EraMorgretta",
    name: "EraMorgretta",
  },
  {
    isLocked: false,
    imgSrc: "/img/zelda.png",
    alt: "Zelda",
    name: "Zelda",
  },
];

const App = () => {
  return (
    <div className="profile__wrap">
      <div className="profile__wrap__container">
        <div className="head__form">
          <h1>프로필 선택</h1>
          <p className="desc">시청할 프로필을 선택해주세요.</p>
        </div>
        <div className="profile__form">
          {profiles.map((profile, index) => (
            <div key={index} className="profile__form--item">
              <div className={`item__form ${profile.isLocked ? "locked" : ""}`}>
                <LockIcon isLocked={profile.isLocked} />
                <ProfileImage src={profile.imgSrc} alt={profile.alt} />
              </div>
              <ProfileName name={profile.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const container = document.getElementById("root");

if (container) {
  createRoot(container).render(<App />);
} else {
  console.warn('문서에 "#root" 요소가 존재하지 않습니다.');
}
