/**
 * Coach-Specific Specialized Desk Stretch Routines with Dynamic Kinetic SVG Animations
 * Features concise spoken cues and smooth visual exercise kinetics.
 */
window.COACH_ROUTINES = {
  maya: [
    {
      id: 'maya_neck',
      title: 'Cervical Neck Release',
      focus: 'Neck & Upper Trapezius',
      cue: 'Drop your right ear gently to your right shoulder.',
      text: 'Drop your right ear gently toward your right shoulder. Let gravity soften tight neck muscles.',
      seconds: 25,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="118" width="120" height="6" rx="3" fill="#D7DCCB"/>
          <line x1="85" y1="124" x2="85" y2="144" stroke="#D7DCCB" stroke-width="4" stroke-linecap="round"/>
          <path d="M58 118 L58 88 Q85 82 112 88 L112 118 Z" fill="#5C7A4E" opacity="0.92"/>
          <path d="M58 88 Q44 102 46 118" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round" fill="none"/>
          <path d="M112 88 Q126 102 124 118" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round" fill="none"/>
          <!-- Dynamic Tilting Neck & Head -->
          <g class="anim-neck-tilt">
            <path d="M78 72 L78 88 Q85 91 92 88 L92 72 Z" fill="#F5CBA7"/>
            <ellipse cx="85" cy="54" rx="17" ry="21" fill="#FFE7D6"/>
            <path d="M68 50 C68 30 76 26 85 26 C94 26 102 30 102 50 C102 40 94 36 85 36 C76 36 68 40 68 50 Z" fill="#34221A"/>
            <!-- Peaceful closed eyes -->
            <path d="M74 56 Q79 59 84 56" stroke="#34221A" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            <path d="M86 56 Q91 59 96 56" stroke="#34221A" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            <path d="M80 66 Q85 69 90 66" stroke="#8E4338" stroke-width="2" stroke-linecap="round" fill="none"/>
            <!-- Pulsing tension-release arcs -->
            <path class="anim-guide-pulse" d="M48 46 Q46 64 54 78" stroke="#A9702E" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round" fill="none"/>
            <path class="anim-guide-pulse" d="M122 46 Q124 64 116 78" stroke="#A9702E" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round" fill="none"/>
          </g>
        </svg>
      `
    },
    {
      id: 'maya_chest',
      title: 'Heart-Opening Chest Expansion',
      focus: 'Pectorals & Clavicles',
      cue: 'Roll your shoulders back and open your chest.',
      text: 'Roll your shoulders back and gently lift your chest. Breathe deeply into your heart space.',
      seconds: 25,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="118" width="120" height="6" rx="3" fill="#D7DCCB"/>
          <g class="anim-shoulder-roll">
            <path d="M55 118 L55 80 Q85 74 115 80 L115 118 Z" fill="#5C7A4E" opacity="0.95"/>
            <circle cx="55" cy="80" r="8" fill="#435C36"/>
            <circle cx="115" cy="80" r="8" fill="#435C36"/>
            <path d="M55 80 Q40 102 72 116" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round" fill="none"/>
            <path d="M115 80 Q130 102 98 116" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round" fill="none"/>
            <!-- Kinetic Motion Circles -->
            <path class="anim-guide-pulse" d="M35 70 A15 15 0 1 1 38 90" stroke="#A9702E" stroke-width="2.8" stroke-linecap="round" fill="none"/>
            <polygon points="43,90 38,95 35,88" fill="#A9702E"/>
            <path class="anim-guide-pulse" d="M135 70 A15 15 0 1 0 132 90" stroke="#A9702E" stroke-width="2.8" stroke-linecap="round" fill="none"/>
            <polygon points="127,90 132,95 135,88" fill="#A9702E"/>
          </g>
          <ellipse cx="85" cy="48" rx="16" ry="20" fill="#FFE7D6"/>
          <path d="M69 44 C69 26 77 22 85 22 C93 22 101 26 101 44 Z" fill="#34221A"/>
          <circle cx="80" cy="48" r="2.2" fill="#34221A"/>
          <circle cx="90" cy="48" r="2.2" fill="#34221A"/>
          <path d="M81 57 Q85 60 89 57" stroke="#8E4338" stroke-width="2" stroke-linecap="round" fill="none"/>
        </svg>
      `
    },
    {
      id: 'maya_twist',
      title: 'Seated Spinal Detox Twist',
      focus: 'Spine & Thoracic Mobility',
      cue: 'Sit tall and twist your torso gently to the right.',
      text: 'Sitting tall, gently twist to the right, hand on your chair back. Exhale into the twist, then switch.',
      seconds: 35,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="58" width="7" height="60" rx="3.5" fill="#A9702E"/>
          <rect x="20" y="118" width="125" height="6" rx="3" fill="#D7DCCB"/>
          <g class="anim-torso-twist">
            <path d="M60 118 L64 78 Q90 72 110 80 L104 118 Z" fill="#5C7A4E" opacity="0.92"/>
            <path d="M78 66 L78 78 Q86 80 92 78 L92 66 Z" fill="#F5CBA7"/>
            <ellipse cx="88" cy="50" rx="16" ry="20" fill="#FFE7D6"/>
            <path d="M72 46 C72 30 80 26 88 26 C96 26 104 30 104 46 Z" fill="#34221A"/>
            <circle cx="95" cy="50" r="2.2" fill="#34221A"/>
            <path d="M92 59 Q96 61 99 58" stroke="#8E4338" stroke-width="2" stroke-linecap="round" fill="none"/>
            <path d="M64 80 L26 84" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round"/>
            <path d="M106 82 Q74 94 64 110" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round" fill="none"/>
            <!-- Pulsing Spiral Guideline -->
            <path class="anim-guide-pulse" d="M56 62 Q85 48 114 64" stroke="#A9702E" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4" fill="none"/>
          </g>
        </svg>
      `
    },
    {
      id: 'maya_reach',
      title: 'Sky Reaching Spine Lengthener',
      focus: 'Whole Body Decompression',
      cue: 'Reach both arms high toward the sky.',
      text: 'Stand tall if you can. Reach high, interlace your palms, and lengthen your entire spine.',
      seconds: 25,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="140" x2="140" y2="140" stroke="#D7DCCB" stroke-width="2" stroke-linecap="round"/>
          <g class="anim-reach-arms">
            <line x1="72" y1="108" x2="68" y2="140" stroke="#435C36" stroke-width="6.5" stroke-linecap="round"/>
            <line x1="98" y1="108" x2="102" y2="140" stroke="#435C36" stroke-width="6.5" stroke-linecap="round"/>
            <path d="M68 108 L66 68 Q85 64 104 68 L102 108 Z" fill="#5C7A4E" opacity="0.95"/>
            <ellipse cx="85" cy="52" rx="15" ry="18" fill="#FFE7D6"/>
            <path d="M70 50 C70 34 77 30 85 30 C93 30 100 34 100 50 Z" fill="#34221A"/>
            <path d="M76 48 Q81 45 86 48" stroke="#34221A" stroke-width="2" stroke-linecap="round" fill="none"/>
            <path d="M81 58 Q85 61 89 58" stroke="#8E4338" stroke-width="2" stroke-linecap="round" fill="none"/>
            <path d="M66 68 Q52 38 78 14" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round" fill="none"/>
            <path d="M104 68 Q118 38 92 14" stroke="#5C7A4E" stroke-width="7" stroke-linecap="round" fill="none"/>
            <ellipse cx="85" cy="12" rx="10" ry="6" fill="#F5CBA7"/>
            <line class="anim-guide-pulse" x1="85" y1="2" x2="85" y2="6" stroke="#A9702E" stroke-width="3" stroke-linecap="round"/>
          </g>
        </svg>
      `
    }
  ],

  alex: [
    {
      id: 'alex_chin_tuck',
      title: 'Text-Neck Chin Tucks',
      focus: 'Deep Cervical Flexors',
      cue: 'Gently tuck your chin and lengthen your neck.',
      text: 'Draw your chin straight backward like making a gentle double chin. Feel the back of your neck lengthen.',
      seconds: 25,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="118" width="120" height="6" rx="3" fill="#D7DCCB"/>
          <path d="M58 118 L58 88 Q85 82 112 88 L112 118 Z" fill="#A9702E" opacity="0.95"/>
          <g class="anim-chin-tuck">
            <ellipse cx="88" cy="52" rx="17" ry="21" fill="#F3C9A8"/>
            <path d="M72 46 C70 26 86 20 104 20 C118 20 122 26 122 46 Z" fill="#241914"/>
            <circle cx="96" cy="50" r="2.4" fill="#0C151D"/>
            <path d="M92 60 Q98 62 104 60" stroke="#8E4338" stroke-width="2" stroke-linecap="round" fill="none"/>
            <!-- Active retraction motion arrow -->
            <line class="anim-guide-pulse" x1="56" y1="54" x2="76" y2="54" stroke="#5C7A4E" stroke-width="3.5" stroke-linecap="round"/>
            <polygon points="56,54 65,49 65,59" fill="#5C7A4E"/>
          </g>
        </svg>
      `
    },
    {
      id: 'alex_wrist',
      title: 'Keyboard Carpal & Wrist Flexor Release',
      focus: 'Forearms & Carpal Tunnel',
      cue: 'Extend your arm and gently stretch your wrist.',
      text: 'Extend your arm forward, palm up. Gently pull your fingers back to open your wrist flexors. Switch sides.',
      seconds: 30,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M54 118 L54 84 Q85 80 116 84 L116 118 Z" fill="#A9702E" opacity="0.95"/>
          <ellipse cx="85" cy="48" rx="16" ry="20" fill="#F3C9A8"/>
          <path d="M70 44 C68 26 82 22 100 22 C110 22 114 26 114 44 Z" fill="#241914"/>
          <!-- Active Wrist Flexor Extension Animation -->
          <g class="anim-wrist-flex">
            <path d="M54 84 L120 84" stroke="#A9702E" stroke-width="7.5" stroke-linecap="round"/>
            <path d="M120 84 L136 102" stroke="#F3C9A8" stroke-width="6.5" stroke-linecap="round"/>
            <path d="M112 84 L130 106" stroke="#5C7A4E" stroke-width="5.5" stroke-linecap="round"/>
            <path class="anim-guide-pulse" d="M138 80 Q146 94 136 108" stroke="#A9702E" stroke-width="3" stroke-dasharray="3 3" fill="none"/>
          </g>
        </svg>
      `
    },
    {
      id: 'alex_thoracic',
      title: 'Thoracic Chair Rotation',
      focus: 'Mid-Back & Ribcage Mobility',
      cue: 'Cross your arms and slowly rotate your mid-back.',
      text: 'Cross arms across chest. Keep hips forward and rotate your upper torso side to side.',
      seconds: 30,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="118" width="120" height="6" rx="3" fill="#D7DCCB"/>
          <g class="anim-torso-twist">
            <path d="M58 118 L60 80 Q85 74 112 80 L110 118 Z" fill="#A9702E" opacity="0.95"/>
            <path d="M58 86 L112 98" stroke="#7B4E18" stroke-width="7" stroke-linecap="round"/>
            <path d="M112 86 L58 98" stroke="#7B4E18" stroke-width="7" stroke-linecap="round"/>
            <ellipse cx="85" cy="48" rx="16" ry="20" fill="#F3C9A8"/>
            <path d="M70 44 C68 26 82 22 100 22 C110 22 114 26 114 44 Z" fill="#241914"/>
            <path class="anim-guide-pulse" d="M48 62 Q85 48 122 62" stroke="#5C7A4E" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4" fill="none"/>
          </g>
        </svg>
      `
    },
    {
      id: 'alex_lat_reach',
      title: 'Overhead Lat & Triceps Extension',
      focus: 'Lats & Shoulder Girdle',
      cue: 'Reach your elbow overhead and lengthen your side.',
      text: 'Reach your elbow overhead and gently draw it down with your other hand. Breathe into your side body.',
      seconds: 30,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M58 118 L58 80 Q85 74 112 80 L112 118 Z" fill="#A9702E" opacity="0.95"/>
          <ellipse cx="85" cy="54" rx="16" ry="20" fill="#F3C9A8"/>
          <path d="M70 50 C68 34 82 30 100 30 C110 30 114 34 114 50 Z" fill="#241914"/>
          <!-- Active Overhead Elbow Stretch -->
          <g class="anim-reach-arms">
            <path d="M60 80 L72 34 L88 60" stroke="#A9702E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M110 80 L85 34" stroke="#A9702E" stroke-width="7" stroke-linecap="round"/>
            <circle cx="72" cy="34" r="5.5" fill="#7B4E18"/>
            <line class="anim-guide-pulse" x1="72" y1="18" x2="72" y2="26" stroke="#5C7A4E" stroke-width="3" stroke-linecap="round"/>
          </g>
        </svg>
      `
    }
  ],

  priya: [
    {
      id: 'priya_eye_reset',
      title: '20-20-20 Eye Horizon & Temple Acupressure',
      focus: 'Ocular Muscles & Digital Eye Strain',
      cue: 'Look far away and gently massage your temples.',
      text: 'Look far across the room. Rub temples gently in slow circles and blink a few times.',
      seconds: 25,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 118 L56 84 Q85 80 114 84 L114 118 Z" fill="#B5563F" opacity="0.95"/>
          <ellipse cx="85" cy="50" rx="16" ry="20" fill="#D89F77"/>
          <path d="M70 46 C70 28 78 24 85 24 C92 24 100 28 100 46 Z" fill="#1A110D"/>
          <!-- Active Temple Circles Animation -->
          <g class="anim-temple-circle">
            <path d="M56 84 L70 54" stroke="#B5563F" stroke-width="6.5" stroke-linecap="round"/>
            <path d="M114 84 L100 54" stroke="#B5563F" stroke-width="6.5" stroke-linecap="round"/>
            <circle cx="70" cy="52" r="5" fill="#D89F77"/>
            <circle cx="100" cy="52" r="5" fill="#D89F77"/>
            <circle class="anim-guide-pulse" cx="85" cy="46" r="3" fill="#FFFFFF"/>
            <path class="anim-guide-pulse" d="M76 48 Q85 43 94 48" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" fill="none"/>
          </g>
        </svg>
      `
    },
    {
      id: 'priya_trap_squeeze',
      title: 'Rhomboid & Trapezius Power Squeeze',
      focus: 'Upper Back Oxygenation',
      cue: 'Squeeze your shoulder blades together firmly.',
      text: 'Squeeze your shoulder blades tightly together. Hold 5 seconds, release, and repeat to boost blood flow.',
      seconds: 25,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g class="anim-trap-squeeze">
            <path d="M54 118 L54 78 Q85 72 116 78 L116 118 Z" fill="#B5563F" opacity="0.95"/>
            <path d="M54 78 Q36 96 60 110" stroke="#B5563F" stroke-width="7" stroke-linecap="round" fill="none"/>
            <path d="M116 78 Q134 96 110 110" stroke="#B5563F" stroke-width="7" stroke-linecap="round" fill="none"/>
            <!-- Pulsing Squeeze Arrows -->
            <line class="anim-guide-pulse" x1="40" y1="88" x2="56" y2="88" stroke="#5C7A4E" stroke-width="3.5" stroke-linecap="round"/>
            <polygon points="56,88 50,83 50,93" fill="#5C7A4E"/>
            <line class="anim-guide-pulse" x1="130" y1="88" x2="114" y2="88" stroke="#5C7A4E" stroke-width="3.5" stroke-linecap="round"/>
            <polygon points="114,88 120,83 120,93" fill="#5C7A4E"/>
          </g>
          <ellipse cx="85" cy="48" rx="16" ry="20" fill="#D89F77"/>
          <path d="M70 44 C70 26 78 22 85 22 C92 22 100 26 100 44 Z" fill="#1A110D"/>
        </svg>
      `
    },
    {
      id: 'priya_crescent',
      title: 'Side Body Crescent Reach',
      focus: 'Intercostal Muscles & Alertness',
      cue: 'Reach overhead and lean gently to the side.',
      text: 'Reach arms overhead and lean gently to the right. Breathe into your open side to boost alertness.',
      seconds: 30,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g class="anim-crescent-lean">
            <path d="M62 118 L66 78 Q90 68 110 80 L104 118 Z" fill="#B5563F" opacity="0.95"/>
            <ellipse cx="92" cy="52" rx="15" ry="19" fill="#D89F77"/>
            <path d="M76 48 C76 32 84 28 92 28 C100 28 107 32 107 48 Z" fill="#1A110D"/>
            <path d="M66 78 Q64 40 98 14" stroke="#B5563F" stroke-width="6.5" stroke-linecap="round" fill="none"/>
            <path d="M110 80 Q96 44 112 16" stroke="#B5563F" stroke-width="6.5" stroke-linecap="round" fill="none"/>
            <path class="anim-guide-pulse" d="M50 66 Q58 44 82 34" stroke="#5C7A4E" stroke-width="3" stroke-dasharray="4 4" fill="none"/>
          </g>
        </svg>
      `
    },
    {
      id: 'priya_power_reset',
      title: 'Standing Energy Surge Reset',
      focus: 'Full Nervous System Activation',
      cue: 'Stand tall, shake it out, and take a deep breath.',
      text: 'Stand up, shake out your hands, roll your wrists, and take one deep energizing breath.',
      seconds: 25,
      svg: `
        <svg class="stretch-figure-svg" viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g class="anim-reach-arms">
            <line x1="72" y1="108" x2="66" y2="140" stroke="#8E3924" stroke-width="6.5" stroke-linecap="round"/>
            <line x1="98" y1="108" x2="104" y2="140" stroke="#8E3924" stroke-width="6.5" stroke-linecap="round"/>
            <path d="M68 108 L66 68 Q85 64 104 68 L102 108 Z" fill="#B5563F" opacity="0.95"/>
            <ellipse cx="85" cy="52" rx="15" ry="18" fill="#D89F77"/>
            <path d="M70 50 C70 34 78 30 85 30 C93 30 100 34 100 50 Z" fill="#1A110D"/>
            <path d="M66 68 Q50 38 78 14" stroke="#B5563F" stroke-width="7" stroke-linecap="round" fill="none"/>
            <path d="M104 68 Q120 38 92 14" stroke="#B5563F" stroke-width="7" stroke-linecap="round" fill="none"/>
            <line class="anim-guide-pulse" x1="85" y1="2" x2="85" y2="8" stroke="#A9702E" stroke-width="3" stroke-linecap="round"/>
            <line class="anim-guide-pulse" x1="68" y1="8" x2="72" y2="12" stroke="#A9702E" stroke-width="3" stroke-linecap="round"/>
            <line class="anim-guide-pulse" x1="102" y1="8" x2="98" y2="12" stroke="#A9702E" stroke-width="3" stroke-linecap="round"/>
          </g>
        </svg>
      `
    }
  ]
};

window.STRETCHES = window.COACH_ROUTINES.maya;

window.getRoutineForCoach = function(coachId) {
  return window.COACH_ROUTINES[coachId] || window.COACH_ROUTINES.maya;
};
