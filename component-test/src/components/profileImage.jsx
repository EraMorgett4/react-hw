import PropTypes from 'prop-types';

const ProfileImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="profile__image" />;
};

ProfileImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProfileImage;
