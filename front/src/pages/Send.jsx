import { Button, Input } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TopBanner from "../components/TopBanner";


const {TextArea} = Input;


const ViewName = styled.div`
    margin: 10px;
    color: #999;
    font-size: 13px;
`;

const CustomTextArea = styled(TextArea)`
    margin: 10px;
    width: calc(100% - 20px);
    height: 250px;
    padding: 5px;

    resize: none;
    outline: none;
    border-radius: 5px;
    border: 1px solid skyblue;
`;

const CustomButton = styled(Button)`
    margin: 10px;
    width: calc(100% - 20px);
    height: 30px;

    outline: none;
    background-color: skyblue;
    color: #fff;

    border-radius: 5px;

    box-shadow: 3px 3px 3px #ccc;
`;

const Send = () => {
    const [sendKey, setSandkey] = useState(null);
    const [sendValue, setSendValue] = useState("");
    const [receiveUsername, setRecieveUsername] = useState("");

    const loc = useLocation();    

    useEffect(async() => {
        const path = loc.pathname.split("/");
        setSandkey(path[2])
        console.log(sendKey);
        const result = await axios.post("http://localhost:4000/api/msg/receive", {
            userId : sendKey,
        })
        const {data : {username}} = result;
        console.log(username)
        setRecieveUsername(username)
        //sendKey를 백으로 보낸다
        //백에서 받은 데이터로 user테이블에서 정보를 조회한다
        //프론트로 보낸다 프론트는 정보를 받아서 스테이트에 저장한다
    }, [sendKey]);

    

    const sendValueOnChange = useCallback((event) => {
        const {target : {value}} = event;
        setSendValue(value)
    }, [sendValue])

    const sendAction = useCallback(async() => {
        const result = await axios.post("http://localhost:4000/api/msg/send", {
            toId : sendKey,
            fromId : localStorage.getItem("SOY.UserId"),
            content : sendValue || "내용 없음",
        })
        console.log(result);
    }, [sendValue])

    return(
        <>
            <TopBanner title="Send Massage"/>
            <ViewName>{receiveUsername}님에게 메세지를 전송합니다</ViewName>
            <CustomTextArea onChange={sendValueOnChange} value={sendValue} />
            <CustomButton onClick={() => sendAction()}>쪽지 보내기</CustomButton>
        </>
    )
}

export default Send;