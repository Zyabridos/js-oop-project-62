export class Validator {
  string() {
    return new StringSchema();
  }
}

export class StringSchema {
  required() {
    return true;
  }

  contains(substring) {
    this.substring = substring;
    return this;
  }

  isValid(value) {
    if (value || !value) {
      return typeof(value)
    }
    // if (typeof(value) !== 'string') {
    //   return false
    // }

    if (this.required()) {
      return !value ? false : true
    }

    if (value.includes(!this.substring)) {
      // почему не возвращает то, что мне нужно? :D
      return false
    }

    return true;
  }
}

const v = new Validator();

const schema = v.string();

console.log(schema.isValid('')); // true
console.log(schema.isValid('srting')); // true
console.log(schema.isValid(null)) // true
console.log(schema.isValid(undefined)) // true
console.log(schema.isValid(5)); // false ?? 

// const schema = v.required();

// schema.required()

console.log(schema.isValid('what does the fox say')); // true
console.log(schema.isValid('hexlet')); // true
console.log(schema.isValid(null)); // false
console.log(schema.isValid('')); // false

// console.log(schema.contains('what').isValid('what does the fox say')); // true
// console.log(schema.contains('whatthe').isValid('what does the fox say')); // false

// console.log(schema.isValid('what does the fox say')); // false
// console.log(schema.minLength(10).minLength(4).isValid('Hexlet')) // true


// const value = 'what does the fox say'
// const substring = 'what'

// console.log(value.includes(substring))
// console.log(schema.isValid(3)); // false