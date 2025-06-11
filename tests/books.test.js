const request = require('supertest');
const app = require('../server');


describe('Books API - GET only', () => {

// GET ALL BOOKS
  it('GET /books should return 200 and an array', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log('✅ GET /books - returned 200 successfully');
  });

//GET BOOK BY ID
  it('GET /books/:id should return 200 or 404', async () => {
    const knownId = '6841106f496c8d50c984159a'; 
    const res = await request(app).get(`/books/${knownId}`);
    expect([200, 404]).toContain(res.statusCode);
    console.log('✅ GET /books/:id - Test successfully');
  });
});