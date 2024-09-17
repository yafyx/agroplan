import React, { FC } from "react";

type PredictNutritientAdjustProps = {
  prediction: {
    recommendations: {
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

const PredictNutritientAdjust: FC<PredictNutritientAdjustProps> = ({
  prediction,
}) => {
  return (
    <div className="w-full space-y-2 p-2">
      <h1 className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-4xl">
        Need Adjustment
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Based on the soil parameters and crop selection, the predicted nutrient
        levels may require adjustment.
      </p>
      <div className="flex w-full justify-center rounded-lg bg-gray-200 p-2 text-xl font-medium dark:bg-zinc-900/50 sm:p-4 md:w-[60%]">
        <table className="w-max text-right">
          <tbody>
            <tr>
              <th className="pr-4">N:</th>
              <td className="text-left text-3xl font-semibold">
                {prediction.recommendations?.N?.toFixed(2) || "N/A"}{" "}
                <span className="text-sm font-normal">ppm</span>
              </td>
            </tr>
            <tr>
              <th className="pr-4">P:</th>
              <td className="text-left text-3xl font-semibold">
                {prediction.recommendations?.P?.toFixed(2) || "N/A"}{" "}
                <span className="text-sm font-normal">ppm</span>
              </td>
            </tr>
            <tr>
              <th className="pr-4">K:</th>
              <td className="text-left text-3xl font-semibold">
                {prediction.recommendations?.K?.toFixed(2) || "N/A"}{" "}
                <span className="text-sm font-normal">ppm</span>
              </td>
            </tr>
            <tr>
              <th className="pr-4">Temperature:</th>
              <td className="text-left text-3xl font-semibold">
                {prediction.recommendations?.temperature?.toFixed(2) || "N/A"}{" "}
                <span className="text-sm font-normal">°C</span>
              </td>
            </tr>
            <tr>
              <th className="pr-4">pH:</th>
              <td className="text-left text-3xl font-semibold">
                {prediction.recommendations?.ph?.toFixed(2) || "N/A"}
              </td>
            </tr>
            <tr>
              <th className="pr-4">Humidity:</th>
              <td className="text-left text-3xl font-semibold">
                {prediction.recommendations?.humidity?.toFixed(2) || "N/A"}{" "}
                <span className="text-sm font-normal">%</span>
              </td>
            </tr>
            <tr>
              <th className="pr-4">Rainfall:</th>
              <td className="text-left text-3xl font-semibold">
                {prediction.recommendations?.rainfall?.toFixed(2) || "N/A"}{" "}
                <span className="text-sm font-normal">mm</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredictNutritientAdjust;
