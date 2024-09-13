"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import React, { useState } from "react";
import { cropOptions, inputOptions } from "@/app/lib/data";
import { Prediction } from "@/app/lib/types";

export default function Home() {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [ph, setPh] = useState("");
  const [N_leafSap, setN_leafSap] = useState("");
  const [P_leafSap, setP_leafSap] = useState("");
  const [K_leafSap, setK_leafSap] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [crop, setCrop] = useState("");
  const [prediction, setPrediction] = useState<Prediction>({
    predictions: {
      N: 0,
      P: 0,
      K: 0,
    },
    comparisons: {
      N: "Sufficient",
      P: "Sufficient",
      K: "Sufficient",
    },
    comparisons_value: {
      N: 0,
      P: 0,
      K: 0,
    },
  });
  const [hasPrediction, setHasPrediction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [select, setSelect] = useState("");

  const handleSubmit = async () => {
    if (!n) {
      setError("Field 'n' is required.");
      return;
    }
    if (!p) {
      setError("Field 'p' is required.");
      return;
    }
    if (!k) {
      setError("Field 'k' is required.");
      return;
    }
    if (!ph) {
      setError("Field 'ph' is required.");
      return;
    }
    if (!temperature) {
      setError("Field 'temperature' is required.");
      return;
    }
    if (!humidity) {
      setError("Field 'humidity' is required.");
      return;
    }
    if (!rainfall) {
      setError("Field 'rainfall' is required.");
      return;
    }
    if (!crop) {
      setError("Field 'crop' is required.");
      return;
    }

    setLoading(true);
    setHasPrediction(false);
    setError("");

    const data = {
      N: parseFloat(n),
      P: parseFloat(p),
      K: parseFloat(k),
      pH: parseFloat(ph),
      Temperature: parseFloat(temperature),
      Humidity: parseFloat(humidity),
      Rainfall: parseFloat(rainfall),
      Crop: parseInt(crop),
      N_leafSap: parseFloat(N_leafSap),
      P_leafSap: parseFloat(P_leafSap),
      K_leafSap: parseFloat(K_leafSap),
    };

    try {
      const response = await fetch(
        "https://agroplan-api.vercel.app/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      setPrediction(result);
      setHasPrediction(true);
    } catch (error) {
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      console.log(prediction.comparisons);
      setLoading(false);
    }
  };

  const getDataThingspeak = async () => {
    try {
      const response = await fetch(
        "https://api.thingspeak.com/channels/2321454/feeds.json?results=1",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch sensor data");
      }

      const result = await response.json();

      if (result.feeds.length > 0) {
        const data = {
          pH: parseFloat(result.feeds[0].field1),
          EC: parseFloat(result.feeds[0].field2),
          soilMoisture: parseInt(result.feeds[0].field3),
          temperature: parseInt(result.feeds[0].field4),
          nitrogen: parseInt(result.feeds[0].field5),
          phosphorus: parseInt(result.feeds[0].field6),
          potassium: parseInt(result.feeds[0].field7),
          eh: parseFloat(result.feeds[0].field8),
        };

        setN(data.nitrogen.toString());
        setP(data.phosphorus.toString());
        setK(data.potassium.toString());
        setPh(data.pH.toString());
        setTemperature(data.temperature.toString());
        setHumidity(data.soilMoisture.toString());
        setRainfall(data.eh.toString());
      } else {
        throw new Error("No sensor data available");
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const dataAdditionalFertilizer = {
    Urea: ((100 / 46) * prediction.comparisons_value.N * 2.4).toFixed(2),
    SP_36: ((100 / 36) * prediction.comparisons_value.P * 2.4).toFixed(2),
    MOP: ((100 / 60) * prediction.comparisons_value.K * 2.4).toFixed(2),
  };

  return (
    <section className="flex flex-wrap items-start justify-center gap-4 rounded-2xl bg-white/50 p-4 backdrop-blur-lg dark:bg-zinc-900 sm:p-8 md:gap-8 lg:flex-nowrap lg:gap-16">
      <div className="flex w-full max-w-xl flex-col flex-wrap gap-4">
        <h1 className="text-xl font-bold sm:text-2xl md:text-4xl">
          Soil Nutrient Prediction
        </h1>
        <div className="relative space-y-2 border-e border-neutral-700 pr-4 md:border-e-0">
          <div className="absolute -right-4 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-white sm:hidden">
            1
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Enter the soil parameters:
          </p>
          <Autocomplete
            variant="faded"
            labelPlacement="outside"
            label="Select Data Source"
            placeholder="Sensoric System | Manual Input"
            className="w-full font-semibold"
            onSelectionChange={(selected) => {
              if (selected) {
                const selectedItem = inputOptions.find(
                  (option) => option.value.toString() === selected,
                );
                setSelect(selectedItem ? selectedItem.value.toString() : "");
                if (selectedItem?.value === 1) {
                  getDataThingspeak();
                }
              }
            }}
          >
            {inputOptions.map((option) => (
              <AutocompleteItem
                key={option.value}
                value={option.value.toString()}
              >
                {option.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <Autocomplete
            variant="faded"
            labelPlacement="outside"
            label="Crop"
            placeholder="Search a crop"
            className="w-full font-semibold"
            onSelectionChange={(selected) => {
              if (selected) {
                const selectedItem = cropOptions.find(
                  (option) => option.value.toString() === selected,
                );
                setCrop(selectedItem ? selectedItem.value.toString() : "");
              }
            }}
          >
            {cropOptions.map((option) => (
              <AutocompleteItem
                key={option.value}
                value={option.value.toString()}
              >
                {option.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2">
          <div className="absolute -right-4 -top-0 flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-white sm:hidden">
            2
          </div>
          <div className="space-y-4 border-r border-neutral-700 pr-4">
            <div className="space-y-8">
              <p className="text-gray-500 dark:text-gray-400">Environment</p>
              <Input
                variant="faded"
                type="number"
                step="0.01"
                label="N:"
                labelPlacement="outside"
                placeholder="Enter"
                value={n}
                onChange={(e) => setN(e.target.value)}
                className="font-semibold"
                isDisabled={select === "1"}
              />
              <Input
                variant="faded"
                type="number"
                step="0.01"
                label="P:"
                labelPlacement="outside"
                placeholder="Enter"
                value={p}
                onChange={(e) => setP(e.target.value)}
                isDisabled={select === "1"}
              />
              <Input
                variant="faded"
                type="number"
                step="0.01"
                label="K:"
                labelPlacement="outside"
                placeholder="Enter"
                value={k}
                onChange={(e) => setK(e.target.value)}
                className="font-semibold"
                isDisabled={select === "1"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                variant="faded"
                type="number"
                step="0.01"
                label="pH:"
                labelPlacement="outside"
                placeholder="Enter"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="font-semibold"
                isDisabled={select === "1"}
              />
              <Input
                variant="faded"
                type="number"
                step="0.01"
                label="Temperature:"
                labelPlacement="outside"
                placeholder="Enter"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="font-semibold"
                isDisabled={select === "1"}
              />
              <Input
                variant="faded"
                type="number"
                step="0.01"
                label="Humidity:"
                labelPlacement="outside"
                placeholder="Enter"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                className="font-semibold"
                isDisabled={select === "1"}
              />
              <Input
                variant="faded"
                type="number"
                step="0.01"
                label="Rainfall:"
                labelPlacement="outside"
                placeholder="Enter"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                className="font-semibold"
                isDisabled={select === "1"}
              />
            </div>
          </div>
          <div className="relative space-y-8 border-e border-neutral-700 pr-4 md:border-e-0">
            <p className="text-gray-500 dark:text-gray-400">Leaf Sap</p>
            <div className="absolute -right-4 -top-8 flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-white sm:hidden">
              3
            </div>
            <Input
              variant="faded"
              type="number"
              step="0.01"
              label="N:"
              labelPlacement="outside"
              placeholder="Enter"
              value={N_leafSap}
              onChange={(e) => setN_leafSap(e.target.value)}
            />
            <Input
              variant="faded"
              type="number"
              step="0.01"
              label="P:"
              labelPlacement="outside"
              placeholder="Enter"
              value={P_leafSap}
              onChange={(e) => setP_leafSap(e.target.value)}
            />
            <Input
              variant="faded"
              type="number"
              step="0.01"
              label="K:"
              labelPlacement="outside"
              placeholder="Enter"
              value={K_leafSap}
              onChange={(e) => setK_leafSap(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="font-semibold text-red-500">{error}</p>}
        <Button
          isLoading={loading}
          className="w-full bg-black text-white dark:bg-white dark:text-black"
          onPress={handleSubmit}
        >
          Predict
        </Button>
      </div>

      {hasPrediction && !loading && (
        <div
          className={`flex w-full flex-col flex-wrap gap-4 rounded-2xl bg-white/60 p-4 backdrop-blur-lg dark:bg-zinc-800 sm:p-6`}
        >
          <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-4xl">
            Predicted Nutrient Levels
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Based on the soil parameters and crop selection, the predicted
            nutrient levels are:
          </p>
          <div className="rounded-lg bg-gray-200 p-2 text-xl font-medium dark:bg-zinc-900/50 sm:p-4">
            <div>
              N:
              <span className="text-4xl font-semibold">
                {prediction.predictions.N.toFixed(2)}
              </span>
              <span className="text-sm"> ppm</span>
            </div>
            <div>
              P:
              <span className="text-4xl font-semibold">
                {prediction.predictions.P.toFixed(2)}
              </span>
              <span className="text-sm"> ppm</span>
            </div>
            <div>
              K:
              <span className="text-4xl font-semibold">
                {prediction.predictions.K.toFixed(2)}
              </span>
              <span className="text-sm"> ppm</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              Based on the predicted nutrient levels and the selected crop (
              {
                cropOptions.find((option) => option.value.toString() === crop)
                  ?.label
              }
              ), the following recommendations are provided:
            </p>
            <div className="rounded-lg bg-gray-200 p-2 dark:bg-zinc-900/50 sm:p-4">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-b-black/20 transition-colors dark:border-b-white/20">
                    <td>Nitrogen (N):</td>
                    <td
                      className={`p-2 text-right text-xs sm:text-sm text-${
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
                      className={`p-2 text-right text-xs sm:text-sm text-${
                        prediction.comparisons.P.includes("Sufficient")
                          ? "green"
                          : "red"
                      }-500`}
                    >
                      {prediction.comparisons.P}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50 transition-colors">
                    <td>Potassium (K):</td>
                    <td
                      className={`p-2 text-right text-xs sm:text-sm text-${
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
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              Additional Fertilizer Recomendation :
            </p>
            <div className="rounded-lg bg-gray-200 p-2 dark:bg-zinc-900/50 sm:p-4">
              <table className="w-full">
                <tbody>
                  {parseFloat(dataAdditionalFertilizer.Urea) < 0 && (
                    <tr className="border-b border-b-black/20 dark:border-b-white/20">
                      <td>UREA :</td>
                      <td className="text p-2 text-right text-xs sm:text-sm">
                        {parseFloat(dataAdditionalFertilizer.Urea)
                          ? parseFloat(dataAdditionalFertilizer.Urea) * -1 +
                            " kg/Ha"
                          : ""}
                      </td>
                    </tr>
                  )}
                  {parseFloat(dataAdditionalFertilizer.SP_36) < 0 && (
                    <tr className="border-b border-b-black/20 dark:border-b-white/20">
                      <td>SP_36</td>
                      <td className="text p-2 text-right text-xs sm:text-sm">
                        {parseFloat(dataAdditionalFertilizer.SP_36)
                          ? parseFloat(dataAdditionalFertilizer.SP_36) * -1 +
                            " kg/Ha"
                          : ""}
                      </td>
                    </tr>
                  )}
                  {parseFloat(dataAdditionalFertilizer.MOP) < 0 && (
                    <tr className="border-b border-b-black/20 dark:border-b-white/20">
                      <td>MOP:</td>
                      <td className="text p-2 text-right text-xs sm:text-sm">
                        {parseFloat(dataAdditionalFertilizer.MOP)
                          ? parseFloat(dataAdditionalFertilizer.MOP) * -1 +
                            " kg/Ha"
                          : ""}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
