import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address || 'http://localhost:3001'
const auth: string = (<any>global).auth

test('authenticate user', ()=>{
    return request(address)
       .post('/api/authenticate')
       .send({
         email:"tester@admin.com",
         password:"123456"
       })
       .then(response=>{
          expect(response.status).toBe(200)
          expect(response.body.accessToken).toBeDefined()
       }).catch(fail)
  })