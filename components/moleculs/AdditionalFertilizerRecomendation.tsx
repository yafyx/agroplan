import React, { FC } from "react";

type AdditionalFertilizerRecomendationProps = {
  dataAdditionalFertilizer: {
    Urea: string;
    SP_36: string;
    MOP: string;
  };
};

const AdditionalFertilizerRecomendation: FC<
  AdditionalFertilizerRecomendationProps
> = ({ dataAdditionalFertilizer }) => {
  return (
    <div className="space-y-2 p-2">
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Additional Fertilizer Recomendation:
      </p>
      <div className="rounded-lg bg-gray-200 p-4 dark:bg-zinc-900/50 sm:p-4 ">
        <table className="w-full text-sm lg:text-lg">
          <tbody>
            {parseFloat(dataAdditionalFertilizer.Urea) < 0 && (
              <tr className="border-b border-b-black/20 dark:border-b-white/20">
                <td>UREA:</td>
                <td className="text p-2 text-right ">
                  {parseFloat(dataAdditionalFertilizer.Urea)
                    ? parseFloat(dataAdditionalFertilizer.Urea) * -1 + " kg/Ha"
                    : ""}
                </td>
              </tr>
            )}
            {parseFloat(dataAdditionalFertilizer.SP_36) < 0 && (
              <tr className="border-b border-b-black/20 dark:border-b-white/20">
                <td>SP_36:</td>
                <td className="text p-2 text-right ">
                  {parseFloat(dataAdditionalFertilizer.SP_36)
                    ? parseFloat(dataAdditionalFertilizer.SP_36) * -1 + " kg/Ha"
                    : ""}
                </td>
              </tr>
            )}
            {parseFloat(dataAdditionalFertilizer.MOP) < 0 && (
              <tr>
                <td>MOP:</td>
                <td className="text p-2 text-right ">
                  {parseFloat(dataAdditionalFertilizer.MOP)
                    ? parseFloat(dataAdditionalFertilizer.MOP) * -1 + " kg/Ha"
                    : ""}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdditionalFertilizerRecomendation;
