# [2주차 주말 과제] 컴포넌트 속성 검사 및 테스트

## 과제 주제 및 내용

바닐라 프로젝트 UI 결과물 중 일부를 선별한 후, 리액트를 사용해 컴포넌트로 구현합니다.
컴포넌트 구현 과정에서 속성 검사 및 테스트 코드를 작성하는 것이 과제입니다.

- 과제 내용

  - 아토믹(atomic) 또는 몰레큘(molecule) 컴포넌트를 작성합니다.
  - 작성된 컴포넌트의 속성(props) 검사 with prop-types
  - Vitest를 사용해 컴포넌트 테스트 코드 작성

## 파일 경로 구성

![파일경로](/component-test/public/img/forMD/week2/FileRoute.png)

## 아토믹 컴포넌트 작성

- 1주차 과제에 사용한 아토믹 컴포넌트를 사용하였습니다.

- `degit EraMorgett4/react-hw/02-atomic-component .` 로 지난 과제에서 구성한 환경을 사용하였습니다.

- `pnpm i prop-types -D`로 prop-types 설치하였습니다.

---

### **JSX 코드**

#### 1. 잠금아이콘 컴포넌트(atom)

<div align = "center">

![LockIcon.jsx](/component-test/public/img/forMD/week2/lockIconCode.png)

</div>

- 잠금아이콘의 경우, 단순 렌더링을 위해 분리하였습니다. 해당부분의 조건처리는 `Profile.jsx`에서 진행합니다.

<br/>

#### 2. 추가아이콘 컴포넌트(atom)

<div align = "center">

![AddIcon.jsx](/component-test/public/img/forMD/week2/AddIconCode.png)

</div>

- 사용자의 프로필이 4개 미만일 경우, 프로필추가에 사용하는 아이콘이며. 단순 렌더링을 위해 분리하였습니다. 해당부분의 조건처리는 `Profile.jsx`에서 진행합니다.

<br/>

#### 3. 프로필 이미지 컴포넌트(atom)

<div align = "center">

![ProfileImage.jsx](/component-test/public/img/forMD/week2/ProfileImageCode.png)

</div>

- 단순 렌더링을 위해 분리한 프로필이미지 컴포넌트입니다. 해당부분의 조건처리는 `Profile.jsx`에서 진행합니다.

#### 4. 프로필 이름 컴포넌트(atom)

<div align = "center">

![프로필이름 컴포넌트](/component-test/public/img/forMD/week2/ProfileNameCode.png)

</div>

- 단순 렌더링을 위해 분리한 프로필 이름 컴포넌트입니다. 해당부분의 조건처리는 `Profile.jsx`에서 진행합니다.

#### 5. 프로필 컴포넌트(molecule)

<div align = "center">

![프로필 컴포넌트](/component-test/public/img/forMD/week2/ProfileCode.png)

</div>

- `Profile`은 4개의 부수함수와, 순수함수로 이루어져있습니다.

  ```jsx
  return (
    <li className={getClassNames()} data-locked={isLocked} data-profile-index={profileIndex}>
      <div className="profile__image-wrapper">
        {getProfileImage()}
        {renderIcons()}
      </div>
      <ProfileName name={getProfileName()} isActive={isActive} />
    </li>
  );
  ```

  4개의 부수함수는, 렌더렝 부분에 필요한 각각 부분들이 부수함수로 구현되었습니다. 단순한 삼항연산자이지만 코드의 가독성을 위해 분리하였습니다.

  - `getProfileImage()` : 렌더링할 이미지 결정, getPbImageURL로 pb에 저장된 이미지URL를 불러오거나, 회색배경을 세팅한다.
  - `renderIcons()` : 렌더링할 아이콘 결정(잠금/추가)
  - `getClassNames()` : `<li>`요소에 들어갈 `className`을 결정하는 함수, 잠금상태일땐 `profile__item--locked`라는 클래스명 추가됨.
  - `getProfileName()` : 프로필 이름을 결정하는 함수(추가/프로필 명)

- prop-types를 이용하여 Profile에 필요한 각 속성들을 검사합니다.

#### 6. 프로필 선택 페이지(organism)

<div align = "center">

![프로필 선택 페이지1](/component-test/public/img/forMD/week2/ProfileSelectCode1.png)
![프로필 선택 페이지2](/component-test/public/img/forMD/week2/ProfileSelectCode2.png)

</div>

