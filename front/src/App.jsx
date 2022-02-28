import React, {useEffect, useState} from "react";
import Nav from "./components/Nav";
import styled from "styled-components";
//styled-components : 기존 돔을 만드는 방식인 css,scss 파일을 밖에 두고, 태그나 id,class이름으로 가져와 쓰지 않고,
//                    동일한 컴포넌트에서 컴포넌트 이름을 쓰듯 스타일을 지정하는 것.
//                    javascript 파일 내에서 css를 사용할 수 있게 해주는 대표적인 라이브러리이다.

import { Routes, Route, useLocation } from "react-router-dom";
// react-router : 코어까지 들어있는 master 브랜치에 있는 라이브러리다.
// react-reouter-dom : DOM이 인식할 수 있는 컴포넌트들만 있는 라이브러리다 (코어 없음)
//                     리액트 라우터는 리액트의 화면 전환을 도와주는 역할을 한다.
//                     리액트 라우터 돔을 이용하여, 페이지의 로딩 없이, 페이지에 필요한 컴포넌트를 불러와 렌더링하여 보여주도록 도와준다.

import List from "./pages/List";
import Message from "./pages/Message";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Send from "./pages/Send";


const MainDiv = styled.div`
    width: 100%;
    height: calc(100vh - 60px);

    overflow-y: scroll;
`;

const NavDiv = styled.div`
    width: 100%;
    height: 60px;
`;


const App = () => {

    const [path, setPath] = useState("/");

    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, []);

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);
    return (
        <section>
            <Routes>
                <Route index element={<Login />} />
            </Routes>

            {path === "/" ? null : (
                <>
                    <MainDiv>
                        <Routes>
                            <Route path="/list" element={<List />} />
                            <Route path="/message" element={<Message />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/setting" element={<Setting />} />
                            <Route path="/send/:key" element={<Send />} />
                        </Routes>
                    </MainDiv>

                    <NavDiv>
                        <Routes>
                            <Route path="/list" element={<Nav />} />
                            <Route path="/message" element={<Nav />} />
                            <Route path="/profile" element={<Nav />} />
                            <Route path="/setting" element={<Nav />} />
                        </Routes>
                    </NavDiv>
                </>
            )}

            
        </section>
    );
};


export default App;
