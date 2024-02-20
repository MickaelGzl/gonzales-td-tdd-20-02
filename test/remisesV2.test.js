const Remise = require("../src/remise").Remise;
const Cart = require("../src/cart").Cart;
const expect = require("chai").expect;

describe("Testing the Remise function", function () {
  it("1. the reduction has been applied to one item and only once", function (done) {
    const c = new Cart();
    c.addArticle({ id: 1, name: "toto", price: 15.4, quantity: 5 })
      .addArticle({ id: 1, name: "toto", price: 15.4, quantity: 1 })
      .addArticle({ id: 2, name: "tata", price: 25, quantity: 4 });

    const r = new Remise();
    r.addRemises({ id: 2, articleId: 2, amount: 20 });

    //15.4*6 + 25*4 -20
    expect(c.applyRemiseV2(r.remises)).to.equal(172.4);
    done();
  });

  it("2. the price of the article can't be negative nor equal 0 after reduction", function (done) {
    const c = new Cart();
    c.addArticle({ id: 1, name: "toto", price: 15.4, quantity: 5 })
      .addArticle({ id: 1, name: "toto", price: 15.4, quantity: 1 })
      .addArticle({ id: 2, name: "tata", price: 25, quantity: 4 });

    const r = new Remise();
    r.addRemises({ id: 1, articleId: 2, amount: 50 }).addRemises({
      id: 2,
      articleId: 1,
      amount: 15.4,
    });

    //15.4*6 + 25*4 - nothing cause each amount is >= item.price
    expect(c.applyRemiseV2(r.remises)).to.equal(192.4);
    done();
  });

  it("3. should display all items in cart with reduction", function (done) {
    const c = new Cart();
    c.addArticle({ id: 1, name: "toto", price: 15.4, quantity: 5 })
      .addArticle({ id: 1, name: "toto", price: 15.4, quantity: 1 })
      .addArticle({ id: 2, name: "tata", price: 25, quantity: 4 });

    const r = new Remise();
    r.addRemises({ id: 2, articleId: 2, amount: 20 });

    expect(c.showCart()).to.deep.equal([
      { id: 1, name: "toto", price: 15.4, quantity: 6 },
      { id: 2, name: "tata", price: 25, quantity: 4 },
      { id: 2, name: "tata", price: 5, quantity: 1 },
    ]);
    done();
  });
});
