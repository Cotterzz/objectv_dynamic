// boot.js
console.log("boot module loaded");
import('./back.js').then((module) => {
      console.log("back module loaded");
      let back = new module.default();
});
