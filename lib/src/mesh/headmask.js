"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const BABYLON = require("babylonjs");
const face_1 = require("./face");
/**
 * A BABYLON.Mesh that fits the user's head and fills the depth buffer,
 * ensuring that the camera image shows instead of any 3D elements behind it in the scene.
 *
 * Works using a full-head ZapparBabylon.FaceMesh with the mouth, eyes and neck filled in.
 * Its zOffset is set to -0.1 to ensure it's rendered before any other objects in the scene,
 * and its material has the colorWrite property set to false so it fills the depth buffer but not the color buffer.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class HeadMaskMesh extends face_1.default {
    /**
     * Constructs a new head mask mesh.
     * @param name - The name of the mesh,
     * @param scene - A babylonjs scene.
     * @param onLoad - Callback function which runs when the mesh is loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     */
    constructor(name, scene, onLoad, onError) {
        super(name, scene);
        this.onLoad = onLoad;
        this.onError = onError;
        const material = new BABYLON.StandardMaterial("mat", scene);
        material.disableColorWrite = true;
        material.zOffset = -0.1;
        this.renderingGroupId = 0;
        material.backFaceCulling = false;
        this.material = material;
        this._faceMesh
            .loadDefaultFullHeadSimplified(true, true, true, true)
            .then(() => { var _a; return (_a = this.onLoad) === null || _a === void 0 ? void 0 : _a.call(this); })
            .catch(() => { var _a; return (_a = this.onError) === null || _a === void 0 ? void 0 : _a.call(this); });
    }
}
exports.default = HeadMaskMesh;
