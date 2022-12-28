import * as BABYLON from "babylonjs";
import { ImageTracker, ImageAnchor } from "@zappar/zappar";
import { default as Camera } from "../camera";
/**
 * A BABYLON.TransformNode which attaches content to a known image as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/image-tracking/
 */
declare class ImageAnchorTransformNode extends BABYLON.TransformNode {
    private _camera;
    readonly imageTracker: ImageTracker;
    anchorId?: string | undefined;
    /**
     * A point in 3D space (including orientation) in a fixed location relative to a tracked object or environment.
     */
    currentAnchor: ImageAnchor | undefined;
    private readonly observer;
    /**
     * Constructs a new ImageAnchorGroup.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param imageTracker - The image tracker which will be used.
     * @param anchorId - The anchorId which will define the current anchor.
     * @param scene - A babylonjs scene.
     */
    constructor(name: string, _camera: Camera, imageTracker: ImageTracker, scene: BABYLON.Scene, anchorId?: string | undefined);
    private update;
    /**
     * Removes the observer.
     */
    dispose(): void;
}
export default ImageAnchorTransformNode;
