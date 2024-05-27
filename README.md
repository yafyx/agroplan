# AgriPlan

AgriPlan is a hybrid web application built with Next.js and Flask, combining a powerful frontend interface with a robust backend API. This innovative application allows users to predict the optimal crop based on soil parameters provided.

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)

## How It Works

1. **Input Soil Parameters**: Users input various soil parameters including nitrogen, phosphorus, potassium, pH level, temperature, humidity, and rainfall.

2. **Prediction Generation**: The frontend sends these parameters to the Flask backend API, which processes the input data through a machine learning model.

3. **Crop Recommendation**: Based on the processed data, the Flask API returns a prediction for the most suitable crop, which is displayed to the user on the Next.js frontend.
