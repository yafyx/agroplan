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
  const recommendations = [
    {
      label: "N",
      value: prediction.recommendations?.N?.toFixed(2),
      satuan: " ppm",
    },
    {
      label: "pH",
      value: prediction.recommendations?.ph?.toFixed(2),
      satuan: "",
    },
    {
      label: "P",
      value: prediction.recommendations?.P?.toFixed(2),
      satuan: " ppm",
    },
    {
      label: "Temperature",
      value: prediction.recommendations?.temperature?.toFixed(2),
      satuan: " °C",
    },

    {
      label: " K",
      value: prediction.recommendations?.K?.toFixed(2),
      satuan: " ppm",
    },

    {
      label: "Humidity",
      value: prediction.recommendations?.humidity?.toFixed(2),
      satuan: " %",
    },
    {
      label: "Rainfall",
      value: prediction.recommendations?.rainfall?.toFixed(2),
      satuan: " mm",
    },
  ];

  return (
    <div className="w-full space-y-2 p-2">
      <h1 className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-4xl">
        Need Adjustment
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Based on the soil parameters and crop selection, the predicted nutrient
        levels may require adjustment.
      </p>
      <div className="rounded-lg bg-gray-200 p-4 text-xl dark:bg-zinc-900/50 sm:p-4 ">
        <div className="grid grid-cols-1 text-sm sm:grid-cols-2 ">
          {recommendations.map(({ label, value, satuan }) => (
            <div key={label} className="flex flex-wrap items-end xl:text-xl">
              <span className="w-max pr-2 text-right">{label}:</span>
              <span className="text-xl font-semibold xl:text-3xl">
                {value}
                {satuan && (
                  <span className="text-xs font-normal md:text-base">
                    {satuan}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictNutritientAdjust;
