module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        global: ['Nunito', 'Noto Sans TC', 'sans-serif'],
        code: ['Ubuntu Mono', 'monospace'],
      },
      backgroundImage: {
        'image-base': 'url("../public/images/bg-full.jpg")',
        'image-circle': 'url("../public/images/bg-circle.png")',
      },
    },
  },
  plugins: [],
};
