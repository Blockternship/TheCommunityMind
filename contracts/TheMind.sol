pragma solidity ^0.4.0;

contract TheMind {
    constructor() public {

    }

    uint256 public questionCount  = 0;

    event QuestionAsked(
        address indexed questioner,
        bytes32 indexed id,
        string question
    );

    function askQuestion(string question) public {
        questionCount ++;
        bytes32 questionId = keccak256(abi.encodePacked(questionCount, msg.sender));
        emit QuestionAsked(msg.sender, questionId, question);
    }
}
