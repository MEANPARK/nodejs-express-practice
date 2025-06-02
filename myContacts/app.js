const express = require("express");
const dbConnect = require("./config/dbConnect.js");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const checkLogin = require("./middlewares/checkLogin");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views"); //spring boot resources templates 같은 역할

app.use(express.static("./public")); //css, js, image 사용용

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// 쿠키 파싱 미들웨어 등록
app.use(cookieParser());

app.use("/", require("./member/routes/loginRoutes.js"));
app.use("/contacts", checkLogin, require("./contacts/routes/contactRoutes.js"));

// Sequelize와 DB 동기화
// force: true (주의!) -> 기존 테이블 삭제 후 재생성(테스트 상황)
// alter: true -> 기존 테이블은 유지 스키마를 데이터베이스에 맞춰 수정
dbConnect.sync({ alter: true }) 
.then(() => {
    console.log('✅ 테이블이 생성되었습니다!');
})
.catch((err) => {
    console.error('❌ 테이블 생성 실패:', err);
});

app.listen(3000, () => {
    console.log('서버 실행중');
});