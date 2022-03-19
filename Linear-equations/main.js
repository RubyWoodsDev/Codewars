//DESCRIPTION:
//Your task is to solve N x M Systems of Linear Equations (LS) and to determine the complete solution space.
 
//Normally an endless amount of solutions exist, not only one or none like for N x N. You have to handle N unkowns and M equations (N>=1, M>=1) and your result has to display all numbers in 'reduced fraction representation' too (perhaps first you can try my N x N kata). More about LS you can find here or perhaps is already known.
 
//First of all two easy examples:

//1*x1 + 2*x2 + 0*x3 + 0*x4 = 7
//0*x1 + 3*x2 + 4*x3 + 0*x4 = 8
//0*x1 + 0*x2 + 5*x3 + 6*x4 = 9

//SOL=(97/15; 4/15; 9/5; 0) + q1* (-16/5; 8/5; -6/5; 1)
 
//You can see the dimension of solution space is 1 (it's a line) and q1 is any real number, so we have endless solutions. You can insert every single solution into every equation and all are correctly solved (1*97/15 + 2*4/15 + 0 + 0 =7 for q1=0).
 
//Second example:

//1*x1 + 5/2*x2 + 1/2*x3 + 0*x4 + 4*x5 = 1/8
//0*x1 + 5*x2 + 2*x3 - 5/2*x4  + 6*x5 = 2

//SOL=(-7/8; 2/5; 0; 0; 0) + q1 * (1/2; -2/5; 1; 0; 0) + q2 * (-5/4; 1/2; 0; 1; 0) + q3 * (-1; -6/5; 0; 0; 1)
 
//Here you can see the dimension of the solution is 3, q1, q2 and q3 are arbitrary real numbers. You can see all resulting numbers are in fraction representation (which is easier to read and handle for pupils/students), whatever the input was.
 
//So what is missing?
 
//You have to build a function "Solve(input)" (or "solve(input)") which takes the equations as an input string and returns the solution as a string. "\n" (LF) separates equations, " " (SPACE) separates the numbers (like 3 or 4/5, only the coefficients not the xi's), each last number per line is the number behind the = (the equation result, see examples). The result of the function is the solution given as a string. All test examples will be syntactically correct, so you don't need to take care of it.
 
//So for the first example you have to call: Solve ("1 2 0 0 7\n0 3 4 0 8\n0 0 5 6 9"). The result of Solve is "SOL=(97/15; 4/15; 9/5; 0) + q1 * (-16/5; 8/5; -6/5; 1)", exactly in this form/syntax. (97/15; 4/15; 9/5; 0) + q1 * (16/5; -8/5; 6/5; -1) is ok too because it produces same solutions.
 
//Spaces in your result are allowed, but not necessary. You have to use 'qi' (i from 1 to dimension) standing for the real numbers (the first starting solution- point/vector has no q). If the dimension of the solution is greater than 1, the order of the qi- vectors isn't important (but all indices should be in order, that is, 'q1' first then 'q2', etc.). The fractions have to be reduced as much as possible (but not 4/3 to 1 1/3). If there exists no solution you have to respond with "SOL=NONE". If only one solution exists the response should contain no 'qi'-vectors (e.g.,"SOL=(1; 2; 3)").
 
//One last word to the tests:
//The test function checks the syntax of your output, uses some rules for different verifications and after all checks the given equations with your solution and verifies that all equations are satisfied for arbitrary values of qi's. If all things fit together, your solution is accepted! If not, you will get a hint 'why not'...
 
//Hint: don't rely on floating-point numbers to solve this kata. Use exact rational arithmetic.
 

//Hope you have fun:-)!



solution
'use strict';

BigInt.abs = function(bi) {
    return bi >= 0n ? bi : -bi;
}

BigInt.sign = function(bi) {
    return bi > 0n ? 1n : bi < 0n ? -1n : 0n;
}

