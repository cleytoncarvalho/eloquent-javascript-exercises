/*
The standard JavaScript environment provides another data structure called Set.
Like an instance of Map, a set holds a collection of values. Unlike Map, it does not
associate other values with those—it just tracks which values are part of the set.
A value can be part of a set only once—adding it again doesn’t have any effect.

Write a class called Group (since Set is already taken). Like Set, it has add, delete,
and has methods. Its constructor creates an empty group, add adds a value to the
group (but only if it isn’t already a member), delete removes its argument from the
group (if it was a member), and has returns a Boolean value indicating whether its
argument is a member of the group.

Use the === operator, or something equivalent such as indexOf, to determine whether two
values are the same.

Give the class a static from method that takes an iterable object as argument and creates
a group that contains all the values produced by iterating over it.
*/

class Group {
  constructor() {
    this.values = [];
  }

  add(value) {
    if (this.values.indexOf(value) < 0) {
      this.values.push(value);
    }
  }

  delete(value) {
    if (this.values.indexOf(value) >= 0) {
      this.values = this.values.filter((item) => item !== value);
    }
  }

  has(value) {
    return this.values.indexOf(value) >= 0;
  }

  static from(values) {
    const group = new this();

    values.forEach((item) => {
      group.add(item);
    });

    return group;
  }
}

class GroupIterator {
  constructor(group) {
    this.values = group.values;
    this.currentIndex = 0;
    this.lastIndex = this.values.length - 1;
  }

  next() {
    if (this.currentIndex > this.lastIndex) return { done: true };

    return {
      value: this.values[this.currentIndex++],
      done: false,
    };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
