import { Context, GET, Ctx, Param, Query } from "../decorator";

export class UserController {

  // @GET('/list')
  // list(id, @Ctx() ctx: Context): void {
  //   ctx.body = {
  //     list: [
  //       { id: 1000, name: 'sky' }
  //     ]
  //   };
  // }

  @GET("/detail/:id")
  detail(@Param("id") id: number, @Ctx() ctx: Context, @Query("name") name: string): void {
    ctx.body = JSON.stringify({ id, name });
  }
}
