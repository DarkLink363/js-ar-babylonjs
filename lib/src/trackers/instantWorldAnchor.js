"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-named-default */
/* eslint-disable no-unused-vars */
const BABYLON = require("babylonjs");
const camera_1 = require("../camera");
/**
 * A BABYLON.TransformNode which attaches content to a point on a surface in front of the user as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/threejs/instant-world-tracking/
 */
class InstantWorldAnchorTransformNode extends BABYLON.TransformNode {
    /**
     * Constructs a new InstantWorldAnchorTransformNode.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param instantTracker - The instant world tracker which will be used.
     * @param scene - A babylonjs scene.
     */
    constructor(name, _camera, instantTracker, scene) {
        super(name, scene);
        this._camera = _camera;
        this.instantTracker = instantTracker;
        this.update = () => {
            const sourcePose = this.instantTracker.anchor.pose(this._camera.rawPose, this._camera.currentMirrorMode === camera_1.CameraMirrorMode.Poses);
            const sourceMatrix = BABYLON.Matrix.FromArray(sourcePose);
            if (!this.getScene().useRightHandedSystem)
                sourceMatrix.toggleModelMatrixHandInPlace();
            const rotation = new BABYLON.Quaternion();
            sourceMatrix.decompose(this.scaling, rotation, this.position);
            this.rotation.copyFrom(rotation.toEulerAngles());
            this.freezeWorldMatrix(sourceMatrix);
        };
        const engine = this.getEngine();
        this.observer = scene.onBeforeRenderObservable.add(this.update);
    }
    /**
     * Sets the point in the user's environment that the anchor tracks from.
     *
     * The parameters passed in to this function correspond to the X, Y and Z coordinates (in camera space) of the point to track.
     * Choosing a position with X and Y coordinates of zero, and a negative Z coordinate,
     * will select a point on a surface directly in front of the center of the screen.
     *
     * @param orientation -  The orientation of the point in space.
     */
    setAnchorPoseFromCameraOffset(x, y, z, orientation) {
        this.instantTracker.setAnchorPoseFromCameraOffset(x, y, z, orientation);
    }
    /**
     * Removes the observer.
     */
    dispose() {
        this._scene.onBeforeRenderObservable.remove(this.observer);
    }
}
exports.default = InstantWorldAnchorTransformNode;
