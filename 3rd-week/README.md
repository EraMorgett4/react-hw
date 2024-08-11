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
![결과](/3rd-week/public/img/forMD/week3/result.png)

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

- 필요한 하위컴포넌트(`Board`, `History`, `Status`)를 불러옵니다.

- 별도로 분리한 상수 `PLAYER`와 게임에 필요한 로직 `gameLogic`의 `handlePlay`, `calculateWinner`을 불러옵니다.

<div align = "center">

![alt text](/3rd-week/public/img/forMD/week3/GameFunction1.png)

![alt text](/3rd-week/public/img/forMD/week3/GameFunction2.png)

</div>

- Game 컴포넌트입니다. State Lifting이 적용되어있어 Game컴포넌트에서 ㅓ여러 상태를 관리합니다.

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

  - `onSquareClick` : 사용자가 게임 보드의 칸을 클릭했을 때 호출되는 함수로, 외부로 분리한 `handlePlay`를 불러와 사용합니다. 마지막으로 놓은 돌의 위치를 `row` `col` 값으로 전달합니다.
  - `jumpTo` : 사용자가 히스토리 클릭 시 이동할 부분을 나타내는 함수입니다. 이동할 인덱스를 업데이트하고, `isNext`, `winner`, `isDraw` 상태를 갱신합니다.

- **JSX**

  - `Status`컴포넌트, `Board` 컴포넌트와 `History`컴포넌트를 렌더링합니다.
    - 현재 보드상태, 승자정보, 다음 플레이어 정보 등을 props로 전달하여 렌더링합니다.
    - 이동기록, `jumpTo`, 다음 플레이어 정보를 props로 전달합니다.
    - `S` 객체를 통해 스타일을 적용합니다.

#### 3. constant.js, gameLogic.js

`export const PLAYER = { ONE: '🍟', TWO: '🤡' };`

<div align = "center">

![calculateWinner](/3rd-week/public/img/forMD/week3/calculateWinner.png)

</div>

- 승리조건을 확인하는 함수 `calculateWinner`입니다.

- 현재 게임보드상태를 나타내는 1차원 배열 `squares`와, 보드의 크기를 나타내는 `boardSize`, 그리고 마지막 돌이 놓인 위치를 전달받아 승리조건이 갖춰졌는지 계산합니다.

- 2차원 배열의 좌표를 1차원 좌표로 변환한 것이 `lastMoveIndex`이고, 해당 squares 배열에서의 플레이어의 위치를 `player`로 나타내었습니다.

- 해당 좌표를 기준으로 4방향에 대해(가로, 세로, 좌대각, 우대각) 오목을 이루고 있는지 확인합니다.

  - `for`문을 돌면서 4방향에 대해서, `countInRow` 함수를 통해 주어진 방향에 대해 연속된 돌의 갯수를 셉니다. 오목을 이룬다면 현재 플레이어의 좌표값을 반환합니다.

<div align = "center">

![handlePlay](/3rd-week/public/img/forMD/week3/handlePlay.png)

</div>

- 임의의 보드 칸 클릭시 불러오는 함수로, 게임의 상태를 업데이트 하고 승리여부를 판단하는 함수입니다.
- 클릭한 위치에 돌을 놓고, 그에 따른 상태변화를 처리하고, 승리/무승부를 확인합니다.

- 초기 if를 통하여 이미 승자가 결정된 경우/이미 채워진 칸일 경우 함수를 바로 종료합니다.

- 현재 보드의 상태를 복사하여 새로운 배열인 `nextSquares`를 만들고, 클릭한 위치에 현재 차례인 플레이어의 돌을 놓습니다.

- `calculateWinner`를 실행한 결과를 담은 `gameWinner`를 통해, 승자의 여부에 따라 상태를 업데이트합니다.

- 무승부를 확인하는 로직으로, 모든 칸이 채워져있는데 승자는 없는 경우, 무승부로 처리합니다.

  ```js
    if (nextSquares.every((square) => square !== null)) {
    setIsDraw(true);
    setWinner(null);
  ```

- 승리/무승부를 확인했다면, 다음 플레이어에게 차례를 넘기도록 상태를 업데이트합니다.
  ```js
  setIsNext(!isNext);
  setHistory([...history.slice(0, currentMove + 1), nextSquares]);
  setCurrentMove(currentMove + 1);
  setLastMove({ row, col }); // 마지막으로 놓은 돌의 좌표 업데이트
  ```

