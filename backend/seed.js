// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const InterfaceLog = require('./models/InterfaceLog');

const MONGO = process.env.MONGO_URI;
const TOTAL = Number(process.argv[2]) || 10000; // default 10k entries
const BATCH = 1000;

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMessage() {
  const verbs = ['Processed', 'Failed to process', 'Skipped', 'Queued', 'Completed', 'Timeout on'];
  const objects = ['employee record', 'payroll batch', 'benefit update', 'org node', 'leave request'];
  const reasons = ['', 'due to network', 'due to invalid payload', 'due to DB lock', 'due to timeout'];
  return `${randChoice(verbs)} ${randChoice(objects)} ${randChoice(reasons)}`.trim();
}

async function run() {
  if (!MONGO) {
    console.error('MONGO_URI not found in .env');
    process.exit(1);
  }
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

  const statuses = ['SUCCESS', 'FAILURE', 'WARNING'];
  const interfaces = ['EmployeeSync', 'PayrollPush', 'BenefitsSync', 'OrgChartExport', 'TimeOffSync', 'CompensationExport'];

  let created = 0;
  while (created < TOTAL) {
    const batch = [];
    const n = Math.min(BATCH, TOTAL - created);
    for (let i = 0; i < n; i++) {
      const createdAt = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)); // last 30 days
      batch.push({
        interfaceName: randChoice(interfaces),
        integrationKey: 'key_' + Math.random().toString(36).slice(2, 8),
        status: randChoice(statuses),
        message: randomMessage(),
        severity: randChoice(['info', 'minor', 'major']),
        metadata: { attempt: Math.floor(Math.random() * 5) + 1 },
        createdAt
      });
    }
    await InterfaceLog.insertMany(batch);
    created += n;
    console.log(`seeded ${created}/${TOTAL}`);
  }

  console.log('Seeding complete');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
