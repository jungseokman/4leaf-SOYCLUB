import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import GlobalStyle from "./global/Globalstyles";
import { HashRouter } from "react-router-dom";
// HashRouter 의 특징 : 주소에 해쉬(#)가 붙는다.
//                    검색 엔진이 읽지 못한다.
//                    URL Hash를 사용하는 HashRouter는 지원되는 브라우저나 웹 서버에 제한이 없다.
//                    해시 히스토리(History location)를 지원하지 않는다. (BrowserRouter에서는 History location을 지원한다.)


ReactDOM.render(
    <>
        <GlobalStyle />
        <HashRouter>
            <App />
        </HashRouter>
    </>, 
    document.getElementById("app")
);


