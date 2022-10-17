import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import img from "./assets/image.jpg"

const Box = (props: any) => {
    const mesh: any = useRef();
  
    const [active, setActive] = useState(false);
  
    useFrame(() => {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    });
  
    console.log(img)
    const texture = useMemo(() => new THREE.TextureLoader().load(img), []);
    
    return (
        <mesh
        {...props}
        ref={mesh}
        scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
        onClick={(e) => setActive(!active)}
          >
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        </mesh>
    );
}

export default Box;