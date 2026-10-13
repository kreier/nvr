/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          hikvision: '#dc2626', // Hikvision red
          dahua: '#2563eb',    // Dahua blue
          imou: '#ea580c',     // Imou orange
          kbvision: '#059669', // KBVISION green/teal
        }
      }
    },
  },
  plugins: [],
}
