import { FaceTracker, FaceAnchor, FaceLandmarkName, FaceLandmark } from "@zappar/zappar";
import * as BABYLON from "babylonjs";
import { Camera } from "../index";
/**
 * A BABYLON.TransformNode which attaches content to a known point (landmark) on a face as it moves around in the camera view.
 * Landmarks will remain accurate, even as the user's expression changes.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
declare class FaceLandmarkTransformNode extends BABYLON.TransformNode {
    private _camera;
    readonly faceTracker: FaceTracker;
    currentAnchor: FaceAnchor | undefined;
    landmark: FaceLandmark;
    private _pose;
    private readonly observer;
    /**
     * Constructs a new FaceLandmarkGroup.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param faceTracker - The face tracker which will be used.
     * @param landmark - The landmark to which the group will be anchored.
     * @param scene - A babylonjs scene.
     */
    constructor(name: string, _camera: Camera, faceTracker: FaceTracker, landmark: FaceLandmarkName, scene: BABYLON.Scene);
    private update;
    /**
     * Destroys the face landmark.
     */
    dispose(): void;
}
export default FaceLandmarkTransformNode;
