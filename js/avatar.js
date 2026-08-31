/**
 * Animated Person Avatar Component & Kinetics Controller
 * Generates vector human coaches with blinking eyes, speaking mouth, and breathing torso.
 */
(function() {
  const AVATAR_SVGS = {
    maya: function(isSmall) {
      return `
        <svg class="avatar-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="mayaSkinGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FCE1C9"/>
              <stop offset="85%" stop-color="#EABF98"/>
              <stop offset="100%" stop-color="#DEB088"/>
            </radialGradient>
            <linearGradient id="mayaHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4A342B"/>
              <stop offset="100%" stop-color="#2B1C15"/>
            </linearGradient>
            <linearGradient id="mayaClothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#6E8E5E"/>
              <stop offset="100%" stop-color="#4A653D"/>
            </linearGradient>
          </defs>

          <!-- Back Hair Bun -->
          <circle cx="100" cy="54" r="30" fill="url(#mayaHairGrad)"/>
          <circle cx="100" cy="50" r="26" fill="#3D2920" opacity="0.6"/>

          <!-- Body / Chest & Shoulders (Breathing Group) -->
          <g class="avatar-chest">
            <!-- Neck -->
            <path d="M88 115 L88 140 Q100 146 112 140 L112 115 Z" fill="url(#mayaSkinGrad)"/>
            <path d="M88 122 Q100 130 112 122 L112 132 Q100 138 88 132 Z" fill="#D9A378" opacity="0.45"/>

            <!-- Torso / Clothing -->
            <path d="M46 195 Q52 145 84 138 Q100 142 116 138 Q148 145 154 195 Z" fill="url(#mayaClothGrad)"/>
            <!-- Collarbone & Neckline Accent -->
            <path d="M82 144 Q100 158 118 144" stroke="#9BB58D" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M88 152 Q100 162 112 152" stroke="#415935" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
          </g>

          <!-- Head Group (Gentle Head Motion) -->
          <g class="avatar-head">
            <!-- Ears -->
            <ellipse cx="64" cy="98" rx="6" ry="10" fill="url(#mayaSkinGrad)"/>
            <ellipse cx="136" cy="98" rx="6" ry="10" fill="url(#mayaSkinGrad)"/>
            <ellipse cx="64" cy="98" rx="3.5" ry="6" fill="#DEB088"/>
            <ellipse cx="136" cy="98" rx="3.5" ry="6" fill="#DEB088"/>

            <!-- Face Base -->
            <path d="M68 84 Q68 132 100 134 Q132 132 132 84 Q132 58 100 58 Q68 58 68 84 Z" fill="url(#mayaSkinGrad)"/>

            <!-- Cheeks Blush -->
            <ellipse cx="78" cy="104" rx="7" ry="4" fill="#F09B8A" opacity="0.35"/>
            <ellipse cx="122" cy="104" rx="7" ry="4" fill="#F09B8A" opacity="0.35"/>

            <!-- Eyebrows -->
            <path d="M76 80 Q85 76 92 80" stroke="#3D2920" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M108 80 Q115 76 124 80" stroke="#3D2920" stroke-width="2.5" stroke-linecap="round" fill="none"/>

            <!-- Eyes: Open (Animated Blinking) -->
            <g class="avatar-eye">
              <ellipse cx="84" cy="92" rx="4.8" ry="5.2" fill="#2B1C15"/>
              <circle cx="85.5" cy="90.5" r="1.6" fill="#FFFFFF"/>
              <ellipse cx="116" cy="92" rx="4.8" ry="5.2" fill="#2B1C15"/>
              <circle cx="117.5" cy="90.5" r="1.6" fill="#FFFFFF"/>
            </g>

            <!-- Eyes: Serene Closed Lines (Breathing Mode) -->
            <g class="avatar-eye-closed-line">
              <path d="M79 92 Q84 96 89 92" stroke="#2B1C15" stroke-width="2.4" stroke-linecap="round" fill="none"/>
              <path d="M111 92 Q116 96 121 92" stroke="#2B1C15" stroke-width="2.4" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Nose -->
            <path d="M99 92 Q100 102 103 103" stroke="#C99369" stroke-width="2" stroke-linecap="round" fill="none"/>

            <!-- Mouth: Closed (Gentle Smile) -->
            <path class="avatar-mouth-closed" d="M92 113 Q100 120 108 113" stroke="#8A4A40" stroke-width="2.6" stroke-linecap="round" fill="none"/>

            <!-- Mouth: Open (Speaking / Voice Reactive) -->
            <g class="avatar-mouth-open">
              <ellipse cx="100" cy="115" rx="6.5" ry="5" fill="#6A2E26"/>
              <path d="M95 114 Q100 112 105 114" stroke="#FFF" stroke-width="1.8" stroke-linecap="round"/>
            </g>

            <!-- Front Hair & Parting -->
            <path d="M68 80 C68 50 82 46 100 46 C118 46 132 50 132 80 C132 64 122 56 104 56 C86 56 68 64 68 80 Z" fill="url(#mayaHairGrad)"/>
            <path d="M68 76 Q84 62 100 70 Q78 84 70 94 Z" fill="url(#mayaHairGrad)"/>
            <path d="M132 76 Q116 62 100 70 Q122 84 130 94 Z" fill="url(#mayaHairGrad)"/>
          </g>
        </svg>
      `;
    },

    alex: function(isSmall) {
      return `
        <svg class="avatar-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="alexSkinGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#FCE1C9"/>
              <stop offset="85%" stop-color="#E8BC95"/>
              <stop offset="100%" stop-color="#DCAB7F"/>
            </radialGradient>
            <linearGradient id="alexHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3A2C27"/>
              <stop offset="100%" stop-color="#1F1512"/>
            </linearGradient>
            <linearGradient id="alexClothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#B87D3B"/>
              <stop offset="100%" stop-color="#8A5A22"/>
            </linearGradient>
          </defs>

          <!-- Body / Chest & Shoulders (Breathing Group) -->
          <g class="avatar-chest">
            <!-- Neck -->
            <path d="M86 114 L86 142 Q100 148 114 142 L114 114 Z" fill="url(#alexSkinGrad)"/>
            <path d="M86 122 Q100 130 114 122 L114 132 Q100 140 86 132 Z" fill="#D39D72" opacity="0.45"/>

            <!-- Torso / Ochre Athletic Sweater -->
            <path d="M42 195 Q50 142 82 136 Q100 140 118 136 Q150 142 158 195 Z" fill="url(#alexClothGrad)"/>
            <!-- V-Neck Collar Accent -->
            <path d="M80 138 L100 156 L120 138" stroke="#F6F4EC" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </g>

          <!-- Head Group (Gentle Motion) -->
          <g class="avatar-head">
            <!-- Ears -->
            <ellipse cx="62" cy="96" rx="6.5" ry="11" fill="url(#alexSkinGrad)"/>
            <ellipse cx="138" cy="96" rx="6.5" ry="11" fill="url(#alexSkinGrad)"/>
            <ellipse cx="62" cy="96" rx="3.5" ry="6" fill="#DCAB7F"/>
            <ellipse cx="138" cy="96" rx="3.5" ry="6" fill="#DCAB7F"/>

            <!-- Face Base -->
            <path d="M66 82 Q66 130 100 133 Q134 130 134 82 Q134 56 100 56 Q66 56 66 82 Z" fill="url(#alexSkinGrad)"/>

            <!-- Cheeks Blush -->
            <ellipse cx="76" cy="103" rx="7" ry="4" fill="#F09B8A" opacity="0.3"/>
            <ellipse cx="124" cy="103" rx="7" ry="4" fill="#F09B8A" opacity="0.3"/>

            <!-- Eyebrows -->
            <path d="M74 78 Q84 74 93 78" stroke="#1F1512" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M107 78 Q116 74 126 78" stroke="#1F1512" stroke-width="3" stroke-linecap="round" fill="none"/>

            <!-- Eyes: Open (Animated Blinking) -->
            <g class="avatar-eye">
              <ellipse cx="83" cy="91" rx="5" ry="5.2" fill="#1F1512"/>
              <circle cx="84.5" cy="89.5" r="1.6" fill="#FFFFFF"/>
              <ellipse cx="117" cy="91" rx="5" ry="5.2" fill="#1F1512"/>
              <circle cx="118.5" cy="89.5" r="1.6" fill="#FFFFFF"/>
            </g>

            <!-- Eyes: Serene Closed Lines -->
            <g class="avatar-eye-closed-line">
              <path d="M78 91 Q83 95 88 91" stroke="#1F1512" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              <path d="M112 91 Q117 95 122 91" stroke="#1F1512" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Nose -->
            <path d="M99 90 L98 101 L103 102" stroke="#C99369" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

            <!-- Mouth: Closed (Confident Warm Smile) -->
            <path class="avatar-mouth-closed" d="M91 113 Q100 121 109 113" stroke="#8A4A40" stroke-width="2.8" stroke-linecap="round" fill="none"/>

            <!-- Mouth: Open (Speaking / Voice Reactive) -->
            <g class="avatar-mouth-open">
              <ellipse cx="100" cy="115" rx="7" ry="5.2" fill="#6A2E26"/>
              <path d="M94 113 Q100 111 106 113" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
            </g>

            <!-- Hair: Modern Textured Crop -->
            <path d="M64 76 C62 50 80 40 100 40 C120 40 138 50 136 76 C136 58 126 50 100 50 C74 50 64 58 64 76 Z" fill="url(#alexHairGrad)"/>
            <path d="M64 72 Q80 48 104 50 Q128 48 136 68 Q126 58 108 60 Q86 58 64 72 Z" fill="url(#alexHairGrad)"/>
          </g>
        </svg>
      `;
    }
  };

  window.AvatarController = {
    render: function(containerElement, avatarId, isSmall) {
      if (!containerElement) return;
      const id = avatarId || 'maya';
      const generator = AVATAR_SVGS[id] || AVATAR_SVGS.maya;
      containerElement.innerHTML = generator(isSmall);
    },

    setBreathingState: function(stageElement, state) {
      if (!stageElement) return;
      stageElement.classList.remove('inhale', 'hold', 'exhale', 'idle');
      if (state && state !== 'idle') {
        stageElement.classList.add(state);
      }
    },

    setBreathingMode: function(stageElement, enabled) {
      if (!stageElement) return;
      stageElement.classList.toggle('breathing-mode', !!enabled);
    }
  };
})();
