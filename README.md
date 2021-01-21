# fe-w23-shoppinghow

## 구현 화면
![shw](https://user-images.githubusercontent.com/26708382/104601795-02761480-56be-11eb-8d7f-764624b2d73e.png)


## 구조
  app.js : Express  
  public  
  &nbsp;&nbsp;|- index.html  
  &nbsp;&nbsp;|- js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- index.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- url.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- util  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- MyDomApi.js  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- MyPromise.js  
  &nbsp;&nbsp;&nbsp;&nbsp;|- component  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- BestView.js  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- CarouselView.js  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- CategoryView.js  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- InputView.js  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- RecentView.js  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- ThemeView.js  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|- TrendView.js  
  &nbsp;&nbsp;|- css  
  &nbsp;&nbsp;&nbsp;&nbsp;|- contents.css  
  &nbsp;&nbsp;&nbsp;&nbsp;|- head.css  
  &nbsp;&nbsp;|- img  
  &nbsp;&nbsp;&nbsp;&nbsp;|-  
  &nbsp;&nbsp;|- sass  

## start
  - npm install
  - npm start
  - url = localhost:3000

## Mock server specification - Postman
  - URL : https://7aebe337-b81c-42de-b89f-8c268823df03.mock.pstmn.io
  - GET /best
  - GET /carousel
  - GET /theme
  - GET /trend
  - GET /category

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

## 2021-1-18
  - 웹팩, 바벨 설정

## 2021-1-19
  - 리팩토링
    - 파일이름 의미있는 명사로 변경
    - onload를 DOMContentLoaded로 변경
    - 함수를 모듈(기능)별로 분리
    - 캐러셀 클릭 이벤트 버그 수정
    - 이벤트 델리게이션 사용
  - 웹팩, 바벨
    - css, image 변환을 위한 웹팩 설정
  - 카테고리 메뉴 레이어
    - 레이아웃 구현
    - 데이터 요청을 위한 목서버 환경 구축

## 2021-1-20
  - 카테고리 메뉴 레이어
    - 메뉴 레이어 데이터 요청 후 레이아웃 만들기
    - 상위 레이어 상태에 따라 하위 레이어 나타내기, 현재 활성화된 레이어 표현
    - 하위 레이어 이동시 삼각형 구조에 따라 바로 갈수 있는 기능 구현
      - 조건
        1. (y2-y1)/(x2-x1)*(x-x1)-y1+y1 <= 0
        2. (y3-y1)/(x3-x1)*(x-x1)-y1+y1 >= 0
        3. x2-x >= 0
        4. x4-x <= 0
        을 모두 만족하면 현재 마우스 포인터는 삼각형 내에 존재함  
        
![img](https://user-images.githubusercontent.com/26708382/105276488-db02d880-5be4-11eb-80cd-eb4678033a5d.png)


## 2021-1-21
  - 카테고리 메뉴 레이어
    - 삼각형 영역 구조 -> 마름모 구조로 변경
    - 디바운스를 활용한 좀더 부드러운 UX
  - 검색어 자동완성
    - 인풋 레이어 클릭 시 인기 쇼핑 키워드 노출
    - 검색어 입력시 콘텐츠 감추기
    - 글자 입력하면 자동완성된 결과 노출
    - 키보드 입력 방향에 따라 자동완성 결과 포커싱