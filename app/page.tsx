//page.tsx
"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import React, { useState } from "react";

export default function Home() {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [ph, setPh] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [crop, setCrop] = useState("");
  const [prediction, setPrediction] = useState({
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
  });
  const [hasPrediction, setHasPrediction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    };

    try {
      const response = await fetch(
        "https://agri-plan-api.vercel.app/api/predict",
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
      setLoading(false);
    }
  };

  const cropOptions = [
    { label: "Apple", value: 0 },
    { label: "Banana", value: 1 },
    { label: "Rice", value: 2 },
    { label: "Jute", value: 3 },
    { label: "Watermelon", value: 4 },
    { label: "Maize", value: 5 },
    { label: "Chickpea", value: 6 },
    { label: "Kidney Beans", value: 7 },
    { label: "Moth Beans", value: 9 },
    { label: "Mungbean", value: 10 },
    { label: "Blackgram", value: 11 },
    { label: "Lentil", value: 12 },
    { label: "Pomegranate", value: 13 },
    { label: "Mango", value: 15 },
    { label: "Grapes", value: 16 },
    { label: "Muskmelon", value: 17 },
    { label: "Orange", value: 18 },
    { label: "Papaya", value: 19 },
    { label: "Coconut", value: 20 },
    { label: "Cotton", value: 21 },
    { label: "Coffee", value: 22 },
    { label: "Pigeon Peas", value: 23 },
  ];

  return (
    <section className="flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-white/50 p-8 backdrop-blur-lg dark:bg-zinc-900 sm:flex-nowrap sm:gap-8 sm:px-8 md:flex-nowrap md:gap-16">
      <div className="flex w-full flex-col flex-wrap gap-4">
        <h1 className="text-xl font-bold sm:text-2xl md:text-4xl">
          Soil Nutrient Predict
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the soil parameters:
        </p>
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
        <Input
          variant="faded"
          type="number"
          step="0.01"
          label="N :"
          labelPlacement="outside"
          placeholder="Enter"
          value={n}
          onChange={(e) => setN(e.target.value)}
          className="font-semibold"
        />
        <Input
          variant="faded"
          type="number"
          step="0.01"
          label="P :"
          labelPlacement="outside"
          placeholder="Enter"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />
        <Input
          variant="faded"
          type="number"
          step="0.01"
          label="K :"
          labelPlacement="outside"
          placeholder="Enter"
          value={k}
          onChange={(e) => setK(e.target.value)}
          className="font-semibold"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            variant="faded"
            type="number"
            step="0.01"
            label="pH :"
            labelPlacement="outside"
            placeholder="Enter"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            className="font-semibold"
          />
          <Input
            variant="faded"
            type="number"
            step="0.01"
            label="Temperature :"
            labelPlacement="outside"
            placeholder="Enter"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="font-semibold"
          />
          <Input
            variant="faded"
            type="number"
            step="0.01"
            label="Humidity :"
            labelPlacement="outside"
            placeholder="Enter"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            className="font-semibold"
          />
          <Input
            variant="faded"
            type="number"
            step="0.01"
            label="Rainfall :"
            labelPlacement="outside"
            placeholder="Enter"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)}
            className="font-semibold"
          />
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
            Predicted Nutrient
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
            </div>
            <div>
              P:
              <span className="text-4xl font-semibold">
                {prediction.predictions.P.toFixed(2)}
              </span>
            </div>
            <div>
              K:
              <span className="text-4xl font-semibold">
                {prediction.predictions.K.toFixed(2)}
              </span>
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
              <table>
                <tbody>
                  <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-b-black/20 transition-colors dark:border-b-white/20">
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
                  <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b  border-b-black/20 dark:border-b-white/20">
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
        </div>
      )}
    </section>
  );
}
