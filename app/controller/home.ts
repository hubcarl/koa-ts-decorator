
import { Context, GET, PUT, DEL, POST, Ctx, Param, Body, Query } from "../decorator";

export class HomeController {

  @GET("/")
  index(@Ctx() ctx: Context): void {
    ctx.body = "Welcome to TypeScript Decorator";
  }

  @GET("/:id")
  detail(@Ctx() ctx: Context, @Param("id") id: number, @Query("name") name: string): void {
    ctx.body = JSON.stringify({ id, name });
  }

  @POST("/post")
  post(@Body() body: unknown, ctx: Context): void {
    ctx.body = "post";
  }

  @PUT("/put")
  put(ctx: Context): void {
    ctx.body = "name";
  }

  @DEL("/del")
  del(ctx: Context): void {
    ctx.body = "del";
  }
}
