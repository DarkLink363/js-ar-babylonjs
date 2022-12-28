import * as BABYLON from "babylonjs";
import Camera from "./camera";
declare class CameraEnvironmentMap {
    private zapparCamera;
    private sphereTransformNode;
    private probe;
    private material;
    /**
     * Constructs a new Camera Environment Map.
     * @param zapparCamera - The Zappar camera.
     * @param engine - The Babylon engine.
     * @param size - Defines the texture resolution (for each face)
     * @param refreshRate - Sets the refresh rate to use (`RenderTargetTexture.REFRESHRATE_RENDER_ONEVERYFRAME` by default).
     */
    constructor(zapparCamera: Camera, engine: BABYLON.Engine, size?: number, refreshRate?: number);
    /**
     * @returns The resulting map texture. Set this as your `scene.environmentTexture` or as a material's `environmentTexture`.
     */
    get cubeTexture(): BABYLON.BaseTexture;
    /**
     * Destroy the resources held by this object.
     */
    dispose(): void;
    /**
     * Update the contents of the environment map with the latest texture from the camera.
     *
     * Call this each frame after you call `update` on your Zappar camera, but before you render the scene.
     */
    update(): void;
}
export default CameraEnvironmentMap;
