# Final Project README

### i. Team 서울 2반 10조 변유정 조은비

> 저희 팀은 DRF와 Vue를 활용했으며, 백엔드와 프론트로 나누지 않고 각자 백엔드와 프론트 엔드에서 앱을 나누어 구현하였습니다. 
> 
> 변유정 팀원은 백엔드에서 accounts와 community를 구현하고 프론트 엔드에서는 로그인, 회원가입 기능 그리고 영화와 관련된 컴포넌트를 구현했습니다.
> 
> 조은비 팀원은 백엔드에서 movies를 구현하고 프론트엔드에서 커뮤니티와 로그아웃 기능을 구현 했습니다. 

### ii. 영화추천 및 영화 리뷰 커뮤니티 구현

1. 영화 데이터

> 우선 TMDB의 Top Rated 영화데이터를 90개 정도 가져와서 fixtures를 만들었습니다. 
> 
> ```json
> [
>   {
>     "model": "movies.movie",
>     "fields": {
>       "backdrop_path": "/rl7Jw8PjhSIjArOlDNv0JQPL1ZV.jpg",
>       "movie_num": 851644,
>       "original_title": "20 Century Girl",
>       "overview": "보라의 둘도 없는 친구 연두는 심장 수술을 위해 미국에 가면서 자신이 좋아하는 남자 백현진에 대한 모든 정보를 수집해 달라고 보라에게 부탁한다. 보라는 백현진의 가장 친한 친구 풍운호와 먼저 친해지기로 한다. 하지만 보라의 서투른 계획은 예상치 못한 방향으로 전개된다. 새로운 세기가 오기 1년 전인 1999년, 17세가 된 보라는 첫사랑의 열병에 빠진다.",
>       "popularity": 483.204,
>       "poster_path": "/xM9Jt2sA6QcvLuHKM0RI3BMtFc5.jpg",
>       "release_date": "2022-10-06",
>       "title": "20세기 소녀",
>       "vote_average": 8.8,
>       "vote_count": 235
>     }
>   },
>   {
>     "model": "movies.movie",
>     "fields": {
>       "backdrop_path": "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
>       "movie_num": 238,
>       "original_title": "The Godfather",
>       "overview": "시실리에서 이민온 뒤, 정치권까지 영향력을 미치는 거물로 자리잡은 돈 꼴레오네는 갖가지 고민을 호소하는 사람들의 문제를 해결해주며 대부라 불리운다. 한편 솔로소라는 인물은 꼴레오네가와 라이벌인 탓타리아 패밀리와 손잡고 새로운 마약 사업을 제안한다. 돈 꼴레오네가 마약 사업에 참여하지 않기로 하자, 돈 꼴레오네를 저격해 그는 중상을 입고 사경을 헤매게 된다. 그 뒤, 돈 꼴레오네의 아들 소니는 조직력을 총 동원해 다른 패밀리들과 피를 부르는 전쟁을 시작하는데... 가족의 사업과 상관없이 대학에 진학한 뒤 인텔리로 지내왔던 막내 아들 마이클은 아버지가 총격을 당한 뒤, 아버지를 구하기 위해 위험천만한 협상 자리에 나선다.",
>       "popularity": 106.976,
>       "poster_path": "/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg",
>       "release_date": "1972-03-14",
>       "title": "대부",
>       "vote_average": 8.7,
>       "v
> ote_count": 16906
>     }
>   },
> ...(생략)...
> ```
> 
> 우선 현재 상영중인 영화와 인기작을 구분하여 다음과 같이 화면을 구성했습니다.
> 
> ![1](Final%20Project%20README_assets/0c03d4557c8157dfdcdd502bb131158001bb36e9.png)
> 
> 현재 상영중인 영화는 release_date를 기준으로 10가지를 뽑았습니다. 
> 
> ```django
> # movies/views.py
> 
> @api_view(['GET'])
> def playing(request):
>     movies = Movie.objects.all().order_by('-release_date')[:10]
>     serializer = MovieListSerializer(movies, many=True)
>     return Response(serializer.data)
> ```

2. 영화 추천 알고리즘