/**
 * An instance of the Fraction class representing a mathematical fraction.
 * @typedef {Object} Fraction#fraction
 */

/**
 * @class
 */
class Fraction {
    static ERR_MSG = {
        IP01: 'Invalid multiVal parameter when instantiating Fraction.',
    }
    static FRACTION_PATTERNS = {
        MIXED: new RegExp(
            /^\s*([-+]?(?=\s*\d+\s+[+-]?\s*\d|\s*\d+\s*$)\s*\d*(?=\s+|\s*(?![+-]?\d)))?/.source + 
            /\s*(([-+]?\s*\d+)\s*\/\s*([-+]?\s*\d+)\s*)?$/.source
        ),
    }
    constructor(multiVal, numerator, denominator) {
        let errMsg = this.constructor.ERR_MSG.IP01;
        let fractPattern = this.constructor.FRACTION_PATTERNS.MIXED;

        switch(true) {
            case typeof multiVal === 'number' && isNaN(multiVal) ||
                typeof multiVal === 'string' && !fractPattern.test(multiVal) ||
                multiVal === null && arguments.length === 1 ||
                typeof multiVal === 'object' && arguments.length === 1 &&
                (multiVal.integer && multiVal.int && multiVal.integer !== multiVal.int ||
                multiVal.numerator && multiVal.num && multiVal.numerator !== multiVal.num ||
                multiVal.denominator && multiVal.den && multiVal.denominator !== multiVal.den):
                throw new TypeError(errMsg);
                break;
            case typeof multiVal === 'number' || typeof multiVal === 'bigint':
                [this.integer, this.numerator, this.denominator] = 
                    [multiVal, numerator, denominator];
                break;
            case typeof multiVal === 'string': 
                [, this.integer, , this.numerator, this.denominator] = (
                    multiVal.match(fractPattern)
                    .map( (v, i) => v ? v.replace(/\s*/g, "") : null )
                );
                break;
            case Array.isArray(multiVal):
                [this.integer, this.numerator, this.denominator] = multiVal;
                break;
            case multiVal === null:                
                [this.integer, this.numerator, this.denominator] = 
                    [0n, numerator, denominator];
                break;
            case typeof multiVal === 'object':
                let isShort = multiVal.int || multiVal.num || multiVal.den;
                if(isShort) {
                    ({ 
                        int:  this.int, 
                        num: this.num,
                        den: this.den
                    } = multiVal);  
                } else {
                    ({
                        integer: this.integer, 
                        numerator: this.numerator, 
                        denominator: this.denominator
                    } = multiVal);  
                }                                  
                break;
            default: throw new TypeError(errMsg);
        }      
        Object.keys(this)
            .filter(key => ['integer', 'numerator', 'denominator'].includes(key))
            .forEach(
                key => this[key] = this[key] === undefined || 
                                    typeof this[key] === 'number' && isNaN(this[key]) || 
                                    this[key] === null ? null : 
                                    BigInt(this[key])
            );  
        if( !this._isValidParamValues() ) throw new TypeError(errMsg);
        this.normalize();
    }

    get sign() {
        return this.int === 0n ? BigInt.sign(this.num) : BigInt.sign(this.int);
    }

    get fractComponents() {
        let components = [this.sign].concat( [this.int, this.num, this.den].map(v => v && BigInt.abs(v)) );
        components.changeNulls = function() {
            let [sign, int, num, den] = this;
            return [sign, int || 0n, num || 0n, den || 1n];
        }            
        return components;
    }
    get int() {
        return this.integer;
    }
    set int(value) {
        this.integer = value;
    }
    get num() {
        return this.numerator;
    }
    set num(value) {
        this.numerator = value;
    }
    get den() {
        return this.denominator;
    }
    set den(value) {
        this.denominator = value;
    }

