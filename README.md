# ✅ 우아한 ToDo

![version-1.0.0](https://img.shields.io/badge/version-v1.0.0-orange)
![license-woowa](https://img.shields.io/badge/license-woowa-blue)

> 우아한테크캠프 2번째 팀 프로젝트 - 7조 정진혁, 추연호

## 🖋 Authors

- [zoomkoding](https://github.com/zoomKoding)
- [younho9](https://github.com/younho9)

## 🎉 배포

🔗 [배포 링크](http://3.35.66.51:3002/)

### 게스트 계정

> 다음의 게스트 계정을 사용해 테스트 가능합니다. (다사용자 테스트 가능)

| ID       | Password    |
| -------- | ----------- |
| `guest1` | `woowaking` |
| `guest2` | `woowaking` |

### 미리보기

- 로그인 및 프로젝트 생성

![login](docs/images/login.gif)

- 카드 drag and drop

![drag and drop](docs/images/drag-and-drop.gif)

- 컬럼 생성 및 이벤트

![column and event](docs/images/column-and-event.gif)

## 💪 구현한 사항

> 다음의 기능에 대한 구현을 완료하였습니다.

- 웹팩과 바벨을 활용한 개발 환경 구성
  - 1% 범위의 브라우저에서 동작가능한 배포파일 생성
  - 개발/배포 환경에 따른 웹팩 설정
- Drag and Drop 구현
  - card와 column 이동에 대해 모두 구현하였습니다.
- 다사용자가 사용할 수 있는 설계
- 사용자별 각 목록에 대한 접근권한(읽기/쓰기) 구현
  - 프로젝트 생성시 유저별 접근권한을 부여할 수 있습니다.

## 👨‍💻 적용한 기술

- MVC 패턴
- Atomic 디자인

## 프로젝트 구조

```
todo-7
├── .github
│   ├── ISSUE_TEMPLATE.md
│   └── PULL_REQUEST_TEMPLATE.md
├── .gitignore
├── .prettierrc
├── README.md
├── client
│   ├── babel.config.js
│   ├── banner.js
│   ├── dist
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── docs
│   ├── api.md
│   └── tech-seminar
└── server
    ├── .env
    ├── app.js
    ├── bin
    ├── controllers
    ├── models
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── routes
    └── utils
```

### 데이터베이스 설계

![database tables](https://user-images.githubusercontent.com/48426991/87879928-a8570800-ca28-11ea-8142-2614c005f762.png)

### API 문서

[API 문서](./docs/api.md)

## 설치 가이드

### 프로젝트 가져오기

```
git clone https://github.com/woowa-techcamp-2020/todo-7.git
```

### 클라이언트 코드 빌드

```
cd client
npm install
npm run build
```

### 서버 코드 실행

> ⚠️ `server/.env`에 다음 환경 변수가 등록되어야 합니다.

```
SESSION_SECRET=secret
DB_HOST={데이터베이스 주소}
DB_USER={데이터베이스 사용자}
DB_PASSWORD={데이터베이스 사용자 비밀번호}
DB_NAME={데이터베이스 이름}
```

```
cd server
npm install
npm start
```

## 📔 Wiki

> 우리 팀은 이렇게 협업했습니다.

### 🏠 [Home](https://github.com/woowa-techcamp-2020/todo-7/wiki)

### 📝 기획서 & 요구사항

- [기획서](https://docs.google.com/presentation/d/1AF2MNzwGHh97_6DpIhgM1NHHGggtCBYelHHtwxuQkgA/edit#slide=id.p)
- [요구 사항](https://github.com/woowa-techcamp-2020/todo-7/wiki/%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD)

### 🎯 목표

- [이번 프로젝트의 목표](https://github.com/woowa-techcamp-2020/todo-7/wiki/%EC%9D%B4%EB%B2%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EB%AA%A9%ED%91%9C)

### 🏃‍♀️ 1주 Sprint

- [1주차 Daily Scrum](https://github.com/woowa-techcamp-2020/todo-7/wiki/1%EC%A3%BC%EC%B0%A8-Daily-Scrum)
- [1주차 Daily Wrap Up](https://github.com/woowa-techcamp-2020/todo-7/wiki/1%EC%A3%BC%EC%B0%A8-Wrap-Up)

### 🏃‍♀️ 2주 Sprint

- [2주차 Daily Scrum](https://github.com/woowa-techcamp-2020/todo-7/wiki/2%EC%A3%BC%EC%B0%A8-Daily-Scrum)
- [2주차 Daily Wrap Up](https://github.com/woowa-techcamp-2020/todo-7/wiki/2%EC%A3%BC%EC%B0%A8-Wrap-Up)

### 🛠 Tech 세미나

> 팀 프로젝트를 진행하며 학습하고, 학습한 내용을 함께 공유하였습니다.

- [Express의 미들웨어와 블로그 공부법](docs/tech-seminar/ExpressANDZoomkoding.pdf)
- [Webpack & Babel 함께 학습하기](docs/tech-seminar/webpack%20babel%20함께%20학습하기.pdf)
- [어렵지 않게 css 레이아웃 잡기](https://zoomkoding.github.io/web/%EC%9A%B0%EC%95%84%ED%95%9C%ED%85%8C%ED%81%AC%EC%BA%A0%ED%94%84/2020/07/14/css-layout.html)

### 👮‍♂️ Rules

- [그라운드 룰](https://github.com/woowa-techcamp-2020/todo-7/wiki/%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%A3%B0)
- [개발 룰](https://github.com/woowa-techcamp-2020/todo-7/wiki/%EA%B0%9C%EB%B0%9C-%EB%A3%B0)
