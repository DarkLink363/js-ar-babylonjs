"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
const camera_1 = require("../camera");
/**
 * A BABYLON.TransformNode which attaches content to a face as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class FaceAnchorTransformNode extends BABYLON.TransformNode {
    /**
     * Constructs a new FaceAnchorGroup.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param faceTracker - The face tracker which will be used.
     * @param scene - A babylon scene.
     * @param anchorId - The anchorId which will define the current anchor.
     */
    constructor(name, _camera, faceTracker, scene, anchorId) {
        super(name, scene);
        this._camera = _camera;
        this.faceTracker = faceTracker;
        this.anchorId = anchorId;
        this.update = () => {
            if (!this.currentAnchor || !this.faceTracker.visible.has(this.currentAnchor)) {
                // No current anchor, or current anchor isn't visible
                if (this.anchorId) {
                    this.currentAnchor = this.faceTracker.anchors.get(this.anchorId);
                }
                else {
                    this.currentAnchor = this.faceTracker.visible.values().next().value;
                }
            }
            if (this.currentAnchor) {
                const sourcePose = this.currentAnchor.pose(this._camera.rawPose, this._camera.currentMirrorMode === camera_1.CameraMirrorMode.Poses); // todo: Last arg could be a method in camera
                const sourceMatrix = BABYLON.Matrix.FromArray(sourcePose);
                if (!this.getScene().useRightHandedSystem)
                    sourceMatrix.toggleModelMatrixHandInPlace();
                const rotation = new BABYLON.Quaternion();
                sourceMatrix.decompose(this.scaling, rotation, this.position);
                this.rotation.copyFrom(rotation.toEulerAngles());
                this.freezeWorldMatrix(sourceMatrix);
            }
        };
        this.observer = scene.onBeforeRenderObservable.add(this.update);
    }
    /**
     * Removes the observer.
     */
    dispose() {
        this._scene.onBeforeRenderObservable.remove(this.observer);
    }
}
exports.default = FaceAnchorTransformNode;
