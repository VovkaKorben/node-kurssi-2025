const numbers = process.argv.slice(2).map(Number).filter(n => !Number.isNaN(n));
if (numbers.length !== 3) {
    console.log('Anna kolme numerot: esim. node kotitehtävä1.js 2 4 6');
    process.exit(1);
}
const _ = require("lodash");

console.log(`Numerot: ${numbers.join(', ')}`)
console.log('Summa:', _.sum(numbers));
console.log('Keskiarvo:', _.mean(numbers));
