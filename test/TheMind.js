/**
 * Created by will on 18/09/18.
 */
require('truffle-test-utils').init();

const TheMind = artifacts.require("./TheMind.sol");

contract("TheMind", accounts => {
  xit("Should emit QuestionCreated event when call askQuestion", async () => {
    const theMindContract = await TheMind.deployed();
    const question = "Why is decentralisation better";

    let result = await theMindContract.askQuestion(question, { from: accounts[0]});

    // Check event
    assert.web3Event(result, {
      event: 'QuestionAsked',
      args: {
        questioner: accounts[0],
        id: 0x123456, // No need for toNumber hassle
        question: question
      }
    }, 'The event is emitted');

  })

  it("Should increase the questionCount by one when call askQuestion", async () => {
    const theMindContract = await TheMind.deployed();
    const question = "Why is decentralisation better";

    let result = await theMindContract.askQuestion(question, { from: accounts[0]});

    const storedQuestionCount = await theMindContract.questionCount.call();

    assert.equal(storedQuestionCount, 1, "Question count not increased")
  })
})
