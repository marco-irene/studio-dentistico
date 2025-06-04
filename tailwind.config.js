module.exports = {
    content: [
      "./public/**/*.{html,js}", // Controlla i file HTML e JS nella cartella public
      "./src/**/*.{html,js,jsx,ts,tsx}", // Controlla i file nella cartella src
      "./public/index.html" // Controlla il file index.html nella cartella public
    ],
    theme: {
      extend: {
        colors: {
          primary: "#F59D13",
          secondary: "#074F90",
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
