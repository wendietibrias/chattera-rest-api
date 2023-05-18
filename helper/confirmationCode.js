const randomCode = "Aa1Bb2Cc3Dd4Ee5Ff6Gf1Gg7alanwake1255xzpklmaw";

let length = 7;

const confirmationCode = () => {

     const codes = [];

     for(let i = 0; i < length; i++) {
         codes.push(randomCode[Math.floor(Math.random() * randomCode.length)]);
     }

     return codes.join("");
}

export default confirmationCode;