import "reflect-metadata";
import * as koa from "koa";
import * as router from "koa-router";
import * as body from "koa-body";

import { registerRouter } from "./decorator";
import { HomeController } from "./controller/home";
import { UserController } from "./controller/user";

const app = new koa();
const Router = new router();
app.use(body());

registerRouter(Router, [ UserController ]);

app.use(Router.routes());

app.listen(8888);

console.log(`start http server http://127.0.0.1:8888`);
