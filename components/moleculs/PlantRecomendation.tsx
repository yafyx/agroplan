import React, { FC } from "react";

type PlantRecomendationProps = {
  prediction: {
    crop_prediction: string;
    knn_accuracy: number;
    knn_train_accuracy: number;
    knn_test_accuracy: number;
    recommendations: {
      N: number;
      P: number;
      K: number;
      temperature: number;
      ph: number;
      humidity: number;
      rainfall: number;
    };
    comparisons: {
      N: string;
      P: string;
      K: string;
    };
    comparisons_value: {
      N: number;
      P: number;
      K: number;
    };
  };
};

const PlantRecomendation: FC<PlantRecomendationProps> = ({ prediction }) => {
  return (
    <div className="h-max w-full space-y-2 p-2 lg:w-1/2">
      <h1 className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-4xl">
        Plant Recommendation
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Based on the soil and parameters and crop collection data, the plant
        recommendation is:
      </p>
      <div className="rounded-lg bg-gray-200 p-4 dark:bg-zinc-900/50">
        <span className="font-b old text-2xl capitalize underline underline-offset-4 lg:text-3xl xl:text-4xl">
          {prediction.crop_prediction}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Using the KNN classifier, the accuracy of the prediction is:
      </p>
      <div className="h-max rounded-lg bg-gray-200 p-2 text-sm dark:bg-zinc-900/50 md:p-4 md:text-lg lg:text-xl xl:py-8">
        <p className="flex flex-wrap justify-between">
          <span>KNN Accuracy:</span>
          <span className="text-green-500">
            {prediction.knn_accuracy?.toFixed(2)} %
          </span>
        </p>
        <p className="flex flex-wrap justify-between">
          <span className="italic">knn_train_accuracy:</span>
          <span className="text-green-500">
            {prediction.knn_train_accuracy?.toFixed(2)} %
          </span>
        </p>
        <p className="flex flex-wrap justify-between">
          <span className="italic">knn_test_accuracy:</span>
          <span className="text-green-500">
            {prediction.knn_test_accuracy?.toFixed(2)} %
          </span>
        </p>
      </div>
    </div>
  );
};

export default PlantRecomendation;
