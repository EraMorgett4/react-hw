import PropTypes from 'prop-types';

const ProfileName = ({ name, isActive }) => {
  return <span className="profile__name">{isActive ? name : '프로필 추가'}</span>;
};

ProfileName.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ProfileName;
