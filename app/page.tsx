"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import React, { useState } from "react";
import { cropOptions, inputOptions } from "@/app/lib/data";
import { Prediction } from "@/app/lib/types";
import PredictNutritientLevels from "@/components/moleculs/PredictNutritientLevels";
import PlantRecomendation from "@/components/moleculs/PlantRecomendation";
import NutrientSurplusDeficit from "@/components/moleculs/NutrientSurplusDeficit";
import AdditionalFertilizerRecomendation from "@/components/moleculs/AdditionalFertilizerRecomendation";
import PredictNutritientAdjust from "@/components/moleculs/PredictNutritientAdjust";

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
    recommendations: {
      N: 0,
      P: 0,
      K: 0,
      temperature: 0,
      ph: 0,
      humidity: 0,
      rainfall: 0,
    },
    mean_values: {
      N: 0,
      P: 0,
      K: 0,
      temperature: 0,
      ph: 0,
      humidity: 0,
      rainfall: 0,
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
    crop_prediction: "",
    knn_accuracy: 0,
    knn_train_accuracy: 0,
    knn_test_accuracy: 0,
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
      ph: parseFloat(ph),
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      rainfall: parseFloat(rainfall),
      selected_crop: String(crop),
      N_leafSap: parseFloat(N_leafSap) || 0,
      P_leafSap: parseFloat(P_leafSap) || 0,
      K_leafSap: parseFloat(K_leafSap) || 0,
    };

    try {
      const response = await fetch(
        "https://agroplan-api-production.up.railway.app/api/predict",
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
      console.log(prediction);
      setLoading(false);
    }
  };

  const getDataThingspeak = async () => {
    try {
      const response = await fetch(
        "https://api.thingspeak.com/channels/2629109/feeds.json?results=1",
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
      } else {
        throw new Error("No sensor data available");
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const dataAdditionalFertilizer = {
    Urea: ((100 / 46) * prediction.comparisons_value.N * 2.24).toFixed(2),
    SP_36: ((100 / 36) * prediction.comparisons_value.P * 2.24).toFixed(2),
    MOP: ((100 / 60) * prediction.comparisons_value.K * 2.24).toFixed(2),
  };

  return (
    <section className="flex flex-wrap items-start justify-center gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-lg dark:bg-zinc-900 sm:p-8 md:gap-8 lg:gap-16 xl:flex-nowrap">
      <div className="flex flex-col flex-wrap w-full max-w-xl gap-4">
        <h1 className="text-2xl font-bold sm:text-2xl md:text-5xl">
          Soil Nutrient Analysis & Crop Prediction
        </h1>
        <div className="relative pr-4 space-y-2 border-e border-neutral-700 md:border-e-0">
          <div className="absolute flex items-center justify-center w-8 h-8 font-bold text-white bg-black rounded-full -right-4 -top-0 sm:hidden">
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
                  (option) => option.value === selected,
                );
                setCrop(selectedItem ? selectedItem.value : "");
              }
            }}
          >
            {cropOptions.map((option) => (
              <AutocompleteItem key={option.value} value={option.value}>
                {option.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2">
          <div className="absolute flex items-center justify-center w-8 h-8 font-bold text-white bg-black rounded-full -right-4 -top-0 sm:hidden">
            2
          </div>
          <div className="pr-4 space-y-4 border-r border-r-black/20 dark:border-r-white/20">
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
              />
            </div>
          </div>
          <div className="relative pr-4 space-y-8 border-e border-neutral-700 md:border-e-0">
            <p className="text-gray-500 dark:text-gray-400">Leaf Sap</p>
            <div className="absolute flex items-center justify-center w-8 h-8 font-bold text-white bg-black rounded-full -right-4 -top-8 sm:hidden">
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
          className="w-full text-white bg-black dark:bg-white dark:text-black"
          onPress={handleSubmit}
        >
          Predict
        </Button>
      </div>

      {hasPrediction && !loading && (
        <div
          className={`flex w-full flex-col flex-wrap rounded-2xl bg-white/60 p-4 backdrop-blur-lg dark:bg-zinc-800 sm:p-6 `}
        >
          <div className="flex flex-row flex-wrap h-max">
            <PlantRecomendation prediction={prediction} />
            <PredictNutritientLevels prediction={prediction} />
          </div>
          <div className="inline-flex flex-wrap w-full ">
            <PredictNutritientAdjust prediction={prediction} />
          </div>
          <NutrientSurplusDeficit prediction={prediction} crop={crop} />
          <AdditionalFertilizerRecomendation
            dataAdditionalFertilizer={dataAdditionalFertilizer}
          />
        </div>
      )}
    </section>
  );
}
