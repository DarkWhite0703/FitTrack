/**
 * FitTrack — Logique applicative principale
 * Architecture : Vanilla JS ES6+, orientée modules et données
 * Pas de framework, pas de dépendances externes.
 */

'use strict';

// ============================================================
// 1. BASE DE DONNÉES DES PROGRAMMES SPORTIFS
//    Structure : { objectifKey → { semaines[] → jours[] → exercices[] } }
// ============================================================

const PROGRAMS = {

  // ── Perte de Poids ────────────────────────────────────────
  weightloss: {
    name: 'Perte de poids',
    icon: '🔥',
    color: '#e67e22',
    intro: 'Programme axé sur le déficit calorique par le cardio HIIT et la musculation fonctionnelle. Priorité à la dépense énergétique et à la préservation musculaire.',
    weeks: [
      {
        theme: 'Activation & Cardio de base',
        days: [
          {
            label: 'Jour A — Full Body + Cardio',
            focus: 'Cardio modéré + renforcement global',
            exercises: [
              { name: 'Échauffement (marche rapide / vélo léger)', sets: '1', reps: '10 min', rest: '—', note: 'Fréquence cardiaque cible 60–65% FCmax' },
              { name: 'Squats au poids du corps', sets: '3', reps: '15', rest: '60s', note: 'Descente contrôlée 3 secondes' },
              { name: 'Pompes (version genoux si besoin)', sets: '3', reps: '12', rest: '60s', note: 'Gainage abdominal permanent' },
              { name: 'Fentes alternées', sets: '3', reps: '10/jambe', rest: '60s', note: 'Genou avant à 90°' },
              { name: 'Gainage planche avant', sets: '3', reps: '30s', rest: '45s', note: 'Corps parfaitement aligné' },
              { name: 'HIIT finish : Jumping Jacks', sets: '5', reps: '30s / 30s repos', rest: '—', note: 'Interval training intensif' },
            ]
          },
          {
            label: 'Jour B — Cardio Continu',
            focus: 'Endurance aérobie basse intensité (LISS)',
            exercises: [
              { name: 'Marche rapide ou jogging léger', sets: '1', reps: '35–40 min', rest: '—', note: '65–70% FCmax, cadence confortable' },
              { name: 'Étirements actifs membres inférieurs', sets: '1', reps: '10 min', rest: '—', note: 'Quadriceps, ischio-jambiers, mollets' },
            ]
          },
          {
            label: 'Jour C — Upper Body + Core',
            focus: 'Haut du corps & gainage',
            exercises: [
              { name: 'Tractions assistées (ou tirages élastique)', sets: '3', reps: '10', rest: '75s', note: 'Omoplate rétractées, dos engagé' },
              { name: 'Développé militaire au poids du corps (dips)', sets: '3', reps: '12', rest: '75s', note: 'Aller progressivement' },
              { name: 'Curls biceps (haltères légers)', sets: '3', reps: '15', rest: '60s', note: 'Coudes fixes, amplitude complète' },
              { name: 'Superman lombaires', sets: '3', reps: '15', rest: '45s', note: 'Extension lente, contraction 2s en haut' },
              { name: 'Mountain Climbers', sets: '4', reps: '20s actif / 20s repos', rest: '—', note: 'Rythme soutenu, hanches basses' },
            ]
          },
        ]
      },
      {
        theme: 'Intensification progressive',
        days: [
          {
            label: 'Jour A — HIIT Full Body',
            focus: 'Circuit training haute intensité',
            exercises: [
              { name: 'Burpees', sets: '4', reps: '10', rest: '60s', note: 'Mouvement explosif, phase basse contrôlée' },
              { name: 'Squats sautés (Jump Squats)', sets: '4', reps: '12', rest: '60s', note: 'Atterrissage souple, genoux fléchis' },
              { name: 'Pompes explosives', sets: '3', reps: '10', rest: '75s', note: 'Poitrine décolle du sol' },
              { name: 'High Knees', sets: '4', reps: '30s', rest: '30s', note: 'Genoux à hauteur de hanches' },
              { name: 'Gainage latéral (chaque côté)', sets: '3', reps: '30s', rest: '30s', note: 'Corps en ligne droite stricte' },
            ]
          },
          {
            label: 'Jour B — Vélo / Course + Étirements',
            focus: 'Récupération active',
            exercises: [
              { name: 'Vélo ou course à allure confortable', sets: '1', reps: '40 min', rest: '—', note: 'Zone 2 — conversation possible' },
              { name: 'Yoga récupération', sets: '1', reps: '15 min', rest: '—', note: 'Postures enfant, chien tête en bas, pigeon' },
            ]
          },
          {
            label: 'Jour C — Lower Body intensifié',
            focus: 'Jambes & fessiers',
            exercises: [
              { name: 'Squats bulgares (chaque jambe)', sets: '4', reps: '10', rest: '90s', note: 'Pied arrière sur banc, descente lente' },
              { name: 'Hip Thrust au poids du corps', sets: '4', reps: '15', rest: '60s', note: 'Contraction maximale 2s en haut' },
              { name: 'Step-ups sur chaise', sets: '3', reps: '12/jambe', rest: '60s', note: 'Talon actif, ne pas s\'aider du pied arrière' },
              { name: 'Mollets debout', sets: '3', reps: '20', rest: '45s', note: 'Amplitude maximale' },
            ]
          },
        ]
      },
      {
        theme: 'Peak de dépense calorique',
        days: [
          {
            label: 'Jour A — HIIT Avancé',
            focus: 'Tabata & circuits',
            exercises: [
              { name: 'Tabata Burpees', sets: '8', reps: '20s actif / 10s repos', rest: '—', note: '4 minutes totales, intensité maximale' },
              { name: 'Tabata Squats sautés', sets: '8', reps: '20s actif / 10s repos', rest: '—', note: '4 minutes totales' },
              { name: 'Circuit 3 exercices × 3 tours', sets: '3', reps: 'Pompes × 10 — Fentes × 10 — Planche × 30s', rest: '90s entre circuits', note: '' },
            ]
          },
          {
            label: 'Jour B — Sortie longue',
            focus: 'Endurance prolongée',
            exercises: [
              { name: 'Course / vélo / natation', sets: '1', reps: '50–60 min', rest: '—', note: '65% FCmax, cap sur la durée' },
            ]
          },
          {
            label: 'Jour C — Full Body avec charges',
            focus: 'Musculation + brûlage calorique',
            exercises: [
              { name: 'Goblet Squat (haltère ou kettlebell)', sets: '4', reps: '12', rest: '75s', note: 'Poids au menton, dos droit' },
              { name: 'Rowing haltère unilatéral', sets: '4', reps: '12/côté', rest: '75s', note: 'Dos plat, coude tracte vers la hanche' },
              { name: 'Développé haltères incliné', sets: '3', reps: '12', rest: '75s', note: 'Angle 45°, coudes à 45° du buste' },
              { name: 'Kettlebell Swings', sets: '4', reps: '20', rest: '60s', note: 'Hanches propulsent, bras passifs' },
            ]
          },
        ]
      },
      {
        theme: 'Consolidation & habitudes durables',
        days: [
          {
            label: 'Jour A — Full Body equilibré',
            focus: 'Synthèse du programme',
            exercises: [
              { name: 'Squat + Press (Thruster)', sets: '4', reps: '12', rest: '90s', note: 'Mouvement continu squat → développé' },
              { name: 'Tractions ou tirages élastique', sets: '4', reps: '10', rest: '90s', note: 'Focus étirement complet en bas' },
              { name: 'HIIT 15 min personnalisé', sets: '1', reps: '15 min', rest: '—', note: 'Choisis tes 3 exos préférés du programme' },
            ]
          },
          {
            label: 'Jour B — Cardio plaisir',
            focus: 'Activité choisie librement',
            exercises: [
              { name: 'Sport libre (sport collectif, vélo, natation...)', sets: '1', reps: '45–60 min', rest: '—', note: 'L\'important est de bouger avec plaisir' },
            ]
          },
          {
            label: 'Jour C — Bilan & récupération active',
            focus: 'Mobilité et réflexion',
            exercises: [
              { name: 'Mobilité articulaire (hanches, épaules, chevilles)', sets: '1', reps: '15 min', rest: '—', note: 'Cercles lents, amplitude maximale' },
              { name: 'Renforcement gainage complet', sets: '3', reps: 'Planche × 45s + Gainage latéral × 30s', rest: '60s', note: '' },
              { name: 'Marche méditée ou étirements profonds', sets: '1', reps: '20 min', rest: '—', note: 'Récupération mentale et physique' },
            ]
          },
        ]
      },
    ]
  },

  // ── Prise de masse sèche ──────────────────────────────────
  leanmass: {
    name: 'Masse sèche',
    icon: '💪',
    color: '#2980b9',
    intro: 'Programme orienté hypertrophie avec excédent calorique contrôlé. Tempo lent, charges progressives, récupération optimisée.',
    weeks: [
      {
        theme: 'Fondations neuromusculaires',
        days: [
          {
            label: 'Jour A — Push (Poussée)',
            focus: 'Pectoraux, épaules, triceps',
            exercises: [
              { name: 'Développé couché haltères', sets: '4', reps: '10', rest: '90s', note: 'Tempo 3-1-1-1, charges modérées' },
              { name: 'Développé militaire assis', sets: '3', reps: '12', rest: '90s', note: 'Nuque neutre, omoplates rétractées' },
              { name: 'Écarté haltères plat', sets: '3', reps: '12', rest: '75s', note: 'Étirement maximale en bas' },
              { name: 'Pushdown triceps (élastique)', sets: '3', reps: '15', rest: '60s', note: 'Coudes fixes, contraction brûlante' },
            ]
          },
          {
            label: 'Jour B — Pull (Tirage)',
            focus: 'Dos, biceps, trapèzes',
            exercises: [
              { name: 'Tractions prise large', sets: '4', reps: '6–8', rest: '120s', note: 'Si impossible : tirage poulie haute' },
              { name: 'Rowing barre prise pronation', sets: '4', reps: '10', rest: '90s', note: 'Dos à 45°, barre vers nombril' },
              { name: 'Tirage visage (Face Pull) élastique', sets: '3', reps: '15', rest: '60s', note: 'Poignets en supination en fin de mouvement' },
              { name: 'Curl haltères en supination', sets: '3', reps: '12', rest: '60s', note: 'Rotation externe du poignet en contractant' },
            ]
          },
          {
            label: 'Jour C — Legs (Jambes)',
            focus: 'Quadriceps, ischios, fessiers',
            exercises: [
              { name: 'Squats barre ou goblet', sets: '4', reps: '10', rest: '120s', note: 'Descente 3s, montée explosive' },
              { name: 'Romanian Deadlift (haltères)', sets: '4', reps: '10', rest: '120s', note: 'Jambes quasi tendues, dos neutre' },
              { name: 'Leg Press ou fentes marchées', sets: '3', reps: '12', rest: '90s', note: '' },
              { name: 'Mollets assis ou debout', sets: '4', reps: '15', rest: '60s', note: '2s en haut, 2s en bas' },
            ]
          },
          {
            label: 'Jour D — Cardio doux + Core',
            focus: 'Récupération active & gainage',
            exercises: [
              { name: 'Vélo ou marche', sets: '1', reps: '25 min', rest: '—', note: 'Zone 1–2, récupération' },
              { name: 'Crunch au sol', sets: '3', reps: '20', rest: '45s', note: '' },
              { name: 'Planche avec variantes', sets: '3', reps: '40s', rest: '45s', note: '' },
              { name: 'Russian Twist', sets: '3', reps: '20', rest: '45s', note: 'Poids optionnel' },
            ]
          },
        ]
      },
      {
        theme: 'Progressive Overload',
        days: [
          {
            label: 'Jour A — Push +5%',
            focus: 'Augmenter les charges de 5%',
            exercises: [
              { name: 'Développé couché haltères', sets: '4', reps: '8', rest: '120s', note: 'Charges +5% vs semaine 1' },
              { name: 'Développé militaire debout', sets: '4', reps: '10', rest: '90s', note: '' },
              { name: 'Dips (lestés si possible)', sets: '3', reps: '10', rest: '90s', note: '' },
              { name: 'Élévations latérales haltères', sets: '3', reps: '15', rest: '60s', note: 'Coudes légèrement fléchis' },
            ]
          },
          {
            label: 'Jour B — Pull +5%',
            focus: 'Augmenter les charges de 5%',
            exercises: [
              { name: 'Tractions (ou tirage poulie)', sets: '4', reps: '8', rest: '120s', note: '' },
              { name: 'Rowing unilatéral haltère', sets: '4', reps: '10/côté', rest: '90s', note: '' },
              { name: 'Shrugs trapèzes', sets: '3', reps: '15', rest: '60s', note: 'Contraction 2s en haut' },
              { name: 'Curl marteau', sets: '3', reps: '12', rest: '60s', note: 'Prise neutre, bras longe le corps' },
            ]
          },
          {
            label: 'Jour C — Legs +5%',
            focus: 'Augmenter les charges de 5%',
            exercises: [
              { name: 'Squats barre', sets: '4', reps: '8', rest: '150s', note: '' },
              { name: 'Romanian Deadlift', sets: '4', reps: '8', rest: '150s', note: '' },
              { name: 'Leg Curl couché (machine)', sets: '3', reps: '12', rest: '75s', note: '' },
              { name: 'Presse à mollets', sets: '4', reps: '15', rest: '60s', note: '' },
            ]
          },
          {
            label: 'Jour D — Cardio & Mobilité',
            focus: 'Récupération active',
            exercises: [
              { name: 'Natation ou vélo doux', sets: '1', reps: '30 min', rest: '—', note: '' },
              { name: 'Stretching global (full body)', sets: '1', reps: '15 min', rest: '—', note: '' },
            ]
          },
        ]
      },
      {
        theme: 'Volume maximal',
        days: [
          {
            label: 'Jour A — Push (Volume)',
            focus: 'Plus de sets, même charges',
            exercises: [
              { name: 'Développé couché haltères', sets: '5', reps: '10', rest: '90s', note: '' },
              { name: 'Développé incliné haltères', sets: '4', reps: '10', rest: '90s', note: '' },
              { name: 'Écarté câbles (ou élastique)', sets: '3', reps: '15', rest: '60s', note: 'Tension constante' },
              { name: 'Extension triceps overhead', sets: '3', reps: '15', rest: '60s', note: '' },
            ]
          },
          {
            label: 'Jour B — Pull (Volume)',
            focus: 'Plus de sets, même charges',
            exercises: [
              { name: 'Tractions', sets: '5', reps: 'max', rest: '120s', note: '' },
              { name: 'Tirage horizontal (rowing machine)', sets: '4', reps: '12', rest: '90s', note: '' },
              { name: 'Pull-over haltère', sets: '3', reps: '12', rest: '75s', note: 'Grand dorsal étiré en bas' },
              { name: 'Curl concentré', sets: '3', reps: '12/bras', rest: '60s', note: '' },
            ]
          },
          {
            label: 'Jour C — Legs (Volume)',
            focus: 'Plus de sets, même charges',
            exercises: [
              { name: 'Squats barre', sets: '5', reps: '10', rest: '120s', note: '' },
              { name: 'Fentes marchées avec haltères', sets: '4', reps: '12/jambe', rest: '90s', note: '' },
              { name: 'Leg Extension (machine)', sets: '3', reps: '15', rest: '75s', note: '' },
              { name: 'Mollets unilatéraux (donkey calf)', sets: '4', reps: '15', rest: '60s', note: '' },
            ]
          },
          {
            label: 'Jour D — Active Recovery',
            focus: 'Récupération complète',
            exercises: [
              { name: 'Marche 45 min', sets: '1', reps: '45 min', rest: '—', note: '' },
              { name: 'Mobilité thoracique & épaules', sets: '1', reps: '15 min', rest: '—', note: '' },
            ]
          },
        ]
      },
      {
        theme: 'Deload & Consolidation',
        days: [
          {
            label: 'Jour A — Push (Deload -40%)',
            focus: 'Récupération neuromusculaire',
            exercises: [
              { name: 'Développé couché haltères légers', sets: '3', reps: '12', rest: '90s', note: 'Charges à 60% du max' },
              { name: 'Développé militaire', sets: '3', reps: '12', rest: '90s', note: '' },
              { name: 'Pompes larges', sets: '2', reps: '15', rest: '60s', note: '' },
            ]
          },
          {
            label: 'Jour B — Pull (Deload)',
            focus: 'Récupération neuromusculaire',
            exercises: [
              { name: 'Tractions ou tirage (charges légères)', sets: '3', reps: '8', rest: '90s', note: '' },
              { name: 'Rowing haltère léger', sets: '3', reps: '12', rest: '75s', note: '' },
            ]
          },
          {
            label: 'Jour C — Full Body léger',
            focus: 'Maintien sans stress',
            exercises: [
              { name: 'Squat léger', sets: '3', reps: '10', rest: '90s', note: '' },
              { name: 'Romanian Deadlift léger', sets: '3', reps: '10', rest: '90s', note: '' },
              { name: 'Core — planche & gainage', sets: '3', reps: '45s', rest: '60s', note: '' },
            ]
          },
        ]
      },
    ]
  },

  // ── Force & Hypertrophie ───────────────────────────────────
  strength: {
    name: 'Force & Hypertrophie',
    icon: '⚡',
    color: '#8e44ad',
    intro: 'Programme basé sur les mouvements fondamentaux (squat, deadlift, bench, OHP). Charges lourdes, faibles répétitions, focus sur la force brute.',
    weeks: [
      {
        theme: 'Technique & Fondamentaux',
        days: [
          {
            label: 'Jour A — Squat Focus',
            focus: 'Bas du corps, force pure',
            exercises: [
              { name: 'Squat barre (Back Squat)', sets: '5', reps: '5', rest: '180s', note: 'Technique impeccable, descente contrôlée' },
              { name: 'Romanian Deadlift', sets: '3', reps: '8', rest: '120s', note: 'Ischio-jambiers, dos neutre strict' },
              { name: 'Fentes bulgares', sets: '3', reps: '8/jambe', rest: '90s', note: '' },
            ]
          },
          {
            label: 'Jour B — Bench Focus',
            focus: 'Pectoraux & force poussée',
            exercises: [
              { name: 'Développé couché barre', sets: '5', reps: '5', rest: '180s', note: 'Arc lombaire naturel, prise à largeur d\'épaules' },
              { name: 'Développé incliné haltères', sets: '4', reps: '8', rest: '120s', note: '' },
              { name: 'Dips lestés', sets: '3', reps: '8', rest: '120s', note: '' },
              { name: 'Pushdown triceps', sets: '3', reps: '12', rest: '60s', note: '' },
            ]
          },
          {
            label: 'Jour C — Deadlift Focus',
            focus: 'Force globale & postérieure',
            exercises: [
              { name: 'Soulevé de terre (Deadlift)', sets: '5', reps: '3', rest: '240s', note: 'Le roi des exercices — dos neutre, hanches actives' },
              { name: 'Tractions lestées', sets: '4', reps: '6', rest: '150s', note: 'Si possible, sinon poids du corps au max' },
              { name: 'Rowing Barbell', sets: '4', reps: '8', rest: '120s', note: '' },
              { name: 'Curl haltères lourds', sets: '3', reps: '8', rest: '90s', note: '' },
            ]
          },
        ]
      },
      {
        theme: 'Intensification — 85% 1RM',
        days: [
          {
            label: 'Jour A — Squat 85%',
            focus: 'Charges à 85% du max',
            exercises: [
              { name: 'Squat barre', sets: '4', reps: '4', rest: '240s', note: '85% 1RM estimé' },
              { name: 'Box Squat (pause 1s)', sets: '3', reps: '5', rest: '180s', note: 'Explosivité en montée' },
              { name: 'Good Morning', sets: '3', reps: '10', rest: '120s', note: 'Lombaires & ischio-jambiers' },
            ]
          },
          {
            label: 'Jour B — Bench 85%',
            focus: 'Charges à 85% du max',
            exercises: [
              { name: 'Développé couché barre', sets: '4', reps: '4', rest: '240s', note: '' },
              { name: 'Floor Press (développé au sol)', sets: '3', reps: '6', rest: '150s', note: 'Développe l\'explosivité en bas du mouvement' },
              { name: 'JM Press (triceps)', sets: '3', reps: '8', rest: '90s', note: '' },
            ]
          },
          {
            label: 'Jour C — Deadlift 85%',
            focus: 'Charges à 85% du max',
            exercises: [
              { name: 'Deadlift barre', sets: '4', reps: '3', rest: '300s', note: 'Repos long — effort maximal' },
              { name: 'Rack Pull (tirage partiel)', sets: '3', reps: '5', rest: '180s', note: 'Développe la lockout en haut' },
              { name: 'Tractions lestées', sets: '4', reps: '5', rest: '150s', note: '' },
            ]
          },
        ]
      },
      {
        theme: 'Peak de force — 90%+ 1RM',
        days: [
          {
            label: 'Jour A — Squat Max',
            focus: 'Effort maximal',
            exercises: [
              { name: 'Squat barre', sets: '3', reps: '3', rest: '300s', note: '90% 1RM ou proche' },
              { name: 'Pause Squat (3s en bas)', sets: '2', reps: '3', rest: '240s', note: '' },
            ]
          },
          {
            label: 'Jour B — Bench Max',
            focus: 'Effort maximal',
            exercises: [
              { name: 'Développé couché barre', sets: '3', reps: '3', rest: '300s', note: '' },
              { name: 'Slingshot Press (si dispo)', sets: '2', reps: '3+', rest: '240s', note: 'Permet de dépasser son max habituel' },
            ]
          },
          {
            label: 'Jour C — Deadlift Max',
            focus: 'Effort maximal',
            exercises: [
              { name: 'Deadlift barre', sets: '3', reps: '2', rest: '360s', note: '92–95% 1RM, repos total entre séries' },
              { name: 'Deficit Deadlift', sets: '2', reps: '3', rest: '240s', note: 'Debout sur plateforme de 5cm' },
            ]
          },
        ]
      },
      {
        theme: 'Deload & Récupération',
        days: [
          {
            label: 'Jour A — Squat & Corps Léger',
            focus: 'Décharge — 50% du max',
            exercises: [
              { name: 'Squat barre léger', sets: '3', reps: '5', rest: '120s', note: '50–60% 1RM, technique parfaite' },
              { name: 'Mobilité hanche & cheville', sets: '1', reps: '15 min', rest: '—', note: '' },
            ]
          },
          {
            label: 'Jour B — Bench Léger',
            focus: 'Décharge',
            exercises: [
              { name: 'Développé couché léger', sets: '3', reps: '5', rest: '120s', note: '' },
              { name: 'Étirements épaules & pectoraux', sets: '1', reps: '10 min', rest: '—', note: '' },
            ]
          },
          {
            label: 'Jour C — Récupération complète',
            focus: 'Bain froid & mobilité',
            exercises: [
              { name: 'Marche 30 min', sets: '1', reps: '30 min', rest: '—', note: '' },
              { name: 'Foam Rolling corps entier', sets: '1', reps: '15 min', rest: '—', note: 'Mollets, ischio, dos, épaules' },
              { name: 'Stretching statique global', sets: '1', reps: '15 min', rest: '—', note: 'Maintien 60s par position' },
            ]
          },
        ]
      },
    ]
  },

  // ── Endurance & Calisthénie ───────────────────────────────
  endurance: {
    name: 'Endurance & Calisthénie',
    icon: '🤸',
    color: '#27ae60',
    intro: 'Programme au poids du corps combinant endurance cardiovasculaire et maîtrise du mouvement. Progressif vers des skills de calisthénie (muscle-up, handstand...).',
    weeks: [
      {
        theme: 'Base cardiovasculaire & mouvements fondamentaux',
        days: [
          {
            label: 'Jour A — Endurance de base',
            focus: 'Construction aérobie',
            exercises: [
              { name: 'Échauffement dynamique', sets: '1', reps: '10 min', rest: '—', note: 'Leg swings, arm circles, hip rotations' },
              { name: 'Course à pied (fartlek)', sets: '1', reps: '30 min', rest: '—', note: '5 min confort / 2 min soutenu × alternés' },
              { name: 'Tractions au poids du corps', sets: '3', reps: 'Max (-2)', rest: '120s', note: 'Arrêter 2 reps avant l\'échec' },
              { name: 'Dips sur chaise / barres', sets: '3', reps: 'Max (-2)', rest: '90s', note: '' },
            ]
          },
          {
            label: 'Jour B — Calisthénie niveau 1',
            focus: 'Maîtrise du poids du corps',
            exercises: [
              { name: 'Pompes — 5 variantes × 2 sets', sets: '2', reps: '10 chaque', rest: '45s', note: 'Larges, serrées, déclinées, archer, diamant' },
              { name: 'Australian Rows (tirage horizontal)', sets: '4', reps: 'Max', rest: '90s', note: 'Barre basse ou table — corps rigide' },
              { name: 'L-Sit sur sol (ou chaises)', sets: '4', reps: '10–15s', rest: '60s', note: 'Jambes tendues, fessiers décollés' },
              { name: 'Pike Push-ups (épaules)', sets: '3', reps: '12', rest: '75s', note: 'Corps en V renversé' },
            ]
          },
          {
            label: 'Jour C — Endurance longue',
            focus: 'Sortie longue Zone 2',
            exercises: [
              { name: 'Course, vélo ou natation', sets: '1', reps: '50–60 min', rest: '—', note: 'Zone 2 — tu peux parler sans essoufflement' },
              { name: 'Gainage core complet', sets: '3', reps: '60s planche avant + 40s côtés', rest: '60s', note: '' },
            ]
          },
        ]
      },
      {
        theme: 'Progression vers skills intermédiaires',
        days: [
          {
            label: 'Jour A — Handstand Work',
            focus: 'Équilibre & verticalité',
            exercises: [
              { name: 'Wall Handstand (contre mur)', sets: '5', reps: '30s', rest: '90s', note: 'Corps droit, regarder le sol' },
              { name: 'Kick-up to Handstand (entrée)', sets: '5', reps: '5 tentatives', rest: '60s', note: '' },
              { name: 'Pike Push-ups (progrès OHP)', sets: '4', reps: '10', rest: '90s', note: '' },
              { name: 'Course 20 min', sets: '1', reps: '20 min', rest: '—', note: 'Allure soutenue' },
            ]
          },
          {
            label: 'Jour B — Pull & Front Lever Prep',
            focus: 'Tirage & gainage dorsaux',
            exercises: [
              { name: 'Tractions max', sets: '5', reps: 'Max', rest: '120s', note: '' },
              { name: 'Tuck Front Lever (genoux groupés)', sets: '5', reps: '10s', rest: '120s', note: 'Corps horizontal en tendu de barre' },
              { name: 'Dragon Flag (progression)', sets: '3', reps: '5', rest: '120s', note: 'Mouvement avancé — débutants : L-Sit' },
            ]
          },
          {
            label: 'Jour C — Running intervals',
            focus: 'VMA et fractionné',
            exercises: [
              { name: 'Échauffement 10 min', sets: '1', reps: '10 min', rest: '—', note: '' },
              { name: 'Fractionné 400m (piste ou GPS)', sets: '6', reps: '400m rapide / 400m marche', rest: '—', note: 'À 85–90% de ta vitesse maximale' },
              { name: 'Retour au calme 10 min', sets: '1', reps: '10 min', rest: '—', note: '' },
            ]
          },
        ]
      },
      {
        theme: 'Intensification calisthénie',
        days: [
          {
            label: 'Jour A — Muscle-Up Prep',
            focus: 'Transition pull → dip',
            exercises: [
              { name: 'Tractions explosives (chin-up)', sets: '5', reps: '5', rest: '150s', note: 'Menton bien au-dessus de la barre' },
              { name: 'Dips profonds (+ parallèles)', sets: '5', reps: '8', rest: '120s', note: 'Descente totale, poitrine à hauteur des mains' },
              { name: 'Muscle-up avec saut / élastique', sets: '5', reps: '3', rest: '180s', note: 'Assistance pour sentir le mouvement' },
            ]
          },
          {
            label: 'Jour B — Planche & Compression',
            focus: 'Isométrie avancée',
            exercises: [
              { name: 'Pseudo Planche Push-ups', sets: '4', reps: '8', rest: '120s', note: 'Mains vers les hanches, corps incliné' },
              { name: 'Tuck Planche (sur sol)', sets: '5', reps: '10s', rest: '120s', note: 'Poids du corps sur les mains, genoux groupés' },
              { name: 'Compression (assis, lever les jambes)', sets: '4', reps: '10', rest: '90s', note: '' },
            ]
          },
          {
            label: 'Jour C — Long Run',
            focus: 'Sortie longue progressive',
            exercises: [
              { name: 'Course longue distance', sets: '1', reps: '60–75 min', rest: '—', note: 'Zone 2, augmenter de 10% / semaine max' },
            ]
          },
        ]
      },
      {
        theme: 'Démonstration de maîtrise',
        days: [
          {
            label: 'Jour A — Skills Test',
            focus: 'Mesure des progrès',
            exercises: [
              { name: 'Max Pull-ups en 1 set', sets: '1', reps: 'Maximum', rest: '—', note: 'Record personnel — comparer à S1' },
              { name: 'Handstand sans mur (tentatives)', sets: '5', reps: '5 tentatives', rest: '60s', note: '' },
              { name: 'Muscle-up (si déjà tenté)', sets: '3', reps: 'Max', rest: '180s', note: '' },
            ]
          },
          {
            label: 'Jour B — Cardio Test',
            focus: 'Test d\'endurance',
            exercises: [
              { name: 'Course 5km ou 10km', sets: '1', reps: 'Chrono !', rest: '—', note: 'Mesure ta progression vs début de programme' },
            ]
          },
          {
            label: 'Jour C — Récupération et célébration',
            focus: 'Repos mérité',
            exercises: [
              { name: 'Yoga & mobilité', sets: '1', reps: '30 min', rest: '—', note: 'Tu l\'as mérité 🎉' },
              { name: 'Bain froid si possible', sets: '1', reps: '5 min', rest: '—', note: 'Récupération optimale' },
            ]
          },
        ]
      },
    ]
  }
};

