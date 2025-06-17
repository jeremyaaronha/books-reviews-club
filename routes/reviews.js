// /routes/reviews.js
const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');
const { isAuthenticated } = require('../middleware/authenticate');
const validateReview = require('../helpers/validateReview');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewUpdate'
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - book
 *               - user
 *               - rating
 *             properties:
 *               book:
 *                 type: string
 *                 description: The book ID (ObjectId reference)
 *               user:
 *                 type: string
 *                 description: The user ID (ObjectId reference)
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 description: Review rating (0-5)
 *               comment:
 *                 type: string
 *                 description: Review comment (optional)
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewUpdate'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/', reviews.getAllReviews);
router.post('/', isAuthenticated, validateReview, reviews.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get('/:id', reviews.getReviewById);

/**
 * @swagger
 * /reviews/book/{bookId}:
 *   get:
 *     summary: Get reviews by Book ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the book
 */
router.get('/book/:bookId', reviews.getReviewsByBook);

/**
 * @swagger
 * /reviews/user/{userId}:
 *   get:
 *     summary: Get reviews by User ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews by the user
 */
router.get('/user/:userId', reviews.getReviewsByUser);


/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewUpdate'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Review not found
 */
router.put('/:id', isAuthenticated, validateReview, reviews.updateReviewById);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete('/:id', isAuthenticated, reviews.deleteReviewById);

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewUpdate:
 *       type: object
 *       required:
 *         - book
 *         - user
 *         - rating
 *         - comment
 *       properties:
 *         book:
 *           type: object
 *           required:
 *             - _id
 *           properties:
 *             _id:
 *               type: string
 *               description: ID of the book
 *         user:
 *           type: object
 *           required:
 *             - _id
 *           properties:
 *             _id:
 *               type: string
 *               description: ID of the user
 *         rating:
 *           type: number
 *           description: Rating value
 *         comment:
 *           type: string
 *           description: User comment on the book
 */

module.exports = router;