    /**
    * Checking the validity of the input components of the fraction 
    * when creating its instance.
    * @returns {Boolean} - whether the input values of the fraction 
    * components are valid when creating its instance.
    */
    _isValidParamValues() {
        let isNumber = this.fractComponents.slice(1).
                        reduce( (res, cur) => res && typeof cur === 'number' && !isNaN(cur) ||
                                 typeof cur === 'bigint' || cur === null, true );
        let isZeroInteger = this.int === 0n;
        let isNullInteger = this.int === null;
        let isNullNumerator = this.num === null;
        let isNullDenominator = this.den === null;
        let isZeroDenominator = this.den === 0n;
        let isZeroNumerator = this.num === 0n ||
                                isNullNumerator && !isZeroDenominator;
        let isValidSign = !isZeroInteger && 
                            this.num > 0n && this.den > 0n || 
                            isNullNumerator && isNullDenominator ||
                            isZeroNumerator || isZeroInteger || isNullInteger;

        return isNumber && !isZeroDenominator && isValidSign;
    }

    /** 
    * Normalization of fraction type:
    * <pre>
    * 1. Processing of zero or missing values of fraction components:
    *    - the missing integer part is set to zero;
    *    - if the numerator is missing or equal to zero, the numerator and denominator
    *      are set to null.
    * 2. Normalization of the position of the fraction sign (transfer of the sign to 
    *    the numerator), if the integer part is zero. With a non-zero integer part, the
    *    sign is saved in it.
    * 3. Reduce the fraction and bring it to a mixed view, see {@link Fraction#_normalizeValues}
    * </pre>
    * @see Fraction#_handleZeros
    * @see Fraction#_normalizeSign
    * @see Fraction#_normalizeValues
    * @returns {Fraction#fraction} - current fraction instance.
    */
    normalize() {
        this._handleZeros();
        this._normalizeSign();
        this._normalizeValues();
        return this;
    }

    /**
     * Processing of zeros in the integer part and the numerator. 
     * Correction of the components of the fraction.
     */
    _handleZeros() {
        this.int = this.int === null ? 0n : this.int;
        let isZeroNumerator = this.num === 0n;
        let isNullNumerator = this.num === null;
        this.num = isZeroNumerator ? null : this.num;
        this.den = isZeroNumerator || isNullNumerator ? null : this.den;
    }

    /**
     * The sign from the denominator is transferred to the numerator.
     */
    _normalizeSign() {
        if(this.den === null) return;
        let sign = BigInt.sign(this.den);
        this.num *= sign;
        this.den *= sign;
    }

    /**
     * Reduces the fraction to a mixed form: i n/d, where i is the integer part,
     * n is the numerator, d is the denominator, and n> d;
     */
    _normalizeValues() {
        if(this.den === null) return;
        let [sign, int, num, den] = this.fractComponents;
        this.int = (int + num / den ) * sign; 
        this.num = this.int === 0n ? sign * num % den : num % den;
        this._reduction();
        this._handleZeros(); 
    }

    /**
     * Reducing the current fraction.
     */
    _reduction() {        
        let gcd = this.gcd(this.num, this.den);
        this.num = this.num/gcd;
        this.den = this.den/gcd;
    }

    /**
     * Converting the current instance of a fraction to a simple (vulgar) form: 
     * n/d, where n is the numerator, d is the denominator. 
     * The  integer part is zero.
     * @returns {Fraction#fraction} - the current instance of the fraction
     */
    toSimple() {
        let [sign, int, num, den] = this.fractComponents;
        if(num === null && den === null) return this;
        this.int = 0n;
        this.num = sign * (int * den + num);
        return this;
    }

    toString() {
        return `${
                    this.int === 0n &&
                    this.num !== null ? '' : 
                    this.int
                 } ${
                        this.num === null ? '' : 
                        this.num + '/' + this.den
                    }`.trim();
    }

    toValue() {
        let [sign, int, num, den] = this.fractComponents;
        return sign * ( int + (num || 0n) / (den || 1n) );
    }

