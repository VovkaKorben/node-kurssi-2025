const numbers = process.argv.slice(2).map(Number).filter(n => !Number.isNaN(n));
if (numbers.length === 0) {
    console.log('Anna vähintään yksi numero: esim. node summa.js 2 4 6');
    process.exit(1);
}
const _ = require("lodash");

console.log(`Numerot: ${numbers.join(', ')}`)
console.log('Summa:', _.sum(numbers));

