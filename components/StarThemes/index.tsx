import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import styles from './styles.module.css'



export default function StarThemes() {
    return (
        <>
            <div className={styles.bg} />
            <Canvas dpr={[1.5, 2]} linear shadows className={styles.canvas}>
                <OrbitControls autoRotate enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
                <Stars radius={500} depth={50} count={1000} factor={18} />
            </Canvas>
            <div className={styles.bg} />

        </>
    )
}
