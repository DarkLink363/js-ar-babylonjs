"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const BABYLON = require("babylonjs");
const zappar_1 = require("@zappar/zappar");
const faceMesh_1 = require("../loaders/faceMesh");
let faceMeshSingleton;
/**
 * A BABYLON.mesh which updates as the user's face and deforms as the user's expression changes.
 * @see https://docs.zap.works/universal-ar/web-libraries/babylonjs/face-tracking/
 */
class FaceMesh extends BABYLON.Mesh {
    /**
     * Constructs a new face mesh.
     * @param name - The name of the face mesh,
     * @param scene - A babylon scene.
     * @param onLoad - Callback function which runs when the mesh is loaded.
     * @param onError - Callback which is called if there's an error loading the mesh.
     */
    constructor(name, scene, faceMesh) {
        super(name, scene);
        this.vertexData = new BABYLON.VertexData();
        this._faceMesh = new zappar_1.FaceMesh();
        this.rotation.z = Math.PI;
        if (!faceMesh) {
            if (!faceMeshSingleton) {
                faceMeshSingleton = new faceMesh_1.default().load();
            }
            faceMesh = faceMeshSingleton;
        }
        this._faceMesh = faceMesh;
    }
    update() {
        if (this._faceMesh.vertices.length === 0)
            return;
        const { normals, uvs, indices, vertices } = this._faceMesh;
        if (this.getScene().useRightHandedSystem)
            this.rotation.y = Math.PI;
        for (let i = 0; i < vertices.length; i += 1) {
            vertices[i] *= -1;
        }
        // TODO: More elegant solution of vertically inverting uvs
        if (this.material) {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in this.material) {
                if (this.material[key] instanceof BABYLON.BaseTexture) {
                    this.material[key].vScale = -1;
                }
            }
        }
        this.vertexData.positions = vertices;
        this.vertexData.indices = indices;
        this.vertexData.normals = this.flipFaceNormals(normals);
        this.vertexData.uvs = uvs;
        this.vertexData.applyToMesh(this, this.isVertexBufferUpdatable(BABYLON.VertexBuffer.PositionKind));
    }
    updateFromFaceTracker(faceTracker) {
        faceTracker.visible.forEach((anchor) => {
            this.updateFromFaceAnchor(anchor);
        });
    }
    flipFaceNormals(meshNormals) {
        for (let i = 0; i < meshNormals.length; ++i) {
            meshNormals[i * 3 + 2] *= -1;
        }
        return meshNormals;
    }
    updateFromFaceAnchor(anchor) {
        if (this._faceMesh.vertices.length === 0)
            return;
        this._faceMesh.updateFromFaceAnchor(anchor);
        this.update();
    }
    updateFromFaceAnchorTransformNode(faceAnchorTransformNode) {
        if (!faceAnchorTransformNode.currentAnchor)
            return;
        this.updateFromFaceTracker(faceAnchorTransformNode.faceTracker);
    }
}
exports.default = FaceMesh;
