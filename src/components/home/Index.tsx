import React, { useState } from "react";

import HomeBanner from './Banner'
import HomeList from './List'

const Home = () => {
	return (
		<div className="w-full max-w-[450px]">
			<HomeBanner />
			<HomeList />
		</div>
	);
};

export default Home;
