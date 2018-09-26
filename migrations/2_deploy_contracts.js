/**
 * Created by will on 17/09/18.
 */
const TheMind = artifacts.require("TheMind");

module.exports = function(deployer) {
  deployer.deploy(TheMind);
}