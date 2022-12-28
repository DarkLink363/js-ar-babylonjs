"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
const defaultpipeline_1 = require("../defaultpipeline");
/**
 * Face tracker loader.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class FaceTrackerLoader {
    /**
     * Loads face tracking model data.
     * @param customModel - A URL to, or ArrayBuffer of, model data.
     * @param options - A URL or ArrayBuffer of the source mesh data or defines if some face features should be filled with polygons.
     * @param onLoad - Callback which returns the FaceMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The FaceTracker.
     */
    load(customModel, onLoad, onError) {
        const trk = new defaultpipeline_1.FaceTracker();
        const p = customModel ? trk.loadModel(customModel) : trk.loadDefaultModel();
        p.then(() => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(trk);
        }).catch((_) => {
            onError === null || onError === void 0 ? void 0 : onError(_);
        });
        return trk;
    }
}
exports.default = FaceTrackerLoader;
