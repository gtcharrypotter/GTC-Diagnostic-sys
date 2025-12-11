import { useRef, useState } from "react";
import AppLayout from "../../components/container/AppLayout";
import Pagination from "../../components/table/Pagination";
import TextInput from "../../components/inputs/TextInput";
import TextInputField from "../../components/inputs/TextInputField";
import DatabaseTable from "../../components/table/DatabaseTable";
import ActionBtn from "../../components/buttons/ActionBtn";
import FlatIcon from "../../components/FlatIcon";
import UploadPhilhealthMasterlistModal from "../../components/modal/UploadPhilhealthMasterlistModal";
import Axios from "../../libs/axios";
import { toast } from "react-toastify";
import { formatMMDDYYYY } from "../../libs/helpers";

const PhilhealthData = () => {
  const [startDate, setStartDate] = useState(formatMMDDYYYY());
  const [endDate, setEndDate] = useState(formatMMDDYYYY());
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ last_page: 1 });
  const [page, setPage] = useState(1);

  const masterlistUploadRef = useRef(null);
  const toMMDDYYYY = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
      d.getDate()
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };
  // Fetch data from backend
  const getRegistrationList = async () => {
    if (!startDate || !endDate) {
      alert("Start Date and End Date are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios.get("/v1/opd-standalone/extract-members", {
        params: { 
          startDate: toMMDDYYYY(startDate), 
          endDate: toMMDDYYYY(endDate), 
          page },
      });

      if (response.data.success) {
        let filteredData = response.data.data || [];

        // Apply frontend search filter by PIN
        if (searchInput.trim()) {
          filteredData = filteredData.filter((row) =>
            row.m_pin?.toLowerCase().includes(searchInput.toLowerCase())
          );
        }

        setData(filteredData);
        setMeta({ last_page: 1 }); // Optional if backend pagination not implemented
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to get Member Registered!");
    } finally {
      setLoading(false);
    }
  };

  // Download XML
  const downloadXML = async () => {
    try {
      const response = await Axios.get("/v1/opd-standalone/download-members", {
        params: { startDate, endDate },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RegistrationMasterlist.xml");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  return (
    <AppLayout>
      <div className="p-4 flex flex-col gap-6">
        {/* TITLE */}
        <div className="text-center text-xl font-semibold text-teal-800">
          REGISTRATION MASTERLIST
        </div>

        {/* FILTER CARD */}
        <div className="flex justify-center">
          <div className="shadow-sm rounded-xl p-4 w-1/4 border border-blue-300 bg-sky-200 flex flex-col gap-4 items-center">
            <div className="flex gap-2">
              <TextInput
                label="Start Date:"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextInput
                label="End Date:"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <ActionBtn type="primary-dark" onClick={getRegistrationList}>
                <FlatIcon icon="rr-download" className="text-sm" />
                Get Registration List
              </ActionBtn>

              <ActionBtn type="primary" onClick={downloadXML}>
                <FlatIcon icon="rr-download" className="text-sm" />
                Download XML
              </ActionBtn>
            </div>
          </div>
        </div>

        {/* SEARCH + UPLOAD */}
        <div className="flex items-center gap-4 p-2">
          <TextInputField
            label="Search by PIN"
            iconLeft="rr-search"
            placeholder="Search patient..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="ml-auto">
            <ActionBtn
              type="primary"
              className="rounded-full"
              onClick={() => masterlistUploadRef.current.show()}
            >
              <FlatIcon icon="rr-upload" className="text-xl" />
              Upload Masterlist
            </ActionBtn>
          </div>
        </div>

        {/* TABLE */}
        <DatabaseTable
          loading={loading}
          className="pb-2"
          data={data}
          columns={[
            { header: "Registration PIN", key: "m_pin", className: "text-center" },
            { header: "Primary PIN", key: "philhealth", className: "text-center" },
            { header: "Lastname", key: "lastname", className: "text-center" },
            { header: "Firstname", key: "firstname", className: "text-center" },
            { header: "Middlename", key: "middle", className: "text-center" },
            { header: "Extension", key: "suffix", className: "text-center" },
            { header: "Sex", key: "gender", className: "text-center" },
            { header: "Date of Birth", key: "birthday", className: "text-center" },
            {
              header: "Client Type",
              key: "patient_member_phic_type",
              tdClassName: "text-center",
              cell: (row) =>
                row?.patient_member_phic_type === "Member"
                  ? "MM"
                  : row?.patient_member_phic_type === "Dependent"
                  ? "DD"
                  : "",
            },
            { header: "Mobile No.", key: "mobile", className: "text-center" },
            { header: "Landline No.", key: "telephone", className: "text-center" },
            { header: "Registered Date", key: "enlistment_date", className: "text-center" },
            { header: "Effectivity Year", key: "effective_year", className: "text-center" },
          ]}
        />

        {/* PAGINATION */}
        <div className="flex justify-center pt-4">
          <Pagination
            page={page}
            setPage={setPage}
            pageCount={meta?.last_page}
            pageSize={10}
            setPageSize={() => {}}
          />
        </div>

        {/* UPLOAD MODAL */}
        <UploadPhilhealthMasterlistModal ref={masterlistUploadRef} />
      </div>
    </AppLayout>
  );
};

export default PhilhealthData;
