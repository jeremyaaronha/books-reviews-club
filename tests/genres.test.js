const request = require('supertest');
const app = require('../server');


describe('Genres API - GET only', () => {

//GET ALL GENRES
  it('GET /genres should return 200 and an array', async () => {
    const res = await request(app).get('/genres');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log('✅ GET /genres - returned 200 successfully');
  });

//GET GENRE BY ID
  it('GET /genres/:id should return 200 or 404', async () => {
    const exampleId = '68410f80496c8d50c9841587'; 
    const res = await request(app).get(`/genres/${exampleId}`);
    expect([200, 404]).toContain(res.statusCode);
    console.log('✅ GET /genres/:id - Test successfully');
  });
});