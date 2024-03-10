import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";


// const DelegateVote = () => {
  // const [to, setTo] = useState("");
  // const handleDelegateVote = useDelegateVote(to);


  const DelegateVote = ({
    delegateAddress,
    setDelegateAddress,
    handleDelegateVote,
}) => {
  return (
    <Card size="2" style={{ width: 425 }}>
      <Flex gap="" align="center">
        <Box width={"100%"}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Delegate&apos;s Address
              </Text>
              <TextField.Input
                value={ delegateAddress}
                onChange={(e) =>  setDelegateAddress(e.target.value)}
                placeholder="Enter Delegate's Address"
              />
            </label>
            <Button onClick={handleDelegateVote}>Delegate vote</Button>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export default DelegateVote;