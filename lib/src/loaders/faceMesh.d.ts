import { FaceMesh } from "@zappar/zappar";
/**
 * The features which may be filled with polygons.
 * @property fillMouth - If true, fills this face feature with polygons.
 * @property fillEyeLeft - If true, fills this face feature with polygons.
 * @property fillEyeRight - If true, fills this face feature with polygons.
 * @property fillNeck - If true, fills this face feature with polygons.
 */
export interface FaceMeshLoaderOptions {
    customModel?: string;
    fillMouth?: boolean;
    fillEyeLeft?: boolean;
    fillEyeRight?: boolean;
    fillNeck?: boolean;
}
/**
 * Face mesh loader.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
declare class FaceMeshLoader {
    /**
     * Loads the data for a face mesh.
     * @param options - A URL or ArrayBuffer of the source mesh data or defines if some face features should be filled with polygons.
     * @param onLoad - Callback which returns the FaceMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The FaceMesh.
     */
    load(options?: string | FaceMeshLoaderOptions, onLoad?: (i: FaceMesh) => void, onError?: (message?: unknown) => void): FaceMesh;
    /**
     * Loads the default face mesh.
     * @param options - Defines if some face features should be filled with polygons.
     * @param onLoad - Callback which returns the FaceMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The FaceMesh.
     */
    loadFace(options?: FaceMeshLoaderOptions, onLoad?: (i: FaceMesh) => void, onError?: (message?: unknown) => void): FaceMesh;
    /**
     * Loads The full head simplified mesh covers the whole of the user's head, including some neck.
     * It's ideal for drawing into the depth buffer in order to mask out the back of 3D models placed on the user's head.
     * @param options - Defines if some face features should be filled with polygons.
     * @param onLoad - Callback which returns the FaceMesh once it's loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     * @returns The FaceMesh.
     */
    loadFullHeadSimplified(options?: FaceMeshLoaderOptions, onLoad?: (i: FaceMesh) => void, onError?: (message?: unknown) => void): FaceMesh;
    parse(): void;
}
export default FaceMeshLoader;
