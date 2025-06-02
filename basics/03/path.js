// path 모듈 연습하기 ( 결과 비교 파일 : 03\results\path.js)
const path = require("node:path");

//join
const fullpath = path.join('some', 'work', 'ex.txt');
console.log(fullpath);

//경로만 추출 - dirname
const dir = path.dirname(fullpath);
console.log(dir);

//파일 이름만 추출
const fn1 = path.basename(__filename);
console.log(fn1);

//파일 확장자 뺴고 가져오기기
const fn2 = path.basename(__filename, '.js');
console.log(fn2);