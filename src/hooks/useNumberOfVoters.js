import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";
import { getProposalsContract } from "../constants/contracts";

const useNumberOfVoters = () => {
    const [value, setValue] = useState(0);

    const contract = getProposalsContract(wssProvider)

    const eventListerner = useCallback((...log) => {
        console.log("testing event: ", log);
        // Update value when the event is triggered
        setValue(prevValue => prevValue + 1);
    }, []);

    useEffect(() => {
        const filter = {
            address: import.meta.env.VITE_ballot_contract_address,
            topics: [ethers.id("GiveRightToVote(address,uint256)")],  
        };
        wssProvider
            .getLogs({...filter, fromBlock: 5469153})
            .then((events) => {
                setValue(events.length + 1);
            });

        contract.on("GiveRightToVote", eventListerner);

        // Clean up event listener
        return () => {
            contract.off("GiveRightToVote", eventListerner);
        };
    }, [eventListerner]);

    return value;
};

export default useNumberOfVoters;






























































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