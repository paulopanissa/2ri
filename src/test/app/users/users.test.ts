import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address || 'http://localhost:3000'
const auth: string = (<any>global).auth


test('get without Authenticate /api/users', ()=>{
    return request(address)
       .get('/api/users')
       .then(response=>{
        expect(response.status).toBe(403)
       }).catch(fail)
  })
