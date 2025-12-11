const ContentTitle = ({ title, children }) => {
	return (
		<>
			<div className="flex items-center gap-4">
				<h5 className="text-xl text-left font-bold  text-black mb-0">
					{title}
				</h5>
				{children}
			</div>
			<div className="h-[1.5px] w-2/5 bg-indigo-300 mb-[0.5px]" />
			<div className="h-[1px] w-2/5 bg-red-300 mb-4" />
		</>
	);
};

export default ContentTitle;
