import { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProfileSelect from './pages/profileSelect';
import pb from './api/pocketbase';
import { getStorage, setStorage } from 'kind-tiger';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    const id = 'sample1';
    const pw = 'sample1!';

    try {
      const authResponse = await pb.collection('users').authWithPassword(id, pw);
      console.log(authResponse);

      const { record, token } = authResponse;
      await setStorage('pocketbase_auth', { user: record, token });
      setIsLoggedIn(true);
      console.log('로그인 완료!');
    } catch (error) {
      console.error('인증된 사용자가 아닙니다.', error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const authData = await getStorage('pocketbase_auth');
      if (authData) {
        setIsLoggedIn(true);
        console.log('로그인된 상태입니다.');
      } else {
        console.warn('로그인되지 않았습니다.');
        await handleLogin(); // 로그인 시도
      }
    };
    checkLoginStatus();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="profile__wrap">
        <div className="profile__wrap__container">
          <div className="head__form">
            <h1>로그인이 필요합니다.</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <ProfileSelect />
    </div>
  );
};

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Main />
    </StrictMode>
  );
} else {
  console.warn('문서에 "#root" 요소가 존재하지 않습니다.');
}
