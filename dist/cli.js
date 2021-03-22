!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("archiver")):"function"==typeof define&&define.amd?define(["archiver"],t):"object"==typeof exports?exports.cli=t(require("archiver")):e.cli=t(e.archiver)}(global,(function(e){return(()=>{"use strict";var t={526:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={red:"[1;31m ",green:"[1;32m ",yellow:"[1;33m ",blue:"[1;34m ",purple:"[1;35m ",cyan:"[1;36m "}},86:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(526),a=(e="",t="green")=>{let l=r.default[t]+`  ${e}`;console.log(l)},o={log:a,error:e=>{a(),a(`${e}\n`,"red"),process.exit(9)}};t.default=o},98:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(747),a=l(86);t.default=e=>{r.unlinkSync(e),a.default.log(`.DS_Store deleted - path: ${e}\n\n`,"yellow")}},951:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(86),a=l(242);t.default=()=>{for(let e in a)r.default.log(`• ${e}`);r.default.log()}},559:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});t.default={structure:{root:["query.json","layout.zid","header.zid","footer.zid","templates","modules","locals","common","assets"],templates:["404.zid","account-addresses.zid","account-orders.zid","account-profile.zid","blog.zid","blogs.zid","categories.zid","category.zid","faqs.zid","home.zid","product.zid","products.zid","search.zid","shipping-and-payments.zid"],common:[".zid",".html"],modules:[".zid",".html"],assets:[".js",".ts",".css",".scss",".map",".png",".jpg",".jpeg",".gif",".svg",".woff",".woff2",".otf",".ttf",".eot"],locals:[".json"]},optinal_folders_files:["modules"],root_required_files:["query.json","layout.zid","header.zid","footer.zid"],need_structure_validation:["templates"]}},985:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(622),a=l(86);t.default=e=>{e[1]&&("--name"!==e[1]&&"--path"!==e[1]?a.default.error(`Invalid Argument ${e[1]}`):"--name"==e[1]&&"--path"==e[2]?a.default.error("--name argument cannot be empty"):"--path"==e[1]&&"--name"==e[2]&&a.default.error("--path argument cannot be empty")),e[3]&&"--name"!==e[3]&&"--path"!==e[3]&&a.default.error(`Invalid Argument ${e[3]}`),"--name"!=e[2]&&"--path"!=e[2]||a.default.error(`Invalid Argument ${e[2]} for ${e[1]}`),"--name"!=e[4]&&"--path"!=e[4]||a.default.error(`Invalid Argument ${e[4]} for ${e[3]}`);let t=process.cwd(),l=r.basename(process.cwd());for(let a=1;a<e.length;a++)"--name"==e[a]&&e[a+1]?l=e[a+1]:"--path"==e[a]&&e[a+1]&&(t=r.resolve(process.cwd(),e[a+1]||"."));return e.includes("--path")&&!e.includes("--name")&&(l=r.basename(t)),{build_path:t,build_name:l}}},866:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(622);t.default=(e,t)=>{let l=r.extname(e);return!!t.includes(l)||l}},732:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(559);t.default=(e,t)=>{let l=[];for(let a=0;a<t.length;a++)e.includes(t[a])||r.default.optinal_folders_files.includes(t[a])||l.push(t[a]);return 0===l.length||JSON.stringify(l)}},232:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(747),a=l(622),o=l(559),n=l(98),d=l(866),i=l(732);t.default=e=>new Promise(((t,l)=>{let s=r.readdirSync(e),u=i.default(s,o.default.structure.root);if(!0!==u)return l(`Unable to find:\n   ${u}\n\n   - Make sure theme path is correct or add required files\n`);for(const t of s){let s={filename:t,path:a.resolve(e,t)},u=null;if(".DS_Store"==t?n.default(s.path):u=r.lstatSync(s.path),u&&u.isDirectory()&&o.default.structure.root.includes(t)){let e=r.readdirSync(s.path);if(o.default.need_structure_validation.includes(t)){let r=i.default(e,o.default.structure[t]);if(!0!==r)return l(`Unable to find in templates folder:\n   ${r}\n\n   - Make sure theme path is correct or add required files\n`)}for(const r of e)if(".DS_Store"!=r){if(!o.default.need_structure_validation.includes(t)){let e=d.default(r,o.default.structure[t]);if(!0!==e)return l(`Invalid extension ${e}\n   ${r} in ${t} folder\n`)}}else n.default(a.resolve(s.path,r))}}return t("Theme validated")}))},591:function(e,t,l){var r=this&&this.__awaiter||function(e,t,l,r){return new(l||(l=Promise))((function(a,o){function n(e){try{i(r.next(e))}catch(e){o(e)}}function d(e){try{i(r.throw(e))}catch(e){o(e)}}function i(e){var t;e.done?a(e.value):(t=e.value,t instanceof l?t:new l((function(e){e(t)}))).then(n,d)}i((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const a=l(747),o=l(622),n=l(543),d=l(86),i=l(232),s=l(559),u=n("zip");t.default=(e,t)=>r(void 0,void 0,void 0,(function*(){try{let e=yield i.default(t);d.default.log(e)}catch(e){d.default.error(e)}const l=a.createWriteStream(o.resolve(t,`${e}.zip`));l.on("close",(function(){d.default.log(u.pointer()+" total bytes"),d.default.log(`${e}.zip successfully created 🎉!\n`)})),u.pipe(l),s.default.root_required_files.forEach((e=>{let l=o.resolve(t,e);a.existsSync(l)&&u.append(a.createReadStream(l),{name:e})}));for(let e in s.default.structure){let l=o.resolve(t,e);if("root"!==e&&a.existsSync(l)){let r=a.readdirSync(l);u.append("",{name:`${e}/`}),r.forEach((l=>{let r=o.resolve(t,e,l);u.append(a.createReadStream(r),{name:`${e}/${l}`})}))}}yield u.finalize()}))},785:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(86),a=l(591);t.default=(e,t)=>{r.default.log();try{a.default(e,t)}catch(e){r.default.error(e)}}},242:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.version=t.help=t.build=t.commands=void 0;const r=l(785);t.build=r.default;const a=l(707);t.help=a.default;const o=l(276);t.version=o.default,t.commands=[{name:"build",command:"build args[ --name optional => default:cwd name, --path optional => default:cwd ]",examples:["example-1: zid-theme build --name omar --path ./folder","example-2: zid-theme build"]},{name:"help",command:"help",examples:["example: zid-theme help"]},{name:"version",command:"[version, --version, --v]",examples:["example: zid-theme --v"]}]},707:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(86),a=l(242);t.default=()=>{r.default.log(),r.default.log("help:\n","cyan"),r.default.log("available commands:\n","cyan");for(let e of a.commands)r.default.log(`•  ${e.command}`),e.examples.forEach((e=>r.default.log(`   ${e}`,"yellow"))),r.default.log()}},276:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=l(86),a=l(306);t.default=()=>{r.default.log(`v${a.version}`,"green")}},306:e=>{e.exports=JSON.parse('{"name":"zid-theme","version":"1.0.3","description":"A CLI to process zid theme folder","main":"bin/zid-theme","repository":"https://github.com/zidsa/zid-theme-npm","bin":{"zid-theme":"bin/zid-theme"},"files":["bin/","dist/"],"publishConfig":{"access":"public"},"author":"omar <omar.csse@gmail.com>","license":"MIT","private":false,"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":["cli","zid","zid-theme"],"dependencies":{"archiver":"^5.2.0"},"devDependencies":{"@types/archiver":"^5.1.0","@types/node":"^14.14.31","ts-loader":"^8.0.17","typescript":"^4.2.2","webpack":"^5.24.2","webpack-cli":"^4.5.0"}}')},543:t=>{t.exports=e},747:e=>{e.exports=require("fs")},622:e=>{e.exports=require("path")}},l={};function r(e){if(l[e])return l[e].exports;var a=l[e]={exports:{}};return t[e].call(a.exports,a,a.exports,r),a.exports}var a={};return(()=>{var e=a;const t=r(242),l=r(86),o=r(985),n=r(951);e.default=e=>{let r=e.slice(2);if(r.length<1&&(l.default.log(),l.default.log("no argument passed\n","red"),l.default.log("available commands:\n"),n.default(),process.exit(9)),["--version","-v","--v","version"].includes(r[0])&&(t.version(),process.exit(0)),t[r[0]]||(l.default.log(),l.default.log(`Invalid argument ${r[0]}\n`,"red"),l.default.log("available commands:\n"),n.default(),process.exit(9)),"build"==r[0]){const e=o.default(r);t.build(e.build_name,e.build_path)}else"help"==r[0]&&t.help()}})(),a.default})()}));