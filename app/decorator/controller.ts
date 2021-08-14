import { METHODS, PATH, PARAM } from "./constant";

export function Route(path: string, method: METHODS) {
  return function(target, name, descriptor) {
    const meta = Reflect.getMetadata(PATH, target) || [];
    meta.push({
      name,
      method,
      path
    });
    Reflect.defineMetadata(PATH, meta, target);
  };
}

export function ALL(path: string) {
  return Route(path, METHODS.ALL);
}

export function GET(path: string) {
  return Route(path, METHODS.GET);
}

export function POST(path: string) {
  return Route(path, METHODS.POST);
}

export function PUT(path: string) {
  return Route(path, METHODS.PUT);
}

export function DEL(path: string) {
  return Route(path, METHODS.DEL);
}

export function Inject(fn) {
  return function(target, name, descriptor) {
    const meta = Reflect.getMetadata(PARAM, target) || [];
    meta.push({
      name,
      fn,
      index: descriptor
    });
    Reflect.defineMetadata(PARAM, meta, target);
  };
}

export function Ctx() {
  return Inject(ctx => ctx);
}

export function Body() {
  return Inject(ctx => ctx.request.body);
}

export function Req() {
  return Inject(ctx => ctx.req);
}

export function Res() {
  return Inject(ctx => ctx.res);
}

export function Param(arg) {
  return Inject(ctx => ctx.params[arg]);
}

export function Query(arg) {
  return Inject(ctx => ctx.query[arg]);
}
