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
    }
}

const PlantRecomendation: FC<PlantRecomendationProps> = ({prediction}) => {
  return (
    <div className="w-full p-2 space-y-2 lg:w-1/2">
      <h1 className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-4xl">
        Plant Recommendation
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Based on the soil and parameters and crop collection data, the plant
        recommendation is:
      </p>
      <div className="p-4 bg-gray-200 rounded-lg dark:bg-zinc-900/50">
        <span className="text-3xl font-bold underline capitalize underline-offset-4">
          {prediction.crop_prediction}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Using the KNN classifier, the accuracy of the prediction is:
      </p>
      <div className="p-4 bg-gray-200 rounded-lg dark:bg-zinc-900/50">
        <p className="flex justify-between">
          <span>KNN Accuracy:</span>
          <span className="text-green-500">
            {prediction.knn_accuracy?.toFixed(2)} %
          </span>
        </p>
        <p className="flex justify-between">
          <span className="italic">knn_train_accuracy:</span>
          <span className="text-green-500">
            {prediction.knn_train_accuracy?.toFixed(2)} %
          </span>
        </p>
        <p className="flex justify-between">
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
