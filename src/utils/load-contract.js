import contract from "@truffle/contract";

export const loadContract = async (name, provider) => {
    const res = await fetch(`/contracts/${name}.json`)
    const contractArtifact = await res.json()

    // return {
    //     contract: contractArtifact
    // }

    const myContract = contract(contractArtifact)

    myContract.setProvider(provider)
    myContract.setNetwork(11155111)

    const deployedContract = await myContract.deployed()

    return deployedContract
}