// ============================================================
// 2. UTILITAIRES
// ============================================================

/**
 * Calcule l'IMC et retourne un objet { value, category, label, cssClass }
 * @param {number} weight - Masse en kg
 * @param {number} height - Taille en cm
 */
function calculateBMI(weight, height) {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const value = Math.round(bmi * 10) / 10;

  let category, label, cssClass;

  if (bmi < 18.5) {
    category = 'Insuffisance pondérale';
    label = `IMC ${value} — Maigreur`;
    cssClass = 'light';
  } else if (bmi < 25) {
    category = 'Corpulence normale';
    label = `IMC ${value} — Normal ✓`;
    cssClass = 'normal';
  } else if (bmi < 30) {
    category = 'Surpoids';
    label = `IMC ${value} — Surpoids`;
    cssClass = 'overweight';
  } else {
    category = 'Obésité';
    label = `IMC ${value} — Obésité`;
    cssClass = 'obese';
  }

  return { value, category, label, cssClass };
}

/**
 * Affiche un écran et masque les autres
 * @param {string} screenId - ID de l'écran à afficher
 */
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Affiche un toast de notification
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée en ms (défaut 3000)
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/**
 * Lance l'animation de confettis minimalistes
 * @param {number} count - Nombre de confettis
 */
function launchConfetti(count = 30) {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = ''; // Nettoie les anciens

  const colors = ['#1a1a2e', '#2ecc71', '#e67e22', '#2980b9', '#8e44ad', '#f39c12'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = `${Math.random() * 8 + 4}px`;
    piece.style.height = `${Math.random() * 8 + 4}px`;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    container.appendChild(piece);
  }

  // Nettoyage automatique après animation
  setTimeout(() => { container.innerHTML = ''; }, 3500);
}

