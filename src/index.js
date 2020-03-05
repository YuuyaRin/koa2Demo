// const koa = require("koa");
// const path = require("path"); // 路径模块
import koa from "koa";
import path from "path"; // 路径模块
import helmet from "koa-helmet"; // 添加安全头（增加app安全性）
import statics from "koa-static"; // 用于访问静态资源服务器
import router from "./routes/routes";
import koaBody from "koa-body";
import jsonutil from "koa-json";
import cors from "@koa/cors";
import compose from "koa-compose"; // 整合Koa中间件
import compress from "koa-compress"; // 压缩中间件
const app = new koa();
const isDevMode = process.env.NODE_ENV === "production" ? false : true; // 是否是开发模式
// const helmet = require("koa-helmet"); // 添加安全头（增加app安全性）
// const statics = require("koa-static"); // 用于访问静态资源服务器

// const router = require("./routes/routes");

// app.use(helmet());
// app.use(statics(path.join(__dirname, "../public"))); // __dirname当前目录,localhost:3000/logo.png可访问到public下文件
// app.use(router());

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, "../public")),
  cors(),
  jsonutil({ pretty: false, param: "pretty" }), // 美化请求json
  helmet()
]);

if (!isDevMode) {
  app.use(compress());
}

app.use(middleware);
app.use(router());
app.listen(3001);
