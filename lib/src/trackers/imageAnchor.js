"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-named-default */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const BABYLON = require("babylonjs");
const camera_1 = require("../camera");
/**
 * A BABYLON.TransformNode which attaches content to a known image as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/image-tracking/
 */
class ImageAnchorTransformNode extends BABYLON.TransformNode {
    /**
     * Constructs a new ImageAnchorGroup.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param imageTracker - The image tracker which will be used.
     * @param anchorId - The anchorId which will define the current anchor.
     * @param scene - A babylonjs scene.
     */
    constructor(name, _camera, imageTracker, scene, anchorId) {
        super(name, scene);
        this._camera = _camera;
        this.imageTracker = imageTracker;
        this.anchorId = anchorId;
        this.update = () => {
            if (!this.currentAnchor || !this.imageTracker.visible.has(this.currentAnchor)) {
                // No current anchor, or current anchor isn't visible
                if (this.anchorId) {
                    this.currentAnchor = this.imageTracker.anchors.get(this.anchorId);
                }
                else {
                    this.currentAnchor = this.imageTracker.visible.values().next().value;
                }
            }
            if (this.currentAnchor) {
                const sourcePose = this.currentAnchor.pose(this._camera.rawPose, this._camera.currentMirrorMode === camera_1.CameraMirrorMode.Poses);
                const sourceMatrix = BABYLON.Matrix.FromArray(sourcePose);
                if (!this.getScene().useRightHandedSystem)
                    sourceMatrix.toggleModelMatrixHandInPlace();
                const rotation = new BABYLON.Quaternion();
                sourceMatrix.decompose(this.scaling, rotation, this.position);
                this.rotation.copyFrom(rotation.toEulerAngles());
                this.freezeWorldMatrix(sourceMatrix);
            }
        };
        const engine = this.getEngine();
        this.observer = scene.onBeforeRenderObservable.add(this.update);
    }
    /**
     * Removes the observer.
     */
    dispose() {
        this._scene.onBeforeRenderObservable.remove(this.observer);
    }
}
exports.default = ImageAnchorTransformNode;
