import { MultiCreatorRoyaltyERC721 } from '../typechain/MultiCreatorRoyaltyERC721'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { beforeEach, describe } from 'mocha'
import { Contract, ContractFactory } from '@ethersproject/contracts'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('MultiCreatorRoyaltyERC721', function () {
  let MultiCreatorRoyaltyERC721: ContractFactory
  let token: MultiCreatorRoyaltyERC721
  let signers: SignerWithAddress[]
  let owner: SignerWithAddress
  const tokenWord = 'FCUK'
  const tokenURI = 'http://google.com/fcuk'

  beforeEach(async () => {
    signers = await ethers.getSigners()
    owner = signers[0]
    MultiCreatorRoyaltyERC721 = await ethers.getContractFactory('MultiCreatorRoyaltyERC721')
    token = (await MultiCreatorRoyaltyERC721.deploy()) as MultiCreatorRoyaltyERC721
    await token.deployed()
  })

  it('Should return currect token Name and token Symbol', async function () {
    expect(await token.name()).to.equal('MultiToken')
    expect(await token.symbol()).to.equal('VCBT')
  })

  it('Mint Tokens', async function () {
    await (await token.createToken(tokenURI, [{ addr: signers[1].address, ratio: 5 }, { addr: signers[2].address, ratio: 5 }], { numerator: 5, denominator: 100 })).wait()

    // After minting the account should have the right number of tokens
    expect(await token.tokenCounter()).to.be.equal(1)
    expect(await token.balanceOf(owner.address)).to.be.equal(1)
    expect(await token.ownerOf(0)).to.be.equal(owner.address)
    expect(await token.tokenURI(0)).to.be.equal(tokenURI)

    // expect(await token.tokenURI(0))
  })

  it('Should return correct royalty data', async function () {
    let royalties = [{ addr: signers[1].address, ratio: 5 }, { addr: signers[2].address, ratio: 10 }]
    let fraction = { numerator: 5, denominator: 100 }
    await (await token.createToken(tokenURI, royalties, fraction)).wait()

    let a = await token.getRoyaltyData(0)

    expect(a[0].addr).equal(signers[1].address)
    expect(a[0].ratio).equal(5)

    expect(a[1].addr).equal(signers[2].address)
    expect(a[1].ratio).equal(10)

  })
})
