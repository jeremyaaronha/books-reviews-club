const request = require('supertest');
const app = require('../server');

describe('Reviews API - GET only', () => {

//GET ALL REVIEWS
  it('GET /reviews should return 200 and an array', async () => {
    const res = await request(app).get('/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log('✅ GET /reviews - returned 200 successfully');
  });

//GET REVIEW BY ID
  it('GET /reviews/:id should return 200 or 404', async () => {
    const exampleId = '684110ca496c8d50c98415a6';
    const res = await request(app).get(`/reviews/${exampleId}`);
    expect([200, 404]).toContain(res.statusCode);
    console.log('✅ GET /reviews/:id - Test successfully');
  });

//GET REVIEW BY BOOK ID
  it('GET /reviews/book/:bookId should return 200 and an array', async () => {
    const bookId = '6841106f496c8d50c984159e'; 
    const res = await request(app).get(`/reviews/book/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log('✅ GET /reviews/books/:id - returned 200 successfully');
  });

//GET REVIEW BY USER ID
  it('GET /reviews/user/:userId should return 200 and an array', async () => {
    const userId = '6841100a496c8d50c9841591'; 
    const res = await request(app).get(`/reviews/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log('✅ GET /reviews/users/:id - returned 200 successfully');
  });
});