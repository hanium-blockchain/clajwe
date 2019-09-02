# CLAJWE

#### 블록체인을 활용한 자산 유동화 플랫폼
#### 정지우, 최리안, 최은지

---

**시작방법**

```
git clone https://github.com/hanium-blockchain/clajwe.git

npm install
npm start
```





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

|  |  |____detail_config.pug

|  |  |____detail_context.pug

**|  |____detail_includes**

|  |  |____etc.pug





**DB**

| Table명    | PK       | FK                           |                                                              |
| ---------- | -------- | ---------------------------- | ------------------------------------------------------------ |
| Users      | user_id  |                              | name<br/>id<br/>pwd<br/>email<br/>is_evaluator               |
| Hashes     | hash_id  | user_id                      | hash_code                                                    |
| Assets     | asset_id | user_id(등록자)              | address<br/>category<br/>asset_no<br/>asset_name<br/>area<br/>completion_date<br/>Description<br/>date(등록일자)<br/>is_chain<br/>end_date<br/>is_evaluate<br/>is_approved |
| Coins      | coin_id  | user_id<br />asset_id        | coin                                                         |
| Evaluators | ev_id    | user_id                      | li_no<br/>li_Category<br/>li_date<br/>li_birth<br/>li_inner (내지번호) |
| Values     | value_id | asset_id<br/>user_id(평가자) | value<br/>value2coin                                         |



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







