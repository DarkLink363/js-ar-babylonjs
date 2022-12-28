"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTrackerLoader = void 0;
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
const defaultpipeline_1 = require("../defaultpipeline");
/**
 * Image tracker loader.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/image-tracking/
 */
class ImageTrackerLoader {
    /**
     * Loads an image tracker.
     * @param zpt - A URL to, or ArrayBuffer of, an image target file.
     * @param onLoad - Callback which returns the imageTracker once it's loaded.
     * @param onError - Callback which is called if there's an error loading the target file.
     * @returns The ImageTracker.
     * @see https://docs.zap.works/universal-ar/zapworks-cli/
     */
    load(zpt, onLoad, onError) {
        const trk = new defaultpipeline_1.ImageTracker();
        trk
            .loadTarget(zpt)
            .then(() => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(trk);
        })
            .catch((_) => {
            onError === null || onError === void 0 ? void 0 : onError(_);
        });
        return trk;
    }
}
exports.ImageTrackerLoader = ImageTrackerLoader;
exports.default = ImageTrackerLoader;
