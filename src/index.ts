import * as Koa from "koa";
import config from "@config";

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(config.SERVER.PORT);
