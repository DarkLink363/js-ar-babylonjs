"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.glContextLost = exports.glContextSet = exports.HTMLElementSource = exports.CameraSource = exports.InstantWorldTracker = exports.FaceTracker = exports.BarcodeFinder = exports.ImageTracker = exports.getDefaultPipeline = exports.onFrameUpdate = void 0;
const Zappar = require("@zappar/zappar");
const event_1 = require("@zappar/zappar/lib/event");
let defaultPipeline;
/**
 * Emitted when the frame is updated.
 */
exports.onFrameUpdate = new event_1.Event();
/**
 * @returns - A new Pipeline.
 */
function getDefaultPipeline() {
    if (!defaultPipeline) {
        defaultPipeline = new Zappar.Pipeline();
        defaultPipeline.onFrameUpdate.bind(() => exports.onFrameUpdate.emit());
    }
    return defaultPipeline;
}
exports.getDefaultPipeline = getDefaultPipeline;
/**
 * Attaches content to a known image as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/image-tracking/
 */
class ImageTracker extends Zappar.ImageTracker {
    /**
     * Constructs a new ImageTracker.
     * @param targetFile - The .zpt target file from the source image you'd like to track.
     * @param pipeline - The pipeline that this tracker will operate within.
     * @see https://docs.zap.works/universal-ar/zapworks-cli/
     */
    constructor(targetFile, pipeline) {
        super(pipeline || getDefaultPipeline(), targetFile);
    }
}
exports.ImageTracker = ImageTracker;
/**
 * Detects barcodes in the images from the camera.
 */
class BarcodeFinder extends Zappar.BarcodeFinder {
    /**
     * Constructs a new BarcodeFinder.
     * @param pipeline - The pipeline that this tracker will operate within.
     */
    constructor(pipeline) {
        super(pipeline || getDefaultPipeline());
    }
}
exports.BarcodeFinder = BarcodeFinder;
/**
 * Attaches content to a face as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class FaceTracker extends Zappar.FaceTracker {
    /**
     * Constructs a new FaceTracker.
     * @param _pipeline - The pipeline that this tracker will operate within.
     */
    constructor(pipeline) {
        super(pipeline || getDefaultPipeline());
    }
}
exports.FaceTracker = FaceTracker;
/**
 * Attaches content to a point on a surface in front of the user as it moves around in the camera view.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/instant-world-tracking/
 */
class InstantWorldTracker extends Zappar.InstantWorldTracker {
    /**
     * Constructs a new InstantWorldTracker.
     * @param _pipeline - The pipeline that this tracker will operate within.
     */
    constructor(pipeline) {
        super(pipeline || getDefaultPipeline());
    }
}
exports.InstantWorldTracker = InstantWorldTracker;
/**
 * Creates a source of frames from a device camera.
 * @see https://docs.zap.works/universal-ar/javascript/pipelines-and-camera-processing/
 */
class CameraSource extends Zappar.CameraSource {
    /**
     * Constructs a new CameraSource.
     * @param _pipeline - The pipeline that this source will operate within.
     * @param deviceId - The camera device ID which will be used as the source.
     * @see https://docs.zap.works/universal-ar/javascript/pipelines-and-camera-processing/
     */
    constructor(deviceId, pipeline) {
        super(pipeline || getDefaultPipeline(), deviceId);
    }
}
exports.CameraSource = CameraSource;
/**
 * Creates a source of frames from a HTML <video> or <img> element.
 * @see https://docs.zap.works/universal-ar/javascript/pipelines-and-camera-processing/
 */
class HTMLElementSource extends Zappar.HTMLElementSource {
    /**
     * Constructs a new HTMLElementSource.
     * @param element -  The HTML source element.
     * @param pipeline - The pipeline that this tracker will operate within.
     */
    constructor(element, pipeline) {
        super(pipeline || getDefaultPipeline(), element);
    }
}
exports.HTMLElementSource = HTMLElementSource;
/**
 * Sets the WebGL context used for the processing and upload of camera textures.
 * @param gl - The WebGL context.
 */
function glContextSet(gl) {
    getDefaultPipeline().glContextSet(gl);
}
exports.glContextSet = glContextSet;
/**
 * Informs the pipeline that the GL context is lost and should not be used.
 */
function glContextLost() {
    getDefaultPipeline().glContextLost();
}
exports.glContextLost = glContextLost;