    add(...fract) {
        return this._concat("add", ...fract);
    }

    sub(...fract) {
        return this._concat("sub", ...fract);
    }

    _concat(operation, ...fract) {
        let sign = operation === "add" ? 1n : 
                    operation === "sub" ? -1n : undefined;
        if(!sign) throw new TypeError("Invalid operation parameter.");
        
        let [sign1, int1, num1, den1] = this.fractComponents.changeNulls();
        let [sign2, int2, num2, den2] = new this.constructor(...fract).fractComponents.changeNulls();

        let resultDen = this.lcm(den1, den2);
        let resultNum = sign1 * (int1 * den1 + num1) * (resultDen / den1) + sign *
                                sign2 * (int2 * den2 + num2) * (resultDen / den2);
        let resultInt = resultNum / resultDen; 
        resultNum = resultInt === 0n ? resultNum % resultDen : BigInt.abs(resultNum) % resultDen;

        return new this.constructor({
            integer: resultInt, 
            numerator: resultNum, 
            denominator: resultDen
        });
    }

    mult(fract) {        
        let [sign1, int1, num1, den1] = this.fractComponents.changeNulls();
        let [sign2, int2, num2, den2] = new this.constructor(fract).fractComponents.changeNulls();

        let resultDen = den1 * den2;
        let tempNum = int1 * den1 * num2 + int2 * den2 * num1 + num1 * num2;
        let resultInt = int1 * int2 + tempNum / resultDen;
        let resultNum = tempNum % resultDen;

        return new this.constructor({
                    integer: resultInt && sign1 * sign2 * resultInt,
                    numerator: resultInt ? resultNum : sign1 * sign2 * resultNum,
                    denominator: resultDen
                });
    }

    div(fract) {
        return new this.constructor(fract).reciprocal().mult(this);
    }

    /**
     * Returns a new instance of the fraction that is the reciprocal of the current.
     * @returns {Fraction#fraction}
     */
    reciprocal() {
        let [sign, int, num, den] = this.fractComponents.changeNulls();
        return new this.constructor({
            integer: 0n,
            numerator: sign * den,
            denominator: int * den + num
        });        
    }

    compare(fract) {
        return this.sub( new this.constructor(fract) ).fractComponents[0];
    }

    greater(fract) {
        return this.compare(fract) === 1n;
    }

    less(fract) {
        return this.compare(fract) === -1n;
    }

    equal(fract) {
        return this.compare(fract) === 0n;
    }
    
    greaterOrEqual(fract) {
        return this.compare(fract) + 1n > 0n;
    }

    lessOrEqual(fract) {
        return this.compare(fract) - 1n < 0n;
    }

    notEqual(fract) {
        return this.compare(fract) !== 0n;
    }

    /**
     * Greatest common divisor.
     * @param {number} a 
     * @param {number} b 
     */
    gcd(a, b) {
        a = BigInt.abs(a);
        b = BigInt.abs(b);
        while(a) {
            [a, b] = [b % a, a];
        }
        return b;
    }

    /**
     * Least common multiple.
     * @param {number} a 
     * @param {number} b 
     */
    lcm(a, b) {        
        a = BigInt.abs(a);
        b = BigInt.abs(b);        
        return a / this.gcd(a, b) * b;
    }    
}

class Matrix {

    static ERR_MSG = {
        IP01: 'Invalid input array-matrix.',
        IP02: 'Invalid dimensions of matrices for multiplication.',
        IP03: 'Parameter number is not a number.',
        IP04: 'Invalid dimensions of matrices for addition.',
        IP05: 'Invalid matrix dimension.',
        IP06: 'The matrix is not square.',
        IP07: 'Invalid free member vector.',
    }

    constructor(arr) {    
        arr = this.isDimension(arr) ? 
                this.constructor._identityArray(arr) : 
                arr instanceof this.constructor ? arr.body : arr;     
        let errMsg = this.constructor.ERR_MSG.IP01;
        if( !this.isValid(arr) ) throw new TypeError(errMsg);
        this.body = arr.map( row => row.map( cell => new Fraction(cell) ) );
        this._cache = new Map();
    }