> WishList를 만들어 사용자의 기호에 따라 비슷한 영화를 추천하도록 했습니다. 
> 
> 사용자가 영화를 고르지 않았을 때는 아래와 같은 화면을 보여줍니다.
> 
> ![2](Final%20Project%20README_assets/1a33dc755f875f3f601c028cce724c2247b91613.png)
> 
> ADD LIKE-MOVIE를 클릭하면 영화 홈으로 이동하며 영화 Detail 페이지에서
> 
> ![](Final%20Project%20README_assets/d781eccd736911bedd1739a80fdaaf41d5afd5c5.png)
> 
> 보고싶어요 버튼을 클릭할 수 있게 했습니다.  보고싶어요 버튼을 클릭하면
> 
> ![](Final%20Project%20README_assets/dd13c7bb25c7feae553fd1469ab9e132d8670847.png)
> 
> 취소버튼이 활성화 되도록 해두었습니다.
> 
> WishList로 다시 돌아오면 RECOMMEND 버튼을 눌러 영화를 추천받습니다.
> 
> ![](Final%20Project%20README_assets/5e8e73e07d06d4f24326f6d0d9c86cad35f52d26.png)
> 
> 영화를 추천 받는 알고리즘은 TMDB의 Get Similar Movies API를 이용했습니다. 
> 
> ```md
> https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
> ```
> 
> movie_id는 초기 데이터에서 movie_num에 해당하는 정수를 넘겨서 가져왔으며, 영화가 여러 개일 경우 중복해서 출력되는 데이터가 존재해 concat, reduce,find를 이용해 중복을 제거해주었습니다. 
> 
> 중복 제거 후, TMDB의 Get Similar Movies API 기반으로 TMDB top rated에서 실제 사용되고 있는 가중치 산정기법을 사용하였습니다. WishList 내의 영화와 유사한 영화의 데이터 안에서 가중치 산정과 영화의 인기도를 활용하여 정렬 후, 최종 3개를 보여줄 수 있도록 진행하였습니다.
> 
> ```js
> // wishMovie.vue
> // 생략
> <script>
> import axios from "axios";
> import WishMovieItem from "@/components/WishMovieItem.vue";
> import RecommendCompCard from "./RecommendCompCard.vue";
> 
> export default {
>   name: "WishMovie",
>   data() {
>     return {
>       movies: this.$store.state.wishlist,
>       recommend_movies: [],
>       retemp_arr: [],
>     };
>   },
>   props: ["userid"],
>   components: {
>     WishMovieItem,
>     RecommendCompCard,
>   },
>   created() {
>     this.$store.dispatch("getWishlist");
>   },
>   methods: {
>     async test() {
>       // const API_KEY = process.env.VUE_APP_API_KEY;
>       const API_KEY = "d33243f64c969db5c7294c3f2f559529";
>       // const API_URL = process.env.VUE_APP_API_URL;
>       const API_URL = "https://api.themoviedb.org/3/movie";
>       try {
>         const temp_movies = [];
>         let min_vote = 1e9;
>         let all_avg = 0;
>         for (let i = 0; i < this.movies.length; i++) {
>           const API_URL_C = `${API_URL}/${this.movies[i].movie_num}/similar`;
>           const response = await axios.get(API_URL_C, {
>             params: {
>               api_key: API_KEY,
>               language: "ko-KR",
>             },
>           });
>           const temp_arr = response.data.results;
>           for (let j = 0; j < temp_arr.length; j++) {
>             temp_movies.push(temp_arr[j]);
>             console.log(temp_arr[j]);
>             if (min_vote > temp_arr[j].vote_count) {
>               min_vote = temp_arr[j].vote_count;
>             }
>             all_avg = all_avg + temp_arr[j].vote_average;
>           }
>         }
>         all_avg = all_avg / (this.movies.length * 20);
>         this.recommend_movies = temp_movies.reduce((acc, current) => {
>           const x = acc.find((item) => item.id === current.id);
>           if (!x) {
>             return acc.concat([current]);
>           } else {
>             return acc;
>           }
>         }, []);
>         this.recommend_movies = this.recommend_movies.sort(function (a, b) {
>           var comp_a =
>             a.popularity * 0.1 +
>             (a.vote_count / (a.vote_count + min_vote)) * a.vote_average +
>             (min_vote / (min_vote + a.vote_count)) * all_avg;
>           var comp_b =
>             b.popularity * 0.1 +
>             (b.vote_count / (b.vote_count + min_vote)) * b.vote_average +
>             (min_vote / (min_vote + b.vote_count)) * all_avg;
>           if (comp_a > comp_b) {
>             return -1;
>           } else if (comp_a < comp_b) {
>             return 1;
>           }
>           return 0;   return 0;
>         });
>         this.recommend_movies = this.recommend_movies.slice(0, 3);
>       } catch (err) {
>         console.log(err);
>       }
>     },
>   },
> };
> </script>
> ```

