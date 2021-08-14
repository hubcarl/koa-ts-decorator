'use strict';

const user = {
  id: 1000,
  name: 'sky',
  echo: () => {
    console.log(`id: ${this.id}, name: ${this.name}`)
  }
};

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  getName() {
    return this.name;
  }
  getDesc(desc) {
    return this.name + ',' + desc;
  }
  echo(a) {
    console.log(`id: ${this.id}, name: ${this.name}`)
  }
}

test('Reflect has test work', () => {
  expect(Reflect.has(user, 'id')).toBe(true);
});

test('Reflect ownKeys work', () => {
  // 但不会受 enumerable 影响
  const b = Reflect.defineProperty(user, 'work', {
    value: 'FrontEnd',
    enumerable: false
  });
  expect(Reflect.ownKeys(user)).toEqual(['id', 'name', 'echo', 'work']);
});

test('Reflect set and get work', () => {
  Reflect.set(user, 'address', 'GuangZhou');
  expect(Reflect.get(user,'address')).toEqual('GuangZhou');
});

test('Reflect contructor work', () => {
  const u = Reflect.construct(User, [1000, 'sky']);
  expect(u.getName()).toEqual('sky');
});

// test('Reflect apply work', () => {
//   const u = Reflect.construct(User, [1000, 'sky']);
//   const desc = Reflect.apply(u.getDesc, ['Node.js']);
//   expect(desc).toEqual('sky,Node.js');
// });

test('Reflect defineProperty work', () => {
  const b = Reflect.defineProperty(user, 'age', {
    value: 20,
    writable: false,
    configurable: true, // 能否使用delete、能否需改属性特性、或能否修改访问器属性
    enumerable: false,
  });
  expect(Reflect.get(user,'age')).toEqual(20);
  Reflect.set(user, 'age', 30);
  expect(Reflect.get(user,'age')).toEqual(20);
});