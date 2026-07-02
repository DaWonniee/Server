import dotenv from "dotenv"
import e from "express"
dotenv.config()

function required(key, defaultValue=undefined) {
    const value = process.env[key] || defaultValue // deafault value 를 제공하지 않으면 undefined 가 된다.
    if (value == null) {
        throw new Error(`키 ${key}는 undefined 입니다. .env 파일에 정의되어 있지 않습니다.`)
    }
    return value
}   

export const config = {
    jwt: {
        secret: required("JWT_SECRET"),
        expiresSec: parseInt(required("JWT_EXPIRES_SEC"))
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10))
    },
    host: {
        port: parseInt(required("HOST_PORT", 8080))
    },
    db: {
        host: required("DB_HOST")
    }
}