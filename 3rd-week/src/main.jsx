import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Game from './components/Game/Game';

const container = document.getElementById('react-app');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Game />
    </StrictMode>
  );
} else {
  console.warn('문서에 "#react-app" 요소가 존재하지 않습니다.');
}
