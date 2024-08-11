# [3주차 주말 과제] 틱택토 게임 또는 노트 앱 만들기

## 과제 주제

정규 과정 수업 시간에 함께 학습한 2가지 앱 중 하나를 선택해 만드는 것이 주말 과제입니다.

- Note App
- Tic Tac Toe Game

### 수행 조건

과제는 아래 조건을 충족해야 합니다.

- 과정 기록 (꼼꼼히 커밋 단계 별로 기록)
- 과정 후기 (과정을 통해 깨달은 것, 개선 점 등 기록)

## 과제 수행 내용

저는 Tic Tac Toe에서 확장한 오목게임을 작성하였습니다.

### 파일 경로 구성

![파일경로](/3rd-week/public/img/forMD/week3/FileRoute.png)

### 컴포넌트 구성

```
Game (최상위 컴포넌트)
│
├── Board (게임 보드 전체를 관리하는 컴포넌트)
│   ├── Squares (보드의 각 행 또는 전체 보드를 관리하는 컴포넌트)
│   │   └── Square (각 개별 칸을 관리하는 컴포넌트)
│   └── Status (게임 상태를 표시하는 컴포넌트: 승자, 다음 플레이어 등)
│
└── History (게임의 움직임 기록을 관리하는 컴포넌트)
```

### 각 컴포넌트의 역할

Game: 게임의 전체적인 상태를 관리합니다. Board와 History 컴포넌트를 포함하며, 이 컴포넌트들에 필요한 데이터를 전달하고, 사용자 인터페이스의 주요 요소를 렌더링합니다.

Board: 게임 보드를 렌더링하고, 보드의 상태를 업데이트합니다. 내부적으로 Squares와 Status 컴포넌트를 포함합니다.

Squares: 게임 보드의 각 행 또는 전체 보드를 렌더링합니다. 내부적으로 여러 개의 Square 컴포넌트를 포함하여, 보드의 각 칸을 구성합니다.

Square: 보드의 각 개별 칸을 나타내며, 사용자 클릭 이벤트를 처리합니다.

Status: 승자가 누구인지, 다음 플레이어는 누구인지 등 게임의 현재 상태를 표시합니다.

History: 사용자가 이전 기보로 돌아갈 수 있는 기능을 제공하며, 게임의 전체 이동 기록을 관리하고 렌더링합니다.

---

### **코드**

#### 1. main.jsx

- 수업 때 진행한 main.jsx와 동일하므로 생략합니다.

#### 2. Game.jsx

<div align = "center">

![import Game](/3rd-week/public/img/forMD/week3/GameImport.png)

</div>

- Game.jsx의 import문입니다. 상태관리를 위한 `useState`, `useEffect`, 그리고 스크롤 컨트롤을 위한 `useRef`를 import하였습니다.

- 스타일링에 필요한 scss파일을 모듈로 불러옵니다.

