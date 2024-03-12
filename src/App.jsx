import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import Header from "./component/Header";
import Proposal from "./component/Proposal";
import DelegateVote from "./component/DelegateVote";
import useProposals from "./hooks/useProposals";
import useHandleVote from "./hooks/useHandleVote";
import useDelegateVote from "./hooks/useDelegateVote";
import useNumberOfVoters from "./hooks/useNumberOfVoters";

configureWeb3Modal();

function App() {
  const { loading, data: proposals } = useProposals();
  const handleVote = useHandleVote()

    const [to, setTo] = useState("");
  const handleDelegateVote = useDelegateVote(to);

  const handleNumberOfVotes = useNumberOfVoters();
  

  return (
    <Container>
      <Header />
      <main className="mt-6">
      <span className="mt-0">Eligible Voters:{handleNumberOfVotes}</span>
          <DelegateVote delegateAddress ={to}
                        setDelegateAddress ={setTo}
                        handleDelegateVote={handleDelegateVote}
                  
                  />

                  
     

        <Flex wrap={"wrap"} gap={"6"}>
          {loading ? (
            <Text>Loading...</Text>
          ) : proposals.length !== 0 ? (
            proposals.map((item, index) => (
              <Proposal
                key={index}
                name={item.name}
                // handleVote={()=> handleGiveRightToVote(index)}
                 handleVote={handleVote}
                id={index}
                voteCount={Number(item.voteCount)}
              />
            ))
          ) : (
            <Text>Could not get proposals!!</Text>
          )}
        </Flex>
      </main>
    </Container>
  );
}

export default App;