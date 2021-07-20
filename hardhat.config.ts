import "@nomiclabs/hardhat-ethers";
import '@nomiclabs/hardhat-waffle'
import "@typechain/hardhat";
import { task, HardhatUserConfig } from 'hardhat/config'


task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address)
  }
})

const config: HardhatUserConfig = {
  solidity: '0.8.4',
}

export default config
