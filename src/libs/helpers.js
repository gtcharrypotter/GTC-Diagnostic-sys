const week_day = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const months_short = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const calculateAge = (dateToFormat) => {
	if (dateToFormat) {
		var today = new Date();
		var birthDate = new Date(dateToFormat);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	} else {
		return "";
	}
};
const calculateAgeInMonths = (birthDate) => {
	if (!birthDate) return 0;
	const birth = new Date(birthDate);
	const today = new Date();
	const years = today.getFullYear() - birth.getFullYear();
	const months = today.getMonth() - birth.getMonth();
	return years * 12 + months;
};
const formatDate = (dateToFormat) => {
	if (dateToFormat) {
		let date = new Date(dateToFormat);
		return (
			months[date.getMonth()] +
			" " +
			date.getDate() +
			", " +
			date.getFullYear()
		);
	}
	return "";
};

const getWeekDay = (date) => {
	let d = new Date();

	if (date) {
		d = new Date(date);
	}
	return week_day[d.getDay()];
};
const formatDateTime = (dateToFormat) => {
	if (dateToFormat) {
		let date = new Date(dateToFormat);
		return (
			months[date.getMonth()] +
			" " +
			date.getDate() +
			", " +
			date.getFullYear() +
			" " +
			(date.getHours() == 0 ? "12" : date.getHours()) +
			":" +
			date.getMinutes() +
			(date.getHours() > 12 ? " PM" : " AM")
		);
	}
	return "";
};

const formatDateParts = (dateString) => {
	if (!dateString) return { month: "", day: "", year: "", hour: "", min: "", ampm: "" };
  
	const date = new Date(dateString);
	
	// Extract parts as strings
	let month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed)
	let day = String(date.getDate()).padStart(2, "0");
	let year = String(date.getFullYear());
  
	let hour = date.getHours();
	let min = String(date.getMinutes()).padStart(2, "0");
  
	// Convert 24-hour format to 12-hour format
	let ampm = hour >= 12 ? "PM" : "AM";
	hour = hour % 12 || 12; // Convert 0 to 12
	hour = String(hour).padStart(2, "0");
  
	return { month, day, year, hour, min, ampm };
  };

const replaceFname = (text) => {
	if (text) {
		return text.includes("Ivan Krister") ? "John" : text;
	}
	return "";
};
const replaceMname = (text) => {
	if (text) {
		return text.includes("Bungabong") ? "B." : text;
	}
	return "";
};
const replaceLname = (text) => {
	if (text) {
		return text.includes("Garcia") ? "Dean" : text;
	}
	return "";
};

const localArraySearch = (
	data /* DATA LIST */,
	keyword /* Search keyword */
) => {
	return data.filter((item) => {
		let obj_array = Object.keys(item).map((key) => {
			return String(item[key]).toLowerCase();
		});

		return obj_array.join(" ").includes(String(keyword).toLowerCase());
	});
};

const isBase64 = (dataURI) => {
	return dataURI.indexOf("base64");
};
const dataURItoBlob = (dataURI) => {
	if (dataURI == "" || typeof dataURI === "undefined") return "";
	let byteString;
	if (dataURI.split(",")[0].indexOf("base64") >= 0)
		byteString = atob(dataURI.split(",")[1]);
	else byteString = unescape(dataURI.split(",")[1]);
	let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
	let ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	const randomKey =
		Math.random().toString(36).substring(2, 12) +
		Math.random().toString(36).substring(2, 15);

	const type = mimeString.split("/").pop();
	const blobResult = new Blob([ia], {
		type: mimeString,
	});
	blobResult.name = `PATIENT-AVATAR-${randomKey}.${type}`;
	blobResult.hashName = blobResult.name;
	// blobResult.type = type
	return blobResult;
};

