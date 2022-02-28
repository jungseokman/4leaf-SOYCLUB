const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/send", (req, res, next) => {
    const {toId, fromId, content} = req.body;
    const insertQuery = `
        INSERT INTO message (
            content,
            fromUserId,
            toUserId,
            createdAt
        ) VALUES (
            "${content}",
            ${fromId},
            ${toId},
            NOW()
        )
    `;
    try {
        db.query(insertQuery, (err, rows) => {
            if(err) {
                throw "쿼리 실패"
            }
            return res.status(201).send(rows);
        })
    } catch(e) {
        console.error(e);
        return res.status(400).send("데이터 가져오는데 실패했습니다.")
    }
    
})

router.post("/receive", (req, res, next) => {
    const {userId} = req.body;
    const receiveQuery = `
        SELECT  username
        FROM    users
        WHERE   id = "${userId}"
    `;
    try {
        db.query(receiveQuery, (err, rows) => {
            if(err) {
                throw "리시브 쿼리 실패"
            }
            console.log(rows[0])
            return res.status(200).send(rows[0])
        })
    } catch(e) {
        console.err(e);
        return res.status(400).send("메세지 보낼 유저 이름을 얻는데 실패했습니다.")
    }
})

module.exports = router;