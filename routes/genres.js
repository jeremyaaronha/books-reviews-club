const express = require('express');
const router = express.Router();
const genres = require('../controllers/genres');
const { isAuthenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genre management
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The genre name
 *     responses:
 *       201:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/', genres.getAllGenres);
router.post('/', isAuthenticated, genres.createGenre);

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Genre ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 */
router.get('/:id', genres.getGenreById);









/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Genre ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Genre updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 */
router.put('/:id', isAuthenticated, genres.updateGenreById);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Genre ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *       404:
 *         description: Genre not found
 */
router.delete('/:id', isAuthenticated, genres.deleteGenreById);


module.exports = router;