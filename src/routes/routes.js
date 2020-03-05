// const combineRoutes = require("koa-combine-routers");

// const aRoutes = require("./aRouter");
// const bRoutes = require("./bRouter");
// 合并路由，便于引用
// module.exports = combineRoutes(aRoutes, bRoutes);

import combineRoutes from "koa-combine-routers";
import demoRouter from "./demoRouter";

module.exports = combineRoutes(demoRouter);
