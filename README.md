# fe-w23-shoppinghow

## 구조
  app.js : Express
  public  
  &nbsp;&nbsp;|- index.html  
  &nbsp;&nbsp;|- js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- index.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- myDomApi.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- myPromise.js  
  &nbsp;&nbsp;|- css  
  &nbsp;&nbsp;&nbsp;&nbsp;|- style.css  
  &nbsp;&nbsp;|- api  
  &nbsp;&nbsp;&nbsp;&nbsp;|-   
  &nbsp;&nbsp;|- img  
  &nbsp;&nbsp;&nbsp;&nbsp;|-   

## start
  - npm install
  - pm2 start app.js
  - url = localhost:3000

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
  