import express from "express"
import { isAuth } from "../middleware/auth.mjs"
import * as postController from "../controller/posts.mjs"

const router = express.Router()

// 전체 포스트 가져오기
// 주소 : http://127.0.0.1:8080/post (GET)
router.get("/", isAuth, postController.getPosts)

// 특정 포스트 가져오기
// 주소 : http://127.0.1:8080/post/:id (GET)
router.get("/:id", isAuth, postController.getPost)


// 포스트 작성
// 주소 : http://127.0.0.1:8080/post (POST)
router.post("/", isAuth, postController.createPost)

// 포스트 수정
// 주소 : http://127.0.0.1:8080/post/:id (PUT)
router.put("/:id", isAuth, postController.updatePost)

// 포스트 삭제
// 주소 : http://127.0.0.1:8080/post/:id (DELETE)
router.delete("/:id", isAuth, postController.deletePost)

export default router