// ============================================================
// 3. GESTION DU LOCALSTORAGE
// ============================================================

const STORAGE_KEY = 'fittrack_data';

/**
 * Sauvegarde les données dans localStorage
 * @param {object} data - Données à sauvegarder
 */
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Charge les données depuis localStorage
 * @returns {object|null} - Données ou null si absent
 */
function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Supprime toutes les données (reset)
 */
function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}

// ============================================================
// 4. RENDU DU PROGRAMME
// ============================================================

/**
 * Génère le HTML du programme complet sur 4 semaines
 * @param {object} program - Programme sélectionné
 * @param {object} userProfile - Profil utilisateur
 * @returns {string} - HTML généré
 */
function renderProgram(program, userProfile) {
  const bmi = calculateBMI(userProfile.weight, userProfile.height);

  let html = '';

  // Intro programme
  html += `
    <div class="card" style="border-left: 3px solid ${program.color}; padding-left: 24px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="5" r="1" />
  <path d="m9 20 3-6 3 6" />
  <path d="m6 8 6 2 6-2" />
  <path d="M12 10v4" />
</svg>
        <strong style="color: var(--accent);">${program.name}</strong>
        <span class="imc-badge ${bmi.cssClass}" style="margin-left: auto;">${bmi.label}</span>
      </div>
      <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">${program.intro}</p>
    </div>
  `;

  // Semaines
  program.weeks.forEach((week, weekIdx) => {
    html += `
      <div class="week-section">
        <div class="week-header">
          <div class="week-dot"></div>
          <span class="week-number">Semaine ${weekIdx + 1}</span>
          <span style="color: var(--border);">—</span>
          <span class="week-theme">${week.theme}</span>
        </div>
    `;

    // Jours
    week.days.forEach((day, dayIdx) => {
      const dayId = `day-${weekIdx}-${dayIdx}`;

      html += `
        <div class="day-card" id="${dayId}">
          <div class="day-header" onclick="toggleDay('${dayId}')">
            <div>
              <div class="day-label">${day.label}</div>
              <div class="day-meta">${day.focus}</div>
            </div>
            <span class="day-toggle">↓</span>
          </div>
          <div class="day-body">
            <table class="exercise-table">
              <thead>
                <tr>
                  <th>Exercice</th>
                  <th>Séries</th>
                  <th>Rép / Durée</th>
                  <th>Repos</th>
                </tr>
              </thead>
              <tbody>
      `;

      day.exercises.forEach(ex => {
        html += `
          <tr>
            <td>
              <div class="exercise-name">${ex.name}</div>
              ${ex.note ? `<div class="exercise-note">${ex.note}</div>` : ''}
            </td>
            <td>${ex.sets}</td>
            <td>${ex.reps}</td>
            <td>${ex.rest}</td>
          </tr>
        `;
      });

      html += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    html += `</div>`; // .week-section
  });

  return html;
}

/**
 * Toggle l'ouverture/fermeture d'un jour dans le programme
 * @param {string} dayId - ID de la carte jour
 */
function toggleDay(dayId) {
  const card = document.getElementById(dayId);
  if (card) card.classList.toggle('open');
}

// ============================================================
// 5. RENDU DU DASHBOARD DE SUIVI
// ============================================================

/**
 * Génère la checklist des séances pour la semaine courante
 * @param {object} appData - Données de l'application
 * @returns {string} - HTML généré
 */
function renderChecklist(appData) {
  const program = PROGRAMS[appData.profile.goal];
  const currentWeekIdx = appData.currentWeek || 0;
  const currentWeek = program.weeks[currentWeekIdx];
  const completedSessions = appData.completedSessions || {};

  let html = '';

  currentWeek.days.forEach((day, dayIdx) => {
    const sessionKey = `w${currentWeekIdx}_d${dayIdx}`;
    const isDone = completedSessions[sessionKey] === true;

    html += `
      <div class="checklist-item ${isDone ? 'done' : ''}"
           onclick="toggleSession('${sessionKey}')"
           data-session="${sessionKey}">
        <div class="custom-checkbox">
          <span class="checkmark">✓</span>
        </div>
        <div class="checklist-text">
          <div class="checklist-title">${day.label}</div>
          <div class="checklist-sub">${day.focus}</div>
        </div>
      </div>
    `;
  });

  return html;
}

/**
 * Calcule et met à jour la progression globale
 * @param {object} appData - Données de l'application
 */
function updateProgressRing(appData) {
  const program = PROGRAMS[appData.profile.goal];
  const completedSessions = appData.completedSessions || {};

  // Nombre total de séances sur 4 semaines
  let totalSessions = 0;
  program.weeks.forEach(w => { totalSessions += w.days.length; });

  // Séances complétées
  const completedCount = Object.values(completedSessions).filter(Boolean).length;
  const percent = Math.round((completedCount / totalSessions) * 100);

  // Mise à jour de l'anneau
  const CIRCUMFERENCE = 251.2; // 2π × 40
  const ringFill = document.querySelector('.ring-fill');
  const ringPercent = document.querySelector('.ring-percent');

  if (ringFill) {
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percent / 100);
    // On déclenche avec un délai pour l'animation
    requestAnimationFrame(() => {
      ringFill.style.strokeDashoffset = offset;
    });
  }

  if (ringPercent) {
    ringPercent.textContent = `${percent}%`;
  }

  // Mise à jour des barres par semaine
  program.weeks.forEach((week, wIdx) => {
    const bar = document.querySelector(`.week-bar-fill[data-week="${wIdx}"]`);
    const counter = document.querySelector(`.week-bar-count[data-week="${wIdx}"]`);
    const total = week.days.length;
    let done = 0;

    week.days.forEach((_, dIdx) => {
      if (completedSessions[`w${wIdx}_d${dIdx}`]) done++;
    });

    if (bar) {
      const pct = Math.round((done / total) * 100);
      setTimeout(() => { bar.style.width = `${pct}%`; }, 200);
    }
    if (counter) counter.textContent = `${done}/${total}`;
  });

  return { completedCount, totalSessions, percent };
}

/**
 * Bascule l'état d'une séance (complétée / non complétée)
 * @param {string} sessionKey - Clé de la séance
 */
function toggleSession(sessionKey) {
  const appData = loadData();
  if (!appData) return;

  if (!appData.completedSessions) appData.completedSessions = {};

  const wasCompleted = appData.completedSessions[sessionKey] === true;
  appData.completedSessions[sessionKey] = !wasCompleted;

  saveData(appData);

  // Mise à jour visuelle du checklist item
  const item = document.querySelector(`[data-session="${sessionKey}"]`);
  if (item) {
    if (!wasCompleted) {
      // Validation → animation
      item.classList.add('done');
      launchConfetti(25);
      showToast('Séance validée ! Excellent travail 💪');
    } else {
      item.classList.remove('done');
    }
  }

  // Mise à jour de la progression
  updateProgressRing(appData);
}

// ============================================================
// 6. GESTION DES ONGLETS DU DASHBOARD
// ============================================================

/**
 * Active un onglet du dashboard
 * @param {string} tabId - ID du tab pane à activer
 */
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

  const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  const targetPane = document.getElementById(tabId);

  if (targetBtn) targetBtn.classList.add('active');
  if (targetPane) targetPane.classList.add('active');
}

