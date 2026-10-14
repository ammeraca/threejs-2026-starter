import { Color, PerspectiveCamera, WebGLRenderer } from 'three';
import { MeshBasicMaterial } from 'three';
import { Camera } from 'three';
import { Mesh } from 'three';
import { BoxGeometry } from 'three';
import { Scene } from 'three';
import { Pane } from 'tweakpane';
import CameraManager from './CameraManager';
import { Points } from 'three';
import { PlaneGeometry } from 'three';
import { PointsMaterial } from 'three';
import { darkThemeColors } from '../colors';

type SceneOptions = {
    renderer: WebGLRenderer;
    debugger: Pane;
    renderWidth: number;
    renderHeight: number;
};

export default class MainScene extends Scene {
    renderer: WebGLRenderer;
    debugger: Pane;
    cameraManager: CameraManager;
    renderWidth: number;
    renderHeight: number;

    constructor(options: SceneOptions) {
        super();

        this.renderer = options.renderer;
        this.debugger = options.debugger;

        this.renderWidth = options.renderWidth;
        this.renderHeight = options.renderHeight;
        this.cameraManager = new CameraManager({
            renderer: this.renderer,
            debugger: this.debugger,
            renderWidth: this.renderWidth,
            renderHeight: this.renderHeight,
        });

        this.background = new Color(0x000000);

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0xff0000 });

        const mesh = new Mesh(geometry, material);
        this.add(mesh);
    }

    createCamera() {
        const camera = new PerspectiveCamera(45, this.renderWidth / this.renderHeight, 0.1, 500);

        camera.position.z = 5;

        return camera;
    }
}
