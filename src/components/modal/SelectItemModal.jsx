/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Fade, Zoom } from "react-reveal";
import { Dialog, Transition } from "@headlessui/react";
import ActionBtn from "../buttons/ActionBtn";
import FlatIcon from "../FlatIcon";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import Axios from "../../libs/axios";
import useClinic from "../../hooks/useClinic";
import {
	dateYYYYMMDD,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	patientFullName,
} from "../../libs/helpers";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InfoText from "../InfoText";
import ReferralListItem from "../../pages/patient-referrals/components/ReferralListItem";
import ReactSelectInputField from "../inputs/ReactSelectInputField";
// [ { label: "8:00 AM - 8:30 AM", value: "8:00 AM - 8:30 AM", }, { label: "8:30 AM - 9:00 AM", value: "8:30 AM - 9:00 AM", }, { label: "9:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, { label: "10:00 AM - 10:30 AM", value: "10:00 AM - 10:30 AM", }, { label: "10:30 AM - 11:00 AM", value: "10:30 AM - 11:00 AM", }, { label: "11:00 AM - 9:30 AM", value: "9:00 AM - 9:30 AM", }, { label: "9:30 AM - 10:00 AM", value: "9:30 AM - 10:00 AM", }, ]

const SelectItemRow = ({ items, onChange }) => {
	const [selected, setSelected] = useState(null);
	return (
		<div className="w-full">
			<ReactSelectInputField
				isClearable={true}
				inputClassName=" "
				value={selected}
				onChange={(val) => {
					setSelected(val);
				}}
				onChangeGetData={(data) => {
					onChange(data?.item);
				}}
				// onBlur={onBlur} // notify when input is touched
				// error={error?.message}
				onD
				placeholder="Select Item"
				options={items?.map((item) => {
					return {
						item: item,
						label: item?.name,
						value: item?.id,
					};
				})}
			/>
		</div>
	);
};

const SelectItemModal = (props, ref) => {
	const { items } = props;

	const [modalOpen, setModalOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const [showData, setShowData] = useState({
		items: [],
		onChangeFn: () => {},
	});

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setModalOpen(true);
		setShowData(data);
	};
	const hide = () => {
		setModalOpen(false);
	};
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={() => {}}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[350]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[360]">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-lg rounded-b-xl transform overflow- rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" px-6 pt-4 font-medium flex-col leading-6 flex items-start text-gray-700"
								>
									<span className="text-md font-bold">
										Select Item
									</span>
									<span className="text-xs font-light">
										Select item and click button to continue
									</span>
									<ActionBtn
										type="danger"
										className="absolute right-4 top-4"
										onClick={hide}
									>
										<FlatIcon
											icon="rr-cross-small"
											className="!text-white"
										/>
									</ActionBtn>
								</Dialog.Title>
								<div className="px-6 pt-4 pb-8 flex items-center gap-3">
									<SelectItemRow
										items={showData?.items}
										onChange={(item) => {
											showData?.onChangeFn(item);
											setSelected(item);
										}}
									/>
									<ActionBtn
										size="lg"
										disabled={selected == null}
										className="px-5 !rounded-lg !h-10"
										type={"success"}
										onClick={hide}
									>
										<FlatIcon icon="rr-check" />
									</ActionBtn>
								</div>
								<div className="flex flex-col"></div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(SelectItemModal);
