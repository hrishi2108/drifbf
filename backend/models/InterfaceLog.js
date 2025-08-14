// models/InterfaceLog.js
const mongoose = require('mongoose');

const InterfaceLogSchema = new mongoose.Schema({
  interfaceName: { type: String, required: true, index: true },
  integrationKey: { type: String, required: true, index: true },
  status: { type: String, enum: ['SUCCESS', 'FAILURE', 'WARNING'], required: true, index: true },
  message: { type: String, default: '' },
  severity: { type: String, enum: ['info', 'minor', 'major'], default: 'info' },
  metadata: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now, index: true }
}, { versionKey: false });

InterfaceLogSchema.index({ interfaceName: 1, integrationKey: 1, status: 1, createdAt: -1 });
InterfaceLogSchema.index({ message: 'text' }); // for text search on message

module.exports = mongoose.model('InterfaceLog', InterfaceLogSchema);
