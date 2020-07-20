# signIn

## Request

### Endpoint

`POST` `/login`

### Body

| Property   | Type     | Description   |
| ---------- | -------- | ------------- |
| `username` | `string` | 유저 아이디   |
| `password` | `string` | 유저 비밀번호 |

## Response

| Property  | Type      | Description           |
| --------- | --------- | --------------------- |
| `success` | `boolean` | 로그인 성공 또는 실패 |

# getProjects

## Request

### Endpoint

`GET` `/projects/:id`

### Params

| Property | Type  | Description   |
| -------- | ----- | ------------- |
| `id`     | `int` | 유저 고유번호 |

## Response

| Property   | Type        | Description                          |
| ---------- | ----------- | ------------------------------------ |
| `projects` | `Project[]` | 유저가 참여하고 있는 프로젝트 리스트 |

# getUsers

## Request

### Endpoint

`GET` `/users/:id`

### Params

| Property | Type  | Description       |
| -------- | ----- | ----------------- |
| `id`     | `int` | 프로젝트 고유번호 |

## Response

| Property | Type     | Description                     |
| -------- | -------- | ------------------------------- |
| `users`  | `User[]` | 프로젝트에 참여하는 유저 리스트 |

# getProject

## Request

### Endpoint

`GET` `/project/:id`

### Params

| Property | Type  | Description       |
| -------- | ----- | ----------------- |
| `id`     | `int` | 프로젝트 고유번호 |

## Response

| Property  | Type      | Description                                         |
| --------- | --------- | --------------------------------------------------- |
| `project` | `Project` | 프로젝트에 포함된 그룹, 노트, 이벤트 등 모든 데이터 |

## Example Response

```json
{
  "id": 1,
  "title": "name",
  "description": "description",
  "groups": [
    {
      "id": 1,
      "title": "📗todo",
      "notes": [
        {
          "id": 1,
          "title": "hello",
          "description": "goood"
        },
        {
          "id": 2,
          "title": "hello",
          "description": "goood"
        }
      ]
    },
    {
      "id": 2,
      "title": "📒doing",
      "notes": []
    },
    {
      "id": 3,
      "title": "📕done",
      "notes": []
    }
  ],
  "events": [
    {
      "id": 1,
      "description": "Jinhyeok updated Project Name "
    },
    {
      "id": 2,
      "description": "younho9 moved github 공부하기 from 해야할 일 to 하는 중"
    }
  ]
}
```

# createProject

## Request

### Endpoint

`POST` `/project`

### Body

| Property                 | Type     | Description   |
| ------------------------ | -------- | ------------- |
| `title`                  | `string` | 프로젝트 이름 |
| `description` (optional) | `string` | 프로젝트 설명 |

## Response

| Property  | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| `project` | `Project` | 새로 생성된 프로젝트 (기본 그룹, 노트 데이터 포함) |

## Example Response

```json
{
  "id": 1,
  "title": "name",
  "description": "description",
  "groups": [
    {
      "id": 1,
      "title": "📗todo",
      "notes": [
        {
          "id": 1,
          "title": "Welcome to our ToDo app",
          "description": "Awesome"
        }
      ]
    },
    {
      "id": 2,
      "title": "📒doing",
      "notes": []
    },
    {
      "id": 3,
      "title": "📕done",
      "notes": []
    }
  ]
}
```

# deleteProject

## Request

### Endpoint

`DELETE` `/project/:id`

### Params

| Property | Type  | Description        |
| -------- | ----- | ------------------ |
| `id`     | `int` | 프로젝트 고유 번호 |

## Response

status code

# updateProject

## Request

### Endpoint

`PUT` `/project`

### Body

| Property                 | Type     | Description     |
| ------------------------ | -------- | --------------- |
| `id`                     | `int`    | 프로젝트 아이디 |
| `title`                  | `string` | 프로젝트 이름   |
| `description` (optional) | `string` | 프로젝트 설명   |

## Response

| Property | Type    | Description              |
| -------- | ------- | ------------------------ |
| `event`  | `Event` | 프로젝트 업데이트 이벤트 |

## Example Response

```json
{
  "event": {
    "id": 1,
    "description": "Jinhyeok updated Project Name "
  }
}
```

# createGroup

## Request

### Endpoint

`POST` `/groups`

### Body

| Property    | Type     | Description        |
| ----------- | -------- | ------------------ |
| `projectId` | `int`    | 프로젝트 고유 번호 |
| `title`     | `string` | 그룹 이름          |

