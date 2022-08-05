import React from "react";

const Pagination = ({ currentPage, setPage, totalPages }) => {
	const handleNext = () => {
		if (currentPage !== totalPages) {
			setPage((previousPage) => {
				return previousPage + 1;
			});
		}
	};
	const handlePrev = () => {
		if (currentPage !== 1) {
			setPage((previousPage) => {
				return previousPage - 1;
			});
		}
	};

	if (totalPages === 0) return null;

	return (
		<div className="flex items-center justify-center w-full my-6">
			<div className="btn-group">
				<button className="btn" onClick={handlePrev}>
					«
				</button>
				<button className="btn">Page {currentPage}</button>
				<button className="btn" onClick={handleNext}>
					»
				</button>
			</div>
		</div>
	);
};

export default Pagination;
