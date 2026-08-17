const express = require('express');
const router = express.Router();
const { getPendingRequests, acceptRequest, rejectRequest } = require('../controllers/adminController');

const verifyToken = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin'); 

router.use(verifyToken, requireAdmin);

router.get('/pending', getPendingRequests);
router.put('/accept/:id', acceptRequest);
router.put('/reject/:id', rejectRequest);

module.exports = router;