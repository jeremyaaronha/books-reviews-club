const request = require('supertest');
const app = require('../server');


describe('Users API - GET only', () => {

// GET ALL USERS
  it('GET /users should return 200 and an array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log('✅ GET /users - returned 200 successfully');
  });

//GET USER BY ID
  it('GET /users/:id should return 200 or 404', async () => {
    const exampleId = '6841100a496c8d50c9841591'; 
    const res = await request(app).get(`/users/${exampleId}`);
    expect([200, 404]).toContain(res.statusCode);
    console.log('✅ GET /users/:id - Test successfully');
  });
});