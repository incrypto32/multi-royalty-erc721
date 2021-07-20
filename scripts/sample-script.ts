import { ethers } from 'hardhat';


async function main() {

  const MultiCreaterRoyaltyERC721 = await  ethers.getContractFactory("MultiCreaterRoyaltyERC721");
  const mcrERC721 = await MultiCreaterRoyaltyERC721.deploy();

  await mcrERC721.deployed();

  console.log("Greeter deployed to:", mcrERC721.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
