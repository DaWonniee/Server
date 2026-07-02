import express from "express"

const router = express.Router()

// 전체 포스트 가져오기
router.get("/", (req, res) => {
  // 전체 포스트 가져오기 로직 구현
  res.send("전체 포스트 가져오기 완료")
})

// 특정 포스트 가져오기
router.get("/:id", (req, res) => {
  const postId = req.params.id
  // 특정 포스트 가져오기 로직 구현
  res.send(`포스트 ${postId} 가져오기 완료`)
})

// 포스트 작성
router.post("/", (req, res) => {
  // 포스트 작성 로직 구현
  res.send("포스트 작성 완료")
})

// 포스트 수정
router.put("/:id", (req, res) => {
  const postId = req.params.id
  // 포스트 수정 로직 구현
  res.send(`포스트 ${postId} 수정 완료`)
})

// 포스트 삭제
router.delete("/:id", (req, res) => {
  const postId = req.params.id 
    // 포스트 삭제 로직 구현
    res.send(`포스트 ${postId} 삭제 완료`)
})

export default router