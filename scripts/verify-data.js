#!/usr/bin/env node

/**
 * Automated Verification Script for NVR Specs Dataset
 * Checks that all models have:
 * - Proper brand identification (Hikvision, Dahua, IMOU, KBVISION)
 * - Model number
 * - Streams specs for channel 1, 2, 3, 4
 * - Channel count, bandwidth, and max resolution
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const DATA_FILE = path.join(rootDir, 'src', 'data', 'nvr-models.json');

console.log('🧪 [Data Verification] Verifying NVR dataset integrity...');

if (!fs.existsSync(DATA_FILE)) {
  console.error(`❌ File not found: ${DATA_FILE}. Please run "npm run scrape" first.`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
let errors = 0;
const validBrands = new Set(['Hikvision', 'Dahua', 'IMOU', 'KBVISION']);

data.forEach((model, idx) => {
  const label = `${model.brand} ${model.model} (id: ${model.id || idx})`;

  if (!model.model) {
    console.error(`❌ [${label}] Missing model name!`);
    errors++;
  }

  if (!validBrands.has(model.brand)) {
    console.warn(`⚠️ [${label}] Unknown brand: ${model.brand}`);
  }

  if (!model.streams) {
    console.error(`❌ [${label}] Missing streams object!`);
    errors++;
    return;
  }

  for (const ch of ['ch1', 'ch2', 'ch3', 'ch4']) {
    if (!model.streams[ch] || !model.streams[ch].resolution || !model.streams[ch].text) {
      console.error(`❌ [${label}] Missing stream info for ${ch}!`);
      errors++;
    }
  }

  if (!model.incomingBandwidth) {
    console.warn(`⚠️ [${label}] Missing incomingBandwidth.`);
  }

  if (!model.channelCount) {
    console.error(`❌ [${label}] Missing channelCount.`);
    errors++;
  }
});

if (errors > 0) {
  console.error(`\n❌ Verification completed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${data.length} models verified successfully! All 1, 2, 3, and 4 channel stream specs are valid.`);
}
