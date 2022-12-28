import * as BABYLON from "babylonjs";
import { InstantWorldTracker } from "@zappar/zappar";
import { InstantWorldTrackerTransformOrigin } from "@zappar/zappar/lib/instantworldtracker";
import { default as Camera } from "../camera";
/**
 * A BABYLON.TransformNode which attaches content to a point on a surface in front of the user as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/threejs/instant-world-tracking/
 */
declare class InstantWorldAnchorTransformNode extends BABYLON.TransformNode {
    private _camera;
    readonly instantTracker: InstantWorldTracker;
    private readonly observer;
    /**
     * Constructs a new InstantWorldAnchorTransformNode.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param instantTracker - The instant world tracker which will be used.
     * @param scene - A babylonjs scene.
     */
    constructor(name: string, _camera: Camera, instantTracker: InstantWorldTracker, scene: BABYLON.Scene);
    private update;
    /**
     * Sets the point in the user's environment that the anchor tracks from.
     *
     * The parameters passed in to this function correspond to the X, Y and Z coordinates (in camera space) of the point to track.
     * Choosing a position with X and Y coordinates of zero, and a negative Z coordinate,
     * will select a point on a surface directly in front of the center of the screen.
     *
     * @param orientation -  The orientation of the point in space.
     */
    setAnchorPoseFromCameraOffset(x: number, y: number, z: number, orientation?: InstantWorldTrackerTransformOrigin): void;
    /**
     * Removes the observer.
     */
    dispose(): void;
}
export default InstantWorldAnchorTransformNode;
