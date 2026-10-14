import { WebGLRenderer } from 'three';
import { Pane } from 'tweakpane';
import MainScene from './MainScene';

export default class WebGLApp {
    renderWidth: number;
    renderHeight: number;

    renderer: WebGLRenderer;
    debugger: Pane;

    scene: MainScene;

    constructor(options = {}) {
        this.renderWidth = window.innerWidth;
        this.renderHeight = window.innerHeight;

        this.renderer = this.createRenderer();
        this.debugger = this.createDebugger();
        this.scene = this.createMainScene();

        this.resize();

        this.setupEventListeners();
    }

    createRenderer() {
        const renderer = new WebGLRenderer({
            canvas: document.querySelector('canvas')!, //FIXME:
        });

        return renderer;
    }

    createMainScene() {
        const scene = new MainScene({
            renderer: this.renderer,
            debugger: this.debugger,
            renderWidth: this.renderWidth,
            renderHeight: this.renderHeight,
        });

        return scene;
    }

    resize() {
        this.renderer.setSize(this.renderWidth, this.renderHeight);

        // this.scene.resize(this.renderWidth, this.renderHeight);
    }

    render() {
        this.renderer.render(this.scene, this.scene.cameraManager.camera);
    }

    /**
     * Events
     */
    setupEventListeners() {
        window.addEventListener('resize', this.resizeHandler.bind(this));
        this.tickHandler();
    }

    resizeHandler() {
        this.renderWidth = window.innerWidth;
        this.renderHeight = window.innerHeight;

        this.resize();
    }

    tickHandler() {
        window.requestAnimationFrame(this.tickHandler.bind(this));

        // this.update();
        this.render();
    }

    /**
     * Debug
     */
    createDebugger() {
        const pane = new Pane({ title: 'WebGL App' });

        return pane;
    }
}
