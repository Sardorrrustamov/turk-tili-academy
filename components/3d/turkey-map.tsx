"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html, PointMaterial, Points } from "@react-three/drei"
import * as THREE from "three"

const turkeyOutline = [
  [26.0,40.0],[26.5,40.8],[27.0,41.0],[28.0,41.5],[29.0,41.0],
  [30.0,41.5],[31.5,41.8],[33.0,42.0],[35.0,41.8],[37.0,41.2],
  [39.0,41.0],[40.5,41.2],[42.0,41.5],
  [44.0,41.0],[44.5,39.5],[44.0,38.0],[43.5,37.0],[42.5,37.0],
  [42.0,36.8],[40.0,36.5],[38.0,36.2],[36.5,36.0],[35.0,36.5],
  [33.0,36.0],[32.0,36.2],[30.5,36.5],[29.0,36.8],[28.0,36.5],
  [27.0,37.0],[26.5,38.0],[26.0,39.0],[26.0,40.0],
]

const cities = [
  { name:"Istanbul",   lon:29.0, lat:41.0, primary:true  },
  { name:"Ankara",     lon:32.9, lat:39.9, primary:false },
  { name:"Izmir",      lon:27.1, lat:38.4, primary:false },
  { name:"Antalya",    lon:30.7, lat:36.9, primary:false },
  { name:"Bursa",      lon:29.0, lat:40.2, primary:false },
  { name:"Konya",      lon:32.5, lat:37.9, primary:false },
  { name:"Trabzon",    lon:39.7, lat:41.0, primary:false },
  { name:"Diyarbakir", lon:40.2, lat:37.9, primary:false },
  { name:"Erzurum",    lon:41.3, lat:39.9, primary:false },
  { name:"Samsun",     lon:36.3, lat:41.3, primary:false },
]

function geoTo3D(lon:number, lat:number, scale=0.3):[number,number,number] {
  return [(lon-35)*scale, (lat-39)*scale, 0]
}

function createOutlineParticles(count=900):Float32Array {
  const pos = new Float32Array(count*3)
  const outline = turkeyOutline.map(([lon,lat])=>geoTo3D(lon,lat))
  for(let i=0;i<count;i++){
    const si = Math.floor(Math.random()*(outline.length-1))
    const t  = Math.random()
    const p1 = outline[si], p2 = outline[(si+1)%outline.length]
    pos[i*3]   = p1[0]+(p2[0]-p1[0])*t + (Math.random()-.5)*.04
    pos[i*3+1] = p1[1]+(p2[1]-p1[1])*t + (Math.random()-.5)*.04
    pos[i*3+2] = (Math.random()-.5)*.05
  }
  return pos
}

function createFillParticles(count=600):Float32Array {
  const pos = new Float32Array(count*3)
  for(let i=0;i<count;i++){
    const lon=26+Math.random()*18, lat=36+Math.random()*6
    const [x,y] = geoTo3D(lon,lat)
    pos[i*3]=x+(Math.random()-.5)*.25; pos[i*3+1]=y+(Math.random()-.5)*.18; pos[i*3+2]=(Math.random()-.5)*.1
  }
  return pos
}

