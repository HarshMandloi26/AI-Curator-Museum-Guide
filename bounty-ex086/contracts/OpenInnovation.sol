// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OpenInnovation is ERC721, Ownable {
    uint256 private _nextTokenId;
    uint256 public constant BOUNTY_AMOUNT = 50000;
    uint256 public constant MAX_BOUNTIES = 25;
    
    struct Submission {
        string githubUrl;
        string telegramId;
        address submitter;
        bool isApproved;
    }
    
    mapping(uint256 => Submission) public submissions;
    
    event SubmissionCreated(uint256 tokenId, string githubUrl, string telegramId);
    event SubmissionApproved(uint256 tokenId);
    
    constructor() ERC721("OpenInnovation", "OI") Ownable(msg.sender) {}
    
    function submitProject(string memory githubUrl, string memory telegramId) external {
        require(_nextTokenId < MAX_BOUNTIES, "Maximum bounties reached");
        
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        
        submissions[tokenId] = Submission({
            githubUrl: githubUrl,
            telegramId: telegramId,
            submitter: msg.sender,
            isApproved: false
        });
        
        emit SubmissionCreated(tokenId, githubUrl, telegramId);
    }
    
    function approveSubmission(uint256 tokenId) external onlyOwner {
        require(!submissions[tokenId].isApproved, "Already approved");
        submissions[tokenId].isApproved = true;
        emit SubmissionApproved(tokenId);
    }
}