import chai from "./../../../node_modules/chai/";
import greet from "../greeter.js";

describe("greet", function() {
  describe("#hello", function() {
    it("say hello", function() {
      var obj = new greet();
      chai.assert.equal(obj.hello(), "Have a great day!");
    });
  });
});
