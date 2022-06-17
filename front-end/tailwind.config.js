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
        'image-camera': 'url("../public/images/icon-camera.png")',
        'image-eraser': 'url("../public/images/icon-eraser.png")',
      },
      keyframes: {
        'dot-flashing': {
          '0%': {
            backgroundColor: '#3b82f6',
          },
          '50%, 100%': {
            backgroundColor: '#93c5fd',
          },
        },
      },
      animation: {
        'dot-flashing': 'dot-flashing 1s infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
};
