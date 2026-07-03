import MongoDB from "mongodb"
import * as UserRepository from "./auth.mjs"
import { getPosts } from "../db/database.mjs"
import { ObjectId } from "mongodb"

//포스트 작성
export async function create(text, id) {
    return UserRepository.findById(id).then((user) => getPosts().insertOne({
        text,
        createdAt: new Date(),
        idx: user.id,
        name: user.name,
        userid: user.userid
    })).then((result) => {
        return getPosts().findOne({_id: result.insertedId})
})
}

// 모든 포스트 가져오기
export async function getAll() {
    return getPosts().find().sort({ createdAt: -1 }).toArray()
}

// 사용자 아이디에 대한 포스트를 가져오기
export async function getAllByUserId(userid) {
    return getPosts().find({ userid }).sort({ createdAt: -1 }).toArray()
}

//  특정 포스트 가져오기
export async function getById(id) {
    return getPosts().findOne({ _id: new ObjectId(id) }).then(mapOptionalPost)
}

// mapOptionalPost 함수는 포스트가 존재하면 _id를 문자열로 변환하여 id 속성으로 추가하고, 포스트가 존재하지 않으면 그대로 반환합니다.
function mapOptionalPost(post) {
    return post ? { ...post, id: post._id.toString() } : post
} 

// 포스트 수정
export async function updatePost(id, text) {
    const post = await getPosts().findOne({ _id: new ObjectId(id) })
    if (!post) {
        return null
    }
    await getPosts().updateOne({ _id: new ObjectId(id) }, { $set: { text } })
    return { ...post, text } // 수정된 포스트 반환
}   

// 포스트 삭제
export async function deleteById(id) {
    const post = await getPosts().findOne({ _id: new ObjectId(id) })
    // 포스트가 존재하지 않으면 null 반환
    if (!post) {
        return null
    }
    await getPosts().deleteOne({ _id: new ObjectId(id) })
    return post
}   