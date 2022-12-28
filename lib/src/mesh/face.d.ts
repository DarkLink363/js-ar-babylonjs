import * as BABYLON from "babylonjs";
import { FaceAnchor, FaceMesh as ZapparFaceMesh } from "@zappar/zappar";
import { FaceTracker } from "../defaultpipeline";
import FaceAnchorTransformNode from "../trackers/faceAnchor";
/**
 * A BABYLON.mesh which updates as the user's face and deforms as the user's expression changes.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
declare class FaceMesh extends BABYLON.Mesh {
    _faceMesh: ZapparFaceMesh;
    private vertexData;
    /**
     * Constructs a new face mesh.
     * @param name - The name of the face mesh,
     * @param scene - A babylon scene.
     * @param onLoad - Callback function which runs when the mesh is loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     */
    constructor(name: string, scene: BABYLON.Scene, faceMesh?: ZapparFaceMesh);
    update(): void;
    updateFromFaceTracker(faceTracker: FaceTracker): void;
    flipFaceNormals(meshNormals: Float32Array): Float32Array;
    updateFromFaceAnchor(anchor: FaceAnchor): void;
    updateFromFaceAnchorTransformNode(faceAnchorTransformNode: FaceAnchorTransformNode): void;
}
export default FaceMesh;
