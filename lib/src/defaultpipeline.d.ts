import * as Zappar from "@zappar/zappar";
/**
 * Emitted when the frame is updated.
 */
export declare const onFrameUpdate: Zappar.Event;
/**
 * @returns - A new Pipeline.
 */
export declare function getDefaultPipeline(): Zappar.Pipeline;
/**
 * Attaches content to a known image as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/image-tracking/
 */
export declare class ImageTracker extends Zappar.ImageTracker {
    /**
     * Constructs a new ImageTracker.
     * @param targetFile - The .zpt target file from the source image you'd like to track.
     * @param pipeline - The pipeline that this tracker will operate within.
     * @see https://docs.zap.works/universal-ar/zapworks-cli/
     */
    constructor(targetFile?: string | ArrayBuffer, pipeline?: Zappar.Pipeline);
}
/**
 * Detects barcodes in the images from the camera.
 */
export declare class BarcodeFinder extends Zappar.BarcodeFinder {
    /**
     * Constructs a new BarcodeFinder.
     * @param pipeline - The pipeline that this tracker will operate within.
     */
    constructor(pipeline?: Zappar.Pipeline);
}
/**
 * Attaches content to a face as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
export declare class FaceTracker extends Zappar.FaceTracker {
    /**
     * Constructs a new FaceTracker.
     * @param _pipeline - The pipeline that this tracker will operate within.
     */
    constructor(pipeline?: Zappar.Pipeline);
}
/**
 * Attaches content to a point on a surface in front of the user as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/instant-world-tracking/
 */
export declare class InstantWorldTracker extends Zappar.InstantWorldTracker {
    /**
     * Constructs a new InstantWorldTracker.
     * @param _pipeline - The pipeline that this tracker will operate within.
     */
    constructor(pipeline?: Zappar.Pipeline);
}
/**
 * Creates a source of frames from a device camera.
 * @see https://docs.zap.works/universal-ar/javascript/pipelines-and-camera-processing/
 */
export declare class CameraSource extends Zappar.CameraSource {
    /**
     * Constructs a new CameraSource.
     * @param _pipeline - The pipeline that this source will operate within.
     * @param deviceId - The camera device ID which will be used as the source.
     * @see https://docs.zap.works/universal-ar/javascript/pipelines-and-camera-processing/
     */
    constructor(deviceId: string, pipeline?: Zappar.Pipeline);
}
/**
 * Creates a source of frames from a HTML <video> or <img> element.
 * @see https://docs.zap.works/universal-ar/javascript/pipelines-and-camera-processing/
 */
export declare class HTMLElementSource extends Zappar.HTMLElementSource {
    /**
     * Constructs a new HTMLElementSource.
     * @param element -  The HTML source element.
     * @param pipeline - The pipeline that this tracker will operate within.
     */
    constructor(element: HTMLVideoElement | HTMLImageElement, pipeline?: Zappar.Pipeline);
}
/**
 * Sets the WebGL context used for the processing and upload of camera textures.
 * @param gl - The WebGL context.
 */
export declare function glContextSet(gl: WebGLRenderingContext): void;
/**
 * Informs the pipeline that the GL context is lost and should not be used.
 */
export declare function glContextLost(): void;
