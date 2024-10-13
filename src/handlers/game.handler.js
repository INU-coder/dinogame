import { getStage, clearStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';
import calculateTotalScore from '../utils/calculateTotalScore.js';
import { getUserItems, initializeItems } from '../models/item.model.js';

export const gameStart = (uuid, payload) => {
  const { stages } = getGameAssets();

  clearStage(uuid);
  initializeItems(uuid);
  //stages 배열에서 0번째 = 첫번째 스테이지
  setStage(uuid, stages.data[0].id, payload.timestamp);
  console.log('Stage: ', getStage(uuid));

  return { status: 'success', handler: 2 };
};

export const gameEnd = (uuid, payload) => {
  // 클라이어트는 게임 종료 시 타임스탬프와 총 점수
  const { timestamp: gameEndTime, score } = payload;
  const stages = getStage(uuid);
  const userItems = getUserItems(uuid);
  if (!stages.length) {
    return { status: 'fail', message: 'Nostages found for user' };
  }
  // 총 점수 계산
  const totalScore = calculateTotalScore(stages, gameEndTime, false, userItems);
  // 점수와 타임스탬프 검증 (예: 클라이언트가 보낸 총점과 계산된 총점 비교)
  if (Math.abs(totalScore - score) > 1) {
    return { status: 'fail', message: 'Score verification failed' };
  }
  console.log(`totalScore: ${totalScore}`);
  console.log(`score: ${score}`);
  // 모든 검증이 통과된 후, 클라이언트에서 제공한 점수 저장하는 로직
  // saveGameResult(userId, clientScore, gameEndTime);

  // 검증이 통과되면 게임 종료 처리
  return {
    status: 'success',
    message: 'Game ended successfully',
    score,
    handler: 3,
  };
};
//   stages.forEach((stage, index) => {
//     let stageEndTime;
//     if (index === stages.length - 1) {
//       stageEndTime = gameEndTime;
//     } else {
//       stageEndTime = stages[index + 1].timestamp;
//     }
//     const stageDuration = (stageEndTime - stage.timestamp) / 1000;
//     totalScore += stageDuration; //1초당 1점
//     // 그 해당내용은 여러분께 과제로 드리겠습니다^^
//   });
//   // 점수와 타임스탬프 검증
//   // 오차범위 5
//   if (Math.abs(score - totalScore) > 5) {
//     return { stages: 'fail', message: 'Score verification failed' };
//   }

//   //DB에 저장한다고 가정을 한다면
//   // 저장
//   //setResult(userId, score, timestamp)
//   return { status: 'success', message: 'Game ended', score };
// };