## Response

| Property | Type    | Description      |
| -------- | ------- | ---------------- |
| `group`  | `Group` | 새로 생성된 그룹 |
| `event`  | `Event` | 그룹 생성 이벤트 |

## Example Response

```json
{
  "group": {
    "id": 1,
    "title": "📗todo"
  },
  "event": {
    "id": 1,
    "description": "Jinhyeok created 새 Group 이름 "
  }
}
```

# deleteGroup

## Request

### Endpoint

`DELETE` `/groups/:id`

### Params

| Property | Type  | Description    |
| -------- | ----- | -------------- |
| `id`     | `int` | 그룹 고유 번호 |

## Response

| Property | Type    | Description      |
| -------- | ------- | ---------------- |
| `event`  | `Event` | 그룹 삭제 이벤트 |

## Example Response

```json
{
  "event": {
    "id": 1,
    "description": "Jinhyeok deleted Group 이름"
  }
}
```

# updateGroup

## Request

### Endpoint

`PUT` `/groups`

### Body

| Property           | Type     | Description    |
| ------------------ | -------- | -------------- |
| `id`               | `int`    | 그룹 고유 번호 |
| `title`            | `string` | 그룹 이름      |
| `order` (optional) | `int`    | 그룹 순서      |

## Response

| Property | Type    | Description          |
| -------- | ------- | -------------------- |
| `event`  | `Event` | 그룹 업데이트 이벤트 |

## Example Response

```json
{
  "event": {
    "id": 1,
    "description": "Jinhyeok updated Group 이름"
  }
}
```

# moveGroup

## Request

### Endpoint

`PUT` `/groups/move`

### Body

| Property | Type  | Description    |
| -------- | ----- | -------------- |
| `id`     | `int` | 그룹 고유 번호 |
| `order`  | `int` | 그룹 순서      |

## Response

| Property | Type    | Description          |
| -------- | ------- | -------------------- |
| `event`  | `Event` | 그룹 업데이트 이벤트 |

## Example Response

```json
{
  "event": {
    "id": 1,
    "description": "Jinhyeok moved Group 이름"
  }
}
```

# createNote

## Request

### Endpoint

`POST` `/notes`

### Body

| Property  | Type     | Description    |
| --------- | -------- | -------------- |
| `groupId` | `int`    | 그룹 고유 번호 |
| `title`   | `string` | 노트 이름      |

## Response

| Property | Type    | Description      |
| -------- | ------- | ---------------- |
| `note`   | `Note`  | 생성한 노트      |
| `event`  | `Event` | 노트 생성 이벤트 |

## Example Response

```json
{
  "note": {
    "id": 1,
    "title": "할 일"
  },
  "event": {
    "id": 1,
    "description": "Jinhyeok moved Group 이름"
  }
}
```

# deleteNote

## Request

### Endpoint

`DELETE` `/notes/:id`

### Params

| Property | Type  | Description    |
| -------- | ----- | -------------- |
| `id`     | `int` | 노트 고유 번호 |

## Response

| Property | Type    | Description      |
| -------- | ------- | ---------------- |
| `event`  | `Event` | 노트 삭제 이벤트 |

## Example Response

```json
{
  "event": {
    "id": 1,
    "description": "Jinhyeok deleted Note 이름"
  }
}
```

# updateNote

## Request

### Endpoint

`PUT` `/notes`

### Body

| Property           | Type     | Description |
| ------------------ | -------- | ----------- |
| `title`            | `string` | 그룹 이름   |
| `order` (optional) | `int`    | 그룹 순서   |

## Response

| Property | Type    | Description          |
| -------- | ------- | -------------------- |
| `event`  | `Event` | 노트 업데이트 이벤트 |

## Example Response

```json
{
  "event": {
    "id": 1,
    "description": "Jinhyeok updated Note 이름"
  }
}
```

# moveNote

## Request

### Endpoint

`PUT` `/notes/move`

### Body

| Property           | Type  | Description    |
| ------------------ | ----- | -------------- |
| `id`               | `int` | 노트 고유 번호 |
| `groupId`          | `int` | 그룹 아이디    |
| `order` (optional) | `int` | 그룹 순서      |

## Response

| Property | Type    | Description          |
| -------- | ------- | -------------------- |
| `event`  | `Event` | 노트 업데이트 이벤트 |

## Example Response

```json
{
  "event": {
    "id": 1,
    "description": "Jinhyeok moved Note 이름"
  }
}
```
