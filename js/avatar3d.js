/**
 * 3D Realistic Avatar & Kinetic Mannequin Engine (Three.js WebGL)
 * Features:
 * - PBR material shading & studio 3-point lighting
 * - Interactive 3D gaze tracking (mouse / touch)
 * - Articulated 3D eyelids (natural blinking + meditative closure)
 * - Speech-synced 3D mouth & jaw articulation
 * - Realistic 3D chest/torso breathing kinematics
 * - 3D procedural anatomical stretch mannequin with kinetic rotations
 */
(function() {
  // Global pointer state for gaze tracking
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    pointer.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Track active instances
  const activeAvatarInstances = new Map();
  let stretchInstance = null;

  /**
   * Helper: Create 3D Avatar Character Rig
   */
  function createAvatarCharacter(avatarId) {
    const config = (window.APP_CONFIG && window.APP_CONFIG.avatars[avatarId]) || window.APP_CONFIG.avatars.maya;
    const group = new THREE.Group();

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: config.skinColor || 0xF7D0B4,
      roughness: 0.55,
      metalness: 0.08
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: config.hairColor || 0x3D281E,
      roughness: 0.7,
      metalness: 0.15
    });
    const clothMat = new THREE.MeshStandardMaterial({
      color: config.clothingColor || 0x5C7A4E,
      roughness: 0.65,
      metalness: 0.12
    });
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
    const irisColor = avatarId === 'alex' ? 0x4A6B82 : avatarId === 'priya' ? 0x2A1C16 : 0x3E5A36;
    const irisMat = new THREE.MeshStandardMaterial({ color: irisColor, roughness: 0.3 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0A0A0A });
    const lipMat = new THREE.MeshStandardMaterial({ color: 0xB56555, roughness: 0.45 });

    // 1. Torso / Shoulders (Breathing Root)
    const torsoGroup = new THREE.Group();
    const torsoGeo = new THREE.CylinderGeometry(0.85, 1.15, 1.4, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, clothMat);
    torsoMesh.position.y = -1.25;
    torsoMesh.scale.set(1.3, 1.0, 0.85);
    torsoGroup.add(torsoMesh);

    // Collar trim
    const collarGeo = new THREE.TorusGeometry(0.52, 0.06, 16, 32);
    const collarMesh = new THREE.Mesh(collarGeo, new THREE.MeshStandardMaterial({ color: 0xF6F4EC, roughness: 0.5 }));
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.set(0, -0.55, 0.05);
    torsoGroup.add(collarMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.65, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = -0.32;
    torsoGroup.add(neckMesh);

    group.add(torsoGroup);

    // 2. Head Group (Rotates with gaze)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.2, 0);

    // Head Base Mesh (Cranium & Jaw)
    const craniumGeo = new THREE.SphereGeometry(0.68, 32, 28);
    craniumGeo.scale(0.92, 1.12, 0.96);
    const craniumMesh = new THREE.Mesh(craniumGeo, skinMat);
    craniumMesh.position.set(0, 0.15, 0);
    headGroup.add(craniumMesh);

    // Jaw / Chin refinement
    const chinGeo = new THREE.SphereGeometry(0.38, 24, 20);
    chinGeo.scale(0.85, 0.9, 0.8);
    const chinMesh = new THREE.Mesh(chinGeo, skinMat);
    chinMesh.position.set(0, -0.32, 0.28);
    headGroup.add(chinMesh);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.16, 16, 16);
    earGeo.scale(0.4, 1.0, 0.7);
    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.64, 0.1, -0.05);
    leftEar.rotation.y = -0.2;
    const rightEar = new THREE.Mesh(earGeo, skinMat);
    rightEar.position.set(0.64, 0.1, -0.05);
    rightEar.rotation.y = 0.2;
    headGroup.add(leftEar, rightEar);

    // 3. Eyes & Eyelids (Articulated Rig)
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(0, 0.16, 0.52);

    function createEye(x) {
      const eyeRig = new THREE.Group();
      eyeRig.position.x = x;

      // Eyeball
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 20), eyeWhiteMat);
      eyeRig.add(ball);

      // Iris & Pupil
      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 16), irisMat);
      iris.position.z = 0.09;
      iris.scale.z = 0.4;
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 16), pupilMat);
      pupil.position.z = 0.115;
      pupil.scale.z = 0.3;
      eyeRig.add(iris, pupil);

      // Upper Eyelid (for blinking & meditating)
      const lidGeo = new THREE.SphereGeometry(0.152, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2);
      const upperLid = new THREE.Mesh(lidGeo, skinMat);
      upperLid.rotation.x = -Math.PI / 2;
      upperLid.position.z = 0.01;
      eyeRig.add(upperLid);

      return { rig: eyeRig, lid: upperLid, iris: iris, pupil: pupil };
    }

    const leftEye = createEye(-0.23);
    const rightEye = createEye(0.23);
    eyeGroup.add(leftEye.rig, rightEye.rig);
    headGroup.add(eyeGroup);

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.18, 0.035, 0.05);
    const leftBrow = new THREE.Mesh(browGeo, hairMat);
    leftBrow.position.set(-0.23, 0.34, 0.56);
    leftBrow.rotation.z = 0.08;
    const rightBrow = new THREE.Mesh(browGeo, hairMat);
    rightBrow.position.set(0.23, 0.34, 0.56);
    rightBrow.rotation.z = -0.08;
    headGroup.add(leftBrow, rightBrow);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.08, 0.22, 16);
    const noseMesh = new THREE.Mesh(noseGeo, skinMat);
    noseMesh.rotation.x = -0.3;
    noseMesh.position.set(0, 0.04, 0.65);
    headGroup.add(noseMesh);

    // 4. Mouth & Jaw (Speech-Reactive Rig)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.22, 0.56);

    const upperLip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18, 16), lipMat);
    upperLip.rotation.z = Math.PI / 2;
    upperLip.position.y = 0.02;

    const lowerLip = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.16, 16), lipMat);
    lowerLip.rotation.z = Math.PI / 2;
    lowerLip.position.y = -0.03;

    const mouthCavity = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), new THREE.MeshBasicMaterial({ color: 0x301010 }));
    mouthCavity.scale.set(1.2, 0.2, 0.5);
    mouthCavity.position.z = -0.03;

    mouthGroup.add(upperLip, lowerLip, mouthCavity);
    headGroup.add(mouthGroup);

    // 5. Styled Hair Meshes
    const hairGroup = new THREE.Group();
    if (config.hairStyle === 'bun') {
      // Maya: Crown volume & elegant high bun
      const hairCrown = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 24), hairMat);
      hairCrown.position.set(0, 0.28, -0.08);
      hairCrown.scale.set(0.95, 1.05, 1.05);

      const bunGeo = new THREE.SphereGeometry(0.36, 24, 20);
      const bunMesh = new THREE.Mesh(bunGeo, hairMat);
      bunMesh.position.set(0, 0.85, -0.3);
      bunMesh.scale.set(1.1, 0.9, 0.9);

      hairGroup.add(hairCrown, bunMesh);
    } else if (config.hairStyle === 'crop') {
      // Alex: Textured modern short crop
      const cropCrown = new THREE.Mesh(new THREE.SphereGeometry(0.73, 32, 24), hairMat);
      cropCrown.position.set(0, 0.28, -0.06);
      cropCrown.scale.set(0.96, 1.06, 1.04);

      const fringeGeo = new THREE.BoxGeometry(0.55, 0.16, 0.22);
      const fringeMesh = new THREE.Mesh(fringeGeo, hairMat);
      fringeMesh.position.set(0, 0.72, 0.44);
      fringeMesh.rotation.x = -0.3;

      hairGroup.add(cropCrown, fringeMesh);
    } else {
      // Priya: Sleek high ponytail
      const hairCrown = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 24), hairMat);
      hairCrown.position.set(0, 0.28, -0.08);
      hairCrown.scale.set(0.95, 1.05, 1.05);

      const ponyGeo = new THREE.CylinderGeometry(0.12, 0.26, 0.85, 16);
      const ponyMesh = new THREE.Mesh(ponyGeo, hairMat);
      ponyMesh.position.set(0, 0.65, -0.72);
      ponyMesh.rotation.x = 0.5;

      hairGroup.add(hairCrown, ponyMesh);
    }
    headGroup.add(hairGroup);

    group.add(headGroup);

    return {
      root: group,
      head: headGroup,
      torso: torsoGroup,
      leftEye: leftEye,
      rightEye: rightEye,
      mouth: mouthGroup,
      lowerLip: lowerLip,
      mouthCavity: mouthCavity
    };
  }

  /**
   * Main 3D Avatar Controller Class
   */
  class Avatar3DView {
    constructor(container, avatarId, isSmall) {
      this.container = container;
      this.avatarId = avatarId || 'maya';
      this.isSmall = !!isSmall;
      this.breathingState = 'idle';
      this.breathingMode = false;
      this.isSpeaking = false;
      this.mouthOpen = 0;
      this.blinkTimer = 0;
      this.blinkProgress = 0;
      this.breathCycleTime = 0;
      this.animFrameId = null;

      this.initScene();
    }

    initScene() {
      const width = this.container.clientWidth || (this.isSmall ? 64 : 190);
      const height = this.container.clientHeight || (this.isSmall ? 64 : 190);

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      this.camera.position.set(0, 0.15, this.isSmall ? 3.6 : 3.25);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.05;

      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      // Studio 3-Point Lighting
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.72);
      const keyLight = new THREE.DirectionalLight(0xFFF6EE, 1.15);
      keyLight.position.set(2.5, 3.5, 3.0);
      const fillLight = new THREE.DirectionalLight(0xE3ECF8, 0.55);
      fillLight.position.set(-2.8, 1.5, 1.5);
      const rimLight = new THREE.DirectionalLight(0x93AD84, 0.75);
      rimLight.position.set(0, 3.0, -3.0);

      this.scene.add(ambientLight, keyLight, fillLight, rimLight);

      this.character = createAvatarCharacter(this.avatarId);
      this.scene.add(this.character.root);

      this.boundAnimate = this.animate.bind(this);
      this.animate();
    }

    setAvatar(avatarId) {
      if (this.avatarId === avatarId) return;
      this.avatarId = avatarId;
      if (this.character) {
        this.scene.remove(this.character.root);
      }
      this.character = createAvatarCharacter(avatarId);
      this.scene.add(this.character.root);
    }

    setBreathingState(state) {
      this.breathingState = state || 'idle';
    }

    setBreathingMode(enabled) {
      this.breathingMode = !!enabled;
    }

    setSpeaking(speaking) {
      this.isSpeaking = !!speaking;
    }

    animate() {
      this.animFrameId = requestAnimationFrame(this.boundAnimate);

      const time = performance.now() * 0.001;

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      if (this.character) {
        // 1. Natural Gaze & Head Orientation
        const targetRotY = pointer.x * 0.28;
        const targetRotX = -pointer.y * 0.18;
        this.character.head.rotation.y += (targetRotY - this.character.head.rotation.y) * 0.08;
        this.character.head.rotation.x += (targetRotX - this.character.head.rotation.x) * 0.08;

        // Eye pupil tracking
        const eyePupilX = pointer.x * 0.025;
        const eyePupilY = pointer.y * 0.02;
        this.character.leftEye.iris.position.x = eyePupilX;
        this.character.leftEye.iris.position.y = eyePupilY;
        this.character.rightEye.iris.position.x = eyePupilX;
        this.character.rightEye.iris.position.y = eyePupilY;

        // 2. 3D Eyelid Dynamics (Blinking + Meditative closure)
        if (this.breathingMode) {
          // Closed eyes during deep breathing
          this.character.leftEye.lid.rotation.x = 0.05;
          this.character.rightEye.lid.rotation.x = 0.05;
        } else {
          this.blinkTimer += 0.016;
          if (this.blinkTimer > 3.8) {
            this.blinkProgress += 0.18;
            const blinkVal = Math.sin(this.blinkProgress * Math.PI);
            const lidAngle = -Math.PI / 2 + blinkVal * (Math.PI / 2 + 0.1);
            this.character.leftEye.lid.rotation.x = lidAngle;
            this.character.rightEye.lid.rotation.x = lidAngle;

            if (this.blinkProgress >= 1.0) {
              this.blinkTimer = Math.random() * 1.5;
              this.blinkProgress = 0;
              this.character.leftEye.lid.rotation.x = -Math.PI / 2;
              this.character.rightEye.lid.rotation.x = -Math.PI / 2;
            }
          }
        }

        // 3. Speech-Synced 3D Mouth Articulation
        if (this.isSpeaking) {
          const talkCycle = Math.sin(time * 18) * 0.5 + 0.5;
          this.character.lowerLip.position.y = -0.03 - talkCycle * 0.08;
          this.character.mouthCavity.scale.y = 0.2 + talkCycle * 0.9;
        } else {
          this.character.lowerLip.position.y = -0.03;
          this.character.mouthCavity.scale.y = 0.2;
        }

        // 4. Realistic 3D Chest/Torso Breathing Kinetics
        let targetChestScaleY = 1.0;
        let targetChestScaleX = 1.3;
        let targetTorsoY = 0;

        if (this.breathingState === 'inhale') {
          targetChestScaleY = 1.14;
          targetChestScaleX = 1.38;
          targetTorsoY = 0.06;
        } else if (this.breathingState === 'hold') {
          targetChestScaleY = 1.14 + Math.sin(time * 4) * 0.015;
          targetChestScaleX = 1.38;
          targetTorsoY = 0.06;
        } else if (this.breathingState === 'exhale') {
          targetChestScaleY = 0.95;
          targetChestScaleX = 1.25;
          targetTorsoY = -0.04;
        } else {
          // Idle breathing rhythm
          const idleBreath = Math.sin(time * 1.8) * 0.03;
          targetChestScaleY = 1.0 + idleBreath;
          targetTorsoY = idleBreath * 0.5;
        }

        this.character.torso.scale.y += (targetChestScaleY - this.character.torso.scale.y) * 0.05;
        this.character.torso.scale.x += (targetChestScaleX - this.character.torso.scale.x) * 0.05;
        this.character.torso.position.y += (targetTorsoY - this.character.torso.position.y) * 0.05;
      }

      this.renderer.render(this.scene, this.camera);
    }

    destroy() {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
      if (this.renderer && this.renderer.domElement) {
        this.container.innerHTML = '';
      }
    }
  }

  /**
   * 3D Anatomical Kinetic Stretch Mannequin
   */
  class Stretch3DView {
    constructor(container) {
      this.container = container;
      this.currentPose = 'neck';
      this.animFrameId = null;
      this.initScene();
    }

    initScene() {
      const width = this.container.clientWidth || 360;
      const height = this.container.clientHeight || 160;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      this.camera.position.set(0, 0.3, 3.8);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      const amb = new THREE.AmbientLight(0xFFFFFF, 0.8);
      const dir = new THREE.DirectionalLight(0xFFF5EA, 1.0);
      dir.position.set(3, 4, 3);
      this.scene.add(amb, dir);

      this.buildMannequin();
      this.boundAnimate = this.animate.bind(this);
      this.animate();
    }

    buildMannequin() {
      this.mannequin = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x5C7A4E, roughness: 0.5 });
      const jointMat = new THREE.MeshStandardMaterial({ color: 0xA9702E, roughness: 0.4 });
      const headMat = new THREE.MeshStandardMaterial({ color: 0xF2C9A5, roughness: 0.6 });

      // Torso
      this.torso = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.9, 20), bodyMat);
      this.torso.position.y = -0.2;
      this.mannequin.add(this.torso);

      // Head
      this.head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 20), headMat);
      this.head.position.y = 0.55;
      this.mannequin.add(this.head);

      // Arms (Shoulders & Forearms)
      this.leftShoulder = new THREE.Group();
      this.leftShoulder.position.set(-0.52, 0.15, 0);
      const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.65, 16), bodyMat);
      leftArm.position.y = -0.32;
      this.leftShoulder.add(new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), jointMat), leftArm);

      this.rightShoulder = new THREE.Group();
      this.rightShoulder.position.set(0.52, 0.15, 0);
      const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.65, 16), bodyMat);
      rightArm.position.y = -0.32;
      this.rightShoulder.add(new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), jointMat), rightArm);

      this.mannequin.add(this.leftShoulder, this.rightShoulder);
      this.scene.add(this.mannequin);
    }

    setPose(poseId) {
      this.currentPose = poseId || 'neck';
    }

    animate() {
      this.animFrameId = requestAnimationFrame(this.boundAnimate);
      const time = performance.now() * 0.001;

      // Gentle turntable view
      this.mannequin.rotation.y = Math.sin(time * 0.5) * 0.25;

      if (this.currentPose.includes('neck') || this.currentPose.includes('chin') || this.currentPose.includes('eye')) {
        // Neck / Head Motion
        this.head.rotation.z = Math.sin(time * 2.0) * 0.35;
        this.head.rotation.y = Math.cos(time * 1.5) * 0.2;
        this.leftShoulder.rotation.z = 0.1;
        this.rightShoulder.rotation.z = -0.1;
      } else if (this.currentPose.includes('shoulder') || this.currentPose.includes('trap')) {
        // Shoulder Rolls
        const rollY = Math.sin(time * 2.5) * 0.15;
        const rollZ = Math.cos(time * 2.5) * 0.4;
        this.leftShoulder.position.y = 0.15 + rollY;
        this.leftShoulder.rotation.x = rollZ;
        this.rightShoulder.position.y = 0.15 + rollY;
        this.rightShoulder.rotation.x = rollZ;
      } else if (this.currentPose.includes('twist') || this.currentPose.includes('thoracic') || this.currentPose.includes('side')) {
        // Torso Twist
        this.torso.rotation.y = Math.sin(time * 1.8) * 0.6;
        this.head.rotation.y = Math.sin(time * 1.8) * 0.75;
        this.leftShoulder.rotation.x = 0.6;
        this.rightShoulder.rotation.x = -0.6;
      } else {
        // Reach to Sky / Overhead
        const reachLift = Math.sin(time * 2.0) * 0.2 + 2.8;
        this.leftShoulder.rotation.z = reachLift;
        this.rightShoulder.rotation.z = -reachLift;
        this.head.rotation.x = -0.35;
      }

      this.renderer.render(this.scene, this.camera);
    }

    destroy() {
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    }
  }

  // Public Interface
  window.Avatar3D = {
    mount: function(containerId, avatarId, isSmall) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) return null;

      if (activeAvatarInstances.has(container)) {
        const existing = activeAvatarInstances.get(container);
        existing.setAvatar(avatarId);
        return existing;
      }

      const instance = new Avatar3DView(container, avatarId, isSmall);
      activeAvatarInstances.set(container, instance);
      return instance;
    },

    setBreathingState: function(state) {
      activeAvatarInstances.forEach(inst => inst.setBreathingState(state));
    },

    setBreathingMode: function(enabled) {
      activeAvatarInstances.forEach(inst => inst.setBreathingMode(enabled));
    },

    setSpeaking: function(speaking) {
      activeAvatarInstances.forEach(inst => inst.setSpeaking(speaking));
    },

    mountStretchMannequin: function(containerId, poseId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) return null;

      if (!stretchInstance) {
        stretchInstance = new Stretch3DView(container);
      }
      stretchInstance.setPose(poseId);
      return stretchInstance;
    }
  };
})();
