const express = require('express');
const nodemailer = require('nodemailer');
// node 서버에서 메일을 보낼 수 있는 메일 전송 모듈이다.
// 메일을 전송할 수 있고 보안성이 좋으며 유니코드 지원, HTML 문서를 메일 내용으로 사용, 파일 첨부 가능 등의 특징이 있다.

const smtpPool = require('nodemailer-smtp-pool');
// smpt 서버를 사용하기 위한 모듈이다.
// 이메일을 송수신하는 서버를 smpt 서버라고 한다.

const db = require("../db")

const router = express.Router();
// 라우팅이란 url의 정의와 url이 클라이언트 요청에 응답하는 방식이다.
// 어떤 네트워크 안에서 데이터를 통신할 때 최적의 경로를 선택하는 과정이다.
// express.Router (express 라우터 분리) : 라우터를 모듈로 작성해 라우터 모듈에 미들웨어 함수를 로드하고 기본 앱의 한 경로로 
//                                     라우터 모듈을 마운트하여 사용할 수 있다.
//                                     경로가 많은 프로젝트에서 express.Router를 통해 라우터를 분리함으로써 코드 복잡도를 낮출 수 있다.

const smtpTransport = nodemailer.createTransport(
    smtpPool({
      service: "Gmail",
      host: "localhost",
      port: "465",
      tls: {
        rejectUnauthorize: false,
      },
  
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
      maxConnections: 5,
      maxMessages: 10,
    })
);
// nodemailer 의 createTransport 는 transporter(운송자) 객체를 만드는 메소드인데
// 위의 메소드 참조값 변수 smtpTransport는 nodemailer-smtp-pool 객체 인스턴스에 인자값으로 쓰인다.
// SMTP : 인터넷에서 메일을 주고 받기 위한 전송규약 및 프로토콜이다.
//        실무에서 쓰이는 용도로는 smtp(25) 프로토콜을 이용해 전자메일을 발신하는 서버로써 사용됩니다.
//        중계전달자 역할을 함으로써 메일서버간의 송수신뿐만 아니라 메일 클라이언트에서 서버로 보낼 때 사용되는 프로토콜입니다.
//        인터넷에서 이메일을 교환할 때 그 과정을 정렬해줍니다.
// 프로토콜(Protocol) : 통신 프로토콜 또는 통신 규약은 컴퓨터나 원거리 통신 장비 사이에서 메세지를 주고 받는 양식과 규칙의 체계이다. 즉 통신 규약 및 약속이다.

router.post("/checkEmail", (req, res, next) => {
    const {email} = req.body;
    try {

        if(!email) {
            throw "이메일은 필수 입력값입니다.";
        }
        const query1 = `
            SELECT email
            FROM users
            WHERE email = "${email}"
        
        `

        db.query(query1, async(err, rows) => {
            if(err) {
                console.error(err);
                throw "데이터베이스 쿼리 실행에 실패했습니다."
            }
            console.log(rows);

            if(rows.length === 0) {
                return res.status(200).send("등록되지 않은 회원입니다.")
            }

            const ran1 = Math.floor(Math.random() * 10);
            const ran2 = Math.floor(Math.random() * 10);
            const ran3 = Math.floor(Math.random() * 10);
            const ran4 = Math.floor(Math.random() * 10);
        
            const randomCode = "" + ran1 + ran2 + ran3 + ran4;

            const sendInfo = {
                from: "soyclub.com",
                to: email,
                subject: "🔐 SOYCLUB에서 보낸 보안코드입니다.",
                html: `로그인에 필요한 보안코드는 <strong>${randomCode}</strong> 입니다.`,
            }

            await smtpTransport.sendMail(sendInfo, (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(info);
                }
            });
            const updateQuery = `
                UPDATE  users
                SET     secretCode = "${randomCode}"
                WHERE   email = "${email}"
            `;

            db.query(updateQuery, (err, rows) => {
                if(err) {
                    console.error(err);
                } else {
                    return res.status(200).send("SUCCESS");
                }
            });
        })
    } catch (error) {
        console.error(error);
        return res.status(400).send('오류가 발생했습니다.')
    }

});

router.post("/checkCode", (req, res, next) => {
    const {email, code} = req.body;

    const selectQuery = `
        SELECT  id,
                avatar,
                email,
                username,
                statusMsg
        FROM    users
        WHERE   email = "${email}"
        AND     secretCode = "${code}"
    `;

    try {

        db.query(selectQuery, (err, rows) => {
            if(err) {
                console.error(err);
                throw "서버 장애가 발생했습니다. 잠시 후 시도해주세요."
            }
            if(rows.length === 1) {
                return res.status(200).json(rows[0]);
            } else {
                return res.status(200).json(null);
            }
        })

    } catch (e) {
        console.error(e);
        return res.status(400).send("잘못된 접근입니다. 다시 시도해주세요.");
    }
})

router.post("/friend/list", (req, res, next) => {
    const {loggedId} = req.body;
    const selectQuery = `
    SELECT 	B.id,
            B.avatar,
            B.username,
            B.statusMsg,
            B.email
    FROM 	friends A
    INNER
    JOIN 	users B
    ON		A.whom = B.id
    WHERE	A.who = ${loggedId}
    ORDER BY B.username ASC
    `;

    try {
        db.query(selectQuery, (err, rows) => {
            if(err) {
                throw "데이터 베이스 접근에 실패하였습니다."
            }
            return res.status(200).json(rows);
        });
    } catch(e) {
        console.error(e);
        res.status(400).send("친구 목록을 불러오는 데 실패했습니다.");
    }
});

module.exports = router;