# 영화 정보 사이트

API를 사용하여 영화 정보를 제공하는 사이트

## 프로젝트 기본 셋팅

이성용선생님의 웹팩 설정이 되어있는 보일러플레이트 코드를 사용해서 기본 세팅을 하였습니다.
[보일러플레이트 코드](https://github.com/sssssqew/react-webpack)

### 페이지 구성

등록 페이지 - sessionStorage에 등록된 아이디 유무를 확인하여 등록된 아이디가 있다면 로그인 페이지로 이동하고 아이디가 없다면 아이디를 등록시키고 영화 목록 페이지로 이동 시킨다. 
영화 목록 페이지 - 영화 정보 출력, 검색 기능, 정렬 기능, 보이는 목록 개수 변경, 좋아요 페이지 이동 버튼 구현
영화 상세 정보 페이지 - 클릭시 sessionStorage를 이용하여 좋아요 수치 변경 기능, 영화 정보 출력, 토렌트 파일 다운로드, 트레일러 영상 연결
좋아요 페이지 - 평점이 높은 영화 3편과 좋아요가 많은 영화 3편을 출력
