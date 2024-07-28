import React, { useState, useEffect } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom";
import Profile from "./components/profile";
import pb from "/src/api/pocketbase";
import { getStorage, setStorage } from "kind-tiger";

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    const id = "sample1";
    const pw = "sample1!";

    try {
      const authResponse = await pb.collection("users").authWithPassword(id, pw);
      console.log(authResponse);

      const { record, token } = authResponse;
      setStorage("pocketbase_auth", { user: record, token });
      setIsLoggedIn(true);
      console.log("로그인 완료!");
    } catch (error) {
      console.error("인증된 사용자가 아닙니다.", error);
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        await handleLogin();

        const users = await pb.collection("users").getFullList();
        const authData = await getStorage("pocketbase_auth");

        if (authData) {
          const authUsername = authData.user.username;
          const profileData = [];

          users.forEach((item) => {
            if (item.username === authUsername) {
              let isAddable = false;
              for (let i = 0; i < 4; i++) {
                const isActive = item[`isActive${i + 1}`];
                const isLocked = item[`isLocked${i + 1}`];

                if (isActive) {
                  profileData.push({
                    user: item,
                    profileIndex: i + 1,
                    isLocked,
                  });
                }

                if (!isActive && !isAddable) {
                  isAddable = true;
                  profileData.push({
                    user: item,
                    profileIndex: i + 1,
                    isLocked: false,
                    addable: true,
                  });
                }
              }
            }
          });

          setProfiles(profileData);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="profile__wrap">
      <div className="profile__wrap__container">
        <div className="head__form">
          <h1>프로필 선택</h1>
          <p className="desc">시청할 프로필을 선택해주세요.</p>
        </div>
        <div className="profile__form">
          {profiles.map((profile, index) => (
            <Profile key={index} user={profile.user} profileIndex={profile.profileIndex} isLocked={profile.isLocked} addable={profile.addable} />
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
