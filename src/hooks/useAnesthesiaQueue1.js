
import useSWR from 'swr';
import Axios from '../libs/axios';

const fetcher = (url, params) => Axios.get(url, { params }).then(res => res.data);

const useAnesthesiaQueue = () => {
    const getAnesthesiaQueue = (status) => {
        return useSWR(
            ['/v1/anesthesia/get-anesthesia-queue', status],
            ([url, status]) => fetcher(url, { status }),
            {
                revalidateIfStale: false,
                revalidateOnFocus: true,
                dedupingInterval: 3000,
            }
        );
    };

    const { data: waitingRoom, mutate: mutateWaitingRoom } = getAnesthesiaQueue("For Operation");
    const { data: operatingRoom, mutate: mutateOperatingRoom } = getAnesthesiaQueue("Operating Room");
    const { data: resu, mutate: mutateResu } = getAnesthesiaQueue("RESU");
    const { data: done, mutate: mutateDone } = getAnesthesiaQueue("DONE");

    return {
        waitingRoom,
        mutateWaitingRoom,
        operatingRoom,
        mutateOperatingRoom,
        resu,
        mutateResu,
        done,
        mutateDone,
    };
};

export default useAnesthesiaQueue;
