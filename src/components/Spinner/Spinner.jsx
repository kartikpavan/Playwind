import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
	return (
		<div className="w-full h-96 flex items-center justify-center ">
			<Oval
				height="80"
				width="80"
				radius="9"
				color="cyan"
				ariaLabel="three-dots-loading"
				wrapperStyle
				wrapperClass
			/>
		</div>
	);
};

export default Spinner;
