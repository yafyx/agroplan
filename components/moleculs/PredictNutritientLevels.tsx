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
  const mean_values = [
    {
      label: "N",
      value: prediction.mean_values?.N?.toFixed(2),
      satuan: "ppm",
    },
    {
      label: "P",
      value: prediction.mean_values?.P?.toFixed(2),
      satuan: "ppm",
    },
    {
      label: "K",
      value: prediction.mean_values?.K?.toFixed(2),
      satuan: "ppm",
    },
    {
      label: "Temperature",
      value: prediction.mean_values?.temperature?.toFixed(2),
      satuan: "°C",
    },
    {
      label: "pH",
      value: prediction.mean_values?.ph?.toFixed(2),
      satuan: "",
    },
    {
      label: "Humidity",
      value: prediction.mean_values?.humidity?.toFixed(2),
      satuan: "%",
    },
    {
      label: "Rainfall",
      value: prediction.mean_values?.rainfall?.toFixed(2),
      satuan: "mm",
    },
  ];

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
        {mean_values.map((item, index) => (
          <div
            key={index}
            className="text-sm md:text-base lg:text-xl xl:text-2xl"
          >
            {item.label + ":"}{" "}
            <span className="text-xl font-semibold lg:text-2xl xl:text-3xl">
              {item.value || "N/A"}
              <span className="text-xs font-normal md:text-sm lg:text-base xl:text-xl">
                {" "}
                {item.satuan}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictNutritientLevels;
