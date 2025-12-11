import FlatIcon from "../../components/FlatIcon";
import ActionBtn from "../../components/buttons/ActionBtn";
import AppLayout from "../../components/container/AppLayout";
import TextInput from "../../components/inputs/TextInput";
import PageHeader from "../../components/layout/PageHeader";

const MyAccount = () => {
	return (
		<AppLayout>
			<PageHeader title="My Account" icon="rr-clipboard-user" />
			<div className="p-5">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
					<div className="lg:col-span-4">
						<div className="border-[0.5px] border-blue-500 shadow rounded">
							<div className="border-b-[0.5px] bg-blue-50 rounded-t border-b-blue-500 p-4 text-lg text-blue-700 font-semibold flex items-center gap-2">
								<FlatIcon icon="rr-user" className="text-xl" />
								Update Username
							</div>
							<div className="p-4 flex flex-col gap-y-5">
								<TextInput
									label="Username"
									placeholder="Enter Username"
								/>
								<TextInput
									label="New Username"
									placeholder="Enter New Username"
								/>
								<ActionBtn>Submit</ActionBtn>
							</div>
						</div>
					</div>
					<div className="lg:col-span-4">
						<div className="border-[0.5px] border-blue-500 shadow rounded">
							<div className="border-b-[0.5px] bg-blue-50 rounded-t border-b-blue-500 p-4 text-lg text-blue-700 font-semibold flex items-center gap-2">
								<FlatIcon icon="rr-lock" className="text-xl" />
								Update Password
							</div>
							<div className="p-4 flex flex-col gap-y-5">
								<TextInput
									label="Password"
									placeholder="Enter Password"
								/>
								<TextInput
									label="New Password"
									placeholder="Enter New Password"
								/>
								<TextInput
									label="Confirm New Password"
									placeholder="Enter Confirm New Password"
								/>
								<ActionBtn>Submit</ActionBtn>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default MyAccount;
