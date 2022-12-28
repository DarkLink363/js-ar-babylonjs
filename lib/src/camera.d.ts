import * as Zappar from "@zappar/zappar";
import * as BABYLON from "babylonjs";
import { InstantWorldAnchor } from "@zappar/zappar/lib/instantworldtracker";
import { CameraSource } from "./defaultpipeline";
/**
 * The pose modes that may be used for the camera to move around in the scene.
 */
export declare enum CameraPoseMode {
    /**
     * Camera sits, stationary, at the origin of world space, and points down the negative Z axis.
     * In this mode, tracked anchors move in world space as the user moves the device or tracked objects in the real world.
     */
    Default = 0,
    /**
     * Camera sits at the origin of world space, but rotates as the user rotates the physical device.
     *
     * When the Zappar library initializes, the negative Z axis of world space points forward in front of the user.
     *
     * In this mode, tracked anchors move in world space as the user moves the device or tracked objects in the real world.
     */
    Attitude = 1,
    /**
     * In this case the camera moves and rotates in world space around the anchor at the origin.
     */
    AnchorOrigin = 2
}
/**
 * The mirror modes that may be used.
 */
export declare enum CameraMirrorMode {
    /**
     * No mirroring.
     */
    None = 0,
    /**
     * This mode mirrors the background camera texture and ensures content still appears correctly tracked.
     * In this mode your content itself isn't flipped, so any text in your tracked content doesn't appear mirrored.
     * This is the default mode for the user-facing camera.
     */
    Poses = 1,
    /**
     * In this mode, the Zappar camera applies a scaleX(-1) CSS transform to your whole canvas.
     * This way both the camera and your content appear mirrored.
     */
    CSS = 2
}
/**
 * The source of frames.
 */
declare type Source = HTMLImageElement | HTMLVideoElement | string;
/**
 * Rear and user camera source options.
 * @property rearCameraSource? - The camera source which will be used for the rear camera.
 * @property userCameraSource? - The camera source which will be used for the user camera.
 */
declare type SourceOptions = {
    rearCameraSource?: Source;
    userCameraSource?: Source;
};
/**
 * Options to modify the camera behaviour.
 * @param pipeline - The pipeline that this tracker will operate within.
 * @property pipeline? - The pipeline that this tracker will operate within.
 * @property zNear? - The near clipping plane.
 * @property zFar? - The far clipping plane..
 */
declare type Options = Zappar.Pipeline | (Partial<{
    pipeline: Zappar.Pipeline;
    zNear: number;
    zFar: number;
}> & SourceOptions);
/**
 * Creates a camera that you can use instead of a Babylon.js camera.
 *
 *
 * The ZapparBabylon library needs to use your WebGL context in order to process camera frames.
 * You can set it when your page loads using {@link glContextSet}.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/camera-setup/
 */
declare class Camera extends BABYLON.FreeCamera {
    pipeline: Zappar.Pipeline;
    /**
     * The pose mode that is used for the camera to move around in the scene.
     */
    poseMode: CameraPoseMode;
    /**
     * The transformation with the (camera-relative) origin specified by the anchor.
     */
    poseAnchorOrigin: Zappar.ImageAnchor | Zappar.FaceAnchor | InstantWorldAnchor | undefined;
    /**
     * The mirror mode that is used for the rear camera.
     */
    rearCameraMirrorMode: CameraMirrorMode;
    /**
     * The mirror mode that is used for the user camera.
     */
    userCameraMirrorMode: CameraMirrorMode;
    private _currentMirrorMode;
    /**
     * A 4x4 column-major transformation matrix where the camera sits.
     */
    rawPose: Float32Array;
    /**
     * The camera source which is be used for the rear camera.
     */
    rearCameraSource: CameraSource | Zappar.HTMLElementSource;
    /**
     * The camera source which is be used for the user camera.
     */
    userCameraSource: CameraSource | Zappar.HTMLElementSource;
    /**
     * The camera feed texture.
     */
    backgroundTexture: BABYLON.Texture;
    /**
     * The layer onto which the background texture is rendered.
     */
    layer: BABYLON.Layer;
    private _engine;
    private _gl;
    private _cameraRunningRear;
    private _hasSetCSSScaleX;
    private updateInternally;
    private zFar;
    private zNear;
    private ready;
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
    constructor(name: string, scene: BABYLON.Scene, opts?: Options);
    private _cameraSourceFromOpts;
    private _pause;
    /**
     * Starts the camera source.
     *
     * Starting a given source pauses any other sources within the same pipeline.
     */
    private _resume;
    /**
     * Starts the camera source.
     * @param userFacing - If true, starts the user facing camera. (i.e selfie).
     */
    start(userFacing?: boolean): void;
    /**
     * Sets the pose mode to 'Anchor Origin'.
     *
     * In this case the camera moves and rotates in world space around the anchor at the origin.
     * @param anchor - Image anchor or face anchor.
     */
    setPoseModeAnchorOrigin(a: Zappar.ImageAnchor | Zappar.FaceAnchor): void;
    /**
     * Gets current mirror mode.
     */
    get currentMirrorMode(): CameraMirrorMode;
    private _updateLayerTexture;
    private _getOriginPose;
    /**
     * Destroys the camera sources.
     */
    dispose(): void;
    /**
     * Processes camera frames and updates `backgroundTexture`.
     * Call this function on your pipeline once an animation frame (e.g. during your `requestAnimationFrame` function).
     */
    updateFrame(): void;
    /**
     * Updates the projection matrix.
     */
    updateProjectionMatrix(): void;
    /**
     * @returns - the projection matrix.
     */
    getProjectionMatrix(): BABYLON.Matrix;
}
export default Camera;
