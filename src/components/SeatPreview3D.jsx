import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, RoundedBox, Text } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { seatMetrics } from '../utils/seatMath'

function CinemaSeat({ position, selected=false }) {
  const color = selected ? '#4ade80' : '#8d2534'
  return <group position={position}>
    <mesh position={[0,.42,0]} castShadow><boxGeometry args={[.78,.62,.22]}/><meshStandardMaterial color={color} roughness={.78}/></mesh>
    <mesh position={[0,.12,.12]} castShadow><boxGeometry args={[.78,.18,.58]}/><meshStandardMaterial color={color} roughness={.8}/></mesh>
    <mesh position={[-.38,.24,.12]}><boxGeometry args={[.08,.3,.48]}/><meshStandardMaterial color="#32151b"/></mesh>
    <mesh position={[.38,.24,.12]}><boxGeometry args={[.08,.3,.48]}/><meshStandardMaterial color="#32151b"/></mesh>
    <mesh position={[0,.05,-.02]}><boxGeometry args={[.08,.1,.08]}/><meshStandardMaterial color="#17191d"/></mesh>
  </group>
}
function Scene({ seatId }) {
  const cameraRef = useRef()
  const target = useMemo(() => seatMetrics(seatId).camera, [seatId])
  const goal = useMemo(() => new THREE.Vector3(...target), [target])
  useFrame(({camera}) => {
    camera.position.lerp(goal, .035)
    camera.lookAt(0, 2.8, -9)
  })
  const seats = []
  for (let r=0;r<9;r++) for(let c=0;c<12;c++) {
    const rowName=String.fromCharCode(65+r)
    seats.push(<CinemaSeat key={`${r}-${c}`} position={[(c-5.5)*1.05, r*.19, -r*1.05]} selected={`${rowName}${Math.round(c+1)}`===seatId}/>)
  }
  return <>
    <color attach="background" args={['#08090c']}/>
    <fog attach="fog" args={['#08090c',13,34]}/>
    <ambientLight intensity={.65}/>
    <spotLight position={[0,11,-11]} intensity={3.2} angle={.8} penumbra={.7} color="#b8d9ff"/>
    <pointLight position={[0,5,-8]} intensity={1.1} color="#a8cfff"/>
    <mesh position={[0,3.2,-17]}><planeGeometry args={[18,7]}/><meshBasicMaterial color="#e7e9ed"/></mesh>
    <mesh position={[0,3.2,-16.96]}><planeGeometry args={[17.6,6.6]}/><meshBasicMaterial color="#18273b"/></mesh>
    <Text position={[0,3.3,-16.9]} fontSize={1.0} color="#dbeafe" anchorX="center" anchorY="middle">NOW SHOWING</Text>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.12,-7]}><planeGeometry args={[22,32]}/><meshStandardMaterial color="#17191e"/></mesh>
    {seats}
    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={1.15} maxPolarAngle={1.85} minAzimuthAngle={-.42} maxAzimuthAngle={.42} />
    <Environment preset="city" />
  </>
}
export default function SeatPreview3D({ seatId }) {
  return <div className="preview-canvas"><Canvas shadows camera={{position:[0,3,7],fov:58}} dpr={[1,1.5]}><Scene seatId={seatId}/></Canvas></div>
}