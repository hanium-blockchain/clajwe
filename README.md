## CLAJWE : 블록체인을 활용한 자산 유동화 플랫폼
- 정지우, 최리안, 최은지

<br/>



### 시작 방법

```
git clone https://github.com/hanium-blockchain/clajwe.git

npm install
npm start
```

<br/>


### 프로젝트 소개 

- 다양한 자산을 기반으로 블록체인에 등록(ERC-721 토큰 발행)
- 해당 자산을 평가한 후에 이를 토큰으로 발행(자산을 평가금액으로 분할)
- 발행된 토큰을 청약 및 청산, 다양한 다른 토큰으로 교환하는 기능을 구현

<br/>


### 주요 기능

- 자산 등록 : 다양한 자산을 ERC-721 토큰화 하여 플랫폼에 등록함
- 자산평가,토큰발행 : 등록된 자산을 평가하고 이를 기반으로 토큰을 발행함
- 토큰청약, 청산 : 토큰을 청약받고, 계약조건에 따라 다시 청산(수익 발생)한다.
- 토큰교환 : 정의된 교환비율에 의해 다양한 토큰 및 암호화폐와 교환한다.

<br/>


### 









**VIEW**

**|____views**

|  |____layout.pug

|  |____index.pug

|  |____error.pug

**|  |____includes**

|  |  |____nav.pug

|  |  |____footer.pug

|  |  |____header.pug

**|  |____user**

|  |  |____mypage.pug

|  |  |____login.pug

|  |  |____signin.pug

**|  |____list**

|  |  |____regi_invest_list.pug

|  |  |____manager_list.pug

|  |  |____assign_list.pug

**|  |____detail**

|  |  |____new_register.pug

|  |  |____detail_context.pug

|  |  |____eval_detail.pug

|  |  |____invest_detail.pug

|  |  |____invest_info.pug

**|  |____detail_includes**

|  |  |____eval_form.pug

|  |  |____invest_form.pug

|  |  |____invest_info.pug



<br/>



**DB**

| Table명    | PK       | FK                           |                                                              |
| ---------- | -------- | ---------------------------- | ------------------------------------------------------------ |
| Users      | user_id  |                              | name<br/>password<br/>email<br/>is_evaluator<br/>is_Manager<br/>sign_date               |
| Hashes     | hash_id  | user_id                      | hash_code                                                    |
| Assets     | asset_id | user_id(등록자)              | address<br/>category<br/>asset_no<br/>asset_name<br/>area<br/>completion_date<br/>Description<br/>date(등록일자)<br/>end_date<br/>is_evaluate<br/>is_approved<br/>picture |
| Coins      | coin_id  | user_id<br />asset_id        | coin                                                         |
| Evaluators | ev_id    | user_id                      | li_no<br/>li_Category<br/>li_date<br/>li_birth<br/>li_inner (내지번호) |
| Values     | value_id | asset_id<br/>user_id(평가자) | value<br/>value2coin                                         |



<br/>



**URL**

| Router      | View             | URL                |
| ----------- | ---------------- | ------------------ |
| users       | 로그인           | users/login        |
|             | 회원가입         | users/signin       |
|             | 마이페이지       | users/mypage       |
| index       | 홈               | home/              |
| registers   | 등록화면         | registers/new      |
|             | 등록 후          | registers/detail   |
| investments | 투자 리스트      | investments/list   |
|             | 투자 상세화면    | investments/detail |
| evaluations | 평가 리스트      | evaluations/list   |
|             | 평가 상세화면    | evaluations/detail |
| managers    | 평가리스트  등록 | 007/register       |
|             | 평가자 승인      | 007/assign         |







