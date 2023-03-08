/**
 * A simple calculator class that performs basic arithmetic operations.
 * @class
 */
class Calculator {
  /**
   * Creates a new Calculator object with initial values for operand1 and operand2.
   * @constructor
   * @param {number} operand1 - The first operand to use in calculations.
   * @param {number} operand2 - The second operand to use in calculations.
   */
  constructor(operand1, operand2) {
    this.operand1 = operand1;
    this.operand2 = operand2;
  }

  /**
   * Adds the two operands together and returns the result.
   * @returns {number} The sum of the two operands.
   */
  add() {
    return this.operand1 + this.operand2;
  }

  /**
   * Subtracts the second operand from the first operand and returns the result.
   * @returns {number} The difference between the two operands.
   */
  subtract() {
    return this.operand1 - this.operand2;
  }

  /**
   * Multiplies the two operands together and returns the result.
   * @returns {number} The product of the two operands.
   */
  multiply() {
    return this.operand1 * this.operand2;
  }

  /**
   * Divides the first operand by the second operand and returns the result.
   * @returns {number} The quotient of the two operands.
   */
  divide() {
    return this.operand1 / this.operand2;
  }
}

/**
 * A function that returns the square of a given number.
 * @param {number} num - The number to be squared.
 * @returns {number} The square of the given number.
 */
function square(num) {
  return num * num;
}

/**
 * A function that returns the cube of a given number.
 * @param {number} num - The number to be cubed.
 * @returns {number} The cube of the given number.
 */
const cube = (num) => num * num * num;

/**
 * Calculates the area of a rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {number} The area of the rectangle.
 * @example
 * // Example usage:
 * // Returns 20
 * const area = calculateArea(4, 5);
 */
function calculateArea(width, height) {
  return width * height;
}



// Export the Calculator class and other functions
export { Calculator, square, cube, calculateArea };