const uploadImage = (fileData, onProgress, cancelToken) => {
	const config = {
		cancelToken,
		headers: {
			"content-type": "multipart/form-data",
		},

		onUploadProgress: (progressEvent) => onProgress(progressEvent),
	};

	const form = new FormData();
	const file = dataURItoBlob(fileData);
	form.append("name", file.name);
	form.append("type", file.type);
	form.append("size", file.size);
	form.append("image", file, file.name);

	return axios
		.post(uri, form, config)
		.then((result) => {
			console.log(result);
			return Promise.resolve(result);
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};
function calculateAgeV2(date) {
	//date *new Date(date)
	var ageDifMs = Date.now() - date;
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}
function calculateAgeV3(birthDate) {
	if (birthDate?.length == 0) return "-";
	let date = new Date(birthDate);
	//new Date(birthdate)
	var ageDifMs = Date.now() - date.getTime();
	var ageDate = new Date(ageDifMs);
	return (
		Math.abs(ageDate.getUTCFullYear() - 1970) + " yrs old"
		// Math.abs(ageDate.getUTCMonth()) +
		// " months"
	);
}
const dateToday = () => {
	let date = new Date();
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `${
		months[date.getMonth()]
	} ${date?.getDate()}, ${date?.getFullYear()} ${
		date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()
	}:${date?.getMinutes()} ${date?.getHours() >= 12 ? "PM" : "AM"}`;
};
const dateOnlyToday = () => {
	let date = new Date();
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `${
		months[date.getMonth()]
	} ${date?.getDate()}, ${date?.getFullYear()}`;
};

const dateYYYYMMDD = () => {
	let d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(d.getDate()).padStart(2, "0")}`;
};
const timeHHII = () => {
	let date = new Date();
	return `${String(date?.getHours()).padStart(2, "0")}:${date?.getMinutes()}`;
};

const dateMMDDYYYY = () => {
	let d = new Date();
	return `${String(
		d.getMonth() + 1
	).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
};
const formatMMDDYYYY = (dateString) => {
  const d = new Date(dateString);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};
const dateMMDDYYYYHHIIA = (d = new Date()) => {
	return `${String(d.getDate()).padStart(2, "0")}-${String(
		d.getMonth() + 1
	).padStart(2, "0")}-${d.getFullYear()} ${
		date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()
	}:${date?.getMinutes()} ${date?.getHours() >= 12 ? "PM" : "AM"}`;
};

const formatDateMMDDYYYY = (date) => {
	return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
		2,
		"0"
	)}, ${date.getFullYear()}`;
};

const formatDateYYYYMMDD = (date) => {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(date.getDate()).padStart(2, "0")}`;
};
const formatDateMMDDYYYYHHIIA = (date) => {
	return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
		2,
		"0"
	)}, ${date.getFullYear()} ${
		date?.getHours() > 12
			? String(date?.getHours() - 12).padStart(2, "0")
			: String(date?.getHours()).padStart(2, "0")
	}:${String(date?.getMinutes()).padStart(2, "0")} ${
		date?.getHours() >= 12 ? "PM" : "AM"
	}`;
};

const getDateCurrentTimeHHII = () => {
	let date = new Date();
	return `${
		date?.getHours() > 12 ? date?.getHours() - 12 : date?.getHours()
	}:${date?.getMinutes()} ${date?.getHours() >= 12 ? "PM" : "AM"}`;
};
const patientMI = (patient) => {
	return patient?.middle?.length > 0
		? `${String(patient?.middle).substring(0, 1)}.`
		: "";
};
const patientFullName = (patient) => {
	let f = patient?.firstname || "";
	// let m =
	// 	patient?.middlename?.length > 0
	// 		? `${String(patient?.middlename).substring(0, 1)}.`
	// 		: patient?.middle?.length > 0
	// 		? `${String(patient?.middle).substring(0, 1).toUpperCase()}.`
	// 		: "";
	let m = patient?.middlename || patient?.middle || "";
	let l = patient?.lastname || "";
	return `${l}, ${f} ${m}`;
};
const doctorName = (doctor) => {
	let title = doctor?.title?.length > 0 ? doctor?.title : "";
	let firstname = doctor?.firstname;
	let lastname = doctor?.lastname;
	return `${title} ${firstname} ${lastname}`;
};
const doctorSpecialty = (doctor) => {
	return doctor?.specialty?.name || "General Practitioner";
};
const radiologyName = (radiology) => {
	let title = radiology?.title?.length > 0 ? radiology?.title : "";
	let name = radiology?.name;
	return `${title} ${name}`;
};
const radiologySpecialty = (radiology) => {
	return radiology?.specialty?.name || "General Practitioner";
};

const patientAddress = (patient) => {
	let purok = patient?.purokData?.name
		? patient?.purokData?.name + ", "
		: patient?.purok
		? patient?.purok + ", "
		: " ";
	let brgy = patient?.barangayData?.name
		? patient?.barangayData?.name + ", "
		: patient?.barangay
		? patient?.barangay + ", "
		: " ";
	let mun = patient?.municipalityData?.name
		? patient?.municipalityData?.name + ", "
		: patient?.municipality
		? patient?.municipality + ", "
		: "";
	let city = patient?.province ? patient?.province : "Sarangani";
	return `${purok}${brgy}${mun}${city}`;
};

const getPhilHealth = (patient) => {
	return patient?.philhealth
		? patient?.philhealth
		: patient?.phil_health_member || "";
};

const getAbsoluteDiff = (val1, val2) => {
	return Math.abs(val1) - Math.abs(val2);
};

const isEvenNumber = (val) => {
	return val % 2;
};

const tConvert = (time_, add = 0) => {
	// Check correct time format and split into components
	let hr = String(parseInt(time_.toString().substr(0, 2)) + add).padStart(
		2,
		"0"
	);
	let time = `${hr}${time_.toString().substr(2, 3)}`;
	time = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

	if (time.length > 1) {
		// If time format correct
		time = time.slice(1); // Remove full string match value
		time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(""); // return adjusted time or original string
};

const getErrors = (errors, setError) => {
	if (
		(errors !== undefined || errors !== null) &&
		errors === Object(errors)
	) {
		for (let key in errors) {
			if (errors.hasOwnProperty(key)) {
				setError(key, {
					type: "manual",
					message: errors[key],
				});
			}
		}
	}
};
const formatCurrency = (number, currencyCode = "USD") => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currencyCode,
	})
		.formatToParts(number)
		.map((part) => {
			if (part.type === "currency") {
				return "";
			}
			return part.value;
		})
		.join("");
};

const getSumObj = (obj, objName) => {
	let total = 0;
	obj?.map((data) => {
		total += data[objName];
	});
	return formatCurrency(total);
};
const getBirthDayYYYYMMDD = (bday) => {
	if (bday == "UNKNOWN") {
		return "";
	}
	if (bday?.length > 0) {
		let str = String(bday).replace(/\-/g, "");
		return str;
	}
	return "";
};
const getStringArray = (data) => {
	if (data == "UNKNOWN") {
		return "";
	}
	if (data?.length > 0) {
		let a = String(data).replace(/\-/g, "");
		let str = String(data);
		return str;
	}
	return "";
};
const motherMaindenName = (str) => {
	if (str == "UNKNOWN") {
		return "";
	}
	if (str?.length > 0) {
		if (str.includes(" ,")) {
			str = str.replace(" ,", " ");
		}
		if (str.includes(",")) {
			str = str.replace(",", " ");
		}
		return str.split(" ");
	}
	return "";
};
export const detectMobile = () => {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};
const calculateBMI = (height /* in CM */, weight) => {
	let bmi = weight / ((height / 100) * (height / 100));
	let bmi_status = "normal";
	let bmi_color = "text-green-500";
	// under weight < 18.6, normal >= 18.6 <=24.9, overweight > 24.9
	if (bmi < 16) {
		bmi_status = "Sever Thinness";
		bmi_color = "sever-thin";
	}
	if (bmi > 16 && bmi <= 17) {
		bmi_status = "Moderate Thinness";
		bmi_color = "thin";
	}
	if (bmi > 17 && bmi <= 18.5) {
		bmi_status = "Mild Thinness";
		bmi_color = "mild-thin";
	}
	if (bmi > 18.5 && bmi <= 25) {
		bmi_status = "Normal";
		bmi_color = "normal";
	}
	if (bmi > 24.9 && bmi <= 30) {
		bmi_status = "Overweight";
		bmi_color = "over-weight";
	}
	if (bmi > 30 && bmi <= 35) {
		bmi_status = "Obese Class 1";
		bmi_color = "obese";
	}
	if (bmi > 35 && bmi <= 40) {
		bmi_status = "Obese Class 2";
		bmi_color = "obese";
	}
	if (bmi > 40) {
		bmi_status = "Obese Class 3";
		bmi_color = "obese";
	}
	return {
		bmi: bmi,
		status: bmi_status,
		bmi_color: bmi_color,
	};
};
const calculateBPMeasurement = (systolic, diastolic) => {
	if (systolic <= 90 && diastolic <= 60) {
		return {
			result: "LOW",
			color: "hypertension-2",
		};
	}
	if (
		systolic >= 90 &&
		systolic <= 120 &&
		diastolic >= 60 &&
		diastolic <= 80
	) {
		return {
			result: "NORMAL",
			color: "normal",
		};
	}
	if (
		(systolic >= 121 && systolic <= 140) ||
		(diastolic >= 81 && diastolic <= 90)
	) {
		return {
			result: "PRE-Hypertension",
			color: "elevated",
		};
	}
	if (
		(systolic >= 141 && systolic <= 160) ||
		(diastolic >= 91 && diastolic <= 100)
	) {
		return {
			result: "HIGH: Stage 1 Hypertension",
			color: "hypertension-1",
		};
	}
	if (systolic >= 161 || diastolic >= 101) {
		return {
			result: "HIGH: Stage 2 Hypertension",
			color: "hypertension-2",
		};
	}
	return {
		result: "",
		color: "",
	};
};
const cleanText = (text, replaceWith = "") => {
	return String(text)
		.replaceAll("-", replaceWith)
		.replaceAll("_", replaceWith);
};
const keyByValue = (val = "") => {
	return String(val).replace(/ /g, "");
};
const formatDateWithOffset = (dateToFormat) => {
    if (dateToFormat) {
        let date = new Date(dateToFormat);
        date.setDate(date.getDate() + 7); // Add 7 days to the date
        return (
            months[date.getMonth()] +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear()
        );
    }
    return "";
};
const userName = (user) => {
	let title = user?.title?.length > 0 ? user?.title : "";
	let name = user?.name;
	return `${title} ${name}`;
};
export {
	getSumObj,
	formatCurrency,
	months,
	formatDate,
	calculateAge,
	replaceFname,
	replaceMname,
	replaceLname,
	localArraySearch,
	dataURItoBlob,
	isBase64,
	formatDateTime,
	formatDateParts,
	calculateAgeV2,
	dateToday,
	getDateCurrentTimeHHII,
	dateYYYYMMDD,
	dateMMDDYYYY,
	dateMMDDYYYYHHIIA,
	months_short,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	calculateAgeV3,
	patientFullName,
	getWeekDay,
	getAbsoluteDiff,
	timeHHII,
	isEvenNumber,
	tConvert,
	getErrors,
	patientAddress,
	patientMI,
	getBirthDayYYYYMMDD,
	getStringArray,
	motherMaindenName,
	dateOnlyToday,
	calculateBMI,
	formatDateYYYYMMDD,
	calculateBPMeasurement,
	doctorName,
	doctorSpecialty,
	radiologyName,
	radiologySpecialty,
	keyByValue,
	getPhilHealth,
	cleanText,
	formatDateWithOffset,
	userName,
	calculateAgeInMonths,
	formatMMDDYYYY
};