- 필요한 하위컴포넌트(`Board`, `History`를 불러옵니다.

- 별도로 분리한 상수 `PLAYER`와 게임에 필요한 로직 `gameLogic`의 `handlePlay`, `calculateWinner`을 불러옵니다.

<div align = "center">

![alt text](/3rd-week/public/img/forMD/week3/GameFunction1.png)

![alt text](/3rd-week/public/img/forMD/week3/GameFunction2.png)

</div>

- Game 컴포넌트입니다.

- **상태 관리**

  - 보드의 크기를 결정할 `boardSize` 변수입니다. 숫자크기를 조정할 수 있습니다.
  - 기보의 로그를 나타낼 `history` 상태입니다.
  - 현재의 기보를 나타낼 `currentMove` 상태입니다.
  - 다음 플레이어가 누구인지 나타내는 `isNext` 상태로, Boolean으로 설정되어있습니다.
  - 게임의 승자를 나타내는 `winner`, 무승부인지 나타내는 Boolean 상태 `isDraw`입니다.

- **`useRef`** : 렌더링에 필요하지 않은 값을 참조할 수 있는 React Hook.

  - useRef를 사용하여 렌더링에는 사용되지 않지만 보관할만한 변수를 저장할 수 있다.
  - 특정 DOM 요소에 직접 접근하고 조작할 수 있다.
  - 이를 이용하여 `historyEndRef`로 게임 기보의 스크롤 위치를 관리하기 위한 참조값을 설정하였습니다. `history` 상태가 업데이트 될 때마다 스크롤이 맨 아래로 이동하도록 설정하는데 사용합니다.

- **`useEffect`**

  - `history` 상태가 변경될 때바다 아래로 이동시키는 로직이 구현되어있습니다.

- **핸들러 함수**

  - `onSquareClick` : 사용자가 게임 보드의 칸을 클릭했을 때 호출되는 함수로, 외부로 분리한 `handlePlay`를 불러와 사용합니다.
  - `jumpTo` : 사용자가 히스토리 클릭 시 이동할 부분을 나타내는 함수입니다. 이동할 인덱스를 업데이트하고, `isNext`, `winner`, `isDraw` 상태를 갱신합니다.

- **JSX**

  - `Board` 컴포넌트와 `History`컴포넌트를 렌더링합니다.
    - 현재 보드상태, 승자정보, 다음 플레이어 정보 등을 props로 전달하여 렌더링합니다.
    - 이동기록, `jumpTo`, 다음 플레이어 정보를 props로 전달합니다.
    - `S` 객체를 통해 스타일을 적용합니다.

#### 3. constant.js, gameLogic.js

`export const PLAYER = { ONE: '🍟', TWO: '🤡' };`

<div align = "center">

![calculateWinner](/3rd-week/public/img/forMD/week3/calculateWinner.png)

</div>

- 승리조건을 확인하는 함수 `calculateWinner`입니다.

- 현재 게임보드상태를 나타내는 배열 `squares`로 부터, 2중 `for`문을 통하여 오목이 완성되었는지 확인합니다.

<div align = "center">

![handlePlay](/3rd-week/public/img/forMD/week3/handlePlay.png)

</div>

-

---

### 배운 점

#### 1. 스크롤 바 조정을 위해 사용한 useRef에 관한 내용입니다.

스크롤바 조정을 위한 부분은 ChatGPT의 도움을 받았습니다.

`useRef` vs `useState`

- **`useRef`**:

  - `useRef`는 DOM 요소에 접근하거나, 컴포넌트가 리렌더링될 때도 변하지 않는 값을 저장하는 데 사용됩니다.
  - `useRef`로 생성된 객체는 `.current` 속성을 가지고 있으며, 이 속성을 통해 직접 DOM 요소에 접근하거나 값을 관리할 수 있습니다.
  - `useRef`의 값이 변경되어도 컴포넌트는 리렌더링되지 않습니다.
  - 일반적으로 포커스를 관리하거나, 특정 DOM 요소의 스크롤 위치를 조작하거나, 이전 상태를 추적하는 데 사용됩니다.

- **`useState`**:
  - `useState`는 컴포넌트의 상태를 관리하는 데 사용되며, 상태가 변경될 때마다 컴포넌트가 리렌더링됩니다.
  - 상태의 변경이 필요하고, 그 변경에 따라 UI가 다시 그려져야 할 때 사용합니다.

#### 2. CSS/SCSS 파일을 모듈로 불러오기

- 모듈로 불러오게 되면, 변수 및 스타일 클래스를 모듈 범위 내에서만 사용할 수 있게 되며, 전역으로 선언된 것들과의 혼란을 줄일 수 있음.

- 모듈화를 통하여 재사용성 및 유지보수성을 증가시킬 수 있음.

- 필요한 부분만 불러옴으로써, 브라우저가 더 적은 양의 CSS를 로드하게 되어 성능을 향상시킬 수 있음.

- 의존성 관리 : SCSS파일 간의 의존성을 명확히 할 수 있음.

- 다만 utils에 선언된 변수들을 사용하려면 해당 scss파일에 별도로 import를 해야함.

`S` 객체를 통해 스타일을 적용하는 부분은 React에서 **CSS Modules**을 사용하는 방식입니다. CSS Modules는 컴포넌트별로 스타일을 모듈화하여 전역 스타일 충돌을 방지하고, 각 컴포넌트에 고유한 클래스 이름을 생성해주는 기능을 제공합니다.

1. **모듈화된 스타일**:

   - CSS Modules는 각 컴포넌트에 대해 별도의 스타일을 정의하고, 이 스타일을 컴포넌트에서만 사용할 수 있도록 모듈화합니다.

2. **클래스 이름 고유화**:

   - CSS Modules는 클래스 이름에 고유한 해시를 추가하여, 동일한 클래스 이름이 다른 컴포넌트에서 충돌하지 않도록 합니다.
   - 예를 들어, `Game.module.scss` 파일에서 `.game` 클래스를 정의하면, 실제로는 `Game_game__3jYh4`와 같은 고유한 이름으로 변환됩니다.

3. **스타일 적용**:
   - 스타일 파일을 import하면 해당 스타일들이 객체 형태로 제공됩니다. 이 객체를 통해 스타일을 적용할 수 있습니다.
   - 예를 들어, `Game.module.scss` 파일에서 정의한 `.game` 클래스를 적용하려면, `S.game`과 같은 형태로 사용합니다.
