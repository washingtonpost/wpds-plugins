/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin/controller.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin/controller.ts":
/*!**********************************!*\
  !*** ./src/plugin/controller.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wpds_tokens_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wpds.tokens.json */ "./src/wpds.tokens.json");
var _wpds_tokens_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../wpds.tokens.json */ "./src/wpds.tokens.json", 1);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

figma.showUI(__html__, { width: 365, height: 634 });
figma.on("selectionchange", () => __awaiter(void 0, void 0, void 0, function* () {
    if (figma.currentPage.selection.length === 0) {
        return;
    }
    else {
    }
}));
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    let nodes;
    if (figma.currentPage.selection.length > 0) {
        nodes = figma.currentPage.selection;
    }
    else if (figma.currentPage.children &&
        figma.currentPage.selection.length == 0) {
        nodes = figma.currentPage.children;
    }
    else {
        figma.notify("🙏  Please make a selection");
        return;
    }
    switch (msg.type) {
        case "toggle":
            ToggleTheme(nodes, msg.mode);
            break;
        default:
            break;
    }
});
function ToggleTheme(nodes, mode) {
    nodes.forEach((node) => {
        applyColor(node, mode);
    });
}
function applyColor(node, mode) {
    return __awaiter(this, void 0, void 0, function* () {
        if (node.children) {
            node.children.forEach((child) => {
                applyColor(child, mode);
            });
        }
        if (node.type === "COMPONENT" ||
            "INSTANCE" ||
            "FRAME" ||
            "GROUP" ||
            "ELLIPSE" ||
            "POLYGON" ||
            "RECTANGLE" ||
            "STAR" ||
            "LINE" ||
            "TEXT" ||
            "VECTOR" ||
            "INSTANCE") {
            if (node.fillStyleId) {
                let style = node.fillStyleId.split(":")[1];
                let styleSub = style.split(",")[0];
                let styleID = styleSub;
                SendMessage(styleID);
                if (styleID) {
                    const currentStyle = yield figma.importStyleByKeyAsync(styleID);
                    if (currentStyle) {
                        let currentStyleName = currentStyle.name;
                        let tokenName = currentStyleName.split("/")[1];
                        const _matchingStyles = mode
                            ? _wpds_tokens_json__WEBPACK_IMPORTED_MODULE_0__["color"]["light"]
                            : _wpds_tokens_json__WEBPACK_IMPORTED_MODULE_0__["color"]["dark"];
                        const _matchingStyleID = _matchingStyles[tokenName].split(":")[1];
                        const _matchedStyle = yield figma.importStyleByKeyAsync(_matchingStyleID);
                        if (_matchedStyle) {
                            node.fillStyleId = _matchedStyle.id;
                        }
                    }
                }
            }
            if (node.strokeStyleId) {
                let style = node.strokeStyleId.split(":")[1];
                let styleSub = style.split(",")[0];
                let styleID = styleSub;
                SendMessage(styleID);
                if (styleID) {
                    const currentStyle = yield figma.importStyleByKeyAsync(styleID);
                    if (currentStyle) {
                        let currentStyleName = currentStyle.name;
                        let tokenName = currentStyleName.split("/")[1];
                        const _matchingStyles = mode
                            ? _wpds_tokens_json__WEBPACK_IMPORTED_MODULE_0__["color"]["light"]
                            : _wpds_tokens_json__WEBPACK_IMPORTED_MODULE_0__["color"]["dark"];
                        const _matchingStyleID = _matchingStyles[tokenName].split(":")[1];
                        const _matchedStyle = yield figma.importStyleByKeyAsync(_matchingStyleID);
                        if (_matchedStyle) {
                            node.strokeStyleId = _matchedStyle.id;
                        }
                    }
                }
            }
        }
    });
}
function SendError(Error) {
    var message = {
        type: "Error",
        message: Error,
    };
    figma.ui.postMessage(message);
}
function SendMessage(Error) {
    var message = {
        type: "Debug",
        message: Error,
    };
    figma.ui.postMessage(message);
}


