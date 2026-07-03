import jwt, { decode } from "jsonwebtoken"
import { config } from "../config.mjs"
import * as authRepository from "../data/auth.mjs"

const AUTH_ERROR = { message : "인증되지 않은 사용자입니다." }

export const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization")
    console.log("Authorization Header:", authHeader) // 디버깅용 로그 추가

    // Authorization 헤더가 없거나 "Bearer "로 시작하지 않는 경우 
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("헤더 없음 또는 잘못된 형식") // 디버깅용 로그 추가
        return res.status(401).json(AUTH_ERROR)
    }
    // authorization 헤더 양식 예제
    // Authorization: Bearer <token>

    // 토큰 분리
    const token = authHeader.split(" ")[1]
    jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
        if(err) {
            console.log("토큰 검증 실패:", err) // 디버깅용 로그 추가
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded) // 디버깅용 로그 추가
        const user = await authRepository.findById(decoded.id)
        if(!user) {
            console.log("해당 아이디 없음") // 디버깅용 로그 추가
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("userid :", user.id)
        console.log("user.userid :", user.userid)
        req.id = user.id // 사용자 ID를 요청 객체에 추가
        req.token = token // 토큰을 요청 객체에 추가
        next() // 인증 미들웨어를 통과하도록 설정
    })

}

