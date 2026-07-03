import express from "express"
import * as authController from "../controller/auth.mjs"
import { isAuth } from "../middleware/auth.mjs"


// router 객체
const router = express.Router()

// 회원가입
// 주소 : http://127.0.0.1:8080/auth/signup (POST)
router.post("/signup", authController.signup)
    

// 로그인
// 주소 : http://127.0.0.1:8080/auth/login (POST)
router.post("/login", authController.login)


// 로그인 유지 체크
// 주소 : http://127.0.0.1:8080/auth/me (GET)
router.get("/me", isAuth, authController.me)

// 로그아웃
// 주소 : http://127.0.0.1:8080/auth/logout (POST)
router.post("/logout", authController.logout)


export default router    // router 객체를 내보내기