import React, { FC } from "react";

type PredictNutritientLevelsProps = {
  prediction: {
    mean_values: {
      N: number;
      P: number;
      K: number;
      temperature: number;
      ph: number;
      humidity: number;
      rainfall: number;
    };
  };
};

const PredictNutritientLevels: FC<PredictNutritientLevelsProps> = ({
  prediction,
}) => {
  return (
    <div className="w-full space-y-2 p-2 lg:w-1/2">
      <h1 className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-4xl">
        Predicted Nutrient Levels
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Based on the soil parameters and crop selection, the predicted levels
        are:
      </p>
      <div className="rounded-lg bg-gray-200 p-2 text-xl font-medium dark:bg-zinc-900/50 sm:p-4">
        <div>
          N:{" "}
          <span className="text-3xl font-semibold">
            {prediction.mean_values?.N?.toFixed(2) || "N/A"}
            <span className="text-sm font-normal"> ppm</span>
          </span>
        </div>
        <div>
          P:{" "}
          <span className="text-3xl font-semibold">
            {prediction.mean_values?.P?.toFixed(2) || "N/A"}
            <span className="text-sm font-normal"> ppm</span>
          </span>
        </div>
        <div>
          K:{" "}
          <span className="text-3xl font-semibold">
            {prediction.mean_values?.K?.toFixed(2) || "N/A"}
            <span className="text-sm font-normal"> ppm</span>
          </span>
        </div>
        <div>
          Temperature:{" "}
          <span className="text-3xl font-semibold">
            {prediction.mean_values?.temperature?.toFixed(2) || "N/A"}
            <span className="text-sm font-normal"> °C</span>
          </span>
        </div>
        <div>
          pH:{" "}
          <span className="text-3xl font-semibold">
            {prediction.mean_values?.ph?.toFixed(2) || "N/A"}
          </span>
        </div>
        <div>
          Humidity:{" "}
          <span className="text-3xl font-semibold">
            {prediction.mean_values?.humidity?.toFixed(2) || "N/A"}
            <span className="text-sm font-normal"> %</span>
          </span>
        </div>
        <div>
          Rainfall:{" "}
          <span className="text-3xl font-semibold">
            {prediction.mean_values?.rainfall?.toFixed(2) || "N/A"}
            <span className="text-sm font-normal"> mm</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PredictNutritientLevels;
