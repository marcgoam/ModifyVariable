const ethers = require("ethers");

require("dotenv").config();

async function main() {
  const url = process.env.SEPOLIA_RPC_URL;

  let artifacts = await hre.artifacts.readArtifact("ModifyVariable");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  let modifyVariable = await factory.deploy(5, "");

  console.log("modifyVariable address: ", modifyVariable.address);

  await modifyVariable.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
