import MongoDB from "mongodb"
import { config } from "../config.mjs"

let db

export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host)
        .then((client) => {
            db = client.db("Xdb") // 데이터베이스 이름을 지정
            console.log("MongoDB 연결 성공")
        })
        .catch((err) => {
            console.error("MongoDB 연결 실패", err)
            throw err
        }) 
}

// users 컬렉션 객체
export function getUsers() {
    return db.collection("users") // users 컬렉션을 반환
}

export function getPosts() {
    return db.collection("posts") // posts 컬렉션을 반환
}