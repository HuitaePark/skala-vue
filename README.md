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
- `/`: Code Challenge와 Hands-on으로 진입하는 SKALA-VUE 학습 홈
- `/basic`: PDF 66~71페이지 반응성·텍스트 보간·Pinia 확인
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

## Weather Hands-on 정리

`/hands-on/weather`는 PDF 116~274쪽에서 단계별로 만든 결과를 하나의 서비스형 대시보드로 연결한 최종 화면입니다.
처음에는 정적인 Mock 데이터로 화면과 컴포넌트를 만들고, 이후 Composition API·Router·Pinia·Axios·환경변수·배포를
차례로 적용해 실시간 날씨 서비스 형태로 발전시켰습니다.

### 주요 기능과 적용 내용

| 기능 | 적용한 내용 |
| --- | --- |
| 도시 조회 | 저장 도시 선택, 검색 제출, 상세 라우트 진입, 새로고침 때마다 OpenWeather API를 다시 호출합니다. |
| 실시간 데이터 | 현재 날씨·체감 온도·최고/최저·습도·풍속·가시거리·기압·예보·대기질을 표시합니다. |
| 검색과 선택 | `SearchBar`의 Props·Emits로 검색어를 부모와 동기화하고, 도시를 선택하면 선택 상태와 API 결과를 갱신합니다. |
| 컴포넌트 구조 | `WeatherParent`, `BaseDashboardCard`, `SearchBar`, `WeatherCard` 네 컴포넌트로 화면을 분리했습니다. |
| 상태 관리 | Pinia `weatherStore`에서 도시 목록·선택 도시·즐겨찾기·로딩·오류·API 상태를 관리합니다. |
| 예보와 대기질 | Axios로 현재 날씨·5일 3시간 예보·대기오염 데이터를 받아 화면 모델로 정규화합니다. |
| 즐겨찾기와 단위 | 즐겨찾기를 `localStorage`에 저장하고 Pinia 설정에 따라 섭씨·화씨를 전환합니다. |
| 상세 화면 | `/weather/:cityId` 동적 라우트와 programmatic navigation으로 도시 상세 페이지를 제공합니다. |
| 오류 대응 | API 키 누락·도시 미검색·호출 한도 초과·인증 오류를 안내하고 Mock 데이터로 안전하게 대체합니다. |
| 배포 | `VITE_OPENWEATHER_API_KEY`를 빌드 시 주입하고 GitHub Pages workflow로 배포합니다. |

### Weather 프로젝트를 하며 알게 된 점

1. **Mock 데이터와 실시간 데이터의 경계를 분리해야 합니다.** 화면 개발은 Mock으로 빠르게 시작하되, API 응답을
   같은 화면 모델로 정규화하면 데이터 출처가 바뀌어도 컴포넌트는 거의 수정하지 않아도 됩니다.
2. **`computed`와 `watch`의 역할이 다릅니다.** 화면에 보여줄 파생 값은 `computed`로 만들고, API 호출·저장·알림처럼
   외부 상태를 바꾸는 작업은 `watch`나 명시적인 이벤트 핸들러에서 실행하는 편이 예측하기 쉽습니다.
3. **컴포넌트의 경계가 곧 데이터 흐름의 경계가 됩니다.** Props는 부모에서 자식으로, Emits는 자식에서 부모로 흐르게
   만들고, 공통 카드 레이아웃은 Slot으로 주입하니 각 컴포넌트의 책임이 선명해졌습니다.
4. **비동기 상태는 성공만큼 실패와 경쟁 상태를 함께 다뤄야 합니다.** 로딩·오류·fallback 상태를 화면에 표시하고,
   연속 검색에서 늦게 도착한 이전 응답이 최신 선택을 덮어쓰지 않도록 요청 순서를 확인합니다.
5. **라우터와 전역 스토어를 함께 쓰면 화면 간 상태가 이어집니다.** 목록에서 고른 도시를 상세 라우트에서도 같은
   스토어로 읽고 다시 조회할 수 있어 페이지가 바뀌어도 사용자 흐름이 끊기지 않습니다.
6. **환경변수는 소스 코드와 별개로 관리해야 합니다.** Vite의 `VITE_` 변수는 빌드 시 번들에 들어가므로 `.env.local`은
   커밋하지 않고, GitHub Pages에서는 Repository secret을 등록한 뒤 반드시 새로 빌드해야 합니다.
7. **기능 피드백도 기능의 일부입니다.** API 출처(LIVE/DEMO), 마지막 갱신 시각, 로딩 버튼, 오류 메시지와 키보드로
   닫을 수 있는 상세 패널을 함께 제공하니 실제 서비스처럼 동작을 이해하기 쉬워졌습니다.

### 다음에 개선할 점

현재 프로젝트는 학습용 SPA라서 브라우저가 OpenWeather API를 직접 호출합니다. 상용 서비스에서는 API 키를 브라우저에
노출하지 않도록 백엔드 프록시나 서버리스 함수를 두고, 캐시·요청 제한·재시도 정책을 서버에서 관리하는 방식으로 확장할
수 있습니다.
