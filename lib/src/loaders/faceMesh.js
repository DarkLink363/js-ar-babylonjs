"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
const zappar_1 = require("@zappar/zappar");
/**
 * Face mesh loader.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class FaceMeshLoader {
    /**
     * Loads the data for a face mesh.
     * @param options - A URL or ArrayBuffer of the source mesh data or defines if some face features should be filled with polygons.
     * @param onLoad - Callback which returns the FaceMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The FaceMesh.
     */
    load(options, onLoad, onError) {
        const trk = new zappar_1.FaceMesh();
        let p;
        if (options) {
            if (typeof options === "string") {
                p = trk.load(options);
            }
            else if (options.customModel) {
                p = trk.load(options.customModel, options.fillMouth, options.fillEyeLeft, options.fillEyeRight, options.fillNeck);
            }
            else {
                p = trk.loadDefaultFace(options.fillMouth, options.fillEyeLeft, options.fillEyeRight);
            }
        }
        else {
            p = trk.loadDefaultFace();
        }
        p.then(() => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(trk);
        }).catch((_) => {
            onError === null || onError === void 0 ? void 0 : onError(_);
        });
        return trk;
    }
    /**
     * Loads the default face mesh.
     * @param options - Defines if some face features should be filled with polygons.
     * @param onLoad - Callback which returns the FaceMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The FaceMesh.
     */
    loadFace(options, onLoad, onError) {
        const trk = new zappar_1.FaceMesh();
        let p;
        if (options) {
            if (options.customModel) {
                p = trk.load(options.customModel, options.fillMouth, options.fillEyeLeft, options.fillEyeRight, options.fillNeck);
            }
            else {
                p = trk.loadDefaultFace(options.fillMouth, options.fillEyeLeft, options.fillEyeRight);
            }
        }
        else {
            p = trk.loadDefaultFace();
        }
        p.then(() => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(trk);
        }).catch((_) => {
            onError === null || onError === void 0 ? void 0 : onError(_);
        });
        return trk;
    }
    /**
     * Loads The full head simplified mesh covers the whole of the user's head, including some neck.
     * It's ideal for drawing into the depth buffer in order to mask out the back of 3D models placed on the user's head.
     * @param options - Defines if some face features should be filled with polygons.
     * @param onLoad - Callback which returns the FaceMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The FaceMesh.
     */
    loadFullHeadSimplified(options, onLoad, onError) {
        const trk = new zappar_1.FaceMesh();
        let p;
        if (options) {
            if (options.customModel) {
                p = trk.load(options.customModel, options.fillMouth, options.fillEyeLeft, options.fillEyeRight, options.fillNeck);
            }
            else {
                p = trk.loadDefaultFullHeadSimplified(options.fillMouth, options.fillEyeLeft, options.fillEyeRight, options.fillNeck);
            }
        }
        else {
            p = trk.loadDefaultFullHeadSimplified();
        }
        p.then(() => {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(trk);
        }).catch((_) => {
            onError === null || onError === void 0 ? void 0 : onError(_);
        });
        return trk;
    }
    parse() { }
}
exports.default = FaceMeshLoader;
