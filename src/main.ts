import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/vertex.glsl?raw";
import fragmentShader from "./shader/fragment.glsl?raw";

init();
function init() {
	const canvas = document.querySelector<HTMLCanvasElement>("#c");

	if (!canvas) {
		return;
	}

	const scene = new THREE.Scene();

	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	//ライト
	const pLight = new THREE.PointLight(0xffffff, 1);
	pLight.position.set(0, 20, 20);
	scene.add(pLight);

	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(0, 10, 20);

	//orbitcontrol
	const control = new OrbitControls(camera, renderer.domElement);

	//axesヘルパー
	const axesHelper = new THREE.AxesHelper(20);
	scene.add(axesHelper);

	const geometry = new THREE.PlaneGeometry(20, 20);
	const material = new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms: {
			uTime: { value: 0 },
		},
	});
	const mesh = new THREE.Mesh(geometry, material);

	scene.add(mesh);

	animate();
	function animate() {
		requestAnimationFrame(animate);
		material.uniforms.uTime.value = performance.now() / 1000;

		renderer.render(scene, camera);
	}
}