    static _identityArray(size) {
        return new Array(size).fill(0).map( 
                    (row, j) => new Array(size).fill(0)
                    .map( (cell, i) => i === j ? 1 : 0 )
                );
    }

    static identity(size) {
        return  new this(this._identityArray(size));
    }

    isDimension(value) {
        return typeof value === 'number' && 
                !isNaN(value) && 
                value > 0 && 
                value % 1 === 0;
    }

    isValid(arr) {
        return Array.isArray(arr) &&
                arr.reduce( (accum, row) => {
                    accum.isValid = accum.isValid && 
                                    Array.isArray(row) &&
                                    row && row.length === accum.colSize; 
                    return accum;
                },
                {isValid: Array.isArray(arr[0]), colSize: arr[0] && arr[0].length} ).isValid;
    }

    get maxCollsWidth() {
        return this.body.reduce( (maxColls, row) => 
                                    row.map( (cell, i) => 
                                                Math.max(maxColls[i], (cell.toSimple()+"").length ) ), 
                            new Array(this.size.colls).fill(0) );
    }

    get size() {
        return {rows: this.body.length, colls: this.body[0].length};
    }

    toString() {
        let maxColls = this.maxCollsWidth;        
        let len = maxColls.reduce( (width, collWidth) => width += collWidth + 1 );
        return  '┌' + ' '.repeat(len + 2) + '┐\n' + 
                this.body.reduce( 
                                    (matrix, row) => matrix + '│ ' + row.map(
                                        (cell, i) => (cell.toSimple()+"").padStart(maxColls[i], ' ')
                                    ).join(' ') + ' │\n', 
                                '') +
                '└' + ' '.repeat(len + 2) + '┘';
    }

    add(matrix) {
        matrix = new this.constructor(matrix);
        if( this.size.rows !== matrix.size.rows ||
            this.size.colls !== matrix.size.colls ) {
                throw new TypeError(this.constructor.ERR_MSG.IP04);
        }
        return new this.constructor(
                        this.body.map(
                            (row, j) => row.map(
                                (cell, i) => cell.add(matrix.body[j][i])
                            )
                        )
                    );
    } 

    sub(matrix) {
        matrix = new this.constructor(matrix).multNum(-1);
        return  this.add(matrix);
    }

    multNum(number) {
        if( !(this.isNumber(number) || number instanceof Fraction) ) throw new TypeError(this.constructor.ERR_MSG.IP03);

        return new this.constructor(
            this.body.map(
                row => row.map(
                    cell => cell.mult(number)
                )
            )
        );
    } 

    isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    multMatr(matrix) {
        matrix = new this.constructor(matrix);
        if(this.size.colls !== matrix.size.rows) throw new TypeError(this.constructor.ERR_MSG.IP02);

        return  new this.constructor(
                        this.body.map(
                            row => matrix.body[0].map(
                                        (temp, i) => row.reduce(
                                                            (sum, cell, j) =>   cell
                                                                                .mult(matrix.body[j][i])
                                                                                .add(sum),
                                                        0)
                                    )
                        )
                    );
    }

    static createZeroMatrix(rows, colls) {
        return new this( this.createZeroArray(rows, colls) );
    }

    static createZeroArray(rows, colls) {
        if( !this.prototype.isDimension(rows) ||
            !this.prototype.isDimension(colls) ) {
                throw new TypeError(this.constructor.ERR_MSG.IP05);
        }
        return  new Array(rows).fill(0)
                .map( row => new Array(colls).fill(0) );
    }

    transpose() {
        let trMatrix = this.constructor
                        .createZeroArray(this.size.colls, this.size.rows);
        return  new this.constructor(
                        trMatrix.map(
                            (row, j) => row.map(
                                (cell, i) => this.body[i][j]
                            )
                        )
                    );
    }

