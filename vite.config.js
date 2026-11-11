import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import { execSync } from 'node:child_process'

function getAppVersion() {
  if (process.env.APP_VERSION) {
    return process.env.APP_VERSION;
  }
  try {
    const gitTag = execSync('git describe --tags --always').toString().trim();
    if (gitTag) {
      return gitTag;
    }
  } catch (err) {
    // fallback
  }
  try {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    return pkg.version.startsWith('v') ? pkg.version : `v${pkg.version}`;
  } catch (err) {
    // fallback
  }
  return 'v0.1.0';
}

const appVersion = getAppVersion();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
