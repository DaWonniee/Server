import express from "express"

// router 객체
const router = express.Router()

// 회원가입
// 주소 : http://127.0.0.1:8080/post/signup (POST)
router.post("/signup", authController.signup)

// 로그인
router.post("/login", (req, res) => {
  // 로그인 로직 구현
  res.send("로그인 완료")
})

// 로그인 유지 체크
router.get("/check", (req, res) => {
  // 로그인 유지 체크 로직 구현
  res.send("로그인 유지 체크 완료")
})

// 로그아웃
router.post("/logout", (req, res) => {
  // 로그아웃 로직 구현
  res.send("로그아웃 완료")
})  


export default router    // router 객체를 내보내기