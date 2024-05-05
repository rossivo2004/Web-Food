// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"km5uZ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "0a8ecb283d214d75";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"bB7Pu":[function(require,module,exports) {
//Hàm cấu hình định dạng tiền tệ kiểu VND
function formatCurrency(amount) {
    const parts = amount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}
// Home show sản phẩm nổi bật
const home_show_productsHot = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/products/productsHot");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".home_product__hot-show");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // Kiểm tra nếu discount_pr không phải là 0 thì hiển thị sale-box
            const saleBoxHtml = item.discount_pr !== 0 ? `<div
                            class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
                            - ${item.discount_pr}%
                        </div>` : "";
            let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
            html += `      
                <div class="shadow-2xl w-full lg:h-[380px] h-[280px] lg:p-5 p-2 rounded-lg flex flex-col justify-between relative overflow-hidden border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer">
                    <a href="product_detail.html?id=${item._id}"
                        >
                        <div class="flex justify-center">
                            <img class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] object-cover text-center rounded-lg"
                                src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                                alt="">
                        </div>

                        <div>
                            <div class="home_productBox__category text-sm  pt-2 text-primary font-bold lg:text-sm ">
                                ${item.category_pr.category_pr_name}
                            </div>
                            <div class="home_productBox__name text-xs lg:text-base">
                                ${item.name_pr}
                            </div>
                            <div class="home_productBox__rating flex text-yellow-500">
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>

                            </div>
                            <div class="home_productBox__price font-bold lg:text-base text-xs">
                                ${formatCurrency(priceNew)} VND
                            </div>
                        </div>
                        </a>
                        <button 
                            class="home_productBox__addCart z-30 absolute bottom-0 right-0 bg-primary hover:bg-secondary w-10 h-10 flex items-center justify-center rounded-tl-lg text-white hover:cursor-pointer"
                            data-id="${item._id}"
                            data-name="${item.name_pr}"
                            data-price="${item.priceNew}"
                            data-image="${item.image_pr.image_pr_1}"
                            >
                            <i class="fa-solid fa-cart-arrow-down"></i>
                        </button>
                        <div
                            class="home_product__like absolute top-0 right-0 h-10 w-10  flex items-center justify-center rouded-tl-lg ">
                            <i class="fa-solid fa-heart text-gray-400 hover:text-red-600"></i>
                        </div>
                        ${saleBoxHtml} <!-- Th\xeam sale-box v\xe0o HTML n\u{1EBF}u c\xf3 -->
                </div>`;
        });
        const btn_add = document.querySelector(".home_productBox__addCart");
        btn_add.forEach((btn)=>{
            btn.addEventListener("click", add_cart);
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_productsHot();
const add_cart = async ()=>{
    const productId = getAttribute("data-id");
    const productName = getAttribute("data-name");
    const productPrice = getAttribute("data-price");
    const productImage = getAttribute("data-image");
    if (productId && productName && productPrice && productImage) addToLocalStorageCart(productId, productName, productPrice, productImage);
};
const addToLocalStorageCart = async (productId, productName, productPrice, productImage)=>{
    try {
        const existsCart;
    } catch (error) {}
};
// Home show danh mục nav mobile 
const home_show_categories_nav_mobile = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".home_show_categories_nav_mobile");
        // Kiểm tra render có tồn tại và không null
        if (!render) return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // console.log(item);
            html += `
            <a href="shop.html?tag=${item.tag_ct}"
            class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">${item.name_ct}</a>
            `;
        });
        render.innerHTML = html;
        // Sau khi render xong danh mục, khởi tạo Swiper
        initSwiper();
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_categories_nav_mobile();
// Lấy sản phẩm chi tiết
const get_product_detail = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    // Kiểm tra xem có id sản phẩm hay không
    if (!productId) // console.error('Không tìm thấy id sản phẩm trong URL');
    return;
    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();
        let priceNew = data.price_pr - data.price_pr * data.discount_pr / 100;
        // console.log(data);
        const render = document.querySelector(".render_detail");
        if (!render) return;
        let html = "";
        html += `
            <div class=" flex lg:flex-row flex-col gap-5 w-full mb-14">
            <div class="basis-2/4">
                <div class=" rounded-lg border lg:w-[540px] h-[260px] w-[360px] lg:h-[420px] overflow-hidden mb-3">
                    <img src="http://localhost:3000/images/${data.image_pr.image_pr_1}" alt="" class="w-full h-full object-cover"
                        id="productPage_img__main">
                </div>
            
            </div>
            <div class="basis-2/4">
                <div class="w-full h-full">
                    <div class="text-[22px]">${data.name_pr}</div>
                    <div class="flex my-4">
                        <div class="mr-4 text-yellow-500">
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>${data.rating_pr}</div>
                    </div>
                    <div class="text-lg font-bold mb-5">${formatCurrency(priceNew)} VND</div>
                    <div class="text-sm mb-4">
                        ${data.description_pr}
                    </div>
                    <div class="text-primary mb-4">
                        Kh\u{1ED1}i l\u{1B0}\u{1EE3}ng: ${data.weight_pr} Kg
                    </div>
                    <div class="mb-4">
                        <form class="flex">
                            <div class="relative flex max-w-[8rem] mr-2">
                                <button type="button" id="" data-input-counter-decrement="quantity-input"
                                    class="decrement-button bg-[#f1f8e9] text-primary dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" id="" data-input-counter
                                    aria-describedby="helper-text-explanation"
                                    class="quantity-input bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" value="1" required />
                                <button type="button" id="" data-input-counter-increment="quantity-input"
                                    class="increment-button bg-[#f1f8e9] text-primary dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            <button class="px-4 py-2 text-white bg-primary rounded-lg hover:bg-secondary"
                                data-product-id="${data._id}"
                                data-product-name="${data.name_pr}"
                                data-product-price="${priceNew}"
                                data-product-image="${data.image_pr.image_pr_1}"
                            >
                                <p>Th\xeam v\xe0o gi\u{1ECF} h\xe0ng</p>
                            </button>
                        </form>
                    </div>
                    <div>
                        <p>Th\u{1EC3} lo\u{1EA1}i: <span class="p-[2px] bg-[#f1f8e9] text-primary rounded-lg"><a href="">${data.category_pr.category_pr_tag}</a></span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="flex gap-4 mb-4">
                <div
                    class="productDetail_btn__a basis-2/4 flex items-center justify-center h-[60px] w-full border-primary border rounded-lg text-primary font-bold hover:cursor-pointer active">
                    M\xf4 t\u{1EA3}</div>
                <div
                    class="productDetail_btn__b basis-2/4 flex items-center justify-center h-[60px] w-full border-primary border rounded-lg text-primary font-bold hover:cursor-pointer">
                    B\xecnh lu\u{1EAD}n</div>
            </div>

            <div>
                <div class="productDetail_area__a w-full">
                    <p class="text-[26px] mb-2 font-bold">Th\xf4ng tin nhanh</p>
                    <div class="text-sm my-2">
                       ${data.description_pr_detail}
                    </div>
                </div>
                <div class="productDetail_area__b hidden">
                    <p class="text-[26px]">1 b\xecnh lu\u{1EAD}n cho s\u{1EA3}n ph\u{1EA9}m <span class="font-bold underline">C\xe1</span></p>

                    <div class="flex my-5 lg:flex-row flex-col">
                        <div class="basis-1/3 flex items-center justify-center flex-col">
                            <div class="flex items-center mb-2">
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p class="ms-1 text-xl font-bold text-black dark:text-gray-400">4.95</p>
                                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                            </div>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
                        </div>
                        <div class="basis-2/3">
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">5
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 70%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">4
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 17%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">3
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 8%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">2
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 4%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                            </div>
                            <a href="#" class="text-sm text-black font-bold dark:text-blue-500">1
                                star</a>
                            <div class="flex items-center mb-4">
                                <div class="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div class="h-5 bg-yellow-300 rounded" style="width: 1%"></div>
                                </div>
                                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                            </div>
                        </div>
                    </div>


                    <div class="h-[500px] overflow-y-auto mb-8">
                        <article class="border border-primary rounded-lg p-4 mb-4">
                            <div class="flex items-center mb-4 ">
                                <img class="w-10 h-10 me-4 rounded-full" src="#" alt="">
                                <div class="font-medium dark:text-white">
                                    <p>Jese Leos
                                </div>
                            </div>
                            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy
                                    another one!</h3>
                            </div>
                            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>Reviewed in the United Kingdom on <time datetime="2017-03-03 19:00">March 3,
                                        2017</time></p>
                            </footer>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver.
                                They
                                are just fantastic value for money. This one arrived yesterday and the first thing I
                                did
                                was set the time, popped on an identical strap from another Invicta and went in the
                                shower with it to test the waterproofing.... No problems.</p>
                            <p class="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build
                                quality
                                as those very expensive watches. But that is like comparing a Citro\xebn to a Ferrari.
                                This
                                watch was well under \xa3100! An absolute bargain.</p>
                            <a href="#"
                                class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                                more</a>
                        </article>
                        <article class="border border-primary rounded-lg p-4 mb-4">
                            <div class="flex items-center mb-4 ">
                                <img class="w-10 h-10 me-4 rounded-full" src="#" alt="">
                                <div class="font-medium dark:text-white">
                                    <p>Jese Leos
                                </div>
                            </div>
                            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy
                                    another one!</h3>
                            </div>
                            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>Reviewed in the United Kingdom on <time datetime="2017-03-03 19:00">March 3,
                                        2017</time></p>
                            </footer>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver.
                                They
                                are just fantastic value for money. This one arrived yesterday and the first thing I
                                did
                                was set the time, popped on an identical strap from another Invicta and went in the
                                shower with it to test the waterproofing.... No problems.</p>
                            <p class="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build
                                quality
                                as those very expensive watches. But that is like comparing a Citro\xebn to a Ferrari.
                                This
                                watch was well under \xa3100! An absolute bargain.</p>
                            <a href="#"
                                class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                                more</a>
                        </article>
                        <article class="border border-primary rounded-lg p-4 mb-4">
                            <div class="flex items-center mb-4 ">
                                <img class="w-10 h-10 me-4 rounded-full" src="#" alt="">
                                <div class="font-medium dark:text-white">
                                    <p>Jese Leos
                                </div>
                            </div>
                            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg class="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy
                                    another one!</h3>
                            </div>
                            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>Reviewed in the United Kingdom on <time datetime="2017-03-03 19:00">March 3,
                                        2017</time></p>
                            </footer>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver.
                                They
                                are just fantastic value for money. This one arrived yesterday and the first thing I
                                did
                                was set the time, popped on an identical strap from another Invicta and went in the
                                shower with it to test the waterproofing.... No problems.</p>
                            <p class="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build
                                quality
                                as those very expensive watches. But that is like comparing a Citro\xebn to a Ferrari.
                                This
                                watch was well under \xa3100! An absolute bargain.</p>
                            <a href="#"
                                class="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read
                                more</a>
                        </article>
                    </div>


                    <div class="mb-14">
                        <p class="text-[30px] mb-5">Th\xeam 1 b\xe0i \u{111}\xe1nh gi\xe1</p>
                        <div>
                            <div class="mb-5">
                                <p>\u{110}\xe1nh gi\xe1 c\u{1EE7}a b\u{1EA1}n <span class="text-red-500">*</span></p>
                                <div class="mr-4 text-yellow-500">
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                            </div>
                            <div>
                                <p>B\xecnh lu\u{1EAD}n c\u{1EE7}a b\u{1EA1}n <span class="text-red-500">*</span></p>
                                <textarea name="" placeholder="Nh\u{1EAD}p \xfd ki\u{1EBF}n c\u{1EE7}a b\u{1EA1}n" id="" cols="30" rows="10"
                                    class="w-full p-4 border border-primary rounded-lg"></textarea>
                                <button
                                    class="text-base text-white bg-primary px-4 py-2 rounded-lg hover:bg-secondary">G\u{1EED}i
                                    \u{111}\xe1nh gi\xe1</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
            `;
        render.innerHTML = html;
        setupImageGallery();
        setupBoxArea();
        setupQuantityInputs();
    } catch (error) {
        console.log("L\u1ED7i: ", error);
        throw error;
    }
};
get_product_detail();
// Home show thể loại
const home_show_categorie_nav = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".nav_show_categories");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // console.log(item);
            html += `
            <a class="py-1 hover:text-primary" href="shop.html?tag=${item.tag_ct}">${item.name_ct}</a>
            `;
        });
        render.innerHTML = html;
        // Sau khi render xong danh mục, khởi tạo Swiper
        initSwiper();
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_categorie_nav();
// Home show thể loại
const home_show_categorie = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".home_show__categories-slide");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // console.log(item);
            html += `
                    <div class="swiper-slide bg-slate-100 rounded-lg">
                        <a href="shop.html?tag=${item.tag_ct}" class="flex flex-col items-center justify-center h-full">
                            <img src="http://localhost:3000/images/${item.image_ct}" alt=""
                                class="h-[70px] w-[70px] hover:-translate-y-1" style="transition: 0.5s;">
                            <p>${item.name_ct}</p>
                        </a>
                    </div>
            `;
        });
        render.innerHTML = html;
        // Sau khi render xong danh mục, khởi tạo Swiper
        initSwiper();
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_categorie();
// shop show product
const shop_show_all_product = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const category_tag = urlParams.get("tag");
    try {
        let url = "http://localhost:3000/products";
        if (category_tag) url = `http://localhost:3000/products/tagname/${category_tag}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".shop_show__product");
        if (!render) return;
        let html = "";
        data.forEach((item)=>{
            let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
            const saleBoxHtml = item.discount_pr !== 0 ? `<div
            class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
            - ${item.discount_pr}%
        </div>` : "";
            html += `      
            <div>
            <a href="product_detail.html?id=${item._id}"
                class="shadow-2xl w-full lg:h-[380px] h-[280px] lg:p-5 p-2 rounded-lg flex flex-col justify-between relative overflow-hidden border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer">
                <div class="flex justify-center">
                    <img class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] object-cover text-center rounded-lg"
                        src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                        alt="">
                </div>

                <div>
                    <div class="home_productBox__name text-xs lg:text-base">
                        ${item.name_pr}
                    </div>
                    <div class="home_productBox__rating flex text-yellow-500">
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>
                        <div>
                            <i class="fa-regular fa-star text-xs lg:text-base"></i>
                        </div>

                    </div>
                    <div class="home_productBox__price font-bold lg:text-base text-xs">
                        ${formatCurrency(priceNew)} VND
                    </div>
                </div>
                <div
                    class="home_productBox__addCart absolute bottom-0 right-0 bg-primary hover:bg-secondary w-10 h-10 flex items-center justify-center rounded-tl-lg text-white hover:cursor-pointer ">
                    <i class="fa-solid fa-cart-arrow-down"></i>
                </div>
                <div
                    class="home_product__like absolute top-0 right-0 h-10 w-10  flex items-center justify-center rouded-tl-lg ">
                    <i class="fa-solid fa-heart text-gray-400 hover:text-red-600"></i>
                </div>
                ${saleBoxHtml}
            </a>
        </div>
            `;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
shop_show_all_product();
// home show product sale
const home_show_product_sale = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/products/discount/discountedProducts");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".home_show_product_sale");
        // Kiểm tra render có tồn tại và không null
        if (!render) return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            // Kiểm tra nếu discount_pr không phải là 0 thì hiển thị sale-box
            let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
            html += `
                    <div
                        class="w-full h-[500px] lg:h-[240px] flex border rounded-lg mb-4 overflow-hidden flex-col lg:flex-row relative">
                        <a href="product_detail.html?id=${item._id}" class="basis-1/3">
                            <img src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                                class="w-full h-full object-cover" alt="">
                        </a>
                        <div
                            class="absolute top-1 right-1 lg:top-4 lg:right-6 bg-yellow-500 rounded-3xl text-black px-5 py-1">
                            -${item.discount_pr}%
                        </div>
                        <div class="basis-2/3 lg:p-8 flex flex-col justify-around relative p-2">
                            <p class="lg:text-base font-bold">${item.name_pr}</p>
                            <div class="flex items-center">
                                <div class="mr-4">
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                </div>
                                <div>${item.rating_pr}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="lg:text-xl mr-4">${formatCurrency(priceNew)} VND</div>
                                <div>${formatCurrency(item.price_pr)} VND</div>
                            </div>
                            <div>
                                <button
                                    class="bg-primary hover:bg-secondary flex items-center justify-center lg:px-5 px-2 lg:py-2 py-2 text-white font-bold rounded-lg">
                                    <p class="lg:mr-2 mr-4 text-sm">Th\xeam v\xe0o gi\u{1ECF} h\xe0ng</p>
                                    <i class="fa-solid fa-cart-arrow-down"></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    `;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
home_show_product_sale();
// admin show category form add
const admin_show_category_form_add = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const render = document.querySelector(".admin_add_show_category");
        if (!render) return;
        let html = "";
        data.forEach((item)=>{
            html += `
            <option value="${item.tag_ct}">${item.name_ct}</option>
            `;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
admin_show_category_form_add();
async function admin_delete__product(id) {
    try {
        const confirmation = confirm("B\u1EA1n c\xf3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xf3a s\u1EA3n ph\u1EA9m n\xe0y?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3000/products/delete/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            // console.log(data.message);
            alert("X\xf3a s\u1EA3n ph\u1EA9m th\xe0nh c\xf4ng");
            admin_render_product(); // Cập nhật danh sách sản phẩm
        }
    } catch (error) {
        console.log("L\u1ED7i: ", error);
        throw error;
    }
}
// admin sản phẩm
async function admin_render_product() {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".admin_show_product");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            html += ` <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            #
                        </th>
                        <td class="px-6 py-4">
                            <img src="http://localhost:3000/images/${item.image_pr.image_pr_1}" class="w-20 h-20 object-cover" alt="">
                        </td>
                        <td class="px-6 py-4">
                            ${item.name_pr}
                        </td>
                        <td class="px-6 py-4">
                            ${formatCurrency(item.price_pr)}
                        </td>
                        <td class="px-6 py-4">
                            ${item.category_pr.category_pr_tag}
                        </td>
                        <td class="px-6 py-4">
                            x${item.quantity_pr}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div>
                                <button onclick="admin_delete__product('${item._id}')">
                                    <kbd
                                        class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">X\xf3a</kbd>
                                </button>
                                <a href="http://localhost:1234/admin_product_edit?id=${item._id}">
                                    <kbd
                                        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-400">S\u{1EED}a
                                    </kbd>
                                </a>
                            </div>
                        </td>
                    </tr>`;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
}
admin_render_product();
//show sản phẩm liên quan trang chi tiết
const show_san_pham_lienquan = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // Lấy productId từ URL thay vì category_tag
    try {
        // Gọi API từ router để lấy sản phẩm liên quan dựa trên productId
        const response = await fetch(`http://localhost:3000/products/sanphamlienquan/${productId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const render = document.querySelector(".show_san_pham_lienquan");
        if (!render) return;
        let html = "";
        data.forEach((item)=>{
            // Kiểm tra xem item.image_pr và item.category_pr có tồn tại không
            if (item.image_pr && item.image_pr.image_pr_1 && item.category_pr && item.category_pr.category_pr_tag) {
                let priceNew = item.price_pr - item.price_pr * item.discount_pr / 100;
                html += `      
                    <div>
                        <a href=""
                            class="shadow-2xl w-full lg:h-[380px] h-[280px] lg:p-5 p-2 rounded-lg flex flex-col justify-between relative overflow-hidden border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer">
                            <div class="flex justify-center">
                                <img class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] object-cover text-center rounded-lg"
                                    src="http://localhost:3000/images/${item.image_pr.image_pr_1}"
                                    alt="">
                            </div>

                            <div>
                                <div class="home_productBox__category text-sm  pt-2 text-primary font-bold lg:text-sm ">
                                    ${item.category_pr.category_pr_tag}
                                </div>
                                <div class="home_productBox__name text-xs lg:text-base">
                                    ${item.name_pr}
                                </div>
                                <div class="home_productBox__rating flex text-yellow-500">
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-star text-xs lg:text-base"></i>
                                    </div>

                                </div>
                                <div class="home_productBox__price font-bold lg:text-base text-xs">
                                    ${formatCurrency(priceNew)} VND <!-- S\u{1EED} d\u{1EE5}ng gi\xe1 m\u{1EDB}i t\xednh t\u{1EEB} d\u{1EEF} li\u{1EC7}u c\u{1EE7}a s\u{1EA3}n ph\u{1EA9}m -->
                                </div>
                            </div>
                            <div
                                class="home_productBox__addCart absolute bottom-0 right-0 bg-primary hover:bg-secondary w-10 h-10 flex items-center justify-center rounded-tl-lg text-white hover:cursor-pointer ">
                                <i class="fa-solid fa-cart-arrow-down"></i>
                            </div>
                            <div
                                class="home_product__like absolute top-0 right-0 h-10 w-10  flex items-center justify-center rouded-tl-lg ">
                                <i class="fa-solid fa-heart text-gray-400 hover:text-red-600"></i>
                            </div>
                            <div
                                class="sale-box bg-yellow-300 absolute top-2 left-2 h-6 w-[70px] pl-1 overflow-hidden text-black">
                                - 20%
                            </div>
                        </a>
                    </div>
                `;
            }
        });
        render.innerHTML = html;
    } catch (error) {
    // console.error('Error fetching or displaying data:', error.message);
    }
};
show_san_pham_lienquan();
const show_data_form_update_product = async ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    try {
        const productResponse = await fetch(`http://localhost:3000/products/${productId}`);
        const productData = await productResponse.json();
        // console.log(productData);
        // Lấy form
        const form = document.querySelector(".form_edit_product");
        // Đặt giá trị cho các trường input trong form
        form.querySelector("#name_pr").value = productData.name_pr;
        form.querySelector("#category_pr").value = productData.category_pr;
        form.querySelector("#price_pr").value = productData.price_pr;
        form.querySelector("#discount_pr").value = productData.discount_pr;
        form.querySelector("#quantity_pr").value = productData.quantity_pr;
        form.querySelector("#description_pr").value = productData.description_pr;
        form.querySelector("#description_pr_detail").value = productData.description_pr_detail;
        const categoryResponse = await fetch(`http://localhost:3000/categories`);
        const categoryData = await categoryResponse.json();
        console.log(categoryData);
        // Điền dữ liệu danh mục vào dropdown menu
        const categoryDropdown = document.querySelector("#category_pr");
        if (!categoryDropdown) return;
        categoryData.forEach((category)=>{
            const option = document.createElement("option");
            option.value = category.tag_ct;
            option.textContent = `${category.name_ct}`; // Assuming you want to add 's' at the end
            categoryDropdown.appendChild(option);
        });
        // Set selected value from productData
        categoryDropdown.value = productData.category_pr.category_pr_tag;
        // Cập nhật đường dẫn ảnh chính và ảnh phụ
        form.querySelector(".mb-6 img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_1}`;
        form.querySelector(".mb-6:nth-child(5) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_2}`;
        form.querySelector(".mb-6:nth-child(6) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_3}`;
        form.querySelector(".mb-6:nth-child(7) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_4}`;
        form.querySelector(".mb-6:nth-child(8) img").src = `http://localhost:3000/images/${productData.image_pr.image_pr_5}`;
    } catch (error) {
        console.log("L\u1ED7i: ", error);
        throw error;
    }
};
// // cập nhật form sản phẩm
document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector(".form_edit_product");
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get("id");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn chặn form gửi dữ liệu mặc định
        var formData = new FormData(form);
        // Convert formData thành object JSON
        var jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });
        // Hiển thị object JSON trong console cho mục đích kiểm tra
        // console.log(jsonData);
        // Gửi dữ liệu sản phẩm được chỉnh sửa đến máy chủ
        fetch(`http://localhost:3000/products/edit/${productId}`, {
            method: "PUT",
            body: JSON.stringify(jsonData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>response.json()).then((data)=>{
            console.log(data); // Log response từ máy chủ
            // Thực hiện các hành động khác (nếu cần) sau khi gửi dữ liệu thành công
            alert("C\u1EADp nh\u1EADt th\xe0nh c\xf4ng !");
        }).catch((error)=>console.error("Error:", error));
    });
});
async function admin_delete__categories(id) {
    try {
        const confirmation = confirm("B\u1EA1n c\xf3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xf3a danh m\u1EE5c n\xe0y?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3000/categories/delete/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            // console.log(data.message);
            alert("X\xf3a s\u1EA3n ph\u1EA9m th\xe0nh c\xf4ng");
            admin_show_category(); // Cập nhật danh sách sản phẩm
        }
    } catch (error) {
        console.log("L\u1ED7i: ", error);
        throw error;
    }
}
// show admin all category
const admin_show_category = async ()=>{
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No data returned from the server");
        const render = document.querySelector(".admin_show_category");
        // Kiểm tra render có tồn tại và không null
        if (!render) // console.error('Render element not found');
        return; // Thoát khỏi hàm nếu không có phần tử render
        let html = "";
        data.forEach((item)=>{
            html += ` <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                .
            </th>
            <td class="px-6 py-4">
                <img src="http://localhost:3000/images/${item.image_ct}" class="w-20 h-20 object-cover" alt="">
            </td>
            <td class="px-6 py-4">
                ${item.name_ct}
            </td>
            <td class="px-6 py-4">
                ${item.tag_ct}
            </td>
            <td class="px-6 py-4">
                .
            </td>
            <td class="px-6 py-4 text-right">
                <div>
                <button onclick="admin_delete__categories('${item._id}')">
                <kbd
                    class="px-2 py-1.5 text-xs font-semibold text-white bg-red-300 border rounded-lg hover:bg-red-600">X\xf3a</kbd>
            </button>
                    <a href="http://localhost:1234/admin_category_edit?id=${item._id}">
                        <kbd
                            class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-400">S\u{1EED}a
                        </kbd>
                    </a>
                </div>
            </td>
        </tr>`;
        });
        render.innerHTML = html;
    } catch (error) {
        console.error("Error fetching or displaying data:", error.message);
    }
};
admin_show_category(); // const admin_show_data_form_category = async () => {
 //     const urlParams = new URLSearchParams(window.location.search);
 //     const categoryId = urlParams.get('id');
 //     try {
 //         const categoryResponse = await fetch(`http://localhost:3000/categories/${categoryId}`);
 //         const categoryData = await categoryResponse.json();
 //         // console.log(categoryData);
 //         // Lấy form
 //         const form = document.querySelector('.form_edit_category');
 //         form.querySelector('#name_ct').value = categoryData.name_ct;
 //         form.querySelector('#tag_ct').value = categoryData.tag_ct;
 //     } catch (error) {
 //         console.log("Lỗi: ", error);
 //         throw error;
 //     }
 // }

},{}]},["km5uZ","bB7Pu"], "bB7Pu", "parcelRequire1831")

//# sourceMappingURL=index.3d214d75.js.map
