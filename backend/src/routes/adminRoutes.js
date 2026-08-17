const express = require('express');
const router = express.Router();
const {
  getPendingRequests,
  getRequestHistory,
  getTopReviewers,
  acceptRequest,
  rejectRequest
} = require('../controllers/adminController');

const verifyToken = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin'); 

router.use(verifyToken, requireAdmin);

router.get('/pending', getPendingRequests);
router.get('/history', getRequestHistory);
router.get('/reports/top-reviewers', getTopReviewers);
router.put('/accept/:id', acceptRequest);
router.put('/reject/:id', rejectRequest);

module.exports = router;
