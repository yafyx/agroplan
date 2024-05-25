"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

export default function Home() {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [ph, setPh] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleSubmit = async () => {
    const data = {
      N: parseFloat(n),
      P: parseFloat(p),
      K: parseFloat(k),
      pH: parseFloat(ph),
      Temperature: parseFloat(temperature),
      Humidity: parseFloat(humidity),
      Rainfall: parseFloat(rainfall),
    };

    const response = await fetch("http://localhost:5328/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setPrediction(result[0]);
  };

  return (
    <section className="flex flex-wrap items-center justify-center gap-4 px-4 sm:flex-nowrap sm:px-8 sm:gap-8 md:flex-nowrap md:gap-16">
      <div className="flex flex-col flex-wrap w-full gap-4">
        <h1 className="text-xl font-bold sm:text-2xl md:text-4xl">
          Soil Predict
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the soil parameters:
        </p>{" "}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="N :"
            labelPlacement="outside"
            placeholder="Enter"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
          <Input
            type="number"
            label="P :"
            labelPlacement="outside"
            placeholder="Enter"
            value={p}
            onChange={(e) => setP(e.target.value)}
          />
          <Input
            type="number"
            label="K :"
            labelPlacement="outside"
            placeholder="Enter"
            value={k}
            onChange={(e) => setK(e.target.value)}
          />
          <Input
            type="number"
            label="pH :"
            labelPlacement="outside"
            placeholder="Enter"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
          />
          <Input
            type="number"
            label="Temperature :"
            labelPlacement="outside"
            placeholder="Enter"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <Input
            type="number"
            label="Humidity :"
            labelPlacement="outside"
            placeholder="Enter"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
          <Input
            type="number"
            label="Rainfall :"
            labelPlacement="outside"
            placeholder="Enter"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)}
          />
        </div>
        <Button className="w-full" onPress={handleSubmit}>
          Predict
        </Button>
      </div>
      <div className="flex flex-col flex-wrap w-full gap-4 ">
        <h1 className="text-xl font-bold sm:text-2xl md:text-4xl">Output</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Based on the soil parameters you provided, the recommended is:
        </p>
        <div className="rounded-lg bg-gray-100 p-4 text-2xl font-bold dark:bg-gray-800">
          {prediction}
        </div>
      </div>
    </section>
  );
}
