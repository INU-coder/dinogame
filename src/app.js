import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';
import cors from 'cors';

const app = express();
const server = createServer(app);

const PORT = 3000;

// CORS 설정 추가
app.use(
  cors({
    origin: 'http://43.202.56.62:3000', // 허용할 도메인 설정
    methods: ['GET', 'POST'], // 허용할 메서드
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Socket.IO 초기화 (Socket.IO에서도 CORS 설정을 적용 가능)
initSocket(server); // 소켓 추가

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

server.listen(PORT, '0.0.0.0', async () => {
  console.log(PORT + ' 포트로 서버가 열렸습니다.');

  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log('Assets loaded Successfully');
  } catch (error) {
    console.error('Failed to load game assets: ', error);
  }
  // assets의 처리에서 파일 읽기를 실패할 경우
  // console.error()로 assets들을 가져오는 게 실패 알림
});

// app.get('/', (req, res) => { // 테스트를 위한 API 생성
//   res.send('<h1>아아.. 과제제출 3일남은 이 순간.. 당신은 개발자의 삶을 엿보게 될 것이다.</h1>');
// });
