import express from "express"
import { config } from "./config.mjs"
import { connectDB } from "./db/database.mjs"



const app = express()

app.use(express.json())


// 포트 설정은 config.mjs 에서 가져와 사용 가능
//app.listen(config.host.port, () => {
//    console.log(`서버가 ${config.host.port} 포트에서 실행 중입니다.`)
//})

// MongoDB 연결
connectDB().then(() => {
    // MongoDB 연결이 성공하면 서버 시작
    app.listen(config.host.port, () => {
        console.log(`서버가 ${config.host.port} 포트에서 실행 중입니다.`)
    })
}).catch((err) => {
    // MongoDB 연결 실패 시 에러 처리
    console.error("MongoDB 연결 실패로 서버를 시작할 수 없습니다.", err)
})  
