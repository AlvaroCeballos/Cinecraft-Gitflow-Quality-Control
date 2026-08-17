const express = require('express');
const router = express.Router();

const shareController = require('../controllers/shareController');
const verifyToken = require('../middlewares/authMiddleware');

// Todas las rutas de compartir requieren autenticación
router.use(verifyToken);

router.get('/users', shareController.getUsersToShare);
router.post('/', shareController.shareReview);
router.get('/received', shareController.getSharedWithMe);
router.get('/sent', shareController.getSharedByMe);

module.exports = router;