3. 영화 리뷰 커뮤니티

> - 커뮤니티 홈화면
> 
> ![](Final%20Project%20README_assets/38b66d72b46a29b216545425cce66d85fd215d2b.png)
> 
> - 커뮤니티 detail
> 
> ![](Final%20Project%20README_assets/c3bd32af3e117439f1af3e810e6f8bbffa1a0be5.png)
> 
> ![](Final%20Project%20README_assets/b0b830de32ace3dbefac43d731393d2fce5a4b14.png)
> 
> 커뮤니티 구성은 게시글과 댓글 구조로 만들었습니다. 
> 
> 특히 수정, 삭제 기능을 구현할 때 로그인 사용자가 작성한 글과 댓글만 버튼이 활성화 되도록 v-if를 이용해서 구성했습니다. 
> 
> - 로그인 사용자의 커뮤니티 화면
> 
> ![](Final%20Project%20README_assets/3d6d7c82ad20990a815c65581a041cdf4a2507e1.png)

4. 목표 서비스 구현 정도

## iii. ERD

> ![](Final%20Project%20README_assets/2dc09eadaa21aed8e368ae0ee39ef003074648f1.png)
> 
> 총 4개의 모델을 구성하고 Many to Many 필드로 인해 bridge table 하나를 추가했습니다.  따라서 다음과 같은 관계가 구성됐습니다.
> 
> 1. Movie: Community (1:N)
> 
> 2. User : Community (1:N)
> 
> 3. User : Comment(1:N)
> 
> 4. Movie : User (M:N)  -> 위시리스트 기능

### iv. 컴포넌트 구조

> ![](Final%20Project%20README_assets/86254e4a38dac8470f19a43d31aa3a929632b36f.png)

### v. 후기

> - 조은비
>   
>   페어와 함께 프로그램 기획 단계부터 설계, 서비스 구현까지 직접 해보면서 백엔드와 프론트 엔드가 하는 일을 제대로 이해한 것 같습니다. 
>   
>   저희 팀은 DRF&VUE를 활용해 백과 프론트를 구성했는데, 프론트엔드 프레임워크를 사용해 Django 템플릿보다 더 깔끔한 프론트를 구성할 수 있었습니다.
>   
>    또한, 협의를 통해 백과 프론트를 나누는 것이 아닌, app 별로 역할을 나눠 페어가 만든 json을 바탕으로 프론트에 연결해 화면을 구성하거나 제가 만든 json으로 페어가 화면을 구성하면서 각각 백과 프론트에서 발생할 수 있는 오류를 다양하게 경험했습니다. 해당 오류를 해결하면서 어떤 쪽에서 설계하는 게 더 효율적인지, 어떻게 백을 설계하면 프론트에서 오류가 발생하는 지 등을 자세히 이해하게 된 것 같습니다.
>   
>   - 스크럼
>   
>   ![스크럼](Final%20Project%20README_assets/5a2cf2ede608abb30a8bf6643f253bfd4588ad93.png)
>   
>   프로젝트를 진행하는 동안 일 단위로 스크럼을 진행하면서 그 때 그 때 상황에 맞게 필요한 요소들을 개발하고 개선했는데, 이 활동을 통해 빠르고 효율적인 협업을 경험했습니다.
> 
> - 변유정
> 
>         - 백엔드 : community / 페어 : movie
> 
>         - 프론트엔드 : movie & css / 페어 : community & comment & wishlist
> 
>         페어와 구현하는 앱을 바꿔서 구현하면서 백엔드, 프론트엔드를 같이 구현할 수 있었다. 앱 별로 해결한 덕분에, 문제 발생 시, 개인이 해결하는 것이 아니라 페어와 함께 도와가면서 할 수 있었다.
> 
>         css의 경우, 부트스트랩과 패키지 활용해서 구현. 사용자 입장에서 고려를 하지 않은 채, 웹 페이지 제작하다가 피드백 후, 영화 관련 사이트, 커뮤니티 사이트를 참고 후 수정하였다.
> 
>         알고리즘의 경우 실제 영화 사이트에서 활용하고 있는 알고리즘 공식을 참고하여 사용. 알고리즘을 구현하다가 왜 이 데이터가 필요한 지 알 수 있었다.
