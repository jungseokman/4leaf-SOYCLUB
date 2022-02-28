const express = require('express');
// express : Node.js를 위한 빠르고 개방적인 간결한 웹 프레임워크
// 서버를 쉽게 구성할 수 있게 만든 프레임워크
// 프레임워크란, 클래스와 라이브러리의 집합체라고 보면 된다
// Express 모듈을 가져옴

const morgan = require('morgan');
// morgan은 HTTP request logger middleware로 HTTP요청에 대한 log를 남겨주는 미들웨어입니다.

const dotenv = require('dotenv');
// dotenv는 .env라는 외부 파일에 중요한 정보를 환경변수로 저장하여 정보를 관리할 수 있게 해준다.
dotenv.config();
// .env파일에서 환경변수를 불러온다.
// 현재 디렉토리의 .env 파일을 가동으로 인식하여 환경 변수를 세팅한다
// dotenv.config(경로) 는 원하는 .env파일의 위치를 직접 지정하여 세팅할 수 있다.
// .env 파일을 파싱(분석)한 객체가 리턴되며 process.env에 셋팅된다.

const cors = require('cors');
//CORS = Cross-OPrigin Resource Sharing
//합의된 출처들 간에 합법적으로 허용해주기 위해 어떤 조건을 충족시키면 리소스 공유가 되도록 만들어진 메커니즘이 CORS(교차 출처 자원 공유 방식)이다
//https://beomy.github.io/tech/browser/cors/

const userRouter = require("./routers/userRouter");
const msgRouter = require("./routers/msgRouter");

const PORT = process.env.PORT;
// .env 로부터 불러온 환경 변수를 사용하기 위해서는 process.env.변수명 키워드를 사용한다.

const app = express();
// app이라는 새로운 Express 앱을 만듦 (express를 사용하는 상태로 변수에 저장)

app.use(cors());
// 별도의 처리 없이 app.use(cors()) 를 하게 되면 모든 도메인에서 제한없이 해당 서버에 요청을 보내고 응답을 받을 수 있다.

app.use(morgan("dev"));
// "dev"형식으로 log를 남겨준다

app.use(express.json());
// expressjs에서 웹 서비스를 제작했을때, json으로 이루어진 Request Body를 받았을 경우, 요청값을 제대로 받아오지 못하는 문제가 발생하기때문에,
// 이러한 문제를 해결하기 위애 express.json()모듈을 사용하면 json요청을 제대로 받을 수 있다.

app.use(express.urlencoded({extended: true}));
// extended 옵션의 경우, true일 경우, 객체 형태로 전달된 테이터내에서 또 다른 중첩된 객체를 허용한다는 말이며, false인 경우는 허용하지 않는다는 의미이다.
// express에 내장된 미들웨어 기능이다
// extended 옵션을 false로 하게 되면 queryString 모듈, true인 경우 qs 모듈을 쓴다고 한다. true인 경우 내부 중첩된 경우에도 인코딩을 해준다.
// 또한 form 데이터를 전송시 바디 내용을 올바르게 전달하려면 extended: true 옵션을 줘야 한다고 한다.
// https://ichi.pro/ko/eojjaessdeun-express-urlencodedneun-mueos-eul-habnikka-153778324213278
// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436

app.use("/api/user", userRouter);
app.use("/api/msg", msgRouter);

app.listen(PORT, () => {
    console.log(`${PORT} API SERVER START`);
});
// 위에서 설정한 port에서 앱을 실행시킨다.