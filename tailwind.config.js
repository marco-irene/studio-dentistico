module.exports = {
    content: [
      "./dist/**/*.{html,js}", // Controlla i file HTML e JS nella cartella dist
      "./src/**/*.{html,js,jsx,ts,tsx}", // Controlla i file nella cartella src
      "./dist/index.html" // Controlla il file index.html nella cartella dist
    ],
    theme: {
      extend: {
        colors: {
          primary: "#008cb6",
          secondary: "#4ea8de",
        },
        borderRadius: {
          "none": "0px",
          "sm": "4px",
          DEFAULT: "8px",
          "md": "12px",
          "lg": "16px",
          "xl": "20px",
          "2xl": "24px",
          "3xl": "32px",
          "full": "9999px",
          "button": "8px",
        },
      },
    },
    plugins: [],
  };
  