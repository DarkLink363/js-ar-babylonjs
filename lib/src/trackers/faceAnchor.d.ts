import { FaceTracker, FaceAnchor } from "@zappar/zappar";
import * as BABYLON from "babylonjs";
import { Camera } from "../index";
/**
 * A BABYLON.TransformNode which attaches content to a face as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
declare class FaceAnchorTransformNode extends BABYLON.TransformNode {
    private _camera;
    readonly faceTracker: FaceTracker;
    anchorId?: string | undefined;
    /**
     * A point in 3D space (including orientation) in a fixed location relative to a tracked object or environment.
     */
    currentAnchor: FaceAnchor | undefined;
    private readonly observer;
    /**
     * Constructs a new FaceAnchorGroup.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param faceTracker - The face tracker which will be used.
     * @param scene - A babylon scene.
     * @param anchorId - The anchorId which will define the current anchor.
     */
    constructor(name: string, _camera: Camera, faceTracker: FaceTracker, scene: BABYLON.Scene, anchorId?: string | undefined);
    private update;
    /**
     * Removes the observer.
     */
    dispose(): void;
}
export default FaceAnchorTransformNode;
