"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const zappar_1 = require("@zappar/zappar");
const BABYLON = require("babylonjs");
const gl_matrix_1 = require("gl-matrix");
const camera_1 = require("../camera");
/**
 * A BABYLON.TransformNode which attaches content to a known point (landmark) on a face as it moves around in the camera view.
 * Landmarks will remain accurate, even as the user's expression changes.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class FaceLandmarkTransformNode extends BABYLON.TransformNode {
    /**
     * Constructs a new FaceLandmarkGroup.
     * @param name - The name of the transform node.
     * @param camera - A ZapparBabylon.Camera.
     * @param faceTracker - The face tracker which will be used.
     * @param landmark - The landmark to which the group will be anchored.
     * @param scene - A babylonjs scene.
     */
    constructor(name, _camera, faceTracker, landmark, scene) {
        super(name, scene);
        this._camera = _camera;
        this.faceTracker = faceTracker;
        this._pose = gl_matrix_1.mat4.create();
        // TODO: migrate this into computeWorldMatrix
        this.update = () => {
            if (!this.currentAnchor || !this.faceTracker.visible.has(this.currentAnchor)) {
                // No current anchor, or current anchor isn't visible
                this.currentAnchor = this.faceTracker.visible.values().next().value;
            }
            if (this.currentAnchor) {
                this.landmark.updateFromFaceAnchor(this.currentAnchor, this._camera.currentMirrorMode === camera_1.CameraMirrorMode.Poses);
                gl_matrix_1.mat4.multiply(this._pose, this.currentAnchor.pose(this._camera.rawPose, this._camera.currentMirrorMode === camera_1.CameraMirrorMode.Poses), this.landmark.pose);
                const sourceMatrix = BABYLON.Matrix.FromArray(this._pose);
                if (!this.getScene().useRightHandedSystem)
                    sourceMatrix.toggleModelMatrixHandInPlace();
                const rotation = new BABYLON.Quaternion();
                sourceMatrix.decompose(this.scaling, rotation, this.position);
                this.rotation.copyFrom(rotation.toEulerAngles());
                this.freezeWorldMatrix(sourceMatrix);
            }
        };
        const engine = this.getEngine();
        this.landmark = new zappar_1.FaceLandmark(landmark);
        this.observer = scene.onBeforeRenderObservable.add(this.update);
    }
    /**
     * Destroys the face landmark.
     */
    dispose() {
        this.landmark.destroy();
        this._scene.onBeforeRenderObservable.remove(this.observer);
    }
}
exports.default = FaceLandmarkTransformNode;
