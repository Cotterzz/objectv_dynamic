// boot.js
console.log("boot module loaded");
const moduleSpecifier = './back.js';
import(moduleSpecifier).then((module) => {
      console.log("back module loaded");
      let back = new module.default("test");
});
