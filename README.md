# Koa TypeScript Decorator


## 装饰器

- https://www.tslang.cn/docs/handbook/decorators.html
- https://github.com/tc39/proposal-decorators

- 在 TypeScript 中装饰器还属于实验性语法(stage 2)，你必须在命令行或 tsconfig.json 里启用experimentalDecorators编译器选项

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

## 如何定义装饰器

- 装饰器本身其实就是一个函数，理论上忽略参数的话，任何函数都可以当做装饰器使用。

```js
export function Route(p1: string, p1: string) {
  return function(target, name, descriptor) {
    /// TODO
  };
}
```

- 装饰器的类型有：类装饰器、访问器装饰器、属性装饰器、方法装饰器、参数装饰器

  - 有多个参数装饰器时：从最后一个参数依次向前执行
  - 方法和方法参数中参数装饰器先执行。
  - 类装饰器总是最后执行。
  - 方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行。

## 编译运行

TS 代码文件的装饰器代码会直接编译为立即运行的代码的，也就是 import/require 代码文件时，会直接初始化收集 Metadata 信息。

```js
// TS 装饰器代码编译后代码
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const decorator_1 = require("../decorator");
class UserController {
    list(ctx) {
        ctx.body = {
            list: [
                { id: 1000, name: 'sky' }
            ]
        };
    }
    detail(ctx, id, name) {
        ctx.body = JSON.stringify({ id, name });
    }
}
__decorate([
    decorator_1.GET("/"),
    __param(0, decorator_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "list", null);
__decorate([
    decorator_1.GET("/:id"),
    __param(0, decorator_1.Ctx()), __param(1, decorator_1.Param("id")), __param(2, decorator_1.Query("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "detail", null);
exports.UserController = UserController;
```




## Reflect Metadata

- https://github.com//reflect-metadata
- https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E5%9F%BA%E7%A1%80


## ECMAScript

- https://github.com/tc39/proposals
- https://github.com/tc39/proposals/blob/master/finished-proposals.md