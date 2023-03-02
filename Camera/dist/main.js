/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./src/renderer.ts\");\n\r\nconst canvas = document.getElementById(\"gpx-main\");\r\nconst renderer = new _renderer__WEBPACK_IMPORTED_MODULE_0__.Renderer(canvas);\r\nrenderer.Initialize();\r\n\n\n//# sourceURL=webpack://npm-test/./src/main.ts?");

/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var _shader_wgsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shader.wgsl */ \"./src/shader.wgsl\");\n/* harmony import */ var _triangle_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triangle_mesh */ \"./src/triangle_mesh.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\nclass Renderer {\r\n    constructor(canvas) {\r\n        this.canvas = canvas;\r\n    }\r\n    Initialize() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.setupDevice();\r\n            this.createAssets();\r\n            yield this.makePipeline();\r\n            this.render();\r\n        });\r\n    }\r\n    setupDevice() {\r\n        var _a, _b;\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            //adapter: wrapper around (physical) GPU.\r\n            //Describes features and limits\r\n            this.adapter = (yield ((_a = navigator.gpu) === null || _a === void 0 ? void 0 : _a.requestAdapter()));\r\n            //device: wrapper around GPU functionality\r\n            //Function calls are made through the device\r\n            this.device = (yield ((_b = this.adapter) === null || _b === void 0 ? void 0 : _b.requestDevice()));\r\n            //context: similar to vulkan instance (or OpenGL context)\r\n            this.context = this.canvas.getContext(\"webgpu\");\r\n            this.format = \"bgra8unorm\";\r\n            this.context.configure({\r\n                device: this.device,\r\n                format: this.format,\r\n                alphaMode: \"opaque\"\r\n            });\r\n        });\r\n    }\r\n    makePipeline() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const bindGroupLayout = this.device.createBindGroupLayout({\r\n                entries: [],\r\n            });\r\n            this.bindGroup = this.device.createBindGroup({\r\n                layout: bindGroupLayout,\r\n                entries: []\r\n            });\r\n            const pipelineLayout = this.device.createPipelineLayout({\r\n                bindGroupLayouts: [bindGroupLayout]\r\n            });\r\n            this.pipeline = this.device.createRenderPipeline({\r\n                vertex: {\r\n                    module: this.device.createShaderModule({\r\n                        code: _shader_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n                    }),\r\n                    entryPoint: \"v_main\",\r\n                    buffers: [this.triangleMesh.bufferlayout,]\r\n                },\r\n                fragment: {\r\n                    module: this.device.createShaderModule({\r\n                        code: _shader_wgsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n                    }),\r\n                    entryPoint: \"f_main\",\r\n                    targets: [{\r\n                            format: this.format\r\n                        }]\r\n                },\r\n                primitive: {\r\n                    topology: \"triangle-list\"\r\n                },\r\n                layout: pipelineLayout\r\n            });\r\n        });\r\n    }\r\n    createAssets() {\r\n        this.triangleMesh = new _triangle_mesh__WEBPACK_IMPORTED_MODULE_1__.Trianglemesh(this.device);\r\n    }\r\n    render() {\r\n        //command encoder: records draw commands for submission\r\n        const commandEncoder = this.device.createCommandEncoder();\r\n        //texture view: image view to the color buffer in this case\r\n        const textureView = this.context.getCurrentTexture().createView();\r\n        //renderpass: holds draw commands, allocated from command encoder\r\n        const renderpass = commandEncoder.beginRenderPass({\r\n            colorAttachments: [{\r\n                    view: textureView,\r\n                    clearValue: { r: 0.2, g: 0.3, b: 0.5, a: 1.0 },\r\n                    loadOp: \"clear\",\r\n                    storeOp: \"store\"\r\n                }]\r\n        });\r\n        renderpass.setPipeline(this.pipeline);\r\n        renderpass.setVertexBuffer(0, this.triangleMesh.buffer);\r\n        renderpass.setBindGroup(0, this.bindGroup);\r\n        renderpass.draw(3, 1, 0, 0);\r\n        renderpass.end();\r\n        this.device.queue.submit([commandEncoder.finish()]);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://npm-test/./src/renderer.ts?");

/***/ }),

/***/ "./src/triangle_mesh.ts":
/*!******************************!*\
  !*** ./src/triangle_mesh.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Trianglemesh\": () => (/* binding */ Trianglemesh)\n/* harmony export */ });\nclass Trianglemesh {\r\n    constructor(device) {\r\n        const vertices = new Float32Array([\r\n            0.0, 0.5, 0.5, 0.5, 0.0, 0.0,\r\n            0.0, -0.5, -0.5, 0.0, 1.0, 0.0,\r\n            0.0, 0.5, -0.5, 1.0, 1.0, 0.0\r\n        ]);\r\n        //用device去分配buffer\r\n        const usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;\r\n        const descriptor = {\r\n            size: 1024,\r\n            usage: usage,\r\n            mappedAtCreation: true //有些内存是属于cpu的，通过ts可以直接访问，而有些内存是设备本地的，这些高速内存不能被ts访问，为了把这些buffer送到本地的内存，我们要先把buffer送到cpu可以访问的内存，再通过cpu送到GPU中不可以访问的内存。\r\n        };\r\n        this.buffer = device.createBuffer(descriptor);\r\n        //需要复制buffer的内存\r\n        new Float32Array(this.buffer.getMappedRange()).set(vertices); //返回一个带有gpubuffer信息的数组buffer,可以被写入\r\n        this.buffer.unmap();\r\n        this.bufferlayout = {\r\n            arrayStride: 24,\r\n            attributes: [\r\n                {\r\n                    shaderLocation: 0,\r\n                    format: \"float32x3\",\r\n                    offset: 0 //在shader中position的位置为0,从第0个比特开始读\r\n                },\r\n                {\r\n                    shaderLocation: 1,\r\n                    format: \"float32x2\",\r\n                    offset: 3 * 4 //position一共有8个字节，要读取color的字节，要从第八位开始读。\r\n                }\r\n            ]\r\n        };\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://npm-test/./src/triangle_mesh.ts?");

/***/ }),

/***/ "./src/shader.wgsl":
/*!*************************!*\
  !*** ./src/shader.wgsl ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"struct TransformData{\\r\\n    model: mat4x4<f32>,\\r\\n    view: mat4x4<f32>,\\r\\n    projection: mat4x4<f32>\\r\\n};\\r\\n@binding(0)@group(0) var<uniform> transformUBO:TransformData;\\r\\n\\r\\nstruct Fragment{\\r\\n    @builtin(position) Position:  vec4<f32>,\\r\\n    @location(0) Color:  vec4<f32>\\r\\n};\\r\\n\\r\\n@vertex\\r\\nfn v_main(@location(0)vertexPosition:vec3<f32>,@location(1) vertexColor:vec3<f32>) -> Fragment {\\r\\n    var output : Fragment;\\r\\n    output.Position=vec4<f32>(vertexPosition,1.0);\\r\\n    output.Color=vec4<f32>(vertexColor,1.0);\\r\\n    return output;\\r\\n}\\r\\n\\r\\n@fragment\\r\\nfn f_main(@location(0) Color:vec4<f32>)->@location(0) vec4<f32>{\\r\\n    return Color;\\r\\n}\");\n\n//# sourceURL=webpack://npm-test/./src/shader.wgsl?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;