#### 4. Board.jsx

<div align = "center">

![Boardt](/3rd-week/public/img/forMD/week3/Board.png)

</div>

- `Board` 컴포넌트입니다. `Game`컴포넌트로부터 전달받은 `squares`, `onPlay`, `boardSize`를 통해 단순히 UI를 렌더링합니다.
- prop-types로 props의 타입을 검사합니다.

#### 5. Squares.jsx

<div align = "center">

![Squares](/3rd-week/public/img/forMD/week3/Squares.png)

</div>

- `Squares` 컴포넌트는 게임 보드의 모든 칸을 렌더링합니다.

- `renderRow` 함수를 통해 특정 rowIndex를 기준으로, 그 행의 각 칸을 렌더링 합니다. `Square`컴포넌트에 `value`와 `onSquareClick`을 전달합니다.

- `renderBoard` 함수를 통해 전체 보드를 렌더링합니다. 각 `key`에 대해 `board__row`라는 스타일을 적용합니다.

#### 6. Square.jsx

<div align = "center">

![Square](/3rd-week/public/img/forMD/week3/Square.png)

</div>

- `Square` 컴포넌트는 게임보드의 각 칸을 렌더링합니다. 상위 컴포넌트로부터 전달받은 `value`와 `onSquareClick`을 통해 칸에 삽입할 플레이어돌을 결정합니다. 클릭된 칸의 인덱스를 상위 컴포넌트로 전달할 수 있습니다.

#### 7. Status.jsx

<div align = "center">

![Status](/3rd-week/public/img/forMD/week3/Status.png)

</div>

- `Status`컴포넌트는 현재 게임의 상태를 화면에 표시하는 역할을 합니다. `winner`, `isDraw`, `nextPlayer`를 전달받아 렌더링합니다.

- `winner`가 존재하면 승리 메시지를, `isDraw`가 `true`이면 무승부 메시지를, 그 외에는 현재 차례 메시지를 반환합니다.

#### 8. History.jsx

<div align = "center">

![History](/3rd-week/public/img/forMD/week3/History.png)

</div>

- `getDescription`을 통해 각 이동에 대한 설명을 반환합니다.

- `renderHistoryItems`를 통해 이동 기록을 렌더링합니다. `history`배열을 순회하면서, 각 이동을 `li`와 `button`요소로 렌더링합니다.

- `button`요소 내에 `className`에, 기본적인 버튼의 스타일링을 적용하는 `S.history__button`과, 클릭 시 적용되는 스타일링인 `S.active`로 구성되어있습니다.

---

### 배운 점 및 느낀점

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

   - 스타일 파일을 import하면 해당 스타일들이 **객체** 형태로 제공됩니다. 이 객체를 통해 스타일을 적용할 수 있습니다.
   - 예를 들어, `Game.module.scss` 파일에서 정의한 `.game` 클래스를 적용하려면, `S.game`과 같은 형태로 사용합니다.

#### 3. lifting state up

컴포넌트 간의 상태 관리를 위해 가장 일반적으로 사용하는 방법은 "상태 끌어올리기(lifting state up)"입니다. 이 방법에서는 상태를 자식 컴포넌트가 아닌 공통 부모 컴포넌트에 위치시킵니다.

1. **상태 끌어올리기**: 자식 컴포넌트에서 상태를 제거하고, 부모 컴포넌트로 상태를 이동시켜 상태를 관리합니다.

2. **Props를 통한 상태 전달**: 부모 컴포넌트에서 상태와 상태를 변경할 수 있는 함수를 자식 컴포넌트에 `props`로 전달합니다.

3. **이벤트 핸들러 사용**: 자식 컴포넌트에서 이벤트가 발생할 때, 부모 컴포넌트에서 상태를 업데이트하는 방식을 사용합니다.

이 방법을 통해 컴포넌트 간의 상태 동기화 문제를 해결할 수 있으며, 보다 체계적인 상태 관리를 할 수 있습니다.

하지만 이번 컴포넌트 구성에 있어선 상태 끌어올리기를 충분히 활용하진 못했단 느낌이 들었습니다. 예제가 그렇다기보단, 제가 잘 활용을 못한 것 같습니다. 단순히 매개변수처럼 props를 전달한 것에 그친 것 같아 아쉽습니다.
