"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadMaskMeshLoader = void 0;
const headmask_1 = require("../mesh/headmask");
/**
 * Head mask mesh loader.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class HeadMaskMeshLoader {
    /**
     * Constructs a new HeadMaskMeshLoader.
     * @param name - The name of the mesh.
     * @param scene - A scene.
     */
    constructor(name, scene) {
        this.name = name;
        this.scene = scene;
    }
    /**
     * Loads a HeadMaskMesh.
     * @param onLoad - Callback which returns the HeadMaskMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The HeadMaskMesh.
     */
    load(onLoad, onError) {
        return new headmask_1.default(this.name, this.scene, onLoad, onError);
    }
}
exports.HeadMaskMeshLoader = HeadMaskMeshLoader;
exports.default = HeadMaskMeshLoader;
