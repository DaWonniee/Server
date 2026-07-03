import * as postRepository from "../data/posts.mjs"

//포스트 작성하는 함수
export async function createPost(req, res)  {
    const { text } = req.body // userid 를 비롯한 사용자 정보는 헤더에 딸려오기에 text 만 보면 됨
    const post = await postRepository.create(text, req.id) // req.id 는 auth 미들웨어에서 설정한 사용자 id
    res.status(201).json(post)
}

// 모든 포스트를 가져오는 함수
export async function getPosts(req, res) {
    const userid = req.query.userid // 쿼리 파라미터에서 userid 가져오기
    const data = await (userid ? postRepository.getPostsByUserId(userid) : 
    postRepository.getAll()) // userid를 인자로 전달하여 해당 사용자의 포스트만 가져오기
    res.status(200).json(data)
}

// _id로 특정 포스트를 가져오는 함수
export async function getPost(req, res) {
    const id = req.params.id // URL 파라미터에서 포스트 ID 가져오기
    const post = await postRepository.getById(id)
    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: `포스트 ${id}를 찾을 수 없습니다.` })

    }
}

// 포스트 수정하는 함수
export async function updatePost(req, res) {
    const id = req.params.id // URL 파라미터에서 포스트 ID 가져오기
    const text = req.body.text // 요청 본문에서 수정할 텍스트 가져오기
    const post = await postRepository.getById(id) // 해당 ID의 포스트 가져오기
    if (!post) {
        return res.status(404).json({ message: `포스트 ${id}를 찾을 수 없습니다.` })
    }
    if (post.idx !== req.id) { // 포스트 작성자와 요청한 사용자가 일치하는지 확인
        return res.status(403).json({ message: "권한이 없습니다." })
    }
    const updated = await postRepository.updatePost(id, text) // 포스트 수정   

    res.status(200).json({ message: `포스트 ${id} 수정 완료`, post: { ...post, text } }) // 수정 완료 메시지와 함께 수정된 포스트 반환
}


// 포스트 삭제하는 함수 
export async function deletePost(req, res) {
    const id = req.params.id // URL 파라미터에서 포스트 ID 가져오기
    const post = await postRepository.getById(id) // 해당 ID의 포스트 가져오기
    if (!post) {
        return res.status(404).json({ message: `포스트 ${id}를 찾을 수 없습니다.` })
    }
    if (post.idx !== req.id) { // 포스트 작성자와 요청한 사용자가 일치하는지 확인
        return res.status(403).json({ message: "권한이 없습니다." })
    }
    await postRepository.deleteById(id) // 해당 ID의 포스트 삭제
    res.status(200).json({ message: `포스트 ${id} 삭제 완료` })
}