    _createMinorMatrix(row, coll) {
        let matrix = this._cloneMatrix();
        matrix.splice(row, 1);
        matrix.forEach( row => row.splice(coll, 1) );
        return new this.constructor(matrix);
    }

    /**
     * Minor of a matrix element m(row, coll).
     * @param {Number} row 
     * @param {Number} coll 
     * @returns {Fraction~fraction} 
     */
    minor(row, coll) {
        return this._createMinorMatrix(row, coll).determinant;
    }

    /**
     * Algebraic complement of a matrix element m(row, coll).
     * @param {Number} row 
     * @param {Number} coll 
     * @returns {Fraction~fraction} 
     */
    algCompl(row, coll) {
        return this.minor(row, coll).mult( (-1)**(row + coll) );
    }

    /**
     * Matrix of algebraic complements of the current matrix.
     */
    get algComplMatrix() {
        return  this.determinant.equal(0) ? null :
                new this.constructor(
                    this.body
                    .map(
                        (row, j) => row.map(
                            (cell, i) => this.algCompl(j, i)
                        )
                    )
                );
    }

    /**
     * Inverse matrix.
     */
    get invMatrix() {
        let algComplMatr = this.algComplMatrix;
        return algComplMatr && algComplMatr.transpose()
                                .multNum( this.determinant.reciprocal() );
    }
  
