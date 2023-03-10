import * as BABYLON from "babylonjs";
import FaceMesh from "./face";
/**
 * A BABYLON.Mesh that fits the user's head and fills the depth buffer,
 * ensuring that the camera image shows instead of any 3D elements behind it in the scene.
 *
 * Works using a full-head ZapparBabylon.FaceMesh with the mouth, eyes and neck filled in.
 * Its zOffset is set to -0.1 to ensure it's rendered before any other objects in the scene,
 * and its material has the colorWrite property set to false so it fills the depth buffer but not the color buffer.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
declare class HeadMaskMesh extends FaceMesh {
    onLoad?: (() => void) | undefined;
    onError?: (() => void) | undefined;
    /**
     * Constructs a new head mask mesh.
     * @param name - The name of the mesh,
     * @param scene - A babylonjs scene.
     * @param onLoad - Callback function which runs when the mesh is loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     */
    constructor(name: string, scene: BABYLON.Scene, onLoad?: (() => void) | undefined, onError?: (() => void) | undefined);
}
export default HeadMaskMesh;
