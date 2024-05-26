"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import React, { useState } from "react";

export default function Home() {
  // const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [ph, setPh] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [crop, setCrop] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleSubmit = async () => {
    const data = {
      // N: parseFloat(n),
      P: parseFloat(p),
      K: parseFloat(k),
      pH: parseFloat(ph),
      Temperature: parseFloat(temperature),
      Humidity: parseFloat(humidity),
      Rainfall: parseFloat(rainfall),
      Crop: parseInt(crop),
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
    <section className="flex flex-wrap items-center justify-center gap-4 px-4 sm:flex-nowrap sm:px-8 sm:gap-8 md:flex-nowrap md:gap-16">
      <div className="flex flex-col flex-wrap w-full gap-4">
        <h1 className="text-xl font-bold sm:text-2xl md:text-4xl">
          Soil Predict
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the soil parameters:
        </p>
        <Autocomplete
          labelPlacement="outside"
          label="Select Crop"
          placeholder="Search a crop"
          className="w-full"
          onSelectionChange={(selected) => {
            if (selected) {
              const selectedItem = cropOptions.find(
                (option) => option.value.toString() === selected
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
        <div className="grid grid-cols-2 gap-4">
          {/* <Input
            type="number"
            label="N :"
            labelPlacement="outside"
            placeholder="Enter"
            value={n}
            onChange={(e) => setN(e.target.value)}
          /> */}
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
