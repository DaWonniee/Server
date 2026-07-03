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
    return { ...post, text }
}   

// 포스트 삭제
export async function deleteById(id) {
    const post = await getPosts().findOne({ _id: new ObjectId(id) })
    if (!post) {
        return null
    }
    await getPosts().deleteOne({ _id: new ObjectId(id) })
    return post
}   