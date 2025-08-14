// routes/logs.js
const express = require('express');
const router = express.Router();
const { createLog, listLogs, getSummary } = require('../controllers/logsController');

router.post('/', createLog);
router.get('/', listLogs);
router.get('/summary', getSummary);

module.exports = router;