    /**
     * Gauss method. It is used to solve systems of linear equations, to find equivalent 
     * triangular or step matrices, to find the rank and determinant of a matrix.
     * @param {String} kind - the kind of method (submethod) 
     * that defines what the method returns:
     * rank, determinant, equivalent triangular matrix or 
     * solution of a linear system of equations.
     * @param {Array|Matrix~matrix} multiParam is a parameter passed to a specific 
     * type of method. If the submethod does not need an additional parameter, 
     * it will be ignored if present.
     * @returns {Number Fraction~fraction|Matrix~matrix} - depending on the kind:
     * solution of a system of linear equations, 
     * an equivalent upper triangular matrix, rank or determinant of a matrix.
     * <pre>
     * let matr = new Matrix([
     *   [-1, 1, 2],
     *   [3, 4, 5],
     *   [6, 7, 8],
     * ]);
     * let fmVector = new Matrix([
     *   [7],
     *   [26],
     *   [44],
     * ]);
     * console.log( matr.gaussMethod('triangular') + '' );
     * // ┌           ┐
     * // │ -1 1    2 │
     * // │  0 7   11 │
     * // │  0 0 -3/7 │
     * // └           ┘
     * console.log( matr.gaussMethod('solve', fmVector) );
     * // ┌   ┐
     * // │ 1 │
     * // │ 2 │
     * // │ 3 │
     * // └   ┘ 
     * console.log( matr.gaussMethod('determinant')+"" );
     * // '3'
     * console.log( matr.gaussMethod('rank') );
     * 3
     * </pre>
     */
    gaussMethod(kind, multiParam) {
        let fmVector;  
        // Flags of the active type of the method specified in the parameter, 
        // which determine the returned result.
        // The number of equations of the LS (the number of rows of the matrix).      
        let dim = this.size.rows;
        // The number of unknowns in the LS.
        let unk = this.size.colls;
        let kindList = ['solve', 'determinant', 'triangular', 'rank'];
        let [isSolve, isDeterminant, isTriangular, isRank] = kindList.map(k => k === kind);
        // The current matrix is the extended matrix of the system.
        let isExtSysMatrix = isSolve && !multiParam;
        // The current matrix is the system matrix. The free member column 
        // is passed in the second parameter of the method.
        let isSysMatrix = isSolve && multiParam;
        switch(true) {
            case isExtSysMatrix:
                unk--;
                break;
            case isSolve:
                fmVector = multiParam;
                if( !this._isValidFreeMemberVector(fmVector) ) {
                    throw new TypeError(this.constructor.ERR_MSG.IP07);
                } 
                break;
            case isTriangular:
            case isDeterminant:    
                // To convert to triangular original matrix must be square.
                if(dim !== unk) {
                    throw new TypeError(this.constructor.ERR_MSG.IP06);
                }
                break;
        }        
        
        // Extended system matrix: a copy of the original matrix with the 
        // addition of a column vector of free members at the end of the matrix.
        let matrix = this._cloneMatrix();
        if(isSysMatrix) this._pushColl(matrix, fmVector.body);
        // If the number of variables is greater than the number of equations,
        if(unk > dim) {
            // add a row with zero entries down the matrix to make it square.
            matrix = matrix.concat( this.constructor.createZeroMatrix(unk - dim, unk + 1).body );
            dim = unk;
        }
        let isPartialMatrix = dim > unk;
        // Rank of the matrix.
        let rank = Math.min(dim, unk);
        // Offset of the current line number by a number equal to the number of zero 
        // elements of the main diagonal of the matrix found at the current moment.
        let offset = 0;

        // Gaussian method
        // 1. Direct path of the method.
        // Go through the rows of the matrix, where j is the number of the current row.
        for(let j = 0; j < dim; j++) {
            let row = matrix[j];
            // Row number of the first nonzero element in the j-th column below 
            // the main diagonal of the matrix, including this diagonal.
            let nonZeroCellRowIndex =   this._findNonZeroCellRowIndex(matrix, j, j + offset, isPartialMatrix);

            // If one of the minors of the main diagonal of the matrix is zero, 
            // then the matrix is degenerate, and its determinant is zero.       
            if(nonZeroCellRowIndex < 0) {
                if(isDeterminant) return new Fraction(0);
                // Check the row of the matrix for compatibility, 
                // starting from j+1-th column to reduce the search time.
                if( !this._isInconsistent(
                    matrix[j+offset], isPartialMatrix && j >= unk - 1 ? unk - 1 : j + 1)
                ) {                   
                    return null;
                }
                if(isTriangular) offset--;
                continue;
            };
            // If the j-th element of the main diagonal is zero and there 
            // is a row below, the j-th element of which is not zero,
            if(nonZeroCellRowIndex > j) {
                if(isDeterminant || isTriangular) {
                    // add the j-th line with this found line.
                    row.forEach(
                        (cell, i) => matrix[j+offset][i] =  matrix[j+offset][i]
                                                            .add(matrix[nonZeroCellRowIndex][i])
                    );
                } else {
                    // swap these rows.
                    this._swap(matrix, j, nonZeroCellRowIndex);
                }   
            }   
            // By elementary transformations, get an equivalent matrix in which
            // all elements of the j-th column, starting from the j+1-th row, 
            // are equal to zero.   
            this._nullifyColl(matrix, j, 'bottom', offset);
        }

        if(isDeterminant) return matrix.reduce( (det, cur, i, m) => m[i][i].mult(det), 1);
        if(isTriangular) return new this.constructor(matrix);
        
        // 2. The reverse of the Gauss method: transformation of the triangular (stepwise) 
        // matrix obtained at the previous stage into the identity matrix with columns 
        // of free variables, if they exist, and a column of free terms.
        for(let j = dim - 1; j >= 0; j--) {
            if( !matrix[j][j] || matrix[j][j].equal(0) ) {
                if( !this._isInconsistent(matrix[j]) ) return null;
                continue;
            }
            let norm = matrix[j][j].reciprocal();
            matrix[j] = matrix[j].map(cell => cell.mult(norm));

            this._nullifyColl(matrix, j, 'top');
        }

        // 3. Formation of the results of the method based on the transformed matrix.
        let solution = this._createEmptyColl(dim);
        this._pushColl(solution, matrix, unk);

        // Nonzero elements of the main diagonal of the matrix correspond to basic 
        // variables of the LS, zero - to free variables.
        for(let j = 0; j < unk; j++) {
            if( matrix[j][j].equal(0) ) {
                // Each zero element of the main diagonal lowers 
                // the rank of the original matrix by one.
                rank--;
                solution = solution.map(
                    (row, i) => {
                        row.push( i === j ? new Fraction(1) : matrix[i][j].mult(-1) );
                        return row;
                    }
                );
            }
        }
        solution.splice(unk);
        return isRank ? rank : new this.constructor(solution);
    } 

