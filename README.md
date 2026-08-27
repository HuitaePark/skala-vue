# SKALA-VUE

Vue 3 + Vite로 구성한 강의 PDF(1~274페이지) 실습 프로젝트입니다.

## 실행

```bash
npm install
npm run dev
```

실행 후 터미널에 표시된 주소(기본값 `http://localhost:5173`)로 접속합니다.

## 화면 구성

- `/curriculum`: PDF 1~274페이지 전체 학습 경로
- `/`: PDF 66~71페이지 반응성·텍스트 보간·Pinia 확인
- `/composition`: PDF 117~144페이지 Composition API·Computed·Watchers 실습
- `/composition/challenge`: PDF 127~144페이지 Code Challenge Composition API
- `/composition/lifecycle`: PDF 152~155페이지 Component Lifecycle·Lifecycle Hook Code Challenge
- `/components/props`: PDF 156~172페이지 Props·Emits와 Code Challenge
- `/components/weather`: PDF 178쪽 Hands on Weather Component Code Challenge
- `/weather`: PDF 196~197쪽 Weather Router 메인 대시보드
- `/weather/:cityId`: 도시 코드 기반 동적 상세 페이지
- `/weather/about`: Weather Router 서비스 소개
- `/pinia`: PDF 198~212페이지 Pinia Store·Weather Store 실습
- `/axios`: PDF 214~230페이지 Axios Weather·JSON API 실습
- `/ui-library`: PDF 232~249페이지 Element Plus UI Library 실습
- `/vite`: PDF 250~274페이지 ESLint·Prettier·env·Build·Deployment 실습
- `/events`: PDF 93~105페이지 Vue Event Handling 실습
- `/forms`: PDF 106~115페이지 Vue Form Handling·Style 실습
- `/hands-on/weather`: PDF 116~274쪽 Weather Hands-on 최종 통합 대시보드
- `/directives`: PDF 72~92페이지 Vue Directive 실습
- `/about`: HMR 확인용 화면

## 참고

`v-html` XSS 화면은 취약한 렌더링 동작을 학습하기 위한 로컬 데모입니다. 실제 서비스에서는 사용자 입력을 검증·정제한 뒤 사용하세요.

## 환경변수

프로젝트 루트에서 `.env.example`을 복사해 `.env.local`을 만들고 OpenWeather API 키를 입력합니다.
`.env.local`은 Git에 올리지 않으며, 값을 바꾼 뒤에는 개발 서버를 다시 실행합니다.

```dotenv
VITE_OPENWEATHER_API_KEY=발급받은_API_키
```

```bash
npm run lint
npm run format:check
npm run build
npm run build:staging
```

## GitHub Pages 배포

`main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 `dist/`를 빌드해 GitHub Pages에 자동 배포합니다.
저장소 Settings → Pages에서 Source를 **GitHub Actions**로 선택하면 됩니다.

- 배포 주소: `https://huitaepark.github.io/skala-vue/`
- 실시간 날씨를 배포판에서도 사용하려면 Settings → Secrets and variables → Actions에서
  `VITE_OPENWEATHER_API_KEY` 이름의 Repository secret을 추가합니다.
