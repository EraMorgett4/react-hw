import PropTypes from 'prop-types';
import ProfileImage from './profileImage';
import ProfileName from './profileName';
import LockIcon from './lockIcon';
import AddIcon from './addIcon';
import getPbImageURL from '../api/getPbImageURL';

const Profile = ({ user, profileIndex, isLocked, addable = false, isActive }) => {
  // 부수함수: 렌더링할 이미지 결정
  const getProfileImage = () => {
    const imageURL = addable ? 'img/gray.png' : getPbImageURL(user, `profileImg${profileIndex}`);
    const altText = addable ? '프로필 추가' : `${user.username}의 프로필`;

    return <ProfileImage src={imageURL} alt={altText} />;
  };

  // 부수함수: 렌더링할 아이콘 결정
  const renderIcons = () => {
    if (addable) {
      return <AddIcon />;
    }
    if (isLocked) {
      return <LockIcon isLocked={isLocked} />;
    }
    return null;
  };

  // 부수함수: 렌더링할 클래스 이름 결정
  const getClassNames = () => {
    return `profile__item ${isLocked ? 'profile__item--locked' : ''}`;
  };

  // 부수함수: 프로필 이름 결정
  const getProfileName = () => {
    return addable ? '프로필 추가' : user[`profileName${profileIndex}`];
  };

  // 순수함수: 렌더링 부분
  return (
    <li className={getClassNames()} data-locked={isLocked} data-profile-index={profileIndex}>
      <div className="profile__image-wrapper">
        {getProfileImage()}
        {renderIcons()}
      </div>
      <ProfileName name={getProfileName()} isActive={isActive} />
    </li>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profileIndex: PropTypes.number.isRequired,
  isLocked: PropTypes.bool.isRequired,
  addable: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
};

export default Profile;