    /**
     * Reducing the original matrix to the upper triangular form by the Gauss method.
     * @returns {Matrix~matrix} A new triangular matrix that is equivalent to the original one.
     */
    toTriangular() {
        return this.gaussMethod('triangular');    
    }

    /**
     * Determinant of a square matrix.
     * @returns {Fraction~fraction} 
     */
     get determinant() {        
        return this.gaussMethod('determinant');
    }

    get rank() {
        return this.gaussMethod('rank');
    }

    solveLinearSystem(freeMemberVector) {
        return this.gaussMethod('solve', freeMemberVector);
    }

    _swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    _cloneMatrix() {
        return this.body.map( row => row.map( cell => cell) );
    }

    _isValidFreeMemberVector(fmVector) {  
        let err;      
        try {
            fmVector = new this.constructor(fmVector);
        } catch(e) {
            err = e;
        }        
        return  !err || fmVector.size.colls === 1 || 
                fmVector.size.rows === this.size.rows;
    }

    _nullifyColl(matrixArr, rowIndex, region = 'bottom', offset = 0) {
        let matrix = matrixArr;
        let selectRow = rowIndex + offset;
        let selectColl = rowIndex;
        let [start, end] = region === 'bottom' ? [selectRow + 1, matrix.length] :
                            region === 'top' ? [0, rowIndex] : [];
        for(let diff = start; diff < end; diff++) {
            let coeff = matrix[diff][selectColl]
                        .div( matrix[selectRow][selectColl] )
                        .mult(-1);

            for(let i = selectColl; i < matrix[0].length; i++) {
                matrix[diff][i] = matrix[selectRow][i]
                                    .mult(coeff)                                                
                                    .add(matrix[diff][i]);
            }
        }
    }
    
    _isInconsistent(row, fromIndex = 0) {
        let nonZeroCellCollIndex = -1;
        for(let i = fromIndex; i < row.length; i++) {
            if( row[i].notEqual(0) ) {
                nonZeroCellCollIndex = i;
                break;
            }
        }
        return nonZeroCellCollIndex !== row.length - 1;
    }

    _findNonZeroCellRowIndex(matrix, collIndex, fromIndex = 0, isPartialMatrix = false) {
        collIndex = isPartialMatrix && collIndex >= matrix[0].length - 1 ? matrix[0].length - 2 : collIndex;
        for(let j = fromIndex; j < matrix.length; j++) {
            if( !matrix[j][collIndex] ) break; 
            if( matrix[j][collIndex].notEqual(0) ) {
                return j;
            }
        }
        return -1;
    }

    _createEmptyColl(rows) {
        return new Array(rows).fill(0).map( cell => [] );
    }

    _pushColl(toArr, fromArr, coll = 0) {
        if( !fromArr[0].length ) return;
        toArr.forEach( (row, j) => row.push(fromArr[j][coll]) );
    }
}

function solve(input) {
  let matrix = new Matrix( input.split("\n").map( str => str.split(" ")) );
  let solution = matrix.solveLinearSystem();
  return !solution ? `SOL=NONE` :
          `SOL=${ solution.transpose().body
          .map(
            (row, j) => `${j === 0 ? '' : ` + q${j} * `}(${ row.map(
                                                                      fract => fract.toSimple()
                                                                    ).join('; ') })`
          ).join('') }`;
}