import React, { useRef, useState, useMemo } from 'react';
import * as THREE from "three";
import { Canvas, extend, useFrame } from "react-three-fiber";
import logo from './logo.svg';
import './App.css';
import { OrbitControls } from 'three-orbitcontrols-ts';
import img from "./assets/img.jpg"
import { Vector3 } from 'three';

class App extends React.Component  {

    componentDidMount(): void {
		
		const container = document.getElementById('sphere');

		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
		camera.position.z = 10;
		camera.lookAt(new THREE.Vector3(0, 0, 0))

		var scene = new THREE.Scene();

		const geometry = new THREE.SphereGeometry(500, 60, 40);
		// invert the geometry on the x-axis so that all of the faces point inward
		geometry.scale(-1, 1, 1);

		const texture = new THREE.TextureLoader().load(img);
		const material = new THREE.MeshBasicMaterial({ map: texture });

		const mesh = new THREE.Mesh(geometry, material);

		scene.add(mesh);

		var renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		var controls = new OrbitControls(camera, renderer.domElement);
		controls.enablePan = false;
		controls.enableZoom = true; 
		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.5;
		
		if (container == null) {
			console.log("NULL")
		}
		else {
			container.appendChild(renderer.domElement);
		}

		animate();

		function animate() {
			controls.update()
			renderer.render(scene, camera)
			requestAnimationFrame(animate);
		}

		function onMouseWheel(event: any) {
			event.preventDefault();
			
			if (event.wheelDeltaY) { // WebKit
				camera.fov -= event.wheelDeltaY * 0.05;
			} else if (event.wheelDelta) { 	// Opera / IE9
				camera.fov -= event.wheelDelta * 0.05;
			} else if (event.detail) { // Firefox
				camera.fov += event.detail * 1.0;
			}
	
			camera.fov = Math.max(40, Math.min(100, camera.fov));
			camera.updateProjectionMatrix();
		}
	
		document.addEventListener('mousewheel', onMouseWheel, false);
		document.addEventListener('DOMMouseScroll', onMouseWheel, false);
    }

    // server
    // const [data, setData] = React.useState(null);
    // React.useEffect(() => {
    //     fetch("http://localhost:3001/api")
    //       .then((res) => res.json())
    //       .then((data) => setData(data.message));
    // }, []);

    render(): React.ReactNode {
        return <div id='sphere'> </div>
    }
}

  export default App;