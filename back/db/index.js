const mysql2 = require('mysql2');
// MySQL 클라이언트 가져오기

const dotenv = require("dotenv");
dotenv.config();

const db = mysql2.createPool({
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
})
// 데이터 베이스와 연결
// createPool : 연결 풀 사용, 연결 풀은 이전 연결을 재사용하여 MySQL서버에 연결하는데 소요되는 시간을 줄이는 데 도움이 된다.

module.exports = db;
// 모듈이란 관련된 코드들을 하나의 코드 단위로 캡슐화 하는 것을 말한다.
// 모듈이란 관련된 객체들의 집합소.
// 어떠한 기능을 수행하기 위해 함수 또는 객체들을 만들어 놨으면, 그걸 한.js의 파일에 써놓기엔 가독성이나 유지보수가 좋지 않아서,
// 관련 함수 또는 객체들을 .js파일별로 따로 모아놓은것들을 모듈이라고 생각하면 된다.
// exports 와 module.exports 의 차이점
// let module = { exports: {} };
// let exports = module.exports;
// return module.exports;
// exports 가 module.exports객체를 call by reference 방식으로 바라보고 있으며, 최종적으로 리턴 값은 module.exports 라는 것이다.
// exports 는 property 방식으로 사용, module.exports는 바로 사용가능.
// exports 를 바로 써버리면 module.exports의 call by reference 관계를 끊어 버려서 exports 라는 변수가 되버린다
