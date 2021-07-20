//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MultiCreatorRoyaltyERC721 is ERC721URIStorage, Ownable {
    using SafeMath for uint256;
    uint256 public tokenCounter;
    mapping(uint256 => Royalty[]) public royalties;
    mapping(uint256 => FractionalRoyalties) public percentageRoyalty;

    // Represent the address of the creator
    // And a uint value represeting the ratio of amount to be transferred in royalties to this creator
    struct Royalty {
        address addr;
        uint256 ratio;
    }

    struct FractionalRoyalties {
        uint256 numerator;
        uint256 denominator;
    }

    constructor() ERC721("MultiToken", "VCBT") {
        tokenCounter = 0;
    }

    /// @notice Function to mint tokens
    /// @dev Just a wrapper function to return array
    /// @param _tokenURI the uri of the nft
    /// @param _creatorRoyalties an array of royalty data
    /// @param _fraction the total fraction of royalties to be transferred
    /// @return the tokenId
    function createToken(
        string memory _tokenURI,
        Royalty[] memory _creatorRoyalties,
        FractionalRoyalties memory _fraction
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;

        for (uint256 index = 0; index < _creatorRoyalties.length; index++) {
            Royalty memory royalty = _creatorRoyalties[index];
            royalties[newTokenId].push(Royalty(royalty.addr, royalty.ratio));
        }

        percentageRoyalty[newTokenId] = _fraction;

        _mint(msg.sender, newTokenId);

        _setTokenURI(newTokenId, _tokenURI);

        tokenCounter += 1;
        return newTokenId;
    }

    /// @notice Function to return the royalty data of a particular token
    /// @dev Just a wrapper function to return array
    /// @param tokenId which is an uint
    /// @return _royalties which is an array containing royalty data
    //  @inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)

    function getRoyaltyData(uint256 tokenId)
        public
        view
        returns (Royalty[] memory _royalties)
    {
        return royalties[tokenId];
    }
}
