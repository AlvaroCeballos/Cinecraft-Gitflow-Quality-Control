const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Todas las rutas de reseñas requieren autenticación
router.use(verifyToken);

router.post('/', reviewController.createReview);
router.get('/', reviewController.getMyReviews);

module.exports = router;