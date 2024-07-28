// server.mjs
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

// `__dirname`과 `__filename`을 ES 모듈에서 사용 가능하도록 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Vite 서버 생성
  const vite = await createViteServer({
    server: { middlewareMode: "html" },
  });

  // Vite의 미들웨어를 사용
  app.use(vite.middlewares);

  // 정적 파일 제공
  app.use(express.static(path.join(__dirname, "public")));

  // 기타 라우팅 설정
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // 서버 시작
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

startServer();
