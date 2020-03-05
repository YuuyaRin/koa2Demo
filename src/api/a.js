// function a(ctx) {
//   ctx.body = {};
// }
// module.exports{a}

module.exports = function(ctx) {
  ctx.body = {
    message: "hello from a!"
  };
};
