import { useState } from "react";

const usePagination = () => {
	const [loading, setLoading] = useState(false);
	const [paginate, setPaginate] = useState(10);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState(null);

	return {
		page,
		setPage,
		meta,
		setMeta,
		loading,
		setLoading,
		paginate,
		setPaginate,
	};
};

export default usePagination;
