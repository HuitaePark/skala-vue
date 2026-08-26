# SKALA-VUE

Vue 3 + Vite로 구성한 강의 PDF(1~197페이지) 실습 프로젝트입니다.

## 실행

```bash
npm install
npm run dev
```

실행 후 터미널에 표시된 주소(기본값 `http://localhost:5173`)로 접속합니다.

## 화면 구성

- `/curriculum`: PDF 1~172페이지 전체 학습 경로
- `/`: PDF 66~71페이지 반응성·텍스트 보간·Pinia 확인
- `/composition`: PDF 117~144페이지 Composition API·Computed·Watchers 실습
- `/composition/challenge`: PDF 127~144페이지 Code Challenge Composition API
- `/composition/lifecycle`: PDF 152~155페이지 Component Lifecycle·Lifecycle Hook Code Challenge
- `/components/props`: PDF 156~172페이지 Props·Emits와 Code Challenge
- `/components/weather`: PDF 178쪽 Hands on Weather Component Code Challenge
- `/weather`: PDF 196~197쪽 Weather Router 메인 대시보드
- `/weather/:cityId`: 도시 코드 기반 동적 상세 페이지
- `/weather/about`: Weather Router 서비스 소개
- `/events`: PDF 93~105페이지 Vue Event Handling 실습
- `/forms`: PDF 106~115페이지 Vue Form Handling·Style 실습
- `/hands-on/weather`: PDF 116쪽 서비스형 Weather Dashboard
- `/directives`: PDF 72~92페이지 Vue Directive 실습
- `/about`: HMR 확인용 화면

## 참고

`v-html` XSS 화면은 취약한 렌더링 동작을 학습하기 위한 로컬 데모입니다. 실제 서비스에서는 사용자 입력을 검증·정제한 뒤 사용하세요.
