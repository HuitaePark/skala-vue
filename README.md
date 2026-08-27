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
- `/components/slot`: PDF 173~177페이지 Default·Named·Scoped Slot Code Challenge
- `/components/weather`: PDF 178쪽 Hands on Weather Component Code Challenge
- `/weather`: PDF 196~197쪽 Weather Router 메인 대시보드
- `/weather/:cityId`: 도시 코드 기반 동적 상세 페이지
- `/weather/about`: Weather Router 서비스 소개
- `/pinia`: PDF 198~212페이지 Pinia Store·Weather Store 실습
- `/axios`: PDF 214~230페이지 Axios Weather·JSON API 실습
- `/ui-library`: PDF 232~249페이지 Element Plus UI Library 실습
- `/ui-library/product`: PDF 247쪽 Element Plus 상품 수량·평점 Code Challenge
- `/ui-library/progress`: PDF 248쪽 Element Plus 진행률·삭제 확인 Code Challenge
- `/ui-library/overview`: PDF 232~249페이지 UI Library 개념·Weather Hands-on 전체 보기
- `/vite`: PDF 250~274페이지 ESLint·Prettier·env·Build·Deployment 실습
- `/vite/prettier`: PDF 271쪽 Prettier Code Challenge
- `/vite/env`: PDF 272쪽 Vite 환경변수 Code Challenge
- `/vite/build`: PDF 273쪽 Vite Build Code Challenge
- `/vite/overview`: PDF 250~274페이지 Vite 품질·빌드·배포 전체 보기
- 기본 경로 `/ui-library`와 `/vite`는 각 첫 Code Challenge를 열고, `/overview` 경로에서 전체 범위를 확인합니다.
- UI Library 전체 보기: `/ui-library/overview` · Vite 전체 보기: `/vite/overview`
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

### Weather 페이지에 적용한 기술

| 기술 | 적용 내용 |
| --- | --- |
| Vue 3 Composition API | ref, computed, watch, watchEffect와 Lifecycle Hook으로 상태·파생 값·비동기 흐름을 관리합니다. |
| 컴포넌트 통신 | WeatherParent, SearchBar, WeatherCard, BaseDashboardCard를 Props·Emits·Slot으로 연결합니다. |
| Vue Router 4 | 도시 상세 동적 경로, programmatic navigation, lazy loading과 새로고침 라우팅을 적용합니다. |
| Pinia | 도시 목록, 선택 도시, 즐겨찾기, 로딩·오류·API 출처 상태를 weatherStore에서 공유합니다. |
| Axios | OpenWeather Geocoding·Current Weather·Forecast·Air Pollution API를 호출하고 화면 모델로 정규화합니다. |
| Vite 환경변수 | VITE_OPENWEATHER_API_KEY를 로컬·staging·production 빌드별로 주입합니다. |
| 브라우저 기능·반응형 CSS | localStorage 즐겨찾기, 키보드 접근성, 모바일 레이아웃과 전체 화면 Dashboard를 구현합니다. |

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

### 과제 범위를 넘어 추가한 기능

- **저장 도시와 즐겨찾기**: 여러 도시를 한 화면에서 관리하고, 즐겨찾기 목록은 브라우저 `localStorage`에 저장해 다시
  방문해도 유지되도록 했습니다.
- **생활형 날씨 해석**: 기온·습도 기반 Comfort Score, 외출 추천 시간, 강수·폭염·자외선 알림을 계산해 단순한 수치보다
  바로 행동으로 옮길 수 있는 정보로 보여줍니다.
- **대기질과 확장 데이터**: OpenWeather Air Pollution API를 추가해 AQI와 PM2.5를 표시하고, 일출·일몰·가시거리·기압·
  체감 온도까지 함께 제공합니다.
- **실시간 상태 가시화**: `LIVE DATA`와 `DEMO DATA`를 구분하고 마지막 갱신 시각, 로딩 상태, API 오류 메시지를 화면에
  표시해 현재 데이터 상태를 바로 알 수 있게 했습니다.
- **안전한 비동기 갱신**: 빠르게 다른 도시를 선택했을 때 먼저 시작한 요청이 최신 선택을 덮어쓰지 않도록 요청 순서를
  확인하는 보호 로직을 넣었습니다.
- **서비스형 화면과 반응형 UI**: 학습용 예제 카드에서 끝나지 않도록 전체 화면 대시보드, 도시 상세 모달·라우트,
  모바일 레이아웃, 키보드로 닫을 수 있는 상세 패널까지 추가했습니다.

### Weather 프로젝트를 하며 알게 된 점

1. **컴포넌트의 경계가 곧 데이터 흐름의 경계가 됩니다.** Props는 부모에서 자식으로, Emits는 자식에서 부모로 흐르게
   만들고, 공통 카드 레이아웃은 Slot으로 주입하니 각 컴포넌트의 책임이 선명해졌습니다.
2. **비동기 상태는 성공만큼 실패와 경쟁 상태를 함께 다뤄야 합니다.** 로딩·오류·fallback 상태를 화면에 표시하고,
   연속 검색에서 늦게 도착한 이전 응답이 최신 선택을 덮어쓰지 않도록 요청 순서를 확인합니다.
3. **라우터와 전역 스토어를 함께 쓰면 화면 간 상태가 이어집니다.** 목록에서 고른 도시를 상세 라우트에서도 같은
   스토어로 읽고 다시 조회할 수 있어 페이지가 바뀌어도 사용자 흐름이 끊기지 않습니다.
4. **환경변수는 소스 코드와 별개로 관리해야 합니다.** Vite의 `VITE_` 변수는 빌드 시 번들에 들어가므로 `.env.local`은
   커밋하지 않고, GitHub Pages에서는 Repository secret을 등록한 뒤 반드시 새로 빌드해야 합니다.
