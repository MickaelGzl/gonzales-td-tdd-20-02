const Remise = require("../src/remise").Remise;
const Cart = require("../src/cart").Cart;
const expect = require("chai").expect;

describe("Testing the Remise function", function () {
  it("1. the reduction has been applied to one item", function (done) {
    const c = new Cart();
    c.addArticle({ id: 1, name: "toto", price: 15.4, quantity: 5 })
      .addArticle({ id: 1, name: "toto", price: 15.4, quantity: 1 })
      .addArticle({ id: 2, name: "tata", price: 25, quantity: 4 });

    const r = new Remise();
    r.addRemises({ id: 2, articleId: 2, amount: 20 });

    c.applyRemiseV2(r);
    //15.4*6 + 25*4 -20
    expect(c.applyRemiseV2(r)).to.equal(172.4);
    done();
  });
});
