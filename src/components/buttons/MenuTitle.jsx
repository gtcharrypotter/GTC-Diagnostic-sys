const MenuTitle = ({ src, children, className }) => {
	return (
		<div
			className={`flex flex-row items-center overflow-visible justify-center gap-2 py-0 min-w-[128px] ${
				className || ""
			}`}
		>
			<img src={src} className="h-[28px]  object-contain" />
			<span className="text-xs font-semibold ">{children}</span>
		</div>
	);
};

export default MenuTitle;