// ============================================================
// 7. INITIALISATION ET GESTION DES ÉCRANS
// ============================================================

/**
 * Affiche l'écran de profil avec les données utilisateur pré-remplies
 * @param {object|null} savedData - Données précédemment sauvegardées
 */
function initProfileScreen(savedData) {
  if (savedData && savedData.profile) {
    const p = savedData.profile;
    document.getElementById('inputWeight').value = p.weight || '';
    document.getElementById('inputHeight').value = p.height || '';

    // Sélectionne le bon objectif
    const goalRadio = document.querySelector(`input[name="goal"][value="${p.goal}"]`);
    if (goalRadio) goalRadio.checked = true;
  }
}

/**
 * Construit et affiche le dashboard à partir des données sauvegardées
 * @param {object} appData - Données de l'application
 */
function buildDashboard(appData) {
  const program = PROGRAMS[appData.profile.goal];
  const bmi = calculateBMI(appData.profile.weight, appData.profile.height);
  const currentWeekIdx = appData.currentWeek || 0;

  // ── Onglet Aujourd'hui ──────────────────────────────────────
  const todayTab = document.getElementById('tab-today');
  if (todayTab) {
    todayTab.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <p class="section-label" style="margin: 0;">Séances de la semaine</p>
          <span class="current-week-badge">Semaine ${currentWeekIdx + 1}</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted);">Coche les séances au fur et à mesure. Ta progression est sauvegardée automatiquement.</p>
      </div>
      <div class="checklist-section">
        ${renderChecklist(appData)}
      </div>

      ${currentWeekIdx < 3 ? `
        <button class="btn-secondary" style="margin-top: 20px; width: 100%;" onclick="advanceWeek()">
          Passer à la semaine ${currentWeekIdx + 2} →
        </button>
      ` : `
        <div class="card" style="text-align: center; margin-top: 20px; border-color: var(--success);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🏆</div>
          <strong>Programme terminé !</strong>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">Tu as complété les 4 semaines. Recommence ou ajuste ton objectif.</p>
        </div>
      `}
    `;
  }

  // ── Onglet Programme ───────────────────────────────────────
  const programTab = document.getElementById('tab-program');
  if (programTab) {
    programTab.innerHTML = renderProgram(program, appData.profile);
  }

  // ── Onglet Profil ──────────────────────────────────────────
  const profileTab = document.getElementById('tab-profile');
  if (profileTab) {
    profileTab.innerHTML = `
      <div class="card">
        <p class="section-label">Mon profil</p>
        <div class="profile-stats" style="margin: 0 -28px; padding: 0;">
          <div class="stat-block">
            <div class="stat-value">${appData.profile.weight}<span style="font-size: 1rem; font-weight: 400;">kg</span></div>
            <div class="stat-label">Masse</div>
          </div>
          <div class="stat-block">
            <div class="stat-value">${appData.profile.height}<span style="font-size: 1rem; font-weight: 400;">cm</span></div>
            <div class="stat-label">Taille</div>
          </div>
          <div class="stat-block">
            <div class="stat-value">${bmi.value}</div>
            <div class="stat-label">IMC</div>
          </div>
        </div>
        <div style="padding: 16px 0 0;">
          <span class="imc-badge ${bmi.cssClass}">${bmi.label}</span>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 10px;">${bmi.category}</p>
        </div>
      </div>

      <div class="card">
        <p class="section-label">Mon objectif</p>
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 4px;">
 <span style="font-size: 1.75rem;">${program.icon}</span>
          <div>
            <strong>${program.name}</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${program.intro}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <p class="section-label">Progression globale</p>
        <div class="week-progress-bars" style="margin-top: 8px;">
          ${PROGRAMS[appData.profile.goal].weeks.map((w, i) => `
            <div class="week-bar-row">
              <span class="week-bar-label">Sem. ${i + 1}</span>
              <div class="week-bar-track">
                <div class="week-bar-fill" data-week="${i}"></div>
              </div>
              <span class="week-bar-count" data-week="${i}">0/${w.days.length}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <button class="btn-secondary" style="width: 100%;" onclick="confirmReset()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
         Recommencer un nouveau programme
      </button>
    `;
  }

  // Met à jour les barres et l'anneau après le rendu
  setTimeout(() => updateProgressRing(appData), 100);
}

/**
 * Passe à la semaine suivante
 */
function advanceWeek() {
  const appData = loadData();
  if (!appData) return;

  const program = PROGRAMS[appData.profile.goal];
  const nextWeek = (appData.currentWeek || 0) + 1;

  if (nextWeek >= program.weeks.length) return;

  appData.currentWeek = nextWeek;
  saveData(appData);

  showToast(`Semaine ${nextWeek + 1} démarrée ! Continue comme ça 🔥`);
  buildDashboard(appData);
}

/**
 * Demande confirmation avant le reset
 */
function confirmReset() {
  const confirmed = window.confirm('Recommencer un programme ? Toute ta progression sera effacée.');
  if (confirmed) {
    clearData();
    location.reload();
  }
}

// ============================================================
// 8. SOUMISSION DU FORMULAIRE
// ============================================================

/**
 * Valide et soumet le formulaire de profil
 */
function handleFormSubmit() {
  const weight = parseFloat(document.getElementById('inputWeight').value);
  const height = parseFloat(document.getElementById('inputHeight').value);
  const goalInput = document.querySelector('input[name="goal"]:checked');

  // Validation
  if (!weight || weight < 30 || weight > 250) {
    showToast('Veuillez entrer une masse valide (30–250 kg)');
    return;
  }
  if (!height || height < 100 || height > 250) {
    showToast('Veuillez entrer une taille valide (100–250 cm)');
    return;
  }
  if (!goalInput) {
    showToast('Veuillez sélectionner un objectif');
    return;
  }

  // Création du profil
  const profile = {
    weight,
    height,
    goal: goalInput.value,
    createdAt: new Date().toISOString()
  };

  const appData = {
    profile,
    currentWeek: 0,
    completedSessions: {}
  };

  saveData(appData);

  // Animation de transition
  showToast('Programme généré ! Bonne chance 💪');
  showScreen('screen-dashboard');
  buildDashboard(appData);
}

// ============================================================
// 9. POINT D'ENTRÉE — INITIALISATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Enregistrement du Service Worker ─────────────────────
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[App] Service Worker enregistré', reg.scope))
      .catch(err => console.warn('[App] Échec enregistrement SW', err));
  }

  // ── Chargement des données existantes ────────────────────
  const savedData = loadData();

  if (savedData && savedData.profile) {
    // Utilisateur déjà configuré → aller directement au dashboard
    showScreen('screen-dashboard');
    buildDashboard(savedData);
  } else {
    // Premier lancement → écran de profil
    showScreen('screen-profile');
    initProfileScreen(null);
  }

  // ── Gestion du formulaire ─────────────────────────────────
  const submitBtn = document.getElementById('btnSubmitProfile');
  if (submitBtn) {
    submitBtn.addEventListener('click', handleFormSubmit);
  }

  // Permettre l'envoi du formulaire avec la touche Entrée
  document.getElementById('inputHeight')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleFormSubmit();
  });

  // ── Gestion des onglets du dashboard ─────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // ── Bouton retour depuis dashboard → profil ───────────────
  document.getElementById('btnEditProfile')?.addEventListener('click', () => {
    showScreen('screen-profile');
    initProfileScreen(loadData());
  });

});
// --- GESTION DU MODE SOMBRE / CLAIR ---
const themeToggleBtn = document.getElementById('theme-toggle');

// 1. Vérifier s'il y a un choix enregistré, sinon vérifier les préférences système
const currentTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// 2. Appliquer le thème dès le chargement
if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

// 3. Écouter le clic sur le bouton pour basculer de mode
themeToggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});