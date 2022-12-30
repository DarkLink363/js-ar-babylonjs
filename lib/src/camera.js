"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraMirrorMode = exports.CameraPoseMode = void 0;
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const Zappar = require("@zappar/zappar");
const BABYLON = require("babylonjs");
const defaultpipeline_1 = require("./defaultpipeline");
/**
 * The pose modes that may be used for the camera to move around in the scene.
 */
var CameraPoseMode;
(function (CameraPoseMode) {
    /**
     * Camera sits, stationary, at the origin of world space, and points down the negative Z axis.
     * In this mode, tracked anchors move in world space as the user moves the device or tracked objects in the real world.
     */
    CameraPoseMode[CameraPoseMode["Default"] = 0] = "Default";
    /**
     * Camera sits at the origin of world space, but rotates as the user rotates the physical device.
     *
     * When the Zappar library initializes, the negative Z axis of world space points forward in front of the user.
     *
     * In this mode, tracked anchors move in world space as the user moves the device or tracked objects in the real world.
     */
    CameraPoseMode[CameraPoseMode["Attitude"] = 1] = "Attitude";
    /**
     * In this case the camera moves and rotates in world space around the anchor at the origin.
     */
    CameraPoseMode[CameraPoseMode["AnchorOrigin"] = 2] = "AnchorOrigin";
})(CameraPoseMode = exports.CameraPoseMode || (exports.CameraPoseMode = {}));
/**
 * The mirror modes that may be used.
 */
var CameraMirrorMode;
(function (CameraMirrorMode) {
    /**
     * No mirroring.
     */
    CameraMirrorMode[CameraMirrorMode["None"] = 0] = "None";
    /**
     * This mode mirrors the background camera texture and ensures content still appears correctly tracked.
     * In this mode your content itself isn't flipped, so any text in your tracked content doesn't appear mirrored.
     * This is the default mode for the user-facing camera.
     */
    CameraMirrorMode[CameraMirrorMode["Poses"] = 1] = "Poses";
    /**
     * In this mode, the Zappar camera applies a scaleX(-1) CSS transform to your whole canvas.
     * This way both the camera and your content appear mirrored.
     */
    CameraMirrorMode[CameraMirrorMode["CSS"] = 2] = "CSS";
})(CameraMirrorMode = exports.CameraMirrorMode || (exports.CameraMirrorMode = {}));
/**
 * Creates a camera that you can use instead of a Babylon.js camera.
 *
 *
 * The ZapparBabylon library needs to use your WebGL context in order to process camera frames.
 * You can set it when your page loads using {@link glContextSet}.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/camera-setup/
 */
class Camera extends BABYLON.FreeCamera {
    /**
     * Constructs a new Camera.
     * @param name - The name of the camera.
     * @param scene - A Babylon scene.
     * @param pipeline - The pipeline that this tracker will operate within.
     * @property pipeline - The pipeline that this tracker will operate within.
     * @property zNear - The near clipping plane.
     * @property zFar - The far clipping plane.
     * @property rearCameraSource? - The camera source which will be used for the rear camera.
     * @property userCameraSource? - The camera source which will be used for the user camera.
     */
    constructor(name, scene, opts) {
        super(name, new BABYLON.Vector3(0, 0, 0), scene);
        /**
         * The pose mode that is used for the camera to move around in the scene.
         */
        this.poseMode = CameraPoseMode.Default;
        /**
         * The mirror mode that is used for the rear camera.
         */
        this.rearCameraMirrorMode = CameraMirrorMode.None;
        /**
         * The mirror mode that is used for the user camera.
         */
        this.userCameraMirrorMode = CameraMirrorMode.Poses;
        this._currentMirrorMode = CameraMirrorMode.None;
        this._cameraRunningRear = null;
        this._hasSetCSSScaleX = false;
        this.ready = false;
        this._engine = scene.getEngine();
        this._gl = this._engine._gl;
        this.backgroundTexture = new BABYLON.Texture(null, scene);
        this.layer = new BABYLON.Layer("zapparCameraBackgroundLayer", null, scene);
        this.layer.texture = this.backgroundTexture;
        this.layer.isBackground = true;
        this.pipeline = opts instanceof Zappar.Pipeline ? opts : (opts === null || opts === void 0 ? void 0 : opts.pipeline) || (0, defaultpipeline_1.getDefaultPipeline)();
        this.pipeline.glContextSet(this._gl);
        this.rawPose = this.pipeline.cameraPoseDefault();
        if (opts && !(opts instanceof Zappar.Pipeline)) {
            this.zNear = opts.zNear ? opts.zNear : 0.1;
            this.zFar = opts.zFar ? opts.zFar : 100;
            this.rearCameraSource = this._cameraSourceFromOpts(opts.rearCameraSource);
            this.userCameraSource = this._cameraSourceFromOpts(opts.userCameraSource, true);
        }
        else {
            this.rearCameraSource = new defaultpipeline_1.CameraSource(Zappar.cameraDefaultDeviceID(), this.pipeline);
            this.userCameraSource = new defaultpipeline_1.CameraSource(Zappar.cameraDefaultDeviceID(true), this.pipeline);
        }
        document.addEventListener("visibilitychange", () => {
            document.visibilityState === "visible" ? this._resume() : this._pause();
        });
    }
    _cameraSourceFromOpts(cameraSource, frontFacing = false) {
        return cameraSource instanceof Element
            ? new Zappar.HTMLElementSource(this.pipeline, cameraSource)
            : new defaultpipeline_1.CameraSource(cameraSource || Zappar.cameraDefaultDeviceID(frontFacing), this.pipeline);
    }
    _pause() {
        this.userCameraSource.pause();
        this.rearCameraSource.pause();
    }
    /**
     * Starts the camera source.
     *
     * Starting a given source pauses any other sources within the same pipeline.
     */
    _resume() {
        if (this._cameraRunningRear === null)
            return;
        this._cameraRunningRear ? this.rearCameraSource.start() : this.userCameraSource.start();
    }
    /**
     * Starts the camera source.
     * @param userFacing - If true, starts the user facing camera. (i.e selfie).
     */
    start(userFacing) {
        userFacing ? this.userCameraSource.start() : this.rearCameraSource.start();
        this._cameraRunningRear = !userFacing;
    }
    /**
     * Sets the pose mode to 'Anchor Origin'.
     *
     * In this case the camera moves and rotates in world space around the anchor at the origin.
     * @param anchor - Image anchor or face anchor.
     */
    setPoseModeAnchorOrigin(a) {
        this.poseAnchorOrigin = a;
        this.poseMode = CameraPoseMode.AnchorOrigin;
    }
    /**
     * Gets current mirror mode.
     */
    get currentMirrorMode() {
        return this._currentMirrorMode;
    }
    _updateLayerTexture() {
        var _a;
        this.pipeline.processGL();
        this.pipeline.cameraFrameUploadGL();
        this.pipeline.frameUpdate();
        const webglTexture = this.pipeline.cameraFrameTextureGL();
        if (webglTexture === undefined)
            return;
        if (!this.ready) {
            // if (this._engine.wrapWebGLTexture) {
            //     // babylon 5
            //     const wrappedTexture = this._engine.wrapWebGLTexture(webglTexture);
            //     this.layer.texture._texture = wrappedTexture;
            // }
            // else {
            //     // babylon 4
            //     const internalTexture = new BABYLON.InternalTexture(this._engine, BABYLON.InternalTextureSource.Unknown, true);
            //     internalTexture._webGLTexture = webglTexture;
            //     internalTexture.isReady = true;
            //     this.layer.texture._texture = internalTexture;
            // }
            this.ready = true;
        }
        const view = this.pipeline.cameraFrameTextureMatrix(this._engine.getRenderWidth(), this._engine.getRenderHeight(), this._currentMirrorMode === CameraMirrorMode.Poses);
        const zapparViewMatrix = BABYLON.Matrix.FromArray(view);
        zapparViewMatrix.m[8] = view[12];
        zapparViewMatrix.m[9] = view[13];
        (_a = this.layer.texture) === null || _a === void 0 ? void 0 : _a.getTextureMatrix().copyFrom(zapparViewMatrix);
    }
    _getOriginPose() {
        if (!this.poseAnchorOrigin)
            return this.pipeline.cameraPoseDefault();
        return this.pipeline.cameraPoseWithOrigin(this.poseAnchorOrigin.poseCameraRelative(this._currentMirrorMode === CameraMirrorMode.Poses));
    }
    /**
     * Destroys the camera sources.
     */
    dispose() {
        this.rearCameraSource.destroy();
        this.userCameraSource.destroy();
    }
    /**
     * Processes camera frames and updates `backgroundTexture`.
     * Call this function on your pipeline once an animation frame (e.g. during your `requestAnimationFrame` function).
     */
    updateFrame() {
        this._updateLayerTexture();
        this._currentMirrorMode = this.pipeline.cameraFrameUserFacing() ? this.userCameraMirrorMode : this.rearCameraMirrorMode;
        if (this._currentMirrorMode !== CameraMirrorMode.CSS && this._hasSetCSSScaleX) {
            this._gl.canvas.style.transform = "";
            this._hasSetCSSScaleX = false;
        }
        else if (this._currentMirrorMode === CameraMirrorMode.CSS && !this._hasSetCSSScaleX) {
            this._gl.canvas.style.transform = "scaleX(-1)";
            this._hasSetCSSScaleX = true;
        }
        this.updateProjectionMatrix();
        switch (this.poseMode) {
            case CameraPoseMode.Default:
                this.rawPose = this.pipeline.cameraPoseDefault();
                break;
            case CameraPoseMode.Attitude:
                this.rawPose = this.pipeline.cameraPoseWithAttitude(this._currentMirrorMode === CameraMirrorMode.Poses);
                break;
            case CameraPoseMode.AnchorOrigin:
                this.rawPose = this.poseAnchorOrigin ? this._getOriginPose() : this.pipeline.cameraPoseDefault();
                break;
            default:
                this.rawPose = this.pipeline.cameraPoseDefault();
                break;
        }
        const sourceMatrix = BABYLON.Matrix.FromArray(this.rawPose);
        if (!this.getScene().useRightHandedSystem)
            sourceMatrix.toggleModelMatrixHandInPlace();
        const rotMatrix = sourceMatrix.getRotationMatrix();
        const rotation = new BABYLON.Quaternion().fromRotationMatrix(rotMatrix);
        const pos = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), sourceMatrix);
        this.rotation.copyFrom(rotation.toEulerAngles());
        this.position.copyFrom(pos);
    }
    /**
     * Updates the projection matrix.
     */
    updateProjectionMatrix() {
        const model = this.pipeline.cameraModel();
        const projection = Zappar.projectionMatrixFromCameraModel(model, this._engine.getRenderWidth(), this._engine.getRenderHeight(), this.zNear, this.zFar);
        if (this.getScene().useRightHandedSystem)
            projection[0] *= -1;
        const projectionMatrix = BABYLON.Matrix.FromArray(projection);
        projectionMatrix.toggleProjectionMatrixHandInPlace();
        this._projectionMatrix.copyFrom(projectionMatrix);
    }
    /**
     * @returns - the projection matrix.
     */
    getProjectionMatrix() {
        if (this.updateInternally) {
            this.updateFrame();
        }
        return this._projectionMatrix;
    }
}
exports.default = Camera;
