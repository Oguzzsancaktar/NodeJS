// test('Hello world!', () => {

const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require("../src/math.js");

// })

// test('This should fail', () => {
//     throw new Error('Failure!')
// })

test('This will return total price ', () => {
    const total = calculateTip(10, .3)
    if (total !== 13) {
        throw new Error('Total tip should be 13. Not' + total)
    }
})

// 
// Why test?
// 
// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind


test('This will retuns fahrenheit to celsius', () => {
    const temp = 32
    const celcius = fahrenheitToCelsius(temp)
    expect(celcius).toBe((temp - 32) / 1.8);
})

test('This will return celsius to fahrenheit', () => {
    const temp = 0;

    const fahrenheit = celsiusToFahrenheit(temp)
    expect(fahrenheit).toBe((temp * 1.8) + 32);
})
 

test('This functions add given two numbers async/await', async() => {
    const sum = await add(2, 5)
    
    expect(sum).toBe(7)
})

test('should add two numbers ', (done) => {

     add(2, 7).then((sum) => {
        expect(sum).toBe(9)
        done()
    })
    
})
