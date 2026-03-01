// CamelScene.jsx — Three.js component that loads and renders a 3D camel GLB model.
// Features: mouse-tracking head, idle animations (breathing, head sway, tail wag),
// custom lighting (ambient + key + indigo rim), transparent background, responsive.

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function CamelScene() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // --- Scene Setup ---
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
        camera.position.set(0, 1.8, 5.5)
        camera.lookAt(0, 1.0, 0)

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        // --- Lighting ---
        // Ambient: very low, dark blue tint
        const ambient = new THREE.AmbientLight(0x0F0F1A, 0.2)
        scene.add(ambient)

        // Key light: cool white, top-left
        const keyLight = new THREE.DirectionalLight(0xE8E8F0, 0.4)
        keyLight.position.set(-3, 4, 2)
        scene.add(keyLight)

        // Rim light: indigo, back-right (signature look)
        const rimLight = new THREE.DirectionalLight(0x6366F1, 0.5)
        rimLight.position.set(3, 2, -3)
        scene.add(rimLight)

        // Accent light: warm sand, focused on camel (low intensity)
        const accentLight = new THREE.SpotLight(0xD4A574, 50, 15, Math.PI / 4, 0.3)
        accentLight.position.set(3, 3, -2)
        accentLight.target.position.set(0, 1, 0)
        scene.add(accentLight)
        scene.add(accentLight.target)

        // Soft fill light from the front
        const frontLight = new THREE.DirectionalLight(0xffffff, 0.3)
        frontLight.position.set(0, 2, 5)
        scene.add(frontLight)

        // --- Load and stack GLB cactus blocks ---
        const cactusLoader = new GLTFLoader()
        cactusLoader.load('/models/cactus.glb', (gltf) => {
            const cactusBlock = gltf.scene

            // Convert materials to MeshStandardMaterial so they respond to lights
            cactusBlock.traverse((child) => {
                if (child.isMesh && child.material) {
                    const oldMat = child.material
                    child.material = new THREE.MeshStandardMaterial({
                        color: oldMat.color || 0x2D6A1E,
                        map: oldMat.map || null,
                    })
                }
            })

            // Measure one block's height
            const cBox = new THREE.Box3().setFromObject(cactusBlock)
            const blockHeight = cBox.getSize(new THREE.Vector3()).y
            const blockScale = 0.5

            // Stack clones to build tall cacti
            const buildCactus = (x, z, stackCount, scale) => {
                const group = new THREE.Group()
                for (let i = 0; i < stackCount; i++) {
                    const clone = cactusBlock.clone()
                    clone.scale.setScalar(scale)
                    clone.position.y = i * blockHeight * scale
                    group.add(clone)
                }
                group.position.set(x, 0, z)
                return group
            }

            // 3 cacti rearranged
            const c1 = buildCactus(-2.2, -1.0, 3, blockScale)  // medium, far-left, slightly front
            scene.add(c1)
            const c2 = buildCactus(0.8, -2.5, 4, blockScale)   // tall, center-back
            scene.add(c2)
            const c3 = buildCactus(1.2, 1.8, 2, blockScale)    // short, front-left
            scene.add(c3)

            // Spotlight on each cactus: from front at 45° so whole cactus is visible (not from top)
            const sandColor = 0xD4A574
            const frontDist = 2.2  // distance in front (Z) and up (Y) for 45° angle
            const tallExtraUp = 1.2 // 3-block: light more up
            const fourBlockExtraUp = 1.5 // 4-block: even higher to cover full height

            // c1: 3 blocks, center y ~0.5
            const c1CenterY = 0.5
            const sl1 = new THREE.SpotLight(sandColor, 60, 4, Math.PI / 5, 0.5)
            sl1.position.set(-2.2, c1CenterY + frontDist + tallExtraUp, -1.0 + frontDist)
            sl1.target = c1
            scene.add(sl1)

            // c2: 4 blocks, center y ~0.75
            const c2CenterY = 0.75
            const sl2 = new THREE.SpotLight(sandColor, 60, 5, Math.PI / 5, 0.5)
            sl2.position.set(0.8, c2CenterY + frontDist + fourBlockExtraUp, -2.5 + frontDist)
            sl2.target = c2
            scene.add(sl2)

            // c3: 2 blocks, center y ~0.25
            const c3CenterY = 0.25
            const sl3 = new THREE.SpotLight(sandColor, 40, 4, Math.PI / 5, 0.5)
            sl3.position.set(1.2, c3CenterY + frontDist, 1.8 + frontDist)
            sl3.target = c3
            scene.add(sl3)
        })

        // --- Sand particles (subtle few grains drifting in wind) ---
        const sandParticles = []
        const sandColors = [0xD4A574, 0xC9A06C, 0xE4B884, 0xB8956E]

        for (let i = 0; i < 20; i++) {
            const geo = new THREE.SphereGeometry(0.01 + Math.random() * 0.015, 4, 4)
            const mat = new THREE.MeshBasicMaterial({
                color: sandColors[Math.floor(Math.random() * sandColors.length)],
                transparent: true,
                opacity: 0.25 + Math.random() * 0.3,
            })
            const grain = new THREE.Mesh(geo, mat)
            grain.position.set(
                (Math.random() - 0.5) * 5,
                Math.random() * 2.5,
                (Math.random() - 0.5) * 4
            )
            scene.add(grain)
            sandParticles.push({
                mesh: grain,
                baseX: grain.position.x,
                baseY: grain.position.y,
                speed: 0.3 + Math.random() * 0.5,
                drift: 0.5 + Math.random() * 1.0,
                floatAmp: 0.05 + Math.random() * 0.15,
                phase: Math.random() * Math.PI * 2,
            })
        }

        // --- Mouse tracking state ---
        const mouse = { x: 0, y: 0 }
        const targetRotation = { x: 0, y: 0 }
        const currentRotation = { x: 0, y: 0 }
        let mouseInWindow = true

        // --- Hover detection for sit/stand ---
        let isHoveringCanvas = false
        let hoverLeftTime = 0.001 // starts counting from page load
        const SIT_DELAY = 3.0 // seconds before sitting
        const SIT_DURATION = 1.2 // seconds for sit/stand animation
        // States: 'standing', 'sitting_down', 'sitting', 'standing_up'
        let sitState = 'standing'
        let sitAnimStart = 0
        let originalModelY = 0

        const onMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1
            mouseInWindow = true
        }

        const onMouseLeave = () => {
            mouseInWindow = false
        }

        const onCanvasEnter = () => {
            isHoveringCanvas = true
            // If sitting or sitting down, trigger stand up
            if (sitState === 'sitting' || sitState === 'sitting_down') {
                sitState = 'standing_up'
                sitAnimStart = clock.getElapsedTime()
            }
        }

        const onCanvasLeave = () => {
            isHoveringCanvas = false
            hoverLeftTime = clock.getElapsedTime()
        }

        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseleave', onMouseLeave)

        // --- Hit reaction state (Minecraft leg kick) ---
        let isHit = false
        let hitTime = 0
        const HIT_DURATION = 0.6 // seconds
        let frontLeftLeg = null
        let frontRightLeg = null
        let backLeftLeg = null
        let backRightLeg = null

        // Raycaster for click detection
        const raycaster = new THREE.Raycaster()
        const clickMouse = new THREE.Vector2()

        const onCanvasClick = (e) => {
            if (!camelModel || isHit) return
            const rect = renderer.domElement.getBoundingClientRect()
            clickMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            clickMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
            raycaster.setFromCamera(clickMouse, camera)
            const intersects = raycaster.intersectObject(camelModel, true)
            if (intersects.length > 0) {
                isHit = true
                hitTime = clock.getElapsedTime()
            }
        }

        renderer.domElement.addEventListener('click', onCanvasClick)

        // --- Load Model ---
        let camelModel = null
        let headGroup = null
        const baseRotationY = Math.PI * 0.85 // The resting 3/4 angle
        const clock = new THREE.Clock()

        const loader = new GLTFLoader()
        loader.load(
            '/models/camel.glb',
            (gltf) => {
                camelModel = gltf.scene

                // Auto-center and scale the model
                const box = new THREE.Box3().setFromObject(camelModel)
                const size = box.getSize(new THREE.Vector3())
                const center = box.getCenter(new THREE.Vector3())

                const maxDim = Math.max(size.x, size.y, size.z)
                const scale = 3.2 / maxDim
                camelModel.scale.setScalar(scale)
                camelModel.position.set(-center.x * scale, -box.min.y * scale - 0.8, -center.z * scale)
                camelModel.rotation.y = baseRotationY
                originalModelY = camelModel.position.y

                scene.add(camelModel)

                // Cache leg references for hit animation
                frontLeftLeg = camelModel.getObjectByName('front_left_leg_12')
                frontRightLeg = camelModel.getObjectByName('front_right_leg_14')
                backLeftLeg = camelModel.getObjectByName('back_left_leg_16')
                backRightLeg = camelModel.getObjectByName('back_right_leg_18')

                // Group head-related parts for mouse tracking
                const rootNode = camelModel.getObjectByName('_37')
                const headPartNames = ['head_3', 'left_ear_5', 'right_ear_7', 'headpiece_28', 'left_bit_30', 'right_bit_32', 'reins_36']
                const headParts = []
                let tailNode = camelModel.getObjectByName('tail_20')

                if (rootNode) {
                    headPartNames.forEach(name => {
                        const part = rootNode.getObjectByName(name)
                        if (part) headParts.push(part)
                    })

                    if (headParts.length > 0) {
                        headGroup = new THREE.Group()
                        headGroup.name = 'head_group'

                        // Calculate pivot point from head parts
                        const pivotPos = new THREE.Vector3()
                        headParts.forEach(part => pivotPos.add(part.position))
                        pivotPos.divideScalar(headParts.length)

                        headGroup.position.copy(pivotPos)

                        // Reparent head parts into the group
                        headParts.forEach(part => {
                            rootNode.remove(part)
                            part.position.sub(pivotPos)
                            headGroup.add(part)
                        })

                        rootNode.add(headGroup)
                        console.log('✅ Head group created with', headParts.length, 'parts')
                    }
                }

                // Attach hover listeners to the canvas
                renderer.domElement.addEventListener('mouseenter', onCanvasEnter)
                renderer.domElement.addEventListener('mouseleave', onCanvasLeave)
            },
            undefined,
            (error) => {
                console.error('Error loading camel model:', error)
            }
        )

        // --- Resize handler ---
        const handleResize = () => {
            const width = container.clientWidth
            const height = container.clientHeight
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        // --- Animation loop ---
        let animationId

        const animate = () => {
            animationId = requestAnimationFrame(animate)
            const elapsed = clock.getElapsedTime()

            // --- Mouse tracking (lerp) ---
            if (mouseInWindow) {
                targetRotation.y = mouse.x * 0.6   // horizontal tracking
                targetRotation.x = mouse.y * -0.25  // vertical tilt
            } else {
                targetRotation.x = 0
                targetRotation.y = 0
            }
            currentRotation.x += (targetRotation.x - currentRotation.x) * 0.12
            currentRotation.y += (targetRotation.y - currentRotation.y) * 0.12

            if (camelModel) {
                const headSway = Math.sin(elapsed * (2 * Math.PI / 4)) * 0.015

                if (headGroup) {
                    headGroup.rotation.y = currentRotation.y + headSway
                    headGroup.rotation.x = currentRotation.x
                } else {
                    camelModel.rotation.y = baseRotationY + currentRotation.y * 0.3 + headSway
                    camelModel.rotation.x = currentRotation.x * 0.3
                }

                // Breathing animation
                const breathe = 1.0 + Math.sin(elapsed * (2 * Math.PI / 3)) * 0.01
                camelModel.scale.y = camelModel.scale.x * breathe

                // Tail sway
                const tail = camelModel.getObjectByName('tail_20')
                if (tail) {
                    tail.rotation.z = Math.sin(elapsed * (2 * Math.PI / 3)) * 0.1
                }

                // --- Sit/Stand state machine ---
                if (!isHit) {
                    // Check if should start sitting (not hovering for SIT_DELAY seconds)
                    if (sitState === 'standing' && !isHoveringCanvas && hoverLeftTime > 0 && (elapsed - hoverLeftTime) >= SIT_DELAY) {
                        sitState = 'sitting_down'
                        sitAnimStart = elapsed
                    }

                    const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

                    if (sitState === 'sitting_down') {
                        const p = Math.min((elapsed - sitAnimStart) / SIT_DURATION, 1)
                        const ep = easeInOut(p)

                        // Phase 1 (0-0.5): Front legs fold
                        const frontFold = easeInOut(Math.min(p / 0.5, 1))
                        // Phase 2 (0.3-1.0): Back legs fold (overlapping)
                        const backFold = easeInOut(Math.max(0, Math.min((p - 0.3) / 0.7, 1)))

                        if (frontLeftLeg) frontLeftLeg.rotation.x = frontFold * 1.5
                        if (frontRightLeg) frontRightLeg.rotation.x = frontFold * 1.5
                        if (backLeftLeg) backLeftLeg.rotation.x = backFold * 1.2
                        if (backRightLeg) backRightLeg.rotation.x = backFold * 1.2

                        // Body lowers and tilts forward slightly
                        camelModel.position.y = originalModelY - ep * 0.6
                        camelModel.rotation.x = -ep * 0.08

                        if (p >= 1) sitState = 'sitting'
                    }

                    if (sitState === 'sitting') {
                        // Hold the sitting pose
                        if (frontLeftLeg) frontLeftLeg.rotation.x = 1.5
                        if (frontRightLeg) frontRightLeg.rotation.x = 1.5
                        if (backLeftLeg) backLeftLeg.rotation.x = 1.2
                        if (backRightLeg) backRightLeg.rotation.x = 1.2
                        camelModel.position.y = originalModelY - 0.6
                        camelModel.rotation.x = -0.08
                    }

                    if (sitState === 'standing_up') {
                        const p = Math.min((elapsed - sitAnimStart) / SIT_DURATION, 1)
                        const ep = easeInOut(p)

                        // Phase 1 (0-0.6): Back legs extend first
                        const backExtend = easeInOut(Math.min(p / 0.6, 1))
                        // Phase 2 (0.3-1.0): Front legs extend
                        const frontExtend = easeInOut(Math.max(0, Math.min((p - 0.3) / 0.7, 1)))

                        if (frontLeftLeg) frontLeftLeg.rotation.x = 1.5 * (1 - frontExtend)
                        if (frontRightLeg) frontRightLeg.rotation.x = 1.5 * (1 - frontExtend)
                        if (backLeftLeg) backLeftLeg.rotation.x = 1.2 * (1 - backExtend)
                        if (backRightLeg) backRightLeg.rotation.x = 1.2 * (1 - backExtend)

                        // Body rises
                        camelModel.position.y = originalModelY - 0.6 * (1 - ep)
                        camelModel.rotation.x = -0.08 * (1 - ep)

                        if (p >= 1) {
                            sitState = 'standing'
                            hoverLeftTime = 0 // Reset timer
                        }
                    }
                }

                // --- Hit reaction: legs kick up (only when standing) ---
                if (isHit && sitState === 'standing') {
                    const hitProgress = (elapsed - hitTime) / HIT_DURATION

                    if (hitProgress >= 1) {
                        isHit = false
                        if (frontLeftLeg) frontLeftLeg.rotation.x = 0
                        if (frontRightLeg) frontRightLeg.rotation.x = 0
                        if (backLeftLeg) backLeftLeg.rotation.x = 0
                        if (backRightLeg) backRightLeg.rotation.x = 0
                        camelModel.rotation.x = 0
                    } else {
                        const kick = Math.sin(hitProgress * Math.PI)
                        const wiggle = Math.sin(hitProgress * Math.PI * 6) * (1 - hitProgress) * 0.3

                        if (frontLeftLeg) frontLeftLeg.rotation.x = kick * 1.0 + wiggle
                        if (frontRightLeg) frontRightLeg.rotation.x = kick * 1.0 - wiggle
                        if (backLeftLeg) backLeftLeg.rotation.x = -kick * 0.15
                        if (backRightLeg) backRightLeg.rotation.x = -kick * 0.15
                        camelModel.rotation.x = -kick * 0.2
                    }
                } else if (isHit && sitState !== 'standing') {
                    // If hit while sitting, stand up first
                    isHit = false
                    sitState = 'standing_up'
                    sitAnimStart = elapsed
                }
            }

            // --- Animate sand particles (gentle wind drift) ---
            sandParticles.forEach(p => {
                const t = elapsed * p.speed + p.phase
                // Drift sideways in the wind
                p.mesh.position.x = p.baseX + Math.sin(t * p.drift) * 1.5
                // Float up slowly and loop
                p.mesh.position.y = (p.baseY + elapsed * p.speed * 0.3) % 3.0
                // Gentle z wobble
                p.mesh.position.z += Math.sin(t * 2) * 0.001
            })

            renderer.render(scene, camera)
        }
        animate()

        // --- Cleanup ---
        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseleave', onMouseLeave)
            window.removeEventListener('resize', handleResize)
            renderer.domElement.removeEventListener('click', onCanvasClick)
            renderer.domElement.removeEventListener('mouseenter', onCanvasEnter)
            renderer.domElement.removeEventListener('mouseleave', onCanvasLeave)

            renderer.dispose()
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }

            // Dispose Three.js resources
            scene.traverse((child) => {
                if (child.geometry) child.geometry.dispose()
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((m) => m.dispose())
                    } else {
                        child.material.dispose()
                    }
                }
            })
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-full h-full hidden lg:block"
        />
    )
}

export default CamelScene
