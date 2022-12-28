import * as BABYLON from "babylonjs";
import { ImageTarget } from "@zappar/zappar/lib/imagetracker";
/**
 * A BABYLON.mesh which  fits to the target image.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/image-tracking/
 */
declare class TargetImagePreviewMesh extends BABYLON.Mesh {
    private imageTarget;
    private vertexData;
    /**
     * Constructs a new TargetImagePreviewMesh.
     * @param name - The name of the face mesh,
     * @param scene - A babylon scene.
     * @param imageTarget - The image target which will be used.
     */
    constructor(name: string, scene: BABYLON.Scene, imageTarget: ImageTarget);
    /**
     * @ignore
     */
    private update;
}
export default TargetImagePreviewMesh;
