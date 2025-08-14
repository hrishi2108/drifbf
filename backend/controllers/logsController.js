// controllers/logsController.js
const mongoose = require('mongoose');
const InterfaceLog = require('../models/InterfaceLog');

async function createLog(req, res) {
  try {
    const payload = req.body;
    const doc = await InterfaceLog.create(payload);
    return res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'create_error', message: err.message });
  }
}

async function listLogs(req, res) {
  try {
    const {
      page = 1, limit = 20, interfaceName, integrationKey, status,
      q, start, end, sort = '-createdAt', lastId
    } = req.query;

    const filters = {};
    if (interfaceName) filters.interfaceName = interfaceName;
    if (integrationKey) filters.integrationKey = integrationKey;
    if (status) filters.status = status;
    if (start || end) {
      filters.createdAt = {};
      if (start) filters.createdAt.$gte = new Date(start);
      if (end) filters.createdAt.$lte = new Date(end);
    }
    if (q) {
      filters.$text = { $search: q };
    }

    // Cursor-based pagination using lastId
    if (lastId) {
      try {
        filters._id = { $lt: mongoose.Types.ObjectId(lastId) };
      } catch (e) {
        // ignore invalid lastId - fallback to normal pagination
      }
      const docs = await InterfaceLog.find(filters)
        .sort({ _id: -1 })
        .limit(Number(limit));
      return res.json({ data: docs, page: null, limit: Number(limit) });
    }

    // standard page/limit (skip) pagination (fine for shallow pages)
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      InterfaceLog.find(filters).sort(sort).skip(skip).limit(Number(limit)),
      InterfaceLog.countDocuments(filters)
    ]);
    return res.json({ data, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'list_error', message: err.message });
  }
}

async function getSummary(req, res) {
  try {
    const range = req.query.range || '24h';
    const now = new Date();
    let start;
    if (range === 'week') start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    else if (range === 'month') start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    else start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // aggregated counts by status
    const counts = await InterfaceLog.aggregate([
      { $match: { createdAt: { $gte: start } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // hourly buckets for last 24h (only when range === '24h')
    let hourly = [];
    if (range === '24h') {
      hourly = await InterfaceLog.aggregate([
        { $match: { createdAt: { $gte: start } } },
        { $project: {
            status: 1,
            hourBucket: {
              $dateToString: { format: '%Y-%m-%dT%H:00:00Z', date: '$createdAt' }
            }
        }},
        { $group: { _id: { hour: '$hourBucket', status: '$status' }, count: { $sum: 1 } } },
        { $sort: { '_id.hour': 1 } }
      ]);
    }

    return res.json({ counts, hourly });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'summary_error', message: err.message });
  }
}

module.exports = { createLog, listLogs, getSummary };