- 프로필 선택페이지입니다. localStorage에 저장된 `pocketbase_auth` 객체의 내용을 토대로 프로필을 렌더링합니다. 프로필 개수가 4개 미만일 경우, 프로필 추가 부분을 따로 렌더링하도록 합니다.

- [`useState`](https://ko.react.dev/reference/react/useState), [`useEffect`](https://ko.react.dev/reference/react/useEffect) 훅을 사용하여, 프로필 이미지를 비동기로 가져오고, 상태를 관리하였습니다.

- `useState` 훅은 `profiles`라는 상태를 관리하여, 로드된 사용자 프로필 리스트를 저장하는데에 사용됩니다.

- 기존의 `useEffect` 훅은 배열 안의 요소의 변화를 감지하여 매번 함수를 실행하지만, 여기에선 `loadProfiles()`를 마운트 될때 한번만 실행하여 프로필 데이터를 로드합니다.

- `kind-tiger`의 `getStorage`를 사용하여 `localStorage`에 저장된 `pocketbase_auth` 객체를 불러옵니다. 해당 객체의 `user`데이터를 사용하여 프로필정보를 생성합니다.

  ```json
  user
  :
  {collectionId: "_pb_users_auth_", collectionName: "users", created: "2024-07-17 06:01:11.535Z",…}
  ```

  해당 코드에서 사용되는 데이터는 isActive, isLocked, profileImg, profileNmae입니다.

- `setProfiles(profileData)`로 최종 생성된 `profileData` 배열을 `profiles` 상태로 설정합니다.

- `profiles`의 상태를 반복하여 `Profile`컴포넌트를 렌더링합니다.

  ```jsx
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
  ```

- `prop-types`를 사용하여 `ProfileSelect` 컴포넌트가 받는 `profiles prop`에 대해 타입검사합니다.

```jsx
ProfileSelect.propTypes = {
  profiles: PropTypes.arrayOf(
    // 각 프로필은 아래 정보를 배열로 가져야함
    PropTypes.shape({
      // 배열의 각 요소가 객체이어야하므로, shape를 사용함.
      user: PropTypes.object.isRequired,
      profileIndex: PropTypes.number.isRequired,
      isLocked: PropTypes.bool.isRequired,
      isActive: PropTypes.bool.isRequired,
      addable: PropTypes.bool,
    })
  ),
};
```

<br/>

#### 7. main.jsx

<div align="center">

![main](/component-test/public/img/forMD/week2/mainCode1.png)
![main](/component-test/public/img/forMD/week2/mainCode2.png)

</div>

- 로그인을 처리하는 main 함수부분입니다.

- 처음 마운트 될때 `useEffect`에서 로그인 상태를 확인합니다. `localStorage`에 `pocketbase_auth`가 저장되어있는지 확인하고, 없다면 `handleLogin()`을 실행하여 하드코딩된 id, pw를 pocketbase에 통신하여 인증합니다. 인증 후 받아들인 `authResponse`를 구조분해하여 `localStorage`에 `pocketbase_auth`로 저장합니다.

- 하드코딩된 id pw로도 통신할 수 없는 경우, isLoggedIn에 따라 화면에 표시되는 UI를 달리합니다.

- 이외엔 수업 내용대로 StrictMode로 실행한 React 컴포넌트를 render합니다.

```jsx
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
```

## 느낀 점

- &emsp;제일 많이 고민했던 부분이, 각 atom 컴포넌트에서 조건처리하는 로직을 넣을 것인지, 아니면 molecule에서 이러한 처리를 하는것이 옳은 것인지였습니다. 하지만 atom 컴포넌트는 최대한 단순할 수록 좋다고 생각하여, 이를 관리하는 `profile.jsx`에서 처리하도록 하였습니다. 이는 `profile 컴포넌트`가 비대해질 수 있다는 단점을 갖고있지만, 재활용성만 따진다면 atom컴포넌트가 단순할 수록 재활용에 용이할 것이란 생각에 이와 같은 결정을 내렸습니다.

- `useState`, `useEffect`를 사용할 수록 아직은 헷갈리지만 그 활용도가 눈에 익기 시작했다는 점이 이번 과제에서 얻은 보람된 점 중 하나입니다.

- 순수함수/부수함수 구분하는 것은 일전에 수업중에 드렸던 질문 및 10기생분들의 질답을 통해 거의 이해한 것 같습니다.

- vitest는 환경만 구축하였습니다.
