import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address || 'http://localhost:3001'
const auth: string = (<any>global).auth


test('Get /api/users', ()=>{
    return request(address)
       .get('/api/users')
       .then(response=>{
        expect(response.status).toBe(200)
        expect(response.body.items).toBeInstanceOf(Array)
       }).catch(fail)
  })

test('Post /api/users', () => {
    return request(address)
        .post('/api/users')
        .send({
            "username": "tester",
            "email": "tester@admin.com",
            "password": "123456",
            "first_name": "Admin",
            "last_name": "Tester",
            "full_name": "Admin Tester",
            "office": "Tester",
            "photo": "https://robohash.org/admintester",
            "gender": "Indefinido",
            "ramal": "001",
            "phones": [
                {
                    "type": "FIXO",
                    "number": "55 3322-1122",
                    "whatsapp": false
                }
            ]
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.username).toBe('tester')
            expect(response.body.email).toBe('tester@admin.com')
            expect(response.body.first_name).toBe('Admin')
            expect(response.body.last_name).toBe('Tester')
            expect(response.body.full_name).toBe('ADMIN TESTER')
            expect(response.body.office).toBe('Tester')
            expect(response.body.gender).toBe('Indefinido')
            expect(response.body.ramal).toBe('001')
        })
})

test('Get /api/users/aaaaaa - not found', () => {
    return request(address)
        .get('/api/users/aaaaaa')
        .then(response=>{
            expect(response.status).toBe(404)
        }).catch(fail)
})

test('Patch /api/users/:id', () => {
    return request(address)
            .post('/api/users')
            .send({
                "username": "tester2",
                "email": "patch@admin.com",
                "password": "123456",
                "first_name": "Test",
                "last_name": "Patch",
                "full_name": "Test Patch",
                "office": "Tester",
                "photo": "https://robohash.org/testpatch",
                "gender": "Indefinido",
                "ramal": "001",
            })
        .then(response => request(address)
                                    .patch(`/api/users/${response.body._id}`)
                                    .send({
                                        "username": "patch",
                                        "gender": "Masculino"
                                    }))
                                    .then(response => {
                                        expect(response.status).toBe(200)
                                        expect(response.body._id).toBeDefined()
                                        expect(response.body.username).toBe('patch')
                                        expect(response.body.email).toBe('patch@admin.com')
                                        expect(response.body.password).toBeUndefined()
                                        expect(response.body.first_name).toBe('Test')
                                        expect(response.body.last_name).toBe('Patch')
                                        expect(response.body.full_name).toBe('TEST PATCH')
                                        expect(response.body.office).toBe('Tester')
                                        expect(response.body.gender).toBe('Masculino')
                                        expect(response.body.ramal).toBe('001')
                                    })
        .catch(fail)
})