/***/ }),

/***/ "./src/wpds.tokens.json":
/*!******************************!*\
  !*** ./src/wpds.tokens.json ***!
  \******************************/
/*! exports provided: color, baseSize, size, space, fonts, fontSize, fontWeights, lineHeight, radii, shadow, z-index, motion, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"color\":{\"light\":{\"gray600\":\"S:a8d14a6cb5fe3c2935dd22b19404f2804702c3fc\",\"gray500\":\"S:93323b5b81058b046b01faf8363f73e05f7f6fe6\",\"gray400\":\"S:07a8384687ae97e48d4c59061533f23b3d0bb6ec\",\"gray300\":\"S:3caf5dc7434771acc5c12cd9bf3e6e2da7a3e60d\",\"gray200\":\"S:e72d26a444b2654acd4e4f7e233ead942a82e9c3\",\"gray100\":\"S:4424655835587726abb0c2c12b57bccd0056c0b1\",\"gray80\":\"S:c0d96e8fb23c0e74fe7b3330add7cec5654782ff\",\"gray60\":\"S:bc51959cbefacfd80d68c2b677ab8248869fc1ce\",\"gray40\":\"S:682c1bbd93a9c09ae8e7ab6388b848a9a8555450\",\"gray20\":\"S:847f87bdeb86539a9f41ce642fd4d660c5bfd580\",\"gray0\":\"S:90fac2f1dd81d53cfbf143119a8a87cb57dfe176\",\"vividBlue100\":\"S:46934bccf347d1a6a4a6374e5114dc4185de6e71\",\"vividBlue50\":\"S:ab8ac1a8da1a8b4eb6901fb4cd710e632ee24de6\",\"red200\":\"S:0b3b2fd8d50c632c00212badd83025c33324ef35\",\"red50\":\"S:1b8650d469e674b2536f6603c75fe217fc46b08f\",\"vividBlue200\":\"S:56e1f2d49729462c0312651150eeeaa13464cafe\",\"orange300\":\"S:bf514bee2d25b55fb0f706c336dd6f61370ebab7\",\"orange50\":\"S:007e0ac3a26b1e9b8d5ef32a2f5beed2697b1b2e\",\"red100\":\"S:1605ca834f0c93affd40a0947bb59fc586851bab\",\"gold300\":\"S:de4df467e7bc0a7ceabedf5c62ddd24bad5fe2b7\",\"red300\":\"S:0fa9e977c91771d0f925f0607cd1a2d43802c30e\",\"blue50\":\"S:caa8e4a6b660aa0f5601c466086f19cf3f8283a8\",\"orange100\":\"S:d6f15b6eb49cff53ec9b2544d0aa926f538e01da\",\"gold50\":\"S:a3826095fbe1b7cc7487d4cbbd1f19f47f1a86b0\",\"blue200\":\"S:50da8103f96e77cb86f7aad7263bec4f07fc839b\",\"gold200\":\"S:118472fc59fd31ad53a845fa251c668d0f672774\",\"orange200\":\"S:406e5dc31e73dd0b5fe5090140e560f9959869b2\",\"blue100\":\"S:fa5a6e8e2439098e76d0d3c558d26ed158bc8ddb\",\"vividBlue300\":\"S:8c332ab7c7d352a2077061da92ee70fe1219eaba\",\"blue300\":\"S:8515450ca52b49f63983a76ed2fda3795f75ec75\",\"gold100\":\"S:d4a5d014623e11bb565bb736310c857bf6a0b35c\",\"salem300\":\"S:adb17120f053faa25cd7b042a37ddb744e590266\",\"salem200\":\"S:0c89c9a374b81a5d02693911588ee93ea327b4a7\",\"salem100\":\"S:f53110663c6af65f51cef4cefe0e0462f7ef4698\",\"salem50\":\"S:837a74b017b101cb16a5bddbaa8a9c8d5818b7f8\",\"pink300\":\"S:e675595026881046df66a3e05115c6bc445095a1\",\"pink200\":\"S:8f88dc403fb2ac77b10238974921a650395ce445\",\"pink100\":\"S:9393fbf2b6d295ae5035e345073c20d301eeec0d\",\"pink50\":\"S:ca0af88207a75af7dc1b6eaeb31de454e1ada356\",\"navy50\":\"S:9e73490f7bf495f956d9caafa44658a9ae6433ee\",\"green300\":\"S:05dd12ae88c8a80e8a8486fcdb4f4358dfa46e68\",\"navy300\":\"S:5d375bed1b0be301d2ba344d3ee9ab25d6785b9e\",\"green200\":\"S:5d00366af9de715c977e97e78826cb150c94aee0\",\"navy200\":\"S:443f0591b1efb953bdf7cd0ab49584d22f8cfdb8\",\"green100\":\"S:8d4e101b422a060375d0f1244510fe0b0c052c0b\",\"navy100\":\"S:8e224a5ab7788b746d6051f7bafdb7381de9dffe\",\"green50\":\"S:fa065c85cb593ba1fb9220c26c667b26d5b3ad6a\",\"alpha50\":\"S:6bc148567c73b5342f9ac2ba214ae2de7accd451\",\"alpha25\":\"S:9a9b1b6647bbd9f2765e9bd7f6435d46dcdd411b\",\"onDisabled\":\"S:4e89ec7526f592ca44d3c013588085f265eb088c\",\"disabled\":\"S:c3d73400fdd3d1481cbd3faab0714d4bcbdab7d8\",\"onMessage\":\"S:653de4b496d67963b21d1eba64c5e56ee5f13cc8\",\"signal\":\"S:8cfe626e1dccb777ba00aadae0a192c5c4c51bfb\",\"warning\":\"S:00d1e075dcd7304302d63dec0c28415a238079c0\",\"error\":\"S:1cc14dc37f5f4fbdc2418165c096b648052fa346\",\"accessible\":\"S:04f179b143f97d22efa804b5427e56097857d8e3\",\"success\":\"S:17bdd8e4514072e5601fccacde9a9c2e17ac91dd\",\"onCta\":\"S:ac55e97349b9e40c23d222aa145ec88576f1df2a\",\"secondary\":\"S:ede62b7114ea221c3f0d4578b6d5660ea9b5f41b\",\"cta\":\"S:5a3e00801328f5967fa81b833a6c99ffefe7d9a3\",\"subtle\":\"S:3b2c4263e37161f4fc2f92d59c8f895894c03cf6\",\"onPrimary\":\"S:7758300db08d1845046414e87726cb0a60c8a42e\",\"onSecondary\":\"S:cf51c80c5325b6ffe596ca2c1532f1c72f89d417\",\"primary\":\"S:819a673dc8d822afaa36b63a3aea4671a41219b0\"},\"dark\":{\"gray600\":\"S:ab6d3df0686d874a57575c49511449b33df1b280\",\"gray400\":\"S:97a8d8c5ab18cbdafa80c8ccef2898d554efea38\",\"gray300\":\"S:9f472228e1abf5ac222ba157c755c8b1f1aa7c75\",\"gray200\":\"S:d7b64cdf15136efce78b91ce4a7c859f0316bd50\",\"gray500\":\"S:aa72b17b136f44a100bc8b5cce66a8134d2632fb\",\"gray80\":\"S:eb1d366222f01a8905eb49e3dd1e74b6c24bc0d2\",\"gray40\":\"S:002780810739ba0ed84151b988d70f4273a642a8\",\"gray20\":\"S:a178b7272c98f25d95089000cd9e6a679ec1ba02\",\"gray60\":\"S:3a9b6e2649909536dca26ccd3021e6aa6c2dadba\",\"gray100\":\"S:77f3503140a0a539114c1362008019f1fe617444\",\"gray0\":\"S:721151bb47b7a3a4060bc8aa901bd974c8db5bb7\",\"salem300\":\"S:0473e7091b49a60ebae9c441f08738623483ff28\",\"salem200\":\"S:740a5e6d0e4a1bd53084c2d772baa1c254de1cd0\",\"salem100\":\"S:482ea654f9471a73353a40f0c9e447b324c3903f\",\"salem50\":\"S:63840f974e63608bacc620e2405c59625504dcf1\",\"pink300\":\"S:b098f6c68ea273b7bbbb61a2e9584c194a7e456f\",\"pink200\":\"S:0a20cec9757bc228d58692da62a2dbe249773de7\",\"pink100\":\"S:4f29529bdb5b3bcd43ec8af9192c70de2239baa4\",\"pink50\":\"S:987bb716735ed4a2ee4f88ace5df1297da10e44a\",\"navy200\":\"S:a0454cb36a3fa67ae2c81ba15e3a95f0edb62e63\",\"navy100\":\"S:3bee866bbc3119a65d74294d6d3e9bd777a5d4b8\",\"navy50\":\"S:4dc965c3bd25894662385440c0e987d47be623f0\",\"vividBlue300\":\"S:6d7f26863cdb0f919daa8c071b2bb52dcf48e881\",\"blue300\":\"S:7746f237f931d4fd3ee7fef4c3d073762ff51f43\",\"vividBlue200\":\"S:e6cfd6df4d40f99ff3d176225675bcb2550f156d\",\"red300\":\"S:0b9757a8fcde0ab72517d356bb6727e29f5b955e\",\"red200\":\"S:4490169969eb9114ab1a539d393777d5c793505d\",\"red100\":\"S:cfbf5cfe42a96ce54d7779f914bc596afd40d4ed\",\"red50\":\"S:a885a4e5723ae14f54809c3a2dd46e28a4e5ff8f\",\"orange300\":\"S:7eedd43761d68b16091ef02f8e37764a9a4351c9\",\"gold200\":\"S:d6c8e52b16c7908fedb0667dd7733f30e17820fd\",\"green100\":\"S:b6bd405a7c57ffe97042e5b7316354a14c8630f0\",\"green200\":\"S:c241bce1956f75a43dfad5a6cd7043269d2d040a\",\"gold300\":\"S:43dc03baad9309ade447c3b0111572da5fa4b8d3\",\"green50\":\"S:4fa05fc42e81975389ce5c3220fd22fd31475f2e\",\"gold100\":\"S:5e8e1ea2aeb024c7b0f21d0b7ea38313ff2862d6\",\"orange200\":\"S:e6af9917810f6920fffc3ab1d9920284a6a624d4\",\"blue200\":\"S:5bd04c1a2256f8cdd81bde1adf9aeb3cf5bc33b7\",\"vividBlue100\":\"S:3442d4554b8cf550080cfb9ea75aa435fb730952\",\"orange100\":\"S:9d789be9b50b7adbb4fba3006e8976d72e11fb5d\",\"blue100\":\"S:5c9cc832caef6d101420d77e782caf26df00b619\",\"vividBlue50\":\"S:9577eec95ba1064d927c185e849515b8145578c5\",\"navy300\":\"S:a55c885dae6904fea226ae0608709d856ceeacb4\",\"gold50\":\"S:f4c2b23d4a834c346aa74b13fc70950bbff97e5b\",\"orange50\":\"S:57b8905ac4cf1becc7986ab194954cecaa050ff2\",\"green300\":\"S:51a8c5eca3acc9e2375921f2a937552ad56afd4a\",\"blue50\":\"S:75b21fb2b7ae4fefc35a288d4e7d61d22e2bdc97\",\"onDisabled\":\"S:2678d0832078b1d20459951f9f2e47046257ebe4\",\"disabled\":\"S:72116b6637ac0ba2da01699e825b0bf906803818\",\"onMessage\":\"S:5da7985c07ad923b9ff816f28e26f12e2da557f4\",\"signal\":\"S:89a595a1f1590385e36e8bd430d9c6e6ffc3693c\",\"warning\":\"S:b1190e365a30adda620201e740ddc02473af0265\",\"error\":\"S:15a880eff67780e0463f67b60e6b07d9775eed06\",\"accessible\":\"S:a91ff4691bb8542cac2476c2c3814467615de36e\",\"success\":\"S:2056df159f822ce748c95ebf9fe2b6bb972a69b5\",\"onCta\":\"S:ac55e97349b9e40c23d222aa145ec88576f1df2a\",\"secondary\":\"S:de717f9726af82ed47e08c1fa3902c50036cebe4\",\"cta\":\"S:6738c59bfc778b400d7e1c1db54a21c8995129e6\",\"subtle\":\"S:7437a0d80d3c3ee978e9a593940970a19916e6d5\",\"onPrimary\":\"S:618d9edda908b725f9b068c592d69b278f9fad52\",\"onSecondary\":\"S:f0b1a1cd865c1e34af1d8e56c1fc506e669f06d7\",\"primary\":\"S:04dec82dfbe2e69ecc0438ebdb7b05712aeef23f\",\"alpha50\":\"S:09b1f8194902b22955013e4cadde19ade44c5eea\",\"alpha25\":\"S:38f038e80d6751af7aee827b2e2c484e51d680fb,\"},\"theme\":{\"primary\":{\"value\":\"{gray20}\",\"description\":\"The primary ui color\",\"stitches\":\"$gray20\"},\"secondary\":{\"value\":\"{gray600}\",\"description\":\"The color when its not needed to be primary\",\"stitches\":\"$gray600\"},\"cta\":{\"value\":\"{vividBlue100}\",\"description\":\"The color for call to action\",\"stitches\":\"$vividBlue100\"},\"disabled\":{\"value\":\"{alpha25}\",\"description\":\"The color when element is disabled\",\"stitches\":\"$alpha25\"},\"accessible\":{\"value\":\"{gray80}\",\"description\":\"The color when element is accessbile against the dark or light background\",\"stitches\":\"$gray80\"},\"subtle\":{\"value\":\"{gray300}\",\"description\":\"The color that is used to have a subtle sepration between elements\",\"stitches\":\"$gray300\"},\"error\":{\"value\":\"{red100}\",\"description\":\"The color for error status\",\"stitches\":\"$red100\"},\"success\":{\"value\":\"{green100}\",\"description\":\"The color for success status\",\"stitches\":\"$green100\"},\"warning\":{\"value\":\"{orange100}\",\"description\":\"The color for warning status\",\"stitches\":\"$orange100\"},\"signal\":{\"value\":\"{blue200}\",\"description\":\"The color to signal or focus the user attention\",\"stitches\":\"$blue200\"},\"onPrimary\":{\"value\":\"{gray600}\",\"description\":\"When elements are applied to Primary\",\"stitches\":\"$gray600\"},\"onSecondary\":{\"value\":\"{gray20}\",\"description\":\"When elements are applied to Secondary\",\"stitches\":\"$gray20\"},\"onCta\":{\"value\":\"{gray600}\",\"description\":\"When elements applied on CTA\",\"stitches\":\"$gray20\"},\"onDisabled\":{\"value\":\"{alpha50}\",\"description\":\"The color when element is on disabled\",\"stitches\":\"$alpha50\"},\"onMessage\":{\"value\":\"{gray600}\",\"description\":\"Used on signal, warning, error and success\",\"stitches\":\"$gray600\"}}},\"baseSize\":{\"value\":\"16px\"},\"size\":{\"100\":{\"value\":\"1rem\",\"description\":\"100% of the base value\"},\"110\":{\"value\":\"1.1rem\",\"description\":\"110% of the base value\"},\"125\":{\"value\":\"1.25rem\",\"description\":\"125% of the base value\"},\"150\":{\"value\":\"1.5rem\",\"description\":\"150% of the base value\"},\"175\":{\"value\":\"1.75rem\",\"description\":\"175% of the base value\"},\"200\":{\"value\":\"2rem\",\"description\":\"200% of the base value\"},\"225\":{\"value\":\"2.25rem\",\"description\":\"225% of the base value\"},\"250\":{\"value\":\"2.5rem\",\"description\":\"250% of the base value\"},\"275\":{\"value\":\"2.75rem\",\"description\":\"275% of the base value\"},\"300\":{\"value\":\"3rem\",\"description\":\"300% of the base value\"},\"350\":{\"value\":\"3.5rem\",\"description\":\"350% of the base value\"},\"400\":{\"value\":\"4rem\",\"description\":\"400% of the base value\"},\"450\":{\"value\":\"4.5rem\",\"description\":\"450% of the base value\"},\"500\":{\"value\":\"5rem\",\"description\":\"500% of the base value\"},\"description\":\"Defines the entire size scale\",\"025\":{\"value\":\"0.25rem\",\"description\":\"Our smallest size\"},\"050\":{\"value\":\"0.5rem\",\"description\":\"50% of the base value\"},\"075\":{\"value\":\"0.75rem\",\"description\":\"75% of the base value\"},\"087\":{\"value\":\"0.875rem\",\"description\":\"87.5% of the base value\"}},\"space\":{\"100\":{\"value\":\"{size.100}\"},\"125\":{\"value\":\"{size.125}\"},\"150\":{\"value\":\"{size.150}\"},\"175\":{\"value\":\"{size.175}\"},\"200\":{\"value\":\"{size.200}\"},\"225\":{\"value\":\"{size.225}\"},\"250\":{\"value\":\"{size.250}\"},\"275\":{\"value\":\"{size.275}\"},\"300\":{\"value\":\"{size.300}\"},\"350\":{\"value\":\"{size.350}\"},\"400\":{\"value\":\"{size.400}\"},\"450\":{\"value\":\"{size.450}\"},\"500\":{\"value\":\"{size.500}\"},\"description\":\"Inherits the base size value\",\"025\":{\"value\":\"{size.025}\"},\"050\":{\"value\":\"{size.050}\"},\"075\":{\"value\":\"{size.075}\"}},\"fonts\":{\"headline\":{\"value\":\"Postoni, garamond, serif\"},\"body\":{\"value\":\"georgia, Times New Roman, serif\"},\"meta\":{\"value\":\"Franklin, arial, sans-serif\"}},\"fontSize\":{\"100\":{\"value\":\"{size.100}\"},\"112\":{\"value\":\"1.125rem\"},\"125\":{\"value\":\"{size.125}\"},\"150\":{\"value\":\"{size.150}\"},\"175\":{\"value\":\"{size.175}\"},\"200\":{\"value\":\"{size.200}\"},\"225\":{\"value\":\"{size.225}\"},\"250\":{\"value\":\"{size.250}\"},\"275\":{\"value\":\"{size.275}\"},\"300\":{\"value\":\"{size.300}\"},\"350\":{\"value\":\"{size.350}\"},\"400\":{\"value\":\"{size.400}\"},\"450\":{\"value\":\"{size.450}\"},\"500\":{\"value\":\"{size.500}\"},\"description\":\"Inherits the base size value\",\"075\":{\"value\":\"{size.075}\"},\"087\":{\"value\":\"0.875rem\"}},\"fontWeights\":{\"light\":{\"value\":300},\"regular\":{\"value\":400},\"bold\":{\"value\":700}},\"lineHeight\":{\"100\":{\"value\":1},\"110\":{\"value\":1.1},\"125\":{\"value\":1.25},\"150\":{\"value\":1.5},\"160\":{\"value\":1.6},\"175\":{\"value\":1.75},\"200\":{\"value\":2},\"240\":{\"value\":2.4}},\"radii\":{\"100\":{\"value\":\"{size.100}\"},\"125\":{\"value\":\"{size.125}\"},\"150\":{\"value\":\"{size.150}\"},\"description\":\"Inherits the base size value\",\"012\":{\"value\":\"0.125rem\"},\"025\":{\"value\":\"{size.025}\"},\"050\":{\"value\":\"{size.050}\"},\"075\":{\"value\":\"{size.075}\"},\"round\":{\"value\":\"9999px\"}},\"shadow\":{\"50\":{\"value\":\"0px 2px 0px 0px #D5D5D5\",\"comment\":\"Shadow 1 - Card shadow\"},\"100\":{\"value\":\"0px 1px 2px 0px rgba(102, 102, 102, 0.25)\",\"comment\":\"Shadow 2 - Extra small base shadow\"},\"200\":{\"value\":\"0px 2px 4px 0px rgba(102, 102, 102, 0.25)\",\"comment\":\"Shadows 3 - Small\"},\"300\":{\"value\":\"0px 4px 8px 0px rgba(102, 102, 102, 0.25)\",\"comment\":\"Shadows 4 - Medium\"},\"400\":{\"value\":\"0px 8px 16px 0px rgba(102, 102, 102, 0.25)\",\"comment\":\"Shadows 5 - Large\"},\"500\":{\"value\":\"0px 16px 32px 0px rgba(102, 102, 102, 0.25)\",\"comment\":\"Shadows 6 - Extra large\"}},\"z-index\":{\"z-offer\":{\"value\":400,\"description\":\"This layer is reserved only for offers like paywalls, overlays etc\"},\"z-shell\":{\"value\":300,\"description\":\"This layer is reserved for shell items like the fixed primary nav\"},\"z-ads\":{\"value\":200,\"description\":\"This layer is reserved for ads not on page\"},\"z-page\":{\"value\":100,\"description\":\"Any content that is on that main page\"}},\"motion\":{\"duration\":{\"100\":{\"value\":\"0.1s\"},\"200\":{\"value\":\"0.2s\"},\"300\":{\"value\":\"0.3s\"},\"400\":{\"value\":\"0.4s\"},\"500\":{\"value\":\"0.5s\"}}}}");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDNEM7QUFDNUMsd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw4Q0FBUztBQUN2Qyw4QkFBOEIsOENBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsOENBQVM7QUFDdkMsOEJBQThCLDhDQUFTO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzXCIpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgdG9rZW5EYXRhIGZyb20gXCIuLi93cGRzLnRva2Vucy5qc29uXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDM2NSwgaGVpZ2h0OiA2MzQgfSk7XG5maWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgIH1cbn0pKTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGxldCBub2RlcztcbiAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgfVxuICAgIGVsc2UgaWYgKGZpZ21hLmN1cnJlbnRQYWdlLmNoaWxkcmVuICYmXG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICBub2RlcyA9IGZpZ21hLmN1cnJlbnRQYWdlLmNoaWxkcmVuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KFwi8J+ZjyAgUGxlYXNlIG1ha2UgYSBzZWxlY3Rpb25cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChtc2cudHlwZSkge1xuICAgICAgICBjYXNlIFwidG9nZ2xlXCI6XG4gICAgICAgICAgICBUb2dnbGVUaGVtZShub2RlcywgbXNnLm1vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59KTtcbmZ1bmN0aW9uIFRvZ2dsZVRoZW1lKG5vZGVzLCBtb2RlKSB7XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBhcHBseUNvbG9yKG5vZGUsIG1vZGUpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gYXBwbHlDb2xvcihub2RlLCBtb2RlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICBhcHBseUNvbG9yKGNoaWxkLCBtb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiQ09NUE9ORU5UXCIgfHxcbiAgICAgICAgICAgIFwiSU5TVEFOQ0VcIiB8fFxuICAgICAgICAgICAgXCJGUkFNRVwiIHx8XG4gICAgICAgICAgICBcIkdST1VQXCIgfHxcbiAgICAgICAgICAgIFwiRUxMSVBTRVwiIHx8XG4gICAgICAgICAgICBcIlBPTFlHT05cIiB8fFxuICAgICAgICAgICAgXCJSRUNUQU5HTEVcIiB8fFxuICAgICAgICAgICAgXCJTVEFSXCIgfHxcbiAgICAgICAgICAgIFwiTElORVwiIHx8XG4gICAgICAgICAgICBcIlRFWFRcIiB8fFxuICAgICAgICAgICAgXCJWRUNUT1JcIiB8fFxuICAgICAgICAgICAgXCJJTlNUQU5DRVwiKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5maWxsU3R5bGVJZCkge1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG5vZGUuZmlsbFN0eWxlSWQuc3BsaXQoXCI6XCIpWzFdO1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZVN1YiA9IHN0eWxlLnNwbGl0KFwiLFwiKVswXTtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGVJRCA9IHN0eWxlU3ViO1xuICAgICAgICAgICAgICAgIFNlbmRNZXNzYWdlKHN0eWxlSUQpO1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZUlEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTdHlsZSA9IHlpZWxkIGZpZ21hLmltcG9ydFN0eWxlQnlLZXlBc3luYyhzdHlsZUlEKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTdHlsZU5hbWUgPSBjdXJyZW50U3R5bGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbk5hbWUgPSBjdXJyZW50U3R5bGVOYW1lLnNwbGl0KFwiL1wiKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9tYXRjaGluZ1N0eWxlcyA9IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRva2VuRGF0YVtcImNvbG9yXCJdW1wibGlnaHRcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRva2VuRGF0YVtcImNvbG9yXCJdW1wiZGFya1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9tYXRjaGluZ1N0eWxlSUQgPSBfbWF0Y2hpbmdTdHlsZXNbdG9rZW5OYW1lXS5zcGxpdChcIjpcIilbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfbWF0Y2hlZFN0eWxlID0geWllbGQgZmlnbWEuaW1wb3J0U3R5bGVCeUtleUFzeW5jKF9tYXRjaGluZ1N0eWxlSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYXRjaGVkU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmZpbGxTdHlsZUlkID0gX21hdGNoZWRTdHlsZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnN0cm9rZVN0eWxlSWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBub2RlLnN0cm9rZVN0eWxlSWQuc3BsaXQoXCI6XCIpWzFdO1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZVN1YiA9IHN0eWxlLnNwbGl0KFwiLFwiKVswXTtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGVJRCA9IHN0eWxlU3ViO1xuICAgICAgICAgICAgICAgIFNlbmRNZXNzYWdlKHN0eWxlSUQpO1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZUlEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTdHlsZSA9IHlpZWxkIGZpZ21hLmltcG9ydFN0eWxlQnlLZXlBc3luYyhzdHlsZUlEKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTdHlsZU5hbWUgPSBjdXJyZW50U3R5bGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbk5hbWUgPSBjdXJyZW50U3R5bGVOYW1lLnNwbGl0KFwiL1wiKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9tYXRjaGluZ1N0eWxlcyA9IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRva2VuRGF0YVtcImNvbG9yXCJdW1wibGlnaHRcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRva2VuRGF0YVtcImNvbG9yXCJdW1wiZGFya1wiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9tYXRjaGluZ1N0eWxlSUQgPSBfbWF0Y2hpbmdTdHlsZXNbdG9rZW5OYW1lXS5zcGxpdChcIjpcIilbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfbWF0Y2hlZFN0eWxlID0geWllbGQgZmlnbWEuaW1wb3J0U3R5bGVCeUtleUFzeW5jKF9tYXRjaGluZ1N0eWxlSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9tYXRjaGVkU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnN0cm9rZVN0eWxlSWQgPSBfbWF0Y2hlZFN0eWxlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBTZW5kRXJyb3IoRXJyb3IpIHtcbiAgICB2YXIgbWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogXCJFcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiBFcnJvcixcbiAgICB9O1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xufVxuZnVuY3Rpb24gU2VuZE1lc3NhZ2UoRXJyb3IpIHtcbiAgICB2YXIgbWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogXCJEZWJ1Z1wiLFxuICAgICAgICBtZXNzYWdlOiBFcnJvcixcbiAgICB9O1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==