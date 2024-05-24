"use client";

import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";

export default function Home() {
	const [data, setData] = useState<any>([]);
	useEffect(() => {
		// Fetch data from your API
		async function fetchData() {
			try {
				const response = await fetch("http://127.0.0.1:5328/api/predict");
				if (response.ok) {
					const data = await response.json();
					setData(data);
				} else {
					console.error("Error fetching data:", response.status);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
		console.log(data);
	}, [data]); // Run this effect only once on component mount

	return (
		<section className="flex flex-wrap items-center justify-center gap-4 px-4 sm:flex-nowrap sm:px-8 sm:gap-8 md:flex-nowrap md:gap-16">
			<div className="flex flex-col flex-wrap w-full gap-4">
				<h1 className="text-xl font-semibold sm:text-2xl md:text-4xl">Input</h1>
				<Input type="text" label="N :" />
				<Input type="text" label="P :" />
				<Input type="text" label="pH :" />
				<Input type="text" label="Temperature :" />
				<Input type="text" label="Humidity :" />
				<Input type="text" label="Rainfall :" />
			</div>
			<div className="flex flex-col flex-wrap w-full gap-4 ">
				<h1 className="text-xl font-semibold sm:text-2xl md:text-4xl">Output</h1>
				<Input type="text" label="N :" disabled value={"Kurang dari 1"} />
				<Input type="text" label="P :" disabled value={"10"} />
				<Input type="text" label="K :" disabled value={"10"} />
			</div>
		</section>
	);
}
