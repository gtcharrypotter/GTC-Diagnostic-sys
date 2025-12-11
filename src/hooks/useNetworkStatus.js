import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useNetworkStatus = () => {
	const [mounted, setMounted] = useState(0);
	const [isOnline, setOnline] = useState(true);

	const updateNetworkStatus = () => {
		if (!navigator.onLine) {
			toast.error("No internet connection!");
		} else {
			if (mounted) {
				toast.success("Internet connection restored!");
			}
		}
		setOnline(navigator.onLine);
	};

	//   sometimes, the load event does not trigger on some browsers, that is why manually calling updateNetworkStatus on initial mount
	useEffect(() => {
		let t = setTimeout(() => {
			setMounted(1);
			updateNetworkStatus();
		}, 1000);
		return () => {
			clearTimeout(t);
		};
	}, []);
	useEffect(() => {
//     const checkNetworkStatus = async () => {
//       try {
//         const response = await fetch("https://ecstest.philhealth.gov.ph/KONSULTA/SOAP?wsdl", {
//           method: "HEAD",
//           cache: "no-cache",
//         });
//         if (response.ok) {
//           setOnline(false); // Set to false if there's an error or no internet connection
//         } else {
//           setOnline(true);
//         }
//       } catch (error) {
//         setOnline(true); // Set to true if the URL is reachable
//       }
//     };
// 	checkNetworkStatus();
//  // Optional: Check every 10 seconds
//     const interval = setInterval(checkNetworkStatus, 10000);

//     return () => clearInterval(interval); // Clean up interval on unmount
  }, []);
	useEffect(() => {
		window.addEventListener("load", updateNetworkStatus);
		window.addEventListener("online", updateNetworkStatus);
		window.addEventListener("offline", updateNetworkStatus);

		return () => {
			window.removeEventListener("load", updateNetworkStatus);
			window.removeEventListener("online", updateNetworkStatus);
			window.removeEventListener("offline", updateNetworkStatus);
		};
	}, [navigator.onLine]);

	return { isOnline };
};

export default useNetworkStatus; 
