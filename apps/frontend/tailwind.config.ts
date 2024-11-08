import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");





const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-hero-home',
    'bg-hero-blog',
    'bg-hero-services',
    'bg-hero-contact',
    'bg-hero-about',
    'bg-hero-professionals',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1877dd',     // Azul Calmo
          secondary: '#90E0EF',   // Azul Claro
          neutral: '#CAF0F8',     // Azul Muito Claro
          accent: '#00B4D8',      // Azul Turquesa
        },
      },
      backgroundImage: {
        'hero-home': "url('https://images.stockcake.com/public/7/0/1/7018f716-6c21-4d3a-835a-fb088f6cde5e_large/dental-team-smiling-stockcake.jpg')",
        'hero-blog': "url('https://images.stockcake.com/public/5/4/8/548a9418-362a-474f-b35e-fa185cddc64f_large/dental-models-displayed-stockcake.jpg')",
        'hero-services': "url('https://images.stockcake.com/public/0/0/4/0044de97-cc4a-4c78-a32e-edb269b61c6d_large/dentist-ready-tools-stockcake.jpg')",
        'hero-contact': "url('https://images.stockcake.com/public/b/6/9/b69eaca7-0f00-4167-8324-056e501063c2_large/modern-dental-office-stockcake.jpg')",
        'hero-about': "url('https://images.stockcake.com/public/2/6/3/26336fa1-ae88-4455-aa2d-29f19181dcc2_large/dental-procedure-preparation-stockcake.jpg')",
        'hero-professionals': "url('https://images.stockcake.com/public/3/e/c/3ec9a839-3260-4284-8e48-9bc05d8787d4_large/dentist-holding-x-ray-stockcake.jpg')",
        'contact-form': "url('https://images.stockcake.com/public/6/6/4/6647d8f8-3cf0-4d60-9b84-d1f7230a59b8/dentist-holding-molar-stockcake.jpg')",
      }
    },
  },
  plugins: [ 
   ],
};
export default config;
