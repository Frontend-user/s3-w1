const request = require('supertest')
import {app} from "../../src/app";
import {Routes} from "../../src/common/constants/routes";
const Cookies = require('js-cookie');

describe('/Users', () => {
    const token = 'Basic YWRtaW46cXdlcnR5'
    const clearUserData = {
        "pagesCount": 0,
        "page": 1,
        "pageSize": 10,
        "totalCount": 0,
        "items": []
    }
    let correctUserData = {
        "login": "string",
        "email": "emailemail@mail.ru",
        "password": "password",
    }
    let inCorrectUserData = {
        "login": "a",
        "email": "emailemail",
        "password": "a",
    }

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    let responseUserData: any
    it('[USERS] [GET USERS] [EXPECT 200 [] ]IS DELETE? Expect 200', async () => {
     const resp =    responseUserData = await request(app)
            .post('/users')
            .set('Authorization', `${token}`)
            .send(correctUserData)
    })


    let jwt: any
    it('[AUTH]', async () => {
        jwt = await request(app)
            .post('/auth/login')
            .set('userid', responseUserData.body.id)
            .set('user-agent',`USER1`)
            .send({
                "loginOrEmail": "emailemail@mail.ru",
                "password": "password",
            })
    })
    it('[AUTH]', async () => {
        jwt = await request(app)
            .post('/auth/login')
            .set('userid', responseUserData.body.id)
            .set('user-agent',`USER222222`)
            .send({
                "loginOrEmail": "emailemail@mail.ru",
                "password": "password",
            })
    })
    it('[AUTH]', async () => {
        jwt = await request(app)
            .post('/auth/login')
            .set('userid', responseUserData.body.id)
            .set('user-agent',`USER33333`)
            .send({
                "loginOrEmail": "emailemail@mail.ru",
                "password": "password",
            })
    })
    it('[AUTH]', async () => {
        jwt = await request(app)
            .post('/auth/login')
            .set('userid', responseUserData.body.id)
            .set('user-agent',`USER4444`)
            .send({
                "loginOrEmail": "emailemail@mail.ru",
                "password": "password",
            })
    })
    it('[USERS] [GET DEVICES] [EXPECT 200 [] ]IS DELETE? Expect 200', async () => {
        const resp = await request(app)
            .get(Routes.devices)
            .set('Authorization', `${token}`)
            .set('Cookie', ['refreshToken=2001'])
            .expect(resp.body.length,4)
    })

    it('[AUth refresh]', async () => {

        jwt = await request(app)
            .post('/auth/refresh-token')
            // .set('userid', responseUserData.body.id)
            // Cookies.set('refreshToken', '20001')
            .set('Cookie', ['refreshToken=2001'])
            .send({
                "accessToken": "string"
                // }
                //     "loginOrEmail": "emailemail@mail.ru",
                //     "password": "password",
            })
        expect('2').toEqual('2111')
    })
    it('[USERS] [GET DEVICES] [EXPECT 200 [] ]IS DELETE? Expect 200', async () => {
        const resp = await request(app)
            .get(Routes.devices)
            .set('Authorization', `${token}`)
            .set('Cookie', ['refreshToken=2001'])
            .expect(resp.body.length,4)
        expect(resp.body).toEqual([{}])
    })

    afterAll(async () => {
        await request(app).delete('/testing/all-data')
    })


})