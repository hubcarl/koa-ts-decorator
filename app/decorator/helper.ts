// 访问器装饰器
export function configurable(value: boolean) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.configurable = value;
  };
}

// 属性装饰器
export function log(target: unknown, propertyKey: string): void {
  let value = target[propertyKey];
  // 用来替换的getter
  const getter = function () {
      console.log(`Getter for ${propertyKey} return ${value}`);
      return value;
  }
  // 用来替换的setter
  const setter = function (newVal) {
      console.log(`Set ${propertyKey} to ${newVal}`);
      value = newVal;
  };
  // 替换属性，先删除原先的属性，再重新定义属性
  if (delete this[propertyKey]) {
      Object.defineProperty(target, propertyKey, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true
      });
  }
}