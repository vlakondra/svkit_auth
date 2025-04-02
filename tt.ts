const productPrices = {
    Apple: 1.2,
    Banana: 0.5,
    Orange: 0.8,
};

const getPrice = (productName) => {
   return productPrices[productName];
};
//что будет выведено?
console.log(getPrice('zzzz'))
//---------------------

const func = (a) => {
    let x = 10;
    return a - x
}
let r = func("q")
//результат выполнения = ?

//--------------------------
const searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get("id");

console.log(id?.toUpperCase());

//--------------------------
const somethingDangerous = () => {
    if (Math.random() > 0.5) {
        throw new Error("Oh dear!");
    }
};

try {
    somethingDangerous();
} catch (error) {
    console.log(error.message);
}
//----------------------------
class User {
    private username;
  }