function MapOutline() {
  const outlinePos = useMemo(()=>createOutlineParticles(900),[])
  const fillPos    = useMemo(()=>createFillParticles(600),[])
  const oRef = useRef<THREE.Points>(null)
  const fRef = useRef<THREE.Points>(null)
  useFrame(state=>{
    if(oRef.current) oRef.current.rotation.z = Math.sin(state.clock.elapsedTime*.1)*.02
    if(fRef.current) fRef.current.rotation.z = Math.sin(state.clock.elapsedTime*.1+.5)*.015
  })
  return (<>
    <Points ref={oRef} positions={outlinePos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#FFD700" size={0.04} sizeAttenuation depthWrite={false} opacity={1}/>
    </Points>
    <Points ref={fRef} positions={fillPos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#d4af37" size={0.025} sizeAttenuation depthWrite={false} opacity={0.55}/>
    </Points>
  </>)
}

function CityNode({position,name,primary}:{position:[number,number,number];name:string;primary:boolean}) {
  const mRef = useRef<THREE.Mesh>(null)
  const gRef = useRef<THREE.Mesh>(null)
  const rRef = useRef<THREE.Mesh>(null)
  useFrame(state=>{
    const s = 1+Math.sin(state.clock.elapsedTime*2.5)*.25
    if(mRef.current) mRef.current.scale.setScalar(primary?s:s*.75)
    if(gRef.current) gRef.current.scale.setScalar(primary?s*2.5:s*1.8)
    if(rRef.current){ rRef.current.scale.setScalar(1+Math.sin(state.clock.elapsedTime*1.5)*.5);(rRef.current.material as THREE.MeshBasicMaterial).opacity=.15+Math.sin(state.clock.elapsedTime*1.5)*.1 }
  })
  return (
    <group position={position}>
      <mesh ref={rRef}><sphereGeometry args={[primary?.14:.09,16,16]}/><meshBasicMaterial color="#FFD700" transparent opacity={.15}/></mesh>
      <mesh ref={gRef}><sphereGeometry args={[primary?.1:.065,16,16]}/><meshBasicMaterial color="#FFD700" transparent opacity={.25}/></mesh>
      <mesh ref={mRef}><sphereGeometry args={[primary?.055:.035,16,16]}/><meshBasicMaterial color="#FFD700"/></mesh>
      {primary&&(
        <Html position={[.18,.14,0]} center distanceFactor={8}>
          <div style={{whiteSpace:"nowrap",padding:"4px 12px",background:"rgba(10,15,35,0.75)",border:"1px solid rgba(212,175,55,0.5)",borderRadius:999,fontSize:10,fontWeight:700,color:"#FFD700",backdropFilter:"blur(8px)",letterSpacing:"0.1em"}}>
            ISTANBUL ACADEMY
          </div>
        </Html>
      )}
    </group>
  )
}

function ConnectionLines() {
  const lRef = useRef<THREE.Group>(null)
  const connections = useMemo(()=>{
    const istanbul = cities.find(c=>c.primary)!
    return cities.filter(c=>!c.primary).map(city=>({
      from:geoTo3D(istanbul.lon,istanbul.lat),
      to:geoTo3D(city.lon,city.lat)
    }))
  },[])
  useFrame(state=>{
    if(lRef.current) lRef.current.children.forEach((child,i)=>{
      if(child instanceof THREE.Line){
        const mat = child.material as THREE.LineBasicMaterial
        mat.opacity=.35+Math.sin(state.clock.elapsedTime*2+i)*.2
      }
    })
  })
  return (
    <group ref={lRef}>
      {connections.map((conn,i)=>{
        const pts=[new THREE.Vector3(...conn.from),new THREE.Vector3(...conn.to)]
        const geo=new THREE.BufferGeometry().setFromPoints(pts)
        return(<line key={i} geometry={geo}><lineBasicMaterial color="#d4af37" transparent opacity={.35}/></line>)
      })}
    </group>
  )
}

function Scene() {
  const gRef = useRef<THREE.Group>(null)
  useFrame(state=>{
    if(gRef.current){
      gRef.current.rotation.y=Math.sin(state.clock.elapsedTime*.18)*.12
      gRef.current.position.y=Math.sin(state.clock.elapsedTime*.28)*.06
    }
  })
  return (
    <group ref={gRef} position={[.4,-.15,0]}>
      <MapOutline/>
      <ConnectionLines/>
      {cities.map(city=>(
        <Float key={city.name} speed={2} rotationIntensity={0} floatIntensity={.25}>
          <CityNode position={geoTo3D(city.lon,city.lat)} name={city.name} primary={city.primary}/>
        </Float>
      ))}
    </group>
  )
}

export function TurkeyMap3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{position:[0,0,4],fov:45}} dpr={[1,2]} gl={{antialias:true,alpha:true}}>
        <Suspense fallback={null}>
          <Scene/>
        </Suspense>
        <ambientLight intensity={.3}/>
        <pointLight position={[0,0,2]} intensity={1.5} color="#d4af37"/>
      </Canvas>
    </div>
  )
}
