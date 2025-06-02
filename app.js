const express = require("express");
const dbConnect = require("./config/dbConnect.js");
const Contact = require("./contacts/models/contactModel.js");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, Node!");
});

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use("/contacts", require("./contacts/routes/contactRoutes.js"));

// Sequelize와 DB 동기화
dbConnect.sync({ alter: true }) // 또는 force: true (주의!) 기존 테이블 삭제 후 재생성성
.then(() => {
    console.log('✅ 테이블이 생성되었습니다!');
})
.catch((err) => {
    console.error('❌ 테이블 생성 실패:', err);
});

app.listen(3000, () => {
    console.log('서버 실행중');
});