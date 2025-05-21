import React from "react";
import SecondCounter from "./SecondCounter";



//create your first component
const Home = () => {
	return (
		<div className="container flex-column d-flex justify-content-center align-items-center">

			<div className="bg-dark m-2 p-2 rounded-3">
				<SecondCounter />

			</div>

		</div>


	);
};

export default Home;