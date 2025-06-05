const express = require("express");
require('dotenv').config();
const expressLayouts = require("express-ejs-layouts");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(methodOverride("_method"));

app.use("/", require("./routes/main"));
app.use("/", require("./routes/admin"));

// Sequelize와 DB 동기화
// force: true (주의!) -> 기존 테이블 삭제 후 재생성(테스트 상황)
// alter: true -> 기존 테이블은 유지 스키마를 데이터베이스에 맞춰 수정
sequelize.sync({ alter: true }) 
.then(async () => {
    console.log('✅ 테이블이 생성되었습니다!');
    // 초기 데이터 삽입
    // const Post = require('./models/post');
    // await Post.bulkCreate([
    //     { title: "제목 1", body: "내용 1 - qqqqqqqqqqqqqqqqqqqqqqeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrwwwww" },
    //     { title: "제목 2", body: "내용 2 - qqqqqqqqqqqqqqqqqqqqqqeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrwwwww" },
    //     { title: "제목 3", body: "내용 3 - qqqqqqqqqqqqqqqqqqqqqqeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrwwwww" },
    //     { title: "제목 4", body: "내용 4 - qqqqqqqqqqqqqqqqqqqqqqeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrwwwww" },
    //     { title: "제목 5", body: "내용 5 - qqqqqqqqqqqqqqqqqqqqqqeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrwwwww" }
    // ]);
})
.catch((err) => {
    console.error('❌ 테이블 생성 실패:', err);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});