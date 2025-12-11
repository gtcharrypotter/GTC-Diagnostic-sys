import { Disclosure, Transition } from "@headlessui/react";
import FlatIcon from "./FlatIcon";
import ActionBtn from "./buttons/ActionBtn";

const CollapseDiv = ({
	title = "Title",
	children,
	headerClassName = "",
	bodyClassName = "",
	defaultOpen = false,
}) => {
	return (
		<Disclosure
			as={"div"}
			className="rounded-xl border  border-background duration-200"
			defaultOpen={defaultOpen}
		>
			{({ open }) => (
				<>
					<Disclosure.Button
						as="div"
						className={`bg-background p-3 text-base font-bold flex items-center cursor-pointer rounded-t-xl ${
							!open && "rounded-b-xl"
						} ${headerClassName}`}
					>
						{title}
						<div className="flex items-center justify-center ml-auto">
							<FlatIcon
								icon="rr-angle-down"
								className={`${
									open ? "rotate-180" : ""
								} duration-200`}
							/>
						</div>
					</Disclosure.Button>

					<Transition
						show={open}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Disclosure.Panel
							as="div"
							className={`p-3 ${bodyClassName}`}
						>
							
							{children}
							
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
};

export default CollapseDiv;
