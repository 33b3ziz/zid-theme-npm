!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("archiver")):"function"==typeof define&&define.amd?define(["archiver"],t):"object"==typeof exports?exports.cli=t(require("archiver")):e.cli=t(e.archiver)}(global,(function(e){return(()=>{"use strict";var t={526:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={red:"[1;31m ",green:"[1;32m ",yellow:"[1;33m ",blue:"[1;34m ",purple:"[1;35m ",cyan:"[1;36m "}},86:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(526),a=function(e="",t="green"){let o=l.default[t]+`  ${e}`;console.log(o)},n={log:a,error:function(e){a(),a(`${e}\n`,"red"),process.exit(9)}};t.default=n},98:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(747),a=o(86);t.default=e=>{l.unlinkSync(e),a.default.log(`.DS_Store deleted - path: ${e}\n\n`,"yellow")}},951:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(86),a=o(242);t.default=()=>{for(let e in a)l.default.log(`• ${e}`);l.default.log()}},145:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=["query.json","layout.zid","header.zid","footer.zid"]},517:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={root:["query.json","layout.zid","header.zid","footer.zid","templates","modules","locals","common","assets"],templates:[".zid"],common:[".zid",".html"],modules:[".zid",".html"],assets:[".js",".ts",".css",".scss",".map",".png",".jpg",".jpeg",".gif",".svg",".woff",".woff2",".otf",".ttf",".eot"],locals:[".json"]}},985:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(622),a=o(86);t.default=e=>{e[1]&&("--name"!==e[1]&&"--path"!==e[1]?a.default.error(`Invalid Argument ${e[1]}`):"--name"==e[1]&&"--path"==e[2]?a.default.error("--name argument cannot be empty"):"--path"==e[1]&&"--name"==e[2]&&a.default.error("--path argument cannot be empty")),e[3]&&"--name"!==e[3]&&"--path"!==e[3]&&a.default.error(`Invalid Argument ${e[3]}`),"--name"!=e[2]&&"--path"!=e[2]||a.default.error(`Invalid Argument ${e[2]} for ${e[1]}`),"--name"!=e[4]&&"--path"!=e[4]||a.default.error(`Invalid Argument ${e[4]} for ${e[3]}`);let t=process.cwd(),o=l.basename(process.cwd());for(let a=1;a<e.length;a++)"--name"==e[a]&&e[a+1]?o=e[a+1]:"--path"==e[a]&&e[a+1]&&(t=l.resolve(process.cwd(),e[a+1]||"."));return e.includes("--path")&&!e.includes("--name")&&(o=l.basename(t)),{build_path:t,build_name:o}}},866:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(622);t.default=function(e,t){let o=l.extname(e);return!!t.includes(o)||o}},732:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){let o=[];for(let l=0;l<t.length;l++)e.includes(t[l])||o.push(t[l]);return 0===o.length||JSON.stringify(o)}},232:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(747),a=o(622),n=o(517),r=o(98),d=o(866),i=o(732);t.default=function(e){return new Promise(((t,o)=>{let u=l.readdirSync(e),s=i.default(u,n.default.root);if(!0!==s)return o(`Unable to find:\n   ${s}\n\n   - Make sure theme path is correct or add required files\n`);for(const t of u){let i={filename:t,path:a.resolve(e,t)},u=null;if(".DS_Store"==t?r.default(i.path):u=l.lstatSync(i.path),u&&u.isDirectory()&&n.default.root.includes(t)){let e=l.readdirSync(i.path);for(const l of e){if(".DS_Store"==l){r.default(a.resolve(i.path,l));continue}let e=d.default(l,n.default[t]);if(!0!==e)return o(`Invalid extension ${e}\n   ${l} in ${t} folder\n`)}}}return t("Theme validated")}))}},591:function(e,t,o){var l=this&&this.__awaiter||function(e,t,o,l){return new(o||(o=Promise))((function(a,n){function r(e){try{i(l.next(e))}catch(e){n(e)}}function d(e){try{i(l.throw(e))}catch(e){n(e)}}function i(e){var t;e.done?a(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,d)}i((l=l.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const a=o(747),n=o(622),r=o(543),d=o(86),i=o(232),u=o(517),s=o(145),c=r("zip");t.default=function(e,t){return l(this,void 0,void 0,(function*(){try{let e=yield i.default(t);d.default.log(e)}catch(e){d.default.error(e)}const o=a.createWriteStream(n.resolve(t,`${e}.zip`));o.on("close",(function(){d.default.log(c.pointer()+" total bytes"),d.default.log(`${e}.zip successfully created 🎉!\n`)})),c.pipe(o),s.default.forEach((e=>{c.append(a.createReadStream(n.resolve(t,e)),{name:e})}));for(let e in u.default)if("root"!==e){let o=a.readdirSync(n.resolve(t,e));c.append("",{name:`${e}/`}),o.forEach((o=>{let l=n.resolve(t,e,o);c.append(a.createReadStream(l),{name:`${e}/${o}`})}))}yield c.finalize()}))}},785:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(86),a=o(591);t.default=function(e,t){l.default.log();try{a.default(e,t)}catch(e){l.default.error(e)}}},242:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=t.help=t.build=t.commands=void 0;const l=o(785);t.build=l.default;const a=o(707);t.help=a.default;const n=o(276);t.version=n.default,t.commands=[{name:"build",command:"build args[ --name optional => default:cwd name, --path optional => default:cwd ]",examples:["example-1: zid-theme build --name omar --path ./folder","example-2: zid-theme build"]},{name:"help",command:"help",examples:["example: zid-theme help"]},{name:"version",command:"[version, --version, --v]",examples:["example: zid-theme --v"]}]},707:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(86),a=o(242);t.default=function(){l.default.log(),l.default.log("help:\n","cyan"),l.default.log("available commands:\n","cyan");for(let e of a.commands)l.default.log(`•  ${e.command}`),e.examples.forEach((e=>l.default.log(`   ${e}`,"yellow"))),l.default.log()}},276:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const l=o(86),a=o(306);t.default=function(){l.default.log(`v${a.version}`,"green")}},306:e=>{e.exports=JSON.parse('{"name":"zid-theme","version":"1.0.3","description":"A CLI to process zid theme folder","main":"bin/zid-theme","repository":"https://github.com/zidsa/zid-theme-npm","bin":{"zid-theme":"bin/zid-theme"},"files":["bin/","dist/"],"publishConfig":{"access":"public"},"author":"omar <omar.csse@gmail.com>","license":"MIT","private":false,"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":["cli","zid","zid-theme"],"dependencies":{"archiver":"^5.2.0"},"devDependencies":{"@types/archiver":"^5.1.0","@types/node":"^14.14.31","ts-loader":"^8.0.17","typescript":"^4.2.2","webpack":"^5.24.2","webpack-cli":"^4.5.0"}}')},543:t=>{t.exports=e},747:e=>{e.exports=require("fs")},622:e=>{e.exports=require("path")}},o={};function l(e){if(o[e])return o[e].exports;var a=o[e]={exports:{}};return t[e].call(a.exports,a,a.exports,l),a.exports}var a={};return(()=>{var e=a;const t=l(242),o=l(86),n=l(985),r=l(951);e.default=function(e){let l=e.slice(2);if(l.length<1&&(o.default.log(),o.default.log("no argument passed\n","red"),o.default.log("available commands:\n"),r.default(),process.exit(9)),["--version","-v","--v","version"].includes(l[0])&&(t.version(),process.exit(0)),t[l[0]]||(o.default.log(),o.default.log(`Invalid argument ${l[0]}\n`,"red"),o.default.log("available commands:\n"),r.default(),process.exit(9)),"build"==l[0]){const e=n.default(l);t.build(e.build_name,e.build_path)}else"help"==l[0]&&t.help()}})(),a.default})()}));