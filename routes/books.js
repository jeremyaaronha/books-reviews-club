const express = require('express');
const router = express.Router();
const books = require('../controllers/books');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - pages
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book's title
 *               author:
 *                 type: string
 *                 description: The book's author
 *               genre:
 *                 type: string
 *                 description: The genre ID (ObjectId reference)
 *               pages:
 *                 type: number
 *                 description: Number of pages in the book
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: Publication date of the book
 *               isbn:
 *                 type: string
 *                 description: ISBN of the book
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 description: Book rating (0-5)
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/', books.getAllBooks);
router.post('/', books.createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get('/:id', books.getBookById);

module.exports = router;