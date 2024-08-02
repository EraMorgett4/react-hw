import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Profile from '../components/profile';
import { getStorage } from 'kind-tiger';

const ProfileSelect = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const authData = await getStorage('pocketbase_auth');
        if (!authData) {
          console.error('로그인 정보가 없습니다.');
          return;
        }

        const user = authData.user;
        const profileData = [];

        let isAddable = false;
        for (let i = 0; i < 4; i++) {
          const isActive = user[`isActive${i + 1}`] ?? false;
          const isLocked = user[`isLocked${i + 1}`] ?? false;

          profileData.push({
            user,
            profileIndex: i + 1,
            isLocked,
            isActive,
            addable: !isActive && !isAddable,
          });

          if (!isActive && !isAddable) {
            isAddable = true; // 추가할 수 있는 상태를 한번만 설정
          }
        }

        setProfiles(profileData);
      } catch (error) {
        console.error('프로필 데이터를 로드하는 중 오류가 발생했습니다:', error);
      }
    };

    loadProfiles();
  }, []);

  return (
    <div className="profile__wrap">
      <div className="profile__wrap__container">
        <div className="profile__header">
          <h1 className="profile__title">프로필 선택</h1>
          <p className="profile__description">시청할 프로필을 선택해주세요.</p>
        </div>
        <ul className="profile__list">
          {profiles.map((profile, index) => (
            <Profile
              key={index}
              user={profile.user}
              profileIndex={profile.profileIndex}
              isLocked={profile.isLocked}
              isActive={profile.isActive}
              addable={profile.addable}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileSelect.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.object.isRequired,
      profileIndex: PropTypes.number.isRequired,
      isLocked: PropTypes.bool.isRequired,
      isActive: PropTypes.bool.isRequired,
      addable: PropTypes.bool,
    })
  ),
};

export default ProfileSelect;
