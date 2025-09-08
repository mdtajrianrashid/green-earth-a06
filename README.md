#### 1) What is the difference between var, let, and const?

<!-- Ans to ques. no.1 -->
var is function-scoped, which can be re-declared and its value can be updated.
let is block-scoped, allows updating of values, but cannot be re-declared in the same scope.
const is block-scoped and represents a constant, when once declared, its value cannot be re-assigned/changed.



#### 2) What is the difference between map(), forEach(), and filter()?

<!-- Ans to ques. no.2 -->
forEach() Executes a function on each array element but does not return a new array. It is mainly used for iteration or side effects.
map() Executes a function on each element and returns a new array containing the transformed values.
filter() Executes a function on each element and returns a new array with only the elements that satisfy the given condition.



#### 3) What are arrow functions in ES6?

<!-- Ans to ques. no.3 -->
Arrow functions in ES6 are a shorter way to write functions using the (=>) syntax. They make code concise and do not have their own this, instead inheriting it from the surrounding scope.



#### 4) How does destructuring assignment work in ES6?

<!-- Ans to ques. no.4 -->
Destructuring assignment in ES6 allows to extract values from arrays or properties from objects and assign them to variables in a single, concise statement. This makes code cleaner and easier to read.



#### 5) Explain template literals in ES6. How are they different from string concatenation?

<!-- Ans to ques. no.5 -->
Template literals in ES6 are strings enclosed by backticks (`) that allow embedding variables and expressions directly using ${}. They also support multi-line strings without special characters. They differ from string concatenation (+) because template literals are more readable, easier to maintain, and eliminate the need for manual concatenation.