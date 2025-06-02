// 여기에 addNumbers 함수 작성
let addNumbers = (a,b,callback) => {
  callback(a+b);
};

function display(result) {
  console.log(result);
}
addNumbers(10, 20, display);