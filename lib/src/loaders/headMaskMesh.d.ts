import * as BABYLON from "babylonjs";
import HeadMaskMesh from "../mesh/headmask";
/**
 * Head mask mesh loader.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
export declare class HeadMaskMeshLoader {
    private name;
    scene: BABYLON.Scene;
    /**
     * Constructs a new HeadMaskMeshLoader.
     * @param name - The name of the mesh.
     * @param scene - A scene.
     */
    constructor(name: string, scene: BABYLON.Scene);
    /**
     * Loads a HeadMaskMesh.
     * @param onLoad - Callback which returns the HeadMaskMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The HeadMaskMesh.
     */
    load(onLoad?: () => void, onError?: () => void): HeadMaskMesh;
}
export default HeadMaskMeshLoader;
