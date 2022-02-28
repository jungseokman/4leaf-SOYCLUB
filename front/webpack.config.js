"use strict";
// 암묵적인 "느슨한 모드(sloppy mode)"를 해제하고, 명시적인 "엄격모드(Strict Mode)"를 사용하는 방법이다.
// 엄격하게 적용함으로써 일반적인 코딩 실수나 안전하지 않은 동작을 포착한다.
// 1. 이 모드에서는 javascript 오류는 아니지만 함정이 될 어떤 일을 오류가 발생하도록 변경하여 제거한다. => 디버깅이 쉬워진다.
// 2. javascropt 엔진의 최적화 처리를 어렵게 만드는 오류를 수정한다. => 비 strict 모드의 동일한 코드보다 빠르게 수행할 수 있다.
// 3. 미래의 ECMAScript로 정의될 예정 구문을 금지한다. => 발생가능한 에러를 예방한다.

const path = require("path");
// path : 파일과 폴더의 경로 작업을 위한 기능을 제공하는 Node.js 기본 모듈
// __filename : 현재 파일 경로
// __dirname : 현재 폴더 경로
// const path = require("path"); : path 모듈 불러오기
// path.normalize : 최적화해서 저장.
// path.join : string 형식의 인자들을 현재 운영체제에 맞춰 경로를 설정해줌.
// path.resolve : string형식의 인자들을 합쳐서, 운영체제에 맞게 최적화된 경로를 설정해준다.
// path.dirname : 폴더 경로 출력
// path.basename : 파일 출력
// path.parse : 경로를 분석해서, 형식에 따라 분류해준다.

const CopyWebpackPlugin = require("copy-webpack-plugin");
// copy-webpack-plugin은 특정한 티렉터리나 파일을 복사해 번들링 된 폴더 내에 경로로 삽입하는 플러그인이다.

const Dotenv = require("dotenv-webpack");
// dotenv 및 기타 환경 변수를 지원하고 사용자가 선택하고 사용하는 것만 노출하는 보안 웹팩 플러그인이다.
// dotenv 패키지 : DeflinePlugin을 통해 수동으로 전역 변수 정의
// dotenv-webpack 패키지 : 플러그인에 now Dotenv() 추가

module.exports = {
    resolve : {
        extensions: [`.js`, `.jsx`],
    },
    entry : {
        main: ["./src/main.js"],
    },
    node : {
        fs: "empty",
        net: "empty",
    },
    output : {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
    },
    module : {
        rules: [
            {
                test : /\.(js|jsx)$/,
                include : path.resolve(__dirname, "./src"),
                loader : "babel-loader",
                // babel-loader : 웹팩과 바벨을 연동시키도록 해준다.
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader", 
                // import한다는 말은 css파일을 하나의 모듈로 취급하여 js,tsx파일에서 볼러 사용한다는 것인데,
                // css 파일을 불러오기 위해 사용하는 로더가 css-loader이다.
                // js 파일에서 css 파일을 불러오기 위해 사용하는 로더가 css-loader이다.

                // style-loader 는 css-loader을 이용해 웹팩 의존성 트리에 추가된 string 값들을
                // 돔에 <style></style>로 넣어준다. 이를 통해 import 구문을 이용해 각 js 파일에 불러들려진
                // 스타일 파일이 html 파일 안에 style태그로 존재할 수 있게 된다.

                // 웹팩에서 style-loader와 css-loader을 함께 설정할 때 조심해야 하는 부분은,
                // 선언된 순서가 잘못되면 의도한것처럼 작동하지 않는다.
                // 배열 안에 있는 값들의 역순으로 로더들이 작동하게 된다.
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 10000,
                      fallback: "file-loader",
                      name: "images/[name].[ext]",
                    },
                    // file-loader : 이름 그대로 파일을 로딩한다.
                    // url-loader : 작은 이미지나 글꼴 파일은 복사하지 않고,
                    //              문자열 형태로 변환하여 번들 파일에 넣어버린다
                  },
                ],
              },
              {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 10000,
                      fallback: "file-loader",
                      name: "fonts/[name].[ext]",
                    },
                  },
                ],
            },
        ],
    },
    plugins : [
        new CopyWebpackPlugin([
            {
                context: "./public",
                from: "*.*",
            },
        ]),
        new Dotenv(),
    ],
    devtool : "eval-source-map",


    //
    devServer : {
        contentBase: "./public",
        host : "localhost",
        port : 3000,
    },
};