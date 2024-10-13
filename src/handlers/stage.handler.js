// "유저는 스테이지를 하나씩 올라갈 수 있다."
// "유저는 일정 점수가 되면 다음 스테이지로 이동한다."

import { getGameAssets } from '../init/assets.js';
import { getStage, setStage } from '../models/stage.model.js';
import calculateTotalScore from '../utils/calculateTotalScore.js';
import { getUserItems } from '../models/item.model.js';

export const moveStageHandler = (userId, payload) => {
  // currentStage, targetStage 요 두가지 값을 클라이언트는 서버에게 보내주게 됩니다.
  // 고렇다면 이거에 대한 검증절차가 필요하겠죠
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  // 오름차순 -> 가장 큰 스테이지 ID를 확인 <- 유저의 현재 스테이지
  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];

  if (currentStage.Id !== payload.currentStage) {
    return { status: 'fail', message: 'Current Stage mismatch' };
  }

  const { stages } = getGameAssets();

  //현재 스테이지의 정보를 stageTable에서 가져옴
  const currentStageInfo = stages.data.find(
    (stage) => stage.id === payload.currentStage
  );
  if (!currentStageInfo) {
    return { status: 'fail', message: 'Current stage info not found' };
  }
  //목표 스테이지의 정보를 stageTable에서 가져옴
  const targetStageInfo = stages.data.find(
    (stage) => stage.id === payload.targetStage
  );
  if (!targetStageInfo) {
    return { status: 'fail', message: 'Target stage info not found' };
  }
  //점수검증로직
  const serverTime = Date.now();
  const userItems = getUserItems(userId);
  const totalScore = calculateTotalScore(
    currentStages,
    serverTime,
    true,
    userItems
  );
  // const elapsedTime = (serverTime - currentStage.timestamp) / 1000;
  if (targetStageInfo.score > totalScore) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }
  // 유저의 다음 스테이지 정보 업데이트 + 현재 시간
  setStage(userId, payload.targetStage, serverTime);
  return { status: 'success', handler: 11 };
};

//   //1스테이지 -> 2스테이지로 넘어가는 가정
//   // 5=> 임의로 정한 오차범위
//   if (elapsedTime < 100 || elapsedTime > 105) {
//     return { status: "fail", message: "Invalid elapsed time" };
//   }
//   //현제스테이지가 넘어갈때 ex 100점을 기준으로 새로운 스테이지를 넘어가야하는데 그건 과제로 드립니다^^
//   // targetStage 대한 검증 <- 게임에셋에 존재하는가?
//   if (!stages.data.some((stage) => stage.id === payload.targetStage)) {
//     return { status: "fail", message: "Target stage not found" };
//   }

//   //현제 점수가 게임에셋에 저장되어있는 점수보다 높아야되겠죠?
//   //그래야지 이사람은 다음스테이지로 넘겨줄수 있는데 그런 검증절차는 시간관계상 과제로 드립니다^^
//   setStage(userId, payload.targetStage, serverTime);
//   return { status: "success" };
// };
