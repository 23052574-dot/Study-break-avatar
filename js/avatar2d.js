/**
 * Realistic 2D Character Renderer & Kinetics Controller
 * Generates handcrafted, realistic SVG character art for Maya, Alex, and Priya
 * with natural eye blinking, meditative closed-eye states, speech lip-sync, and organic chest breathing.
 */
(function() {
  const REALISTIC_AVATARS = {
    maya: function(isSmall) {
      return `
        <svg class="avatar-svg" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="mayaSkin" cx="50%" cy="38%" r="62%">
              <stop offset="0%" stop-color="#FFE7D6"/>
              <stop offset="60%" stop-color="#F5CBA7"/>
              <stop offset="90%" stop-color="#E5B28B"/>
              <stop offset="100%" stop-color="#D49A70"/>
            </radialGradient>
            <linearGradient id="mayaHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4A342B"/>
              <stop offset="45%" stop-color="#34221A"/>
              <stop offset="100%" stop-color="#20130E"/>
            </linearGradient>
            <linearGradient id="mayaCloth" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#719361"/>
              <stop offset="50%" stop-color="#5C7A4E"/>
              <stop offset="100%" stop-color="#435C36"/>
            </linearGradient>
            <radialGradient id="mayaIris" cx="40%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#6F8B60"/>
              <stop offset="70%" stop-color="#48623A"/>
              <stop offset="100%" stop-color="#283A1E"/>
            </radialGradient>
          </defs>

          <!-- Hair: High Bun (Back layer) -->
          <circle cx="110" cy="52" r="32" fill="url(#mayaHair)"/>
          <ellipse cx="110" cy="48" rx="28" ry="24" fill="#3D2820" opacity="0.6"/>
          <path d="M92 48 Q110 36 128 48" stroke="#5E4236" stroke-width="2.5" fill="none" opacity="0.7"/>

          <!-- Body / Chest (Breathing Group) -->
          <g class="avatar-chest">
            <!-- Neck & Clavicle Shading -->
            <path d="M96 125 L96 156 Q110 162 124 156 L124 125 Z" fill="url(#mayaSkin)"/>
            <path d="M96 134 Q110 144 124 134 L124 146 Q110 154 96 146 Z" fill="#D49A70" opacity="0.38"/>

            <!-- Torso / Sage Athletic Knit -->
            <path d="M46 220 Q56 160 90 152 Q110 156 130 152 Q164 160 174 220 Z" fill="url(#mayaCloth)"/>
            <!-- Collar Trim & Shadow -->
            <path d="M88 158 Q110 172 132 158" stroke="#93AD84" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <path d="M94 167 Q110 177 126 167" stroke="#374D2C" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.55"/>
          </g>

          <!-- Head Group (Subtle natural tilts) -->
          <g class="avatar-head">
            <!-- Ears -->
            <ellipse cx="69" cy="108" rx="6.5" ry="11" fill="url(#mayaSkin)"/>
            <ellipse cx="151" cy="108" rx="6.5" ry="11" fill="url(#mayaSkin)"/>
            <ellipse cx="69" cy="108" rx="3.5" ry="6.5" fill="#D49A70" opacity="0.6"/>
            <ellipse cx="151" cy="108" rx="3.5" ry="6.5" fill="#D49A70" opacity="0.6"/>

            <!-- Face Structure -->
            <path d="M74 92 C74 144 86 148 110 148 C134 148 146 144 146 92 C146 62 132 60 110 60 C88 60 74 62 74 92 Z" fill="url(#mayaSkin)"/>

            <!-- Cheek Blush & Contour -->
            <ellipse cx="85" cy="116" rx="9" ry="5.5" fill="#F09B8A" opacity="0.3"/>
            <ellipse cx="135" cy="116" rx="9" ry="5.5" fill="#F09B8A" opacity="0.3"/>

            <!-- Eyebrows (Realistic curved arches) -->
            <path d="M82 90 Q92 84 101 88" stroke="#34221A" stroke-width="2.6" stroke-linecap="round" fill="none"/>
            <path d="M119 88 Q128 84 138 90" stroke="#34221A" stroke-width="2.6" stroke-linecap="round" fill="none"/>

            <!-- Eyes: Open with Realistic Iris & Blinking Animation -->
            <g class="avatar-eye-open">
              <!-- Left Eye -->
              <ellipse cx="91" cy="102" rx="6.8" ry="4.5" fill="#FFFFFF"/>
              <ellipse cx="91" cy="102" rx="4.0" ry="4.0" fill="url(#mayaIris)"/>
              <circle cx="91" cy="102" r="2.0" fill="#141E10"/>
              <circle cx="92.5" cy="100.5" r="1.3" fill="#FFFFFF"/>
              <path d="M84 101 Q91 97 98 101" stroke="#2B1B14" stroke-width="1.8" stroke-linecap="round" fill="none"/>

              <!-- Right Eye -->
              <ellipse cx="129" cy="102" rx="6.8" ry="4.5" fill="#FFFFFF"/>
              <ellipse cx="129" cy="102" rx="4.0" ry="4.0" fill="url(#mayaIris)"/>
              <circle cx="129" cy="102" r="2.0" fill="#141E10"/>
              <circle cx="130.5" cy="100.5" r="1.3" fill="#FFFFFF"/>
              <path d="M122 101 Q129 97 136 101" stroke="#2B1B14" stroke-width="1.8" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Eyes: Serene Closed State (Breathing Mode) -->
            <g class="avatar-eye-closed">
              <path d="M85 103 Q91 107 97 103" stroke="#2B1B14" stroke-width="2.4" stroke-linecap="round" fill="none"/>
              <path d="M123 103 Q129 107 135 103" stroke="#2B1B14" stroke-width="2.4" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Nose (Realistic subtle bridge & nostrils) -->
            <path d="M109 100 L108 114 Q110 116 113 115" stroke="#C98B60" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

            <!-- Mouth: Idle Gentle Smile -->
            <g class="avatar-mouth-idle">
              <path d="M101 127 Q110 134 119 127" stroke="#94483C" stroke-width="2.6" stroke-linecap="round" fill="none"/>
              <path d="M104 129 Q110 131 116 129" stroke="#B86659" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.8"/>
            </g>

            <!-- Mouth: Speaking (Speech Synced) -->
            <g class="avatar-mouth-speaking">
              <ellipse cx="110" cy="129" rx="7.5" ry="5.5" fill="#6A2E26"/>
              <path d="M104 127 Q110 125 116 127" stroke="#FFF" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M105 132 Q110 134 115 132" stroke="#C97467" stroke-width="1.6" stroke-linecap="round"/>
            </g>

            <!-- Hair: Front Strands & Soft Parting -->
            <path d="M74 88 C74 54 88 50 110 50 C132 50 146 54 146 88 C146 70 134 60 114 60 C94 60 74 70 74 88 Z" fill="url(#mayaHair)"/>
            <path d="M74 84 Q94 68 112 76 Q86 92 76 104 Z" fill="url(#mayaHair)"/>
            <path d="M146 84 Q126 68 112 76 Q134 92 144 104 Z" fill="url(#mayaHair)"/>
          </g>
        </svg>
      `;
    },

    alex: function(isSmall) {
      return `
        <svg class="avatar-svg" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="alexSkin" cx="50%" cy="38%" r="62%">
              <stop offset="0%" stop-color="#FFEAD8"/>
              <stop offset="60%" stop-color="#F3C9A8"/>
              <stop offset="90%" stop-color="#E2B088"/>
              <stop offset="100%" stop-color="#CF966A"/>
            </radialGradient>
            <linearGradient id="alexHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3A2C27"/>
              <stop offset="50%" stop-color="#241914"/>
              <stop offset="100%" stop-color="#120B08"/>
            </linearGradient>
            <linearGradient id="alexCloth" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#C28747"/>
              <stop offset="50%" stop-color="#A9702E"/>
              <stop offset="100%" stop-color="#7B4E18"/>
            </linearGradient>
            <radialGradient id="alexIris" cx="40%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#5E839E"/>
              <stop offset="70%" stop-color="#3D5A72"/>
              <stop offset="100%" stop-color="#1B2E3E"/>
            </radialGradient>
          </defs>

          <!-- Body / Chest (Breathing Group) -->
          <g class="avatar-chest">
            <!-- Neck -->
            <path d="M94 125 L94 158 Q110 164 126 158 L126 125 Z" fill="url(#alexSkin)"/>
            <path d="M94 134 Q110 144 126 134 L126 146 Q110 156 94 146 Z" fill="#CF966A" opacity="0.38"/>

            <!-- Torso / Ochre Athletic Sweater -->
            <path d="M42 220 Q52 158 88 150 Q110 154 132 150 Q168 158 178 220 Z" fill="url(#alexCloth)"/>
            <!-- V-Neck Collar Accent -->
            <path d="M86 152 L110 172 L134 152" stroke="#F6F4EC" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M92 156 L110 170 L128 156" stroke="#684112" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.6"/>
          </g>

          <!-- Head Group (Subtle natural motion) -->
          <g class="avatar-head">
            <!-- Ears -->
            <ellipse cx="67" cy="106" rx="7" ry="12" fill="url(#alexSkin)"/>
            <ellipse cx="153" cy="106" rx="7" ry="12" fill="url(#alexSkin)"/>
            <ellipse cx="67" cy="106" rx="3.8" ry="7" fill="#CF966A" opacity="0.6"/>
            <ellipse cx="153" cy="106" rx="3.8" ry="7" fill="#CF966A" opacity="0.6"/>

            <!-- Face Structure (Stronger jawline) -->
            <path d="M72 90 C72 142 84 148 110 148 C136 148 148 142 148 90 C148 60 134 58 110 58 C86 58 72 60 72 90 Z" fill="url(#alexSkin)"/>

            <!-- Cheek Shadow -->
            <ellipse cx="83" cy="115" rx="9" ry="5.5" fill="#F09B8A" opacity="0.25"/>
            <ellipse cx="137" cy="115" rx="9" ry="5.5" fill="#F09B8A" opacity="0.25"/>

            <!-- Eyebrows (Strong, defined) -->
            <path d="M80 88 Q90 82 101 86" stroke="#120B08" stroke-width="3.2" stroke-linecap="round" fill="none"/>
            <path d="M119 86 Q130 82 140 88" stroke="#120B08" stroke-width="3.2" stroke-linecap="round" fill="none"/>

            <!-- Eyes: Open with Blue-Slate Iris & Realistic Blinking -->
            <g class="avatar-eye-open">
              <!-- Left Eye -->
              <ellipse cx="90" cy="100" rx="7.0" ry="4.8" fill="#FFFFFF"/>
              <ellipse cx="90" cy="100" rx="4.2" ry="4.2" fill="url(#alexIris)"/>
              <circle cx="90" cy="100" r="2.1" fill="#0C151D"/>
              <circle cx="91.5" cy="98.5" r="1.4" fill="#FFFFFF"/>
              <path d="M83 99 Q90 95 97 99" stroke="#1F1512" stroke-width="2.0" stroke-linecap="round" fill="none"/>

              <!-- Right Eye -->
              <ellipse cx="130" cy="100" rx="7.0" ry="4.8" fill="#FFFFFF"/>
              <ellipse cx="130" cy="100" rx="4.2" ry="4.2" fill="url(#alexIris)"/>
              <circle cx="130" cy="100" r="2.1" fill="#0C151D"/>
              <circle cx="131.5" cy="98.5" r="1.4" fill="#FFFFFF"/>
              <path d="M123 99 Q130 95 137 99" stroke="#1F1512" stroke-width="2.0" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Eyes: Closed (Breathing Mode) -->
            <g class="avatar-eye-closed">
              <path d="M84 101 Q90 105 96 101" stroke="#1F1512" stroke-width="2.6" stroke-linecap="round" fill="none"/>
              <path d="M124 101 Q130 105 136 101" stroke="#1F1512" stroke-width="2.6" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Nose (Crisp anatomical shape) -->
            <path d="M109 98 L107 113 L113 115" stroke="#C28659" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

            <!-- Mouth: Idle Confident Smile -->
            <g class="avatar-mouth-idle">
              <path d="M99 127 Q110 135 121 127" stroke="#8E4338" stroke-width="2.8" stroke-linecap="round" fill="none"/>
              <path d="M103 129 Q110 131 117 129" stroke="#B85E50" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            </g>

            <!-- Mouth: Speaking -->
            <g class="avatar-mouth-speaking">
              <ellipse cx="110" cy="129" rx="8.0" ry="5.8" fill="#6A2E26"/>
              <path d="M103 127 Q110 125 117 127" stroke="#FFF" stroke-width="2.0" stroke-linecap="round"/>
              <path d="M104 133 Q110 135 116 133" stroke="#C97467" stroke-width="1.8" stroke-linecap="round"/>
            </g>

            <!-- Hair: Modern Layered Textured Crop -->
            <path d="M70 82 C68 50 86 42 110 42 C134 42 152 50 150 82 C150 62 138 52 110 52 C82 52 70 62 70 82 Z" fill="url(#alexHair)"/>
            <path d="M70 78 Q90 52 116 54 Q142 52 150 74 Q138 62 118 64 Q94 62 70 78 Z" fill="url(#alexHair)"/>
            <path d="M84 56 Q100 48 120 54" stroke="#4F3D37" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.6"/>
          </g>
        </svg>
      `;
    },

    priya: function(isSmall) {
      return `
        <svg class="avatar-svg" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="priyaSkin" cx="50%" cy="38%" r="62%">
              <stop offset="0%" stop-color="#F2C7A5"/>
              <stop offset="60%" stop-color="#D89F77"/>
              <stop offset="90%" stop-color="#C28659"/>
              <stop offset="100%" stop-color="#A86C3E"/>
            </radialGradient>
            <linearGradient id="priyaHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2D1F1A"/>
              <stop offset="50%" stop-color="#1A110D"/>
              <stop offset="100%" stop-color="#0D0705"/>
            </linearGradient>
            <linearGradient id="priyaCloth" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#D06A52"/>
              <stop offset="50%" stop-color="#B5563F"/>
              <stop offset="100%" stop-color="#8E3924"/>
            </linearGradient>
            <radialGradient id="priyaIris" cx="40%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#4A3025"/>
              <stop offset="70%" stop-color="#2E1C15"/>
              <stop offset="100%" stop-color="#140B07"/>
            </radialGradient>
          </defs>

          <!-- Hair: High Ponytail (Back layer) -->
          <path d="M110 52 C135 40 160 55 168 85 C172 100 165 115 156 122 C150 114 154 95 146 80 C138 68 125 60 110 52 Z" fill="url(#priyaHair)"/>
          <ellipse cx="118" cy="56" rx="7" ry="5" fill="#B5563F"/> <!-- Hair tie -->

          <!-- Body / Chest (Breathing Group) -->
          <g class="avatar-chest">
            <!-- Neck -->
            <path d="M96 125 L96 156 Q110 162 124 156 L124 125 Z" fill="url(#priyaSkin)"/>
            <path d="M96 134 Q110 144 124 134 L124 146 Q110 154 96 146 Z" fill="#A86C3E" opacity="0.38"/>

            <!-- Torso / Terracotta Athletic Top -->
            <path d="M46 220 Q56 160 90 152 Q110 156 130 152 Q164 160 174 220 Z" fill="url(#priyaCloth)"/>
            <!-- Collar Accent -->
            <path d="M88 158 Q110 172 132 158" stroke="#F5C4B7" stroke-width="3.2" stroke-linecap="round" fill="none"/>
            <path d="M94 166 Q110 176 126 166" stroke="#682110" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
          </g>

          <!-- Head Group (Subtle natural motion) -->
          <g class="avatar-head">
            <!-- Ears -->
            <ellipse cx="69" cy="108" rx="6.5" ry="11" fill="url(#priyaSkin)"/>
            <ellipse cx="151" cy="108" rx="6.5" ry="11" fill="url(#priyaSkin)"/>
            <ellipse cx="69" cy="108" rx="3.5" ry="6.5" fill="#A86C3E" opacity="0.6"/>
            <ellipse cx="151" cy="108" rx="3.5" ry="6.5" fill="#A86C3E" opacity="0.6"/>

            <!-- Face Structure -->
            <path d="M74 92 C74 144 86 148 110 148 C134 148 146 144 146 92 C146 62 132 60 110 60 C88 60 74 62 74 92 Z" fill="url(#priyaSkin)"/>

            <!-- Cheek Glow -->
            <ellipse cx="85" cy="116" rx="9" ry="5.5" fill="#E88270" opacity="0.32"/>
            <ellipse cx="135" cy="116" rx="9" ry="5.5" fill="#E88270" opacity="0.32"/>

            <!-- Eyebrows (Elegant, arched) -->
            <path d="M81 89 Q91 83 101 87" stroke="#1A110D" stroke-width="2.8" stroke-linecap="round" fill="none"/>
            <path d="M119 87 Q129 83 139 89" stroke="#1A110D" stroke-width="2.8" stroke-linecap="round" fill="none"/>

            <!-- Eyes: Open with Deep Warm Iris & Blinking -->
            <g class="avatar-eye-open">
              <!-- Left Eye -->
              <ellipse cx="91" cy="101" rx="6.8" ry="4.6" fill="#FFFFFF"/>
              <ellipse cx="91" cy="101" rx="4.1" ry="4.1" fill="url(#priyaIris)"/>
              <circle cx="91" cy="101" r="2.0" fill="#0A0604"/>
              <circle cx="92.5" cy="99.5" r="1.4" fill="#FFFFFF"/>
              <path d="M84 100 Q91 96 98 100" stroke="#1A110D" stroke-width="2.0" stroke-linecap="round" fill="none"/>

              <!-- Right Eye -->
              <ellipse cx="129" cy="101" rx="6.8" ry="4.6" fill="#FFFFFF"/>
              <ellipse cx="129" cy="101" rx="4.1" ry="4.1" fill="url(#priyaIris)"/>
              <circle cx="129" cy="101" r="2.0" fill="#0A0604"/>
              <circle cx="130.5" cy="99.5" r="1.4" fill="#FFFFFF"/>
              <path d="M122 100 Q129 96 136 100" stroke="#1A110D" stroke-width="2.0" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Eyes: Closed (Breathing Mode) -->
            <g class="avatar-eye-closed">
              <path d="M85 102 Q91 106 97 102" stroke="#1A110D" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              <path d="M123 102 Q129 106 135 102" stroke="#1A110D" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            </g>

            <!-- Nose -->
            <path d="M109 99 L108 114 Q110 116 113 115" stroke="#9E6135" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

            <!-- Mouth: Idle Bright Smile -->
            <g class="avatar-mouth-idle">
              <path d="M100 127 Q110 135 120 127" stroke="#8E3C30" stroke-width="2.8" stroke-linecap="round" fill="none"/>
              <path d="M103 129 Q110 132 117 129" stroke="#C96E60" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            </g>

            <!-- Mouth: Speaking -->
            <g class="avatar-mouth-speaking">
              <ellipse cx="110" cy="129" rx="7.8" ry="5.6" fill="#6A2E26"/>
              <path d="M104 127 Q110 125 116 127" stroke="#FFF" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M104 133 Q110 135 116 133" stroke="#D97A6C" stroke-width="1.6" stroke-linecap="round"/>
            </g>

            <!-- Hair: Front Sleek Styling -->
            <path d="M74 88 C74 54 88 50 110 50 C132 50 146 54 146 88 C146 70 134 60 114 60 C94 60 74 70 74 88 Z" fill="url(#priyaHair)"/>
            <path d="M74 84 Q94 64 114 68 Q134 64 146 84 Q134 72 114 74 Q94 72 74 84 Z" fill="url(#priyaHair)"/>
          </g>
        </svg>
      `;
    }
  };

  window.Avatar2D = {
    render: function(containerElement, avatarId, isSmall) {
      if (!containerElement) return;
      const id = avatarId || 'maya';
      const generator = REALISTIC_AVATARS[id] || REALISTIC_AVATARS.maya;
      containerElement.innerHTML = generator(isSmall);
    },

    setBreathingState: function(stageElement, state) {
      if (!stageElement) return;
      stageElement.classList.remove('inhale', 'hold', 'exhale');
      if (state && state !== 'idle') {
        stageElement.classList.add(state);
      }
    },

    setBreathingMode: function(stageElement, enabled) {
      if (!stageElement) return;
      stageElement.classList.toggle('breathing-mode', !!enabled);
    },

    setSpeaking: function(isSpeaking) {
      document.querySelectorAll('.avatar-container').forEach(a => {
        a.classList.toggle('speaking', !!isSpeaking);
      });
    }
  };
})();
