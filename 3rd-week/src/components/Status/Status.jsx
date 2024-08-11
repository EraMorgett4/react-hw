import { string, bool } from 'prop-types';
import S from './Status.module.scss';
import { PLAYER } from '../../constants/constants';

Status.propTypes = {
  winner: string,
  nextPlayer: string.isRequired,
  isDraw: bool.isRequired,
};

function Status({ winner, nextPlayer, isDraw }) {
  const status = winner ? `Winner: ${winner}` : isDraw ? '비겼습니다.' : `다음 차례: ${nextPlayer}`;

  return <header className={S.status}>{status}</header>;
}

export default Status;
