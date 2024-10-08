import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // src 폴더를 루트 디렉토리로 설정
  // root: 'src',
  publicDir: resolve(__dirname, "public"),
  resolve: {
    // @ 기호를 사용하여 src 폴더의 경로를 별칭으로 설정
    alias: { "@": resolve(__dirname, "src") },
  },
  build: {
    // 빌드 결과물이 저장될 폴더를 dist로 설정
    outDir: "dist",
    rollupOptions: {
      input: {
        // 기본 입력 파일을 설정 (index.html이 src 폴더 내에 위치한다고 가정)
        main: resolve(__dirname, "index.html"),
        // 아래 경로 페이지도 함께 컴파일
        // findId: resolve(__dirname, 'src/pages/findId/index.html'),
        // findPw: resolve(__dirname, 'src/pages/findPw/index.html'),
        // landing: resolve(__dirname, 'src/pages/landing/index.html'),
        // login: resolve(__dirname, 'src/pages/login/index.html'),
        // profileEdit: resolve(__dirname, 'src/pages/profileEdit/index.html'),
        // profileSelect: resolve(__dirname, 'src/pages/profileSelect/index.html'),
        // profileCreate: resolve(__dirname, 'src/pages/profileCreate/index.html'),
        // profileEditing: resolve(__dirname, 'src/pages/profileEditing/index.html'),
        // signUp: resolve(__dirname, 'src/pages/signUp/index.html'),
        // searchResult: resolve(__dirname, 'src/pages/searchResult/index.html'),
      },
    },
  },
  server: {
    // 개발 서버 설정
    port: 3000, // 개발 서버 포트 번호를 3000으로 설정
    open: false, // 서버 시작 시 브라우저 자동 열기
  },
  css: {
    // CSS 전처리기 옵션 설정
    preprocessorOptions: {
      scss: {
        // SCSS 변수 파일을 모든 SCSS 파일에 자동으로 포함
        // additionalData:
        //   @import "@/styles/main.scss";
        // ,
      },
      modules: {
        scopeBehaviour: "local", // CSS Modules를 사용하여 CSS의 범위를 모듈 단위로 제한
      },
    },
  },
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
