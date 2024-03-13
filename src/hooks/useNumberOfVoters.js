
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";

const useNumberOfVoters = () => {

    const [value, setValue] = useState(0);

    const eventListerner = useCallback(() => {
        setValue((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const filter = {
            address: import.meta.env.VITE_ballot_contract_address,
            topics: [
                "0x02e8e9dbca99990e7fa2bd1a2cda8f76312b92ef3580255233e221484585545b",
            ],
        };

        wssProvider.getLogs({ ...filter, fromBlock: 5465128 }).then((logs) => {
            setValue(logs.length + 1);
        });

        const wssProvider2 = new ethers.WebSocketProvider(
            import.meta.env.VITE_wss_rpc_url
        );

        wssProvider2.on(filter, eventListerner);

        return () => wssProvider2.off(filter, eventListerner);
    }, [eventListerner]);

    return value;
};

export default useNumberOfVoters;












































// const useNumberOfVoters = () => {
//     const [value, setValue] = useState(0);

//     const contract = getProposalsContract(wssProvider)

//     const eventListerner = useCallback((...log) => {
//         console.log("testing event: ", log);
//         // Update value when the event is triggered
//         setValue(prevValue => prevValue + 1);
//     }, []);

//     useEffect(() => {
//         const filter = {
//             address: import.meta.env.VITE_ballot_contract_address,
//             topics: [ethers.id("GiveRightToVote(address,uint256)")],  
//         };
//         wssProvider
//             .getLogs({...filter, fromBlock: 5469153})
//             .then((events) => {
//                 setValue(events.length + 1);
//             });

//         contract.on("GiveRightToVote", eventListerner);

//         // Clean up event listener
//         return () => {
//             contract.off("GiveRightToVote", eventListerner);
//         };
//     }, [eventListerner]);

//     return value;
// };

// export default useNumberOfVoters;




























































// import { ethers } from "ethers";
// import { useCallback, useEffect, useState } from "react";
// import { wssProvider } from "../constants/providers";

// const useNumberOfVoters = () => {
//     const [value, setValue] = useState(0);

//     const eventListerner = useCallback((log) => {
//         console.log("testing event: ", log);
//     }, []);

//     useEffect(() => {
//         const filter = {
//             address: import.meta.env.VITE_ballot_contract_address,
//             topics: [ethers.id("GiveRightToVote(address,uint256)")],
//         };
//         wssProvider
//             .getLogs({ ...filter, fromBlock: 5465128 })
//             .then((events) => {
//                 setValue(events.length + 1);
//             });

//         wssProvider.on(filter, eventListerner);

//         return () => wssProvider.off(filter, eventListerner);
//     }, []);

//     return value;
// };

// export default useNumberOfVoters;