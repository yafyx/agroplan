import { cropOptions } from "@/app/lib/data";
import React, { FC } from "react";

type NutrientSurplusDeficitProps = {
    crop: string;
    prediction: {
        comparisons: {
            N: string;
            P: string;
            K: string;
        };
    };
};

const NutrientSurplusDeficit: FC<NutrientSurplusDeficitProps> = ({prediction, crop}) => {
  return (
    <>
      <div className="space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Based on the predicted nutrient levels and the selected crop (
          {
            cropOptions.find((option) => option.value.toString() === crop)
              ?.label
          }
          ), the following recommendations are provided:
        </p>
        <div className="p-2 bg-gray-200 rounded-lg dark:bg-zinc-900/50 sm:p-4">
          <table className="w-full">
            <tbody>
              <tr className="transition-colors border-b border-b-black/20 dark:border-b-white/20">
                <td>Nitrogen (N):</td>
                <td
                  className={`p-2 text-right text-sm sm:text-sm text-${
                    prediction.comparisons.N.includes("Sufficient")
                      ? "green"
                      : "red"
                  }-500`}
                >
                  {prediction.comparisons.N}
                </td>
              </tr>
              <tr className="border-b border-b-black/20 dark:border-b-white/20">
                <td>Phosphorus (P):</td>
                <td
                  className={`p-2 text-right text-sm sm:text-sm text-${
                    prediction.comparisons.P.includes("Sufficient")
                      ? "green"
                      : "red"
                  }-500`}
                >
                  {prediction.comparisons.P}
                </td>
              </tr>
              <tr className="transition-colors hover:bg-muted/50">
                <td>Potassium (K):</td>
                <td
                  className={`p-2 text-right text-sm sm:text-sm text-${
                    prediction.comparisons.K.includes("Sufficient")
                      ? "green"
                      : "red"
                  }-500`}
                >
                  {prediction.comparisons.K}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NutrientSurplusDeficit;
