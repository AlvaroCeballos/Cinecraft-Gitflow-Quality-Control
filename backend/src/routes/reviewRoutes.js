const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const verifyToken = require('../middlewares/authMiddleware');

// Todas las rutas de reseñas requieren autenticación
router.use(verifyToken);

router.post('/', reviewController.createReview);
router.get('/', reviewController.getMyReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

router.get('/tags/all', reviewController.getAllTags);
router.post('/tags/create', reviewController.createTag);

module.exports = router;