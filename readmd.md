# 웹소켓 게임 만들기

---

강의를 최대한 따라가면서 해보았습니다만... 터미널에선 말짱한척하면서 웹페이지만들어가면 에러가뜹니다
게임자체는 동작하지만
웹페이지에서 console.log에러가 게임중지상태에서도 올라오는걸보니... 뭐가문제인지 모르겠습니다.
에러자체는id를 가르키고있으니 고쳐보도록하겠습니다.

├── public // 게임 데이터
│   ├── item.json
│   ├── item_unlock.json
│   └── stage.json
├── package-lock.json
├── package.json
├── public // 프론트엔드
├── readme.md
└── src // 서버 코드
├── app.js
├── constants.js
├── handlers // 비즈니스 로직
│   ├── game.handler.js
│   ├── handlerMapping.js
│   ├── helper.js
│   ├── regiser.handler.js
│   └── stage.handler.js
├── init // 필수 데이터, 기능 로드 (load)
│   ├── assets.js
│   └── socket.js
└── models // 세션 모델 관리
├── stage.model.js
├── item.model.js
└── user.model.js
