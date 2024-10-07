import { getGameAssets } from '../init/assets.js';
import { getStage, setStage } from '../models/stage.model.js';

export const gameStart = (uuid, payload) => {
  const { stages } = getGameAssets();

  clearStage(uuid);
  //stages 배열에서 0번째 = 첫번째 스테이지
  setStage(uuid, stages.data[0].id, payload.timestamp);
  console.log('Stage: ', getStage(uuid));

  return { status: 'success' };
};

export const gameEnd = (uuid, payload) => {
  // 클라이어트는 게임 종료 시 타임스탬프와 총 점수
  const { timestamp: gameEndTime, score } = payload;
  const stages = getStage(uuid);
  if (!stages.length) {
    return { status: 'fail', message: 'Nostages found for user' };
  }
  let totalScore = 0;
  stages.forEach((stage, index) => {
    let stageEndTime;
    if (index === stages.length - 1) {
      stageEndTime = gameEndTime;
    } else {
      stageEndTime = stages[index + 1].timestamp;
    }
    const stageDuration = (stageEndTime - stage.timestamp) / 1000;
    totalScore += stageDuration; //1초당 1점
    // 그 해당내용은 여러분께 과제로 드리겠습니다^^
  });
  // 점수와 타임스탬프 검증
  // 오차범위 5
  if (Math.abs(score - totalScore) > 5) {
    return { stages: 'fail', message: 'Score verification failed' };
  }

  //DB에 저장한다고 가정을 한다면
  // 저장
  //setResult(userId, score, timestamp)
  return { status: 'success', message: 'Game ended', score };
};
