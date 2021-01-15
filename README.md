# fe-w23-shoppinghow

## 구현 화면
![shw](https://user-images.githubusercontent.com/26708382/104601795-02761480-56be-11eb-8d7f-764624b2d73e.png)


## 구조
  app.js : Express
  public  
  &nbsp;&nbsp;|- index.html  
  &nbsp;&nbsp;|- js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- index.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- myDomApi.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- myPromise.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- carousel.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- best.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- recent.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- trend.js  
  &nbsp;&nbsp;|- css  
  &nbsp;&nbsp;&nbsp;&nbsp;|- style.css  
  &nbsp;&nbsp;|- img  
  &nbsp;&nbsp;&nbsp;&nbsp;|-   

## start
  - npm install
  - pm2 start app.js
  - url = localhost:3000

## Mock server specification - Postman
  - URL : https://7aebe337-b81c-42de-b89f-8c268823df03.mock.pstmn.io
  - GET /best
  - GET /carousel
  - GET /theme
  - GET /trend

## 2021-1-11
  - Node(npm), Express, pm2 설치, 로컬서버환경 구성
  - 디렉터리 구조, 화면 설계
  - DOM API (querySelector, querySelectorAll, getElementById) 구현
     - 현재는 함수형 -> 클래스형으로 변경 예정 -> 변경 완료

## 2021-1-12
  - myDomApi 변경 : element.matches 사용, 함수 -> 클래스
  - myPromise 구현 (미완)
    - 체이닝(then을 연속으로 사용하기 위한) 구현해야함
  - Layout(Header, Category) 구현
  
## 2021-1-13
  - myPromise 버그 수정 
  - 지난 PR comments 반영
    - MyDomApi 클래스 객체 리터럴로 변경
  - Theme, Best, Carousel 화면 및 기능 구현
    - MyDomApi 사용

## 2021-1-14
  - Mock server 환경 구축: Postman 활용
    - URL: https://7aebe337-b81c-42de-b89f-8c268823df03.mock.pstmn.io
    - Method: GET /best, GET /carousel, GET /theme, GET /trend
    - Fetch API 사용
  - Theme 구현
    - Layout
    - 기능
      - 한번 누르면 1칸 이동
      - 2초 이상 누르고 있으면 2칸 이동(지속)
  - Best 구현
    - 더보기 기능 : 미리 받아본 데이터를 5개씩 추가적으로 렌더링
  - Recent
    - Layout
    - 기능
      - Theme와 Best의 아이템을 클릭하면 로컬스토리지에 저장
      - 최근에 클릭한 아이템을 로컬스토리지에서 불러와서 보여줌
  
## 2021-1-15
  - 리팩토링
    - 불필요한 Array Function 제거
    - 매직 넘버 제거
    - 함수명, 변수명 의미 있게
    - 중복되는 표현 제거