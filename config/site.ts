export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "AgriPlan",
	description: "AgriPlan is a hybrid web application built with Next.js and Flask, combining a powerful frontend interface with a robust backend API. This innovative application allows users to predict the optimal crop based on soil parameters provided.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
	],
	links: {
		github: "https://github.com/yafyx/AgriPlan",
	},
};
