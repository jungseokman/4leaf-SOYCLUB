import React, { useCallback, useState } from "react";
// useCallback : 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.
//               컴포넌트에서 props가 바뀌지 않으면 Virtual DOM에 새로 렌더링 하는 것조차 하지 않고 최적화를 진행한다.
//               불필요한 렌더링을 방지하기 위해 참조의 동일성에 의존적인 최적화된 자식 컴포넌트에 콜백을 전달할 때 유용하다.
// useCallback(callback, [변경되는 값]) : 두번째 배열이 바뀌기전까지 함수 자체를 기억.
//                                   : 함수 생성 자체가 오래걸리는 경우(=함수 내의 연산이 복잡한 경우)쓰면 최적화에 도움됨
//                                   : 변경되는 값이 없다면 state 값을 맨처음 값만 기억.
//                                   : 변경되는 값이 있을때 새로운 값을 기억할 수 있다.
//                                   : 자식컴포넌트에 함수를 props로 내릴때는 useCallback을 반드시 사용(자식 리렌더링 방지)
// useMemo : 특정 결과 값을 재사용할 때 사용한다.
//         : 두번째 배열이 바뀌기전까지 값을 기억
//         : 함수 컴포넌트는 매번 함수가 새로 그려지며 실행되기 때문에 한번만 실행되면 되는 함수도 계속 호출되는 문제 발생
//         : 변경되는 값이 없다면 한번만 실행후 값을 보관하는 역할로 쓸 수 있다.
//         : 복잡한 함수의 'return값'을 기억해야 할 때
// useRef : 클래스로 치면 멤버변수 혹은 dom객체 처럼 특정한 '값'만 기억해야 할 때

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Axios는 브라우저, Node.js를 위해서 만들어진 Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다.
// (백엔드와 프론트엔드 간에 통신을 위해서 만들어진 AJAX도 더불어 사용하기도 한다)
// Axios는 운영환경에 따라서 브라우저간 XMLHttpRequest 객체 또는 Node.js의 HTTP API를 사용한다.
// Promose(ES6) API를 사용
// 요청(Request) 응답(reply)을 JSON 형태로 자동 변경.

import { message } from "antd";
// antd : 중국에서 개발한 디자인 개발을 위한 프레임워크이다. 완성도 높은 UI 프레임 워크이다.
//        Bootstrap는 12개 요소로 구분되어 있지만, antd는 25개 요소로 구분되어 있다.

const Whole = styled.div`
    width: 100%;
    height: 100vh;

    overflow: hidden;
`;

const Wrapper = styled.div`
    width: 100%;
    height : ${(props) => props.height};

    padding: 0px 25px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const RowWrapper = styled(Wrapper)`
    flex-direction: row;
    align-items : center;
    justify-content: space-around;
`;

const BotWrapper = styled(Wrapper)`
    background-color: #001;
    color: #fafafa;

    font-size: 11.5px;
`;

const MainTitle = styled.div`
    font-size : 28px;
    color : #1e1e1e;
`;

const LoginInput = styled.input`
    width: 100%;
    height : 35px;

    border-radius: 7px;
    border: none;
    box-shadow: 4px 4px 10px #999;
    outline: none;
    padding: 0px 5px;

    transition : 0.5s;

    &:focus {
        box-shadow : 4px 4px 10px skyblue;
    }
`;

const EmailGuide = styled.span`
    font-size: 11.5px;
    color: #999;
    margin-top: 15px;
`;

const SignBtn = styled.button`
    width: 85%;
    height: 40px;

    border-radius: 7px;
    border: none;

    margin-bottom: 5px;

    color: #ffe;
    background-color: ${(props) => props.bg};

    box-shadow : 2px 2px 2px #d2d2d2;
`;

const FindText = styled.span`
    font-size: 11.5px;
    color : #0984e3;
    font-weight: 700;
    margin: 0px 15px;
`;

const Login = () => {

    const [proc, setProc] = useState(1);
    const [emailV, setEmailV] = useState("");
    const [codeV, setCodeV] = useState("");
    
    const emailChangeHandler = useCallback((event) => {
        const { value } = event.target;
        setEmailV((prev) => value);
    }, [emailV]);

    const codeChangeHandler = useCallback((event) => {
        const { value } = event.target;
        setCodeV((prev) => value);
    }, [codeV]); 
    
    const navigate = useNavigate();

    const emailSubmit = async() => {
        console.log(emailV)

        const networkResult = await axios.post(
            "http://localhost:4000/api/user/checkEmail",
            {
                email: emailV,
            }
        );

        setProc(2);
    }

    const checkSubmit = async() => {
        console.log(codeV);

        const result = await axios.post(
            "http://localhost:4000/api/user/checkCode",
            {
                email: emailV,
                code : codeV,
            }
        )
        
        if(!result.data){
            message.error("로그인 정보가 올바르지 않습니다.")
            return;
        }

        localStorage.setItem("SOY.UserId", result.data.id);
        localStorage.setItem("SOY.Username", result.data.username);
        localStorage.setItem("SOY.Avatar", result.data.avatar);
        localStorage.setItem("SOY.Email", result.data.email);
        localStorage.setItem("SOY.Status", result.data.statusMsg);


        message.success(`${result.data.username}님, SOYCLUB에 오신걸 환영합니다.`)

        navigate("/list");
    }

        return (
            <Whole>
                {/*SECTION-1 [프로젝트 타이틀]*/}
                <Wrapper height="30vh">
                    <MainTitle>SOYCLUB</MainTitle>
                </Wrapper>

                {/*SECTION-2 [로그인 인풋]*/}
                <Wrapper height="37vh">
                    {proc === 1 ? <LoginInput type="email" value={emailV} onChange={emailChangeHandler}/> : <LoginInput type="text" value={codeV} onChange={codeChangeHandler}/>}
                    
                    <EmailGuide>
                        {proc === 1 
                            ? "로그인 할 이메일을 입력해주세요." 
                            : `이메일로 전송된 인증코드를 입력해주세여.`}
                    </EmailGuide>

                    <br />
                    <br />

                        {proc === 1 ? (<>
                                <SignBtn bg="#74b9ff" onClick={() => emailSubmit()}>SIGN IN</SignBtn>
                                <SignBtn bg="#0984e3">SIGN UP</SignBtn>
                            </> ): ( <>
                                <SignBtn bg="#0984e3" onClick={() => checkSubmit()}>CHECK CODE</SignBtn>
                            </> )}
                    
                </Wrapper>

                {/*SECTION-3 [아이디,비밀번호 찾기] */}
                <RowWrapper height="30vh">
                    <FindText>아이디 찾기</FindText>
                    <FindText>비밀번호 찾기</FindText>
                </RowWrapper>

                {/*SECTION-4 [푸터정보] */}
                <BotWrapper height="3vh">Develoment By 4LEAF.JSM</BotWrapper>
            </Whole>
        )
    
}

export default Login;