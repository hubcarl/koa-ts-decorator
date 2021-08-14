import * as Router from "koa-router";
import * as Koa from "koa";
import { PATH, PARAM } from "./constant";

export function registerRouter(koaRouter: Router, controllers: any[]): void {
  for (const ctrl of controllers) {
    const pathMeta = Reflect.getMetadata(PATH, ctrl.prototype) || [];
    /*
    [
      { name: 'list', method: 'get', path: '/' },
      { name: 'detail', method: 'get', path: '/:id' }
    ]
    */
    const argsMeta = Reflect.getMetadata(PARAM, ctrl.prototype) || [];
    /*
     [
      { name: 'list', fn: [Function], index: 0 },
      { name: 'detail', fn: [Function], index: 2 },
      { name: 'detail', fn: [Function], index: 1 },
      { name: 'detail', fn: [Function], index: 0 }
    ]
    */
    
    /*
      // pathMeta [ { name: 'detail', method: 'get', path: '/detail/:id' } ]
      console.log('argsMeta1', argsMeta[0].fn.toString());  ctx => ctx.query[arg]
      console.log('argsMeta2', argsMeta[1].fn.toString());  ctx => ctx
      console.log('argsMeta3', argsMeta[2].fn.toString());  ctx => ctx.params[arg]
    */
    const instance = new ctrl();
    for (const item of pathMeta) {
      const { path, method, name } = item;
      koaRouter[method](path, (ctx: Koa.Context) => {
        const args = argsMeta
          .filter(i => i.name === name)
          .sort((a, b) => a.index - b.index)
          .map(i => i.fn(ctx));
        console.log('>>args', path, args);
        instance[name](...args, ctx);
      });
    }
  }
}
