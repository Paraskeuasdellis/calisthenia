/* ============================================================
   CALISTHENIA — app.js
   Single-file logic: data, animated demos, IndexedDB,
   set logging with targets, real AI coach.
   ============================================================ */
(function(){
'use strict';

/* ---------- ANIMATED SVG DEMOS ----------
   Each demo is a tiny looping stick-figure animation built with
   SMIL <animate>. Lightweight, offline, scalable. id() makes the
   animation restart fresh per insertion. */
function demo(kind, big){
  const vb = "0 0 100 100";
  const stroke = big ? 3.2 : 3.6;
  const dur = "2.6s";
  const head = (cx,cy,r) => `<circle cx="${cx}" cy="${cy}" r="${r}" />`;
  const C = 'var(--amber)', BAR='var(--chalk-3)';
  const L = (id,from,to) => `<line stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
      <animate attributeName="x1" dur="${dur}" repeatCount="indefinite" values="${from.x1};${to.x1};${from.x1}"/>
      <animate attributeName="y1" dur="${dur}" repeatCount="indefinite" values="${from.y1};${to.y1};${from.y1}"/>
      <animate attributeName="x2" dur="${dur}" repeatCount="indefinite" values="${from.x2};${to.x2};${from.x2}"/>
      <animate attributeName="y2" dur="${dur}" repeatCount="indefinite" values="${from.y2};${to.y2};${from.y2}"/></line>`;

  // Pull-up family: figure rises/falls under a top bar
  function pullup(){
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="20" x2="88" y2="20" stroke="${BAR}" stroke-width="${stroke}" stroke-linecap="round"/>
      <g>
        <animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite"
           values="0 18; 0 0; 0 18" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
        <line x1="38" y1="20" x2="44" y2="40" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="62" y1="20" x2="56" y2="40" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <circle cx="50" cy="48" r="7" fill="none" stroke="${C}" stroke-width="${stroke}"/>
        <line x1="50" y1="55" x2="50" y2="74" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="50" y1="74" x2="42" y2="90" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="50" y1="74" x2="58" y2="90" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      </g></svg>`;
  }
  // Push-up / dip: figure lowers and pushes (rotates around pivot-ish)
  function pushup(){
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="84" x2="94" y2="84" stroke="${BAR}" stroke-width="${stroke}" stroke-linecap="round"/>
      <g>
        <animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite"
          values="0 0; 0 9; 0 0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <circle cx="24" cy="50" r="7" fill="none" stroke="${C}" stroke-width="${stroke}"/>
        <line x1="31" y1="52" x2="74" y2="62" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="74" y1="62" x2="90" y2="80" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="30" y1="52" x2="30" y2="80" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="55" y1="57" x2="55" y2="80" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      </g></svg>`;
  }
  // Squat / lunge: figure bends knees
  function squat(){
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
      <line x1="14" y1="92" x2="86" y2="92" stroke="${BAR}" stroke-width="${stroke}" stroke-linecap="round"/>
      <circle cx="50" cy="22" r="7" fill="none" stroke="${C}" stroke-width="${stroke}">
        <animate attributeName="cy" dur="${dur}" repeatCount="indefinite" values="22;38;22" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/></circle>
      <line x1="50" y1="29" x2="50" y2="58" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
        <animate attributeName="x1" dur="${dur}" repeatCount="indefinite" values="50;50;50"/>
        <animate attributeName="y1" dur="${dur}" repeatCount="indefinite" values="29;45;29" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="x2" dur="${dur}" repeatCount="indefinite" values="50;50;50"/>
        <animate attributeName="y2" dur="${dur}" repeatCount="indefinite" values="58;66;58" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/></line>
      <line x1="50" y1="58" x2="36" y2="90" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
        <animate attributeName="x1" dur="${dur}" repeatCount="indefinite" values="50;50;50"/>
        <animate attributeName="y1" dur="${dur}" repeatCount="indefinite" values="58;66;58" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="x2" dur="${dur}" repeatCount="indefinite" values="36;30;36" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="y2" dur="${dur}" repeatCount="indefinite" values="90;90;90"/></line>
      <line x1="50" y1="58" x2="64" y2="90" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
        <animate attributeName="x1" dur="${dur}" repeatCount="indefinite" values="50;50;50"/>
        <animate attributeName="y1" dur="${dur}" repeatCount="indefinite" values="58;66;58" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="x2" dur="${dur}" repeatCount="indefinite" values="64;70;64" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="y2" dur="${dur}" repeatCount="indefinite" values="90;90;90"/></line>
      <line x1="42" y1="40" x2="50" y2="34" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      <line x1="58" y1="40" x2="50" y2="34" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/></svg>`;
  }
  // Run / sprint: legs cycling
  function run(){
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="90" x2="94" y2="90" stroke="${BAR}" stroke-width="${stroke}" stroke-linecap="round"/>
      <circle cx="56" cy="26" r="7" fill="none" stroke="${C}" stroke-width="${stroke}"/>
      <line x1="54" y1="33" x2="46" y2="58" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      <line x1="50" y1="42" x2="68" y2="36" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      <line x1="50" y1="42" x2="34" y2="48" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      <line x1="46" y1="58" x2="64" y2="86" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
        <animate attributeName="x2" dur="0.7s" repeatCount="indefinite" values="64;34;64"/>
        <animate attributeName="y2" dur="0.7s" repeatCount="indefinite" values="86;72;86"/>
        <animate attributeName="x1" dur="0.7s" repeatCount="indefinite" values="46;46;46"/>
        <animate attributeName="y1" dur="0.7s" repeatCount="indefinite" values="58;58;58"/></line>
      <line x1="46" y1="58" x2="34" y2="72" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
        <animate attributeName="x2" dur="0.7s" repeatCount="indefinite" values="34;64;34"/>
        <animate attributeName="y2" dur="0.7s" repeatCount="indefinite" values="72;86;72"/>
        <animate attributeName="x1" dur="0.7s" repeatCount="indefinite" values="46;46;46"/>
        <animate attributeName="y1" dur="0.7s" repeatCount="indefinite" values="58;58;58"/></line></svg>`;
  }
  // Plank / hold: steady with subtle breathing
  function hold(){
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="86" x2="94" y2="86" stroke="${BAR}" stroke-width="${stroke}" stroke-linecap="round"/>
      <g><animateTransform attributeName="transform" type="translate" dur="3s" repeatCount="indefinite" values="0 0;0 2;0 0"/>
        <circle cx="22" cy="52" r="7" fill="none" stroke="${C}" stroke-width="${stroke}"/>
        <line x1="29" y1="54" x2="86" y2="64" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="34" y1="55" x2="30" y2="84" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
        <line x1="86" y1="64" x2="86" y2="84" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/></g></svg>`;
  }
  // Leg raise: hanging, legs lift
  function legraise(){
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="16" x2="88" y2="16" stroke="${BAR}" stroke-width="${stroke}" stroke-linecap="round"/>
      <line x1="50" y1="16" x2="50" y2="36" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      <circle cx="50" cy="42" r="6" fill="none" stroke="${C}" stroke-width="${stroke}"/>
      <line x1="50" y1="48" x2="50" y2="66" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round"/>
      <line x1="50" y1="66" x2="44" y2="88" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
        <animate attributeName="x2" dur="${dur}" repeatCount="indefinite" values="44;78;44" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="y2" dur="${dur}" repeatCount="indefinite" values="88;58;88" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="x1" dur="${dur}" repeatCount="indefinite" values="50;50;50"/>
        <animate attributeName="y1" dur="${dur}" repeatCount="indefinite" values="66;66;66"/></line>
      <line x1="50" y1="66" x2="56" y2="88" stroke="${C}" stroke-width="${stroke}" stroke-linecap="round">
        <animate attributeName="x2" dur="${dur}" repeatCount="indefinite" values="56;82;56" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="y2" dur="${dur}" repeatCount="indefinite" values="88;64;88" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="x1" dur="${dur}" repeatCount="indefinite" values="50;50;50"/>
        <animate attributeName="y1" dur="${dur}" repeatCount="indefinite" values="66;66;66"/></line></svg>`;
  }
  const map = { pullup, pushup, squat, run, hold, legraise };
  return (map[kind] || hold)();
}

/* ---------- EXERCISE LIBRARY ----------
   Each exercise: name, muscle group, demo kind, default targets
   (sets / reps-or-time / rest seconds), and whether it's timed.
   targetSec used for timed/hold exercises -> per-set countdown target. */
const EX = {
  pullup:      { n:"Έλξεις (Pull-ups)",        g:"back",   demo:"pullup",   sets:4, reps:"max",   rest:120, type:"reps" },
  dips:        { n:"Βυθίσεις στο δίζυγο (Dips)",g:"chest",  demo:"pushup",   sets:4, reps:"6–12",  rest:120, type:"reps" },
  aussie:      { n:"Australian rows",           g:"back",   demo:"pushup",   sets:3, reps:"10–15", rest:90,  type:"reps" },
  pushup:      { n:"Κάμψεις (Push-ups)",        g:"chest",  demo:"pushup",   sets:3, reps:"max",   rest:90,  type:"reps" },
  chinup:      { n:"Chin-ups (δικέφαλοι)",      g:"arms",   demo:"pullup",   sets:3, reps:"max",   rest:90,  type:"reps" },
  sprint60:    { n:"Sprint 60μ",                g:"legs",   demo:"run",      sets:8, reps:"60μ",   rest:90,  type:"reps", workSec:12 },
  bulgarian:   { n:"Bulgarian split squats",    g:"legs",   demo:"squat",    sets:3, reps:"10–12/πόδι", rest:90, type:"reps" },
  stepup:      { n:"Step-ups (σκαλοπάτια)",     g:"legs",   demo:"squat",    sets:3, reps:"12/πόδι", rest:75, type:"reps" },
  calf:        { n:"Calf raises σε σκαλί",      g:"legs",   demo:"squat",    sets:4, reps:"15–20",  rest:60, type:"reps" },
  jog:         { n:"Χαλαρό jog",                g:"cardio", demo:"run",      sets:1, reps:"",       rest:0,  type:"time", targetSec:480 },
  pullupwide:  { n:"Έλξεις φαρδιά λαβή",        g:"back",   demo:"pullup",   sets:4, reps:"max",   rest:120, type:"reps" },
  pike:        { n:"Pike push-ups (ώμοι)",      g:"chest",  demo:"pushup",   sets:4, reps:"6–10",  rest:120, type:"reps" },
  dips2:       { n:"Βυθίσεις (Dips)",           g:"chest",  demo:"pushup",   sets:3, reps:"max",   rest:90,  type:"reps" },
  invrow:      { n:"Inverted rows στενό",       g:"back",   demo:"pushup",   sets:3, reps:"12",    rest:90,  type:"reps" },
  diamond:     { n:"Diamond push-ups",          g:"arms",   demo:"pushup",   sets:3, reps:"max",   rest:90,  type:"reps" },
  stairs:      { n:"Sprint σκάλες",             g:"legs",   demo:"run",      sets:7, reps:"1 ανέβασμα", rest:120, type:"reps", workSec:15 },
  lunges:      { n:"Walking lunges",            g:"legs",   demo:"squat",    sets:3, reps:"12/πόδι", rest:75, type:"reps" },
  jumpsquat:   { n:"Jump squats",               g:"legs",   demo:"squat",    sets:3, reps:"12",    rest:75,  type:"reps" },
  legraise:    { n:"Hanging leg raises",        g:"core",   demo:"legraise", sets:4, reps:"8–12",  rest:75,  type:"reps" },
  lsit:        { n:"L-sit hold στο δίζυγο",     g:"core",   demo:"hold",     sets:3, reps:"",       rest:90,  type:"time", targetSec:20 },
  plank:       { n:"Plank",                     g:"core",   demo:"hold",     sets:3, reps:"",       rest:60,  type:"time", targetSec:50 }
};

const muscleColor = {
  back:{c:"var(--sky)",  bg:"rgba(95,168,224,0.14)"},
  chest:{c:"var(--amber)",bg:"var(--amber-glow)"},
  arms:{c:"var(--rust)", bg:"var(--rust-bg)"},
  legs:{c:"var(--moss)", bg:"var(--moss-bg)"},
  core:{c:"#c79bf0",     bg:"rgba(199,155,240,0.14)"},
  cardio:{c:"#5fd0c4",   bg:"rgba(95,208,196,0.14)"}
};
const muscleName = { back:"Πλάτη", chest:"Στήθος", arms:"Χέρια", legs:"Πόδια", core:"Κορμός", cardio:"Καρδιο" };

/* ---------- WORKOUTS catalog (pick any of these on any day) ----------
   Each workout has a STABLE key, a name, a focus line, an accent muscle
   group (for the calendar dot color) and its list of exercises. */
const WORKOUTS = {
  upperA:{ name:"Upper A", focus:"Έλξη + Ώθηση",        accent:"back",  ex:["pullup","dips","aussie","pushup","chinup"] },
  lowerA:{ name:"Lower A", focus:"Πόδια + Στίβος",       accent:"legs",  ex:["sprint60","bulgarian","stepup","calf","jog"] },
  upperB:{ name:"Upper B", focus:"Ώμοι + Πάνω κορμός",   accent:"chest", ex:["pullupwide","pike","dips2","invrow","diamond"] },
  lowerB:{ name:"Lower B + Core", focus:"Πόδια + Κορμός", accent:"legs", ex:["stairs","lunges","jumpsquat","legraise","lsit","plank"] },
  core:{   name:"Core",    focus:"Κορμός + Σταθερότητα",  accent:"core",  ex:["legraise","lsit","plank","jumpsquat"] }
};
const WORKOUT_ORDER = ["upperA","lowerA","upperB","lowerB","core"];

/* PROGRAM = the SUGGESTED base week. Maps weekday -> workout key.
   It is only a default proposal; the user can put any workout on any date. */
const PROGRAM = {
  mon:{ name:"Upper A", focus:"Έλξη + Ώθηση",   ex:WORKOUTS.upperA.ex, w:"upperA" },
  tue:{ name:"Lower A", focus:"Πόδια + Στίβος",  ex:WORKOUTS.lowerA.ex, w:"lowerA" },
  thu:{ name:"Upper B", focus:"Ώμοι + Πάνω κορμός", ex:WORKOUTS.upperB.ex, w:"upperB" },
  sat:{ name:"Lower B + Core", focus:"Πόδια + Κορμός", ex:WORKOUTS.lowerB.ex, w:"lowerB" }
};
const dayKeyByJs = { 1:"mon", 2:"tue", 4:"thu", 6:"sat" };
const dayGr = { mon:"Δευτέρα", tue:"Τρίτη", thu:"Πέμπτη", sat:"Σάββατο" };
const dayOrder = ["mon","tue","thu","sat"];

/* ---------- GUIDES (technique) ---------- */
const GUIDES = {
  pullup:{steps:["Πιάσε τη μπάρα με παλάμες προς τα έξω, λίγο πιο φαρδιά από τους ώμους.","Ξεκίνα από πλήρη κρέμαση με ενεργούς ώμους — τράβα τις ωμοπλάτες προς τα κάτω.","Τράβα μέχρι το πιγούνι πάνω από τη μπάρα, αγκώνες προς τα κάτω.","Κατέβα ελεγχόμενα σε πλήρη έκταση."],cue:"Αν δεν βγάζεις ακόμα: <b>negatives</b> — ανέβα με πήδημα και κατέβα αργά σε 3–5 δευτερόλεπτα."},
  dips:{steps:["Στήριξε τα χέρια στις παράλληλες, σώμα ψηλά με ίσιους αγκώνες.","Γείρε ελαφρά μπροστά για έμφαση στο στήθος.","Κατέβα μέχρι οι αγκώνες να φτάσουν ~90°.","Σπρώξε πάνω σε πλήρη έκταση."],cue:"Κράτα τους <b>ώμους χαμηλά</b>, μακριά από τα αυτιά, για να προστατέψεις την άρθρωση."},
  aussie:{steps:["Βρες χαμηλή μπάρα στο ύψος της μέσης.","Κρεμάσου από κάτω, σώμα ευθεία, φτέρνες στο έδαφος.","Τράβα το στήθος προς τη μπάρα, σφίξε τις ωμοπλάτες.","Κατέβα ελεγχόμενα."],cue:"Όσο πιο <b>οριζόντιο</b> το σώμα, τόσο πιο δύσκολο. Ρύθμισε δυσκολία από τη γωνία."},
  pushup:{steps:["Χέρια λίγο πιο φαρδιά από τους ώμους, σώμα ευθεία γραμμή.","Σφίξε κορμό και γλουτούς.","Κατέβα μέχρι το στήθος σχεδόν στο έδαφος.","Σπρώξε πάνω."],cue:"Πιο εύκολο σε <b>κεκλιμένη</b> (χέρια σε παγκάκι), πιο δύσκολο με πόδια ψηλά."},
  chinup:{steps:["Πιάσε τη μπάρα με παλάμες προς το πρόσωπο, στο πλάτος ώμων.","Κρέμαση με ενεργούς ώμους.","Τράβα μέχρι το πιγούνι πάνω από τη μπάρα.","Κατέβα ελεγχόμενα."],cue:"Δίνουν μεγαλύτερη <b>έμφαση στους δικέφαλους</b> από τα κανονικά pull-ups."},
  sprint60:{steps:["Ζεστάνου με 2–3 χαλαρά τρεξίματα και επιταχύνσεις.","Τρέξε 60 μέτρα σχεδόν φουλ ένταση (~90%).","Περπάτα πίσω στην αφετηρία για ξεκούραση.","Επανέλαβε."],cue:"Ξεκούραση = ο χρόνος επιστροφής περπατώντας. <b>Μη μειώνεις την ένταση.</b>"},
  bulgarian:{steps:["Πίσω πόδι σε παγκάκι/σκαλί πίσω σου.","Μπροστινό πόδι σταθερό, ίσιος κορμός.","Κατέβα μέχρι ο μπροστινός μηρός ~παράλληλος.","Σπρώξε από τη φτέρνα πάνω."],cue:"Κράτα το βάρος στο <b>μπροστινό πόδι</b>. Το πίσω μόνο για ισορροπία."},
  stepup:{steps:["Στάσου μπροστά σε σκαλοπάτι/παγκάκι.","Πάτα όλο το πέλμα πάνω.","Σπρώξε εκρηκτικά για να ανέβεις.","Κατέβα ελεγχόμενα, άλλαξε πόδι."],cue:"Για <b>εκρηκτικότητα</b> ανέβα γρήγορα — μπορείς να βάλεις πηδηματάκι στην κορυφή."},
  calf:{steps:["Μπροστινό μέρος πέλματος σε σκαλί, φτέρνες στον αέρα.","Κατέβα τις φτέρνες κάτω από το σκαλί (διάταση).","Ανέβα στις μύτες όσο πιο ψηλά.","Κράτα 1 δευτερόλεπτο στην κορυφή."],cue:"Πλήρες εύρος — χρησιμοποίησε το σκαλί για να πας <b>κάτω από το επίπεδο</b>."},
  jog:{steps:["Τρέξε με άνετο ρυθμό 5–10 λεπτά.","Αναπνοή ελεγχόμενη — να μπορείς να μιλάς.","Χρησιμεύει ως cool-down."],cue:"Βοηθά την <b>αποκατάσταση</b> και ρίχνει σταδιακά τους παλμούς."},
  pullupwide:{steps:["Λαβή πιο φαρδιά από τους ώμους.","Πλήρης κρέμαση, ώμοι ενεργοί.","Τράβα φέρνοντας τις ωμοπλάτες μαζί.","Κατέβα ελεγχόμενα."],cue:"Η φαρδιά λαβή χτυπά περισσότερο το <b>πλάτος του ραχιαίου</b>."},
  pike:{steps:["Σχημάτισε ανάποδο V (γλουτοί ψηλά, χέρια & πόδια στο έδαφος).","Κατέβα το κεφάλι προς το έδαφος ανάμεσα στα χέρια.","Σπρώξε πάνω."],cue:"Όσο πιο <b>κάθετος</b> ο κορμός, τόσο πιο κοντά σε handstand push-up."},
  dips2:{steps:["Στήριξη στις παράλληλες, σώμα ψηλά.","Κατέβα ελεγχόμενα στις 90°.","Σπρώξε πάνω σε έκταση."],cue:"Πιο <b>όρθιος</b> κορμός = έμφαση στους τρικέφαλους."},
  invrow:{steps:["Χαμηλή μπάρα, κρέμαση από κάτω.","Στενή λαβή, σώμα ευθεία.","Τράβα στήθος προς μπάρα.","Κατέβα ελεγχόμενα."],cue:"Στενή λαβή = περισσότερη δουλειά για <b>μέση πλάτη και δικέφαλους</b>."},
  diamond:{steps:["Χέρια μαζί κάτω από το στήθος, δάχτυλα σε σχήμα διαμαντιού.","Σώμα ευθεία γραμμή.","Κατέβα κρατώντας τους αγκώνες κοντά στο σώμα.","Σπρώξε πάνω."],cue:"Στοχεύει έντονα τους <b>τρικέφαλους</b>. Ξεκίνα σε κεκλιμένη αν χρειαστεί."},
  stairs:{steps:["Βρες σκάλα στον στίβο ή κερκίδες.","Ανέβα γρήγορα, πάτα σταθερά κάθε σκαλί.","Κατέβα περπατώντας (ξεκούραση).","Επανέλαβε."],cue:"Εκπληκτικό για <b>εκρηκτική δύναμη ποδιών</b> και καρδιοαναπνευστικά."},
  lunges:{steps:["Βήμα μπροστά, κατέβα μέχρι το πίσω γόνατο κοντά στο έδαφος.","Σπρώξε από τη μπροστινή φτέρνα.","Βήμα με το άλλο πόδι μπροστά.","Συνέχισε εναλλάξ."],cue:"Κράτα τον <b>κορμό όρθιο</b> και το μπροστινό γόνατο πάνω από τον αστράγαλο."},
  jumpsquat:{steps:["Κάθισμα μέχρι οι μηροί ~παράλληλοι.","Εκρηκτικό άλμα προς τα πάνω.","Προσγείωση μαλακή με λυγισμένα γόνατα.","Συνέχισε αμέσως."],cue:"Μαλακή προσγείωση — απορρόφησε με τα γόνατα για <b>προστασία αρθρώσεων</b>."},
  legraise:{steps:["Κρεμάσου από μονόζυγο, ώμοι ενεργοί.","Σήκωσε τα πόδια ίσια μέχρι παράλληλα ή ψηλότερα.","Κατέβασε ελεγχόμενα, χωρίς αιώρηση."],cue:"Πιο εύκολο με <b>λυγισμένα γόνατα</b>. Απόφυγε το κούνημα — δούλεψε τον κορμό."},
  lsit:{steps:["Στήριξη στις παράλληλες, χέρια ίσια.","Σήκωσε τα πόδια ίσια μπροστά σε σχήμα L.","Κράτα τη θέση όσο μπορείς."],cue:"Ξεκίνα με <b>tuck</b> (μαζεμένα γόνατα) και σταδιακά τέντωνε τα πόδια."},
  plank:{steps:["Στήριξη σε πήχεις και μύτες ποδιών.","Σώμα ευθεία γραμμή κεφάλι–φτέρνες.","Σφίξε κορμό και γλουτούς.","Κράτα σταθερά."],cue:"Μη <b>βυθίζεις τη μέση</b>. Κράτα ουδέτερη σπονδυλική στήλη."}
};

/* expose to next file part */
window.__CALIS__ = { demo, EX, muscleColor, muscleName, PROGRAM, WORKOUTS, WORKOUT_ORDER, dayKeyByJs, dayGr, dayOrder, GUIDES };
})();

/* ============================================================
   PART 2 — Engine: DB, navigation, rendering, logging, AI
   ============================================================ */
(function(){
'use strict';
const { demo, EX, muscleColor, muscleName, PROGRAM, WORKOUTS, WORKOUT_ORDER, dayKeyByJs, dayGr, dayOrder, GUIDES } = window.__CALIS__;

/* ---------- IndexedDB ---------- */
const DB_NAME="CalistheniaDB", DB_VER=2; let db=null;
function initDB(){
  return new Promise((res,rej)=>{
    const r=indexedDB.open(DB_NAME,DB_VER);
    r.onupgradeneeded=e=>{
      const d=e.target.result;
      if(!d.objectStoreNames.contains('sessions')) d.createObjectStore('sessions',{keyPath:'date'});
      if(!d.objectStoreNames.contains('sets')) d.createObjectStore('sets',{keyPath:'id'});
      if(!d.objectStoreNames.contains('profile')) d.createObjectStore('profile',{keyPath:'key'});
      if(!d.objectStoreNames.contains('plan')) d.createObjectStore('plan',{keyPath:'date'});
    };
    r.onsuccess=e=>{db=e.target.result;res();};
    r.onerror=e=>rej(e.target.error);
  });
}
function put(store,data){return new Promise(r=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).put(data);tx.oncomplete=()=>r();});}
function get(store,key){return new Promise(r=>{const tx=db.transaction(store,'readonly');const q=tx.objectStore(store).get(key);q.onsuccess=()=>r(q.result);q.onerror=()=>r(null);});}
function all(store){return new Promise(r=>{const tx=db.transaction(store,'readonly');const q=tx.objectStore(store).getAll();q.onsuccess=()=>r(q.result||[]);});}
function clearStore(store){return new Promise(r=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).clear();tx.oncomplete=()=>r();});}
function del(store,key){return new Promise(r=>{const tx=db.transaction(store,'readwrite');tx.objectStore(store).delete(key);tx.oncomplete=()=>r();});}

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const todayKey=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
const dkey=(y,m,d)=>y+'-'+(m+1)+'-'+d;
const fmtT=s=>{const m=Math.floor(s/60),ss=s%60;return m+':'+(ss<10?'0':'')+ss;};
const checkSvg='<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 6"/></svg>';
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),1800);}

/* setId encodes date + exercise + set number */
const setId=(date,exKey,n)=>date+'__'+exKey+'__'+n;

/* ---------- NAVIGATION ---------- */
const tabs=document.querySelectorAll('.tab-btn');
tabs.forEach(t=>t.onclick=async()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  $('#panel-'+t.dataset.tab).classList.add('active');
  window.scrollTo(0,0);
  if(t.dataset.tab==='today') renderToday();
  if(t.dataset.tab==='coach' && window.__CALIS_P3__) window.__CALIS_P3__.renderCoach();
  if(t.dataset.tab==='progress' && window.__CALIS_P3__) window.__CALIS_P3__.renderProgress();
});

/* ============================================================
   TODAY — runner with set logging + targets
   Now date-aware: can view/log ANY date, with a workout assigned
   per date (free choice), falling back to the suggested base week.
   ============================================================ */
let calState={y:new Date().getFullYear(), m:new Date().getMonth()};
let viewDate=todayKey();   // the date currently shown in the runner

/* what workout is on this date?
   priority: explicit assignment in `plan` store -> suggested base week -> none */
async function resolveWorkout(date){
  const assigned=await get('plan',date);
  if(assigned && assigned.workout && WORKOUTS[assigned.workout]){
    return { key:assigned.workout, wk:WORKOUTS[assigned.workout], source:'assigned' };
  }
  // fall back to suggested base week by weekday
  const [Y,M,D]=date.split('-').map(Number);
  const jsDay=new Date(Y,M-1,D).getDay();
  const dk=dayKeyByJs[jsDay];
  if(dk){ const wkey=PROGRAM[dk].w; return { key:wkey, wk:WORKOUTS[wkey], source:'suggested' }; }
  return { key:null, wk:null, source:'rest' };
}

function prettyDate(date){
  const [Y,M,D]=date.split('-').map(Number);
  const d=new Date(Y,M-1,D);
  const wd=["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"][d.getDay()];
  const mo=["Ιαν","Φεβ","Μαρ","Απρ","Μαΐ","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ"][M-1];
  return `${wd} ${D} ${mo}`;
}
const isToday=date=>date===todayKey();

async function renderToday(){
  const date=viewDate;
  const {key:wkey, wk, source}=await resolveWorkout(date);
  let html='';

  // date bar: lets you jump prev/next day, and shows where you are
  html+=`<div class="datebar">
    <button class="navbtn" onclick="window._dayMove(-1)"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
    <div class="datebar-mid">
      <div class="datebar-day">${isToday(date)?'Σήμερα':prettyDate(date)}</div>
      <div class="datebar-sub">${isToday(date)?prettyDate(date):''}</div>
    </div>
    <button class="navbtn" onclick="window._dayMove(1)"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>
  </div>`;
  if(!isToday(date)){
    html+=`<button class="btn btn-ghost btn-sm" style="width:100%;margin-bottom:10px" onclick="window._goToday()">↩︎ Πήγαινε στο σήμερα</button>`;
  } else {
    // reminder if it's been a while since last completed session
    const gap=await daysSinceLast();
    if(gap!==null && gap>=2){
      html+=`<div class="reminder">💡 Έχεις <b>${gap} μέρες</b> να γυμναστείς. ${wk?'Έτοιμη προπόνηση σήμερα — πάμε!':'Βάλε μια προπόνηση και ξεκίνα!'}</div>`;
    }
  }

  if(!wk){
    // rest day (no assignment, not a base-week training day)
    const next=nextTrainingDay();
    html+=`<div class="hero-card"><div class="rest-hero">
      <div class="big">🌙</div>
      <div class="hero-title">Μέρα ξεκούρασης</div>
      <div class="hero-focus">Καμία προπόνηση ορισμένη. Επόμενη προτεινόμενη: <b style="color:var(--amber)">${next}</b></div>
    </div></div>
    <button class="btn btn-amber" onclick="window._openWorkoutPicker('${date}')">${checkSvg} Βάλε προπόνηση αυτή τη μέρα</button>
    <div style="height:6px"></div>`;
  } else {
    const done=await getSessionDone(date);
    const prog=await dayProgress(date,wkey);
    const srcTag = source==='assigned'
      ? `<span class="src-tag assigned">δικό σου</span>`
      : `<span class="src-tag suggested">προτεινόμενο</span>`;
    html+=`<div class="hero-card">
      <div class="hero-label">${prettyDate(date)} ${srcTag}</div>
      <div class="hero-title">${wk.name}</div>
      <div class="hero-focus">${wk.focus}</div>
      <div class="hero-stats">
        <div class="hero-stat"><div class="n">${wk.ex.length}</div><div class="l">ασκήσεις</div></div>
        <div class="hero-stat"><div class="n" style="color:var(--moss)">${prog.doneSets}</div><div class="l">σετ done</div></div>
        <div class="hero-stat"><div class="n" style="color:var(--amber)">${prog.pct}%</div><div class="l">ολοκλήρωση</div></div>
      </div>
    </div>`;
    html+=`<div class="row-2">
      <button class="btn ${done?'btn-moss':'btn-amber'}" onclick="window._toggleSession('${date}')">
        ${done?checkSvg+' Ολοκληρωμένη':checkSvg+' Ολοκλήρωση'}</button>
      <button class="btn btn-ghost" onclick="window._openWorkoutPicker('${date}')">↔︎ Αλλαγή</button>
    </div>`;
    html+='<div style="height:8px"></div>';
    for(let i=0;i<wk.ex.length;i++){
      html+=await exCardHTML(date, wk.ex[i], i);
    }
  }
  // mini calendar strip always visible
  html+=await calendarHTML();
  $('#panel-today').innerHTML=html;
}

window._dayMove=dir=>{
  const [Y,M,D]=viewDate.split('-').map(Number);
  const d=new Date(Y,M-1,D); d.setDate(d.getDate()+dir);
  viewDate=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
  calState={y:d.getFullYear(), m:d.getMonth()};
  renderToday();
};
window._goToday=()=>{ viewDate=todayKey(); const t=new Date(); calState={y:t.getFullYear(),m:t.getMonth()}; renderToday(); };
window._openDate=date=>{ viewDate=date; renderToday(); window.scrollTo(0,0); };

/* ---------- workout picker (assign any workout to a date) ---------- */
window._openWorkoutPicker=async(date)=>{
  const cur=await get('plan',date);
  const curKey=cur?cur.workout:null;
  let cards=WORKOUT_ORDER.map(k=>{
    const w=WORKOUTS[k]; const mc=muscleColor[w.accent];
    const sel=curKey===k?'sel':'';
    const exNames=w.ex.map(x=>EX[x].n.split(' (')[0]).slice(0,4).join(' · ');
    return `<button class="pick-card ${sel}" onclick="window._assignWorkout('${date}','${k}')">
      <div class="pick-top"><span class="pick-name">${w.name}</span>
      <span class="ex-tag" style="color:${mc.c};background:${mc.bg}">${w.focus}</span></div>
      <div class="pick-ex">${exNames}${w.ex.length>4?' …':''}</div>
    </button>`;
  }).join('');
  let extra = curKey ? `<button class="btn btn-ghost btn-sm" style="width:100%;margin-top:6px" onclick="window._clearWorkout('${date}')">✕ Αφαίρεση προπόνησης από τη μέρα</button>` : '';
  window._openModal(`Διάλεξε προπόνηση<div style="font-size:12px;color:var(--chalk-2);font-weight:500;margin-top:3px">${prettyDate(date)}</div>`,
    `<div class="pick-list">${cards}</div>${extra}`);
};
window._assignWorkout=async(date,wkey)=>{
  await put('plan',{date,workout:wkey});
  window._closeModal();
  viewDate=date;
  renderToday();
  toast(WORKOUTS[wkey].name+' ορίστηκε ✓');
};
window._clearWorkout=async(date)=>{
  await del('plan',date);
  window._closeModal();
  renderToday();
  toast('Αφαιρέθηκε');
};

function nextTrainingDay(){
  const today=new Date().getDay();
  for(let i=1;i<=7;i++){
    const d=(today+i)%7;
    if(dayKeyByJs[d]) return dayGr[dayKeyByJs[d]];
  }
  return '';
}

async function exCardHTML(date, exKey, idx){
  const ex=EX[exKey];
  const mc=muscleColor[ex.g];
  const sets=await getExerciseSets(date,exKey);
  const allDone = sets.length>0 && sets.every(s=>s.done) && sets.length>=ex.sets;
  const targetTxt = ex.type==='time'
     ? `Στόχος: κράτα <b>${fmtT(ex.targetSec)}</b>`
     : `Στόχος: <b>${ex.sets} σετ × ${ex.reps}</b>${ex.workSec?` · ~${ex.workSec}″/σετ`:''} · ξεκούραση <b>${ex.rest}″</b>`;

  let body=`<div class="target-hint"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg><span>${targetTxt}</span></div>`;

  // header row for set table
  if(ex.type==='time'){
    body+=`<div class="set-row"><div class="sn"></div><div class="field-lab">χρόνος (δλ)</div><div class="field-lab">σημείωση</div><div></div></div>`;
  } else {
    body+=`<div class="set-row"><div class="sn"></div><div class="field-lab">επαναλήψεις</div><div class="field-lab">βάρος/σημ.</div><div></div></div>`;
  }

  const nRows = Math.max(ex.sets, sets.length, 1);
  for(let n=1;n<=nRows;n++){
    const s = sets.find(x=>x.setNum===n) || {};
    const v1 = s.reps!=null ? s.reps : '';
    const v2 = s.note!=null ? s.note : '';
    const ph1 = ex.type==='time' ? (ex.targetSec||'') : (ex.reps&&ex.reps!=='max'?ex.reps.replace(/\D.*/,''):'');
    body+=`<div class="set-row" data-set="${n}">
      <div class="sn">${n}</div>
      <input class="field" type="${ex.type==='time'?'number':'number'}" inputmode="numeric" placeholder="${ph1}" value="${v1}" data-f="reps" data-ex="${exKey}" data-date="${date}" data-n="${n}">
      <input class="field" type="text" placeholder="—" value="${v2}" data-f="note" data-ex="${exKey}" data-date="${date}" data-n="${n}">
      <button class="set-done ${s.done?'on':''}" onclick="window._toggleSet('${date}','${exKey}',${n})">${checkSvg}</button>
    </div>`;
  }
  body+=`<button class="addset" onclick="window._addSet('${date}','${exKey}',${nRows+1})">+ Πρόσθεσε σετ</button>`;

  // rest timer
  if(ex.rest>0){
    body+=`<div class="rest-timer">
      <span style="font-size:12px;color:var(--chalk-2);">Ξεκούραση</span>
      <span class="rest-disp" id="rest-${exKey}">${fmtT(ex.rest)}</span>
      <button class="btn btn-ghost btn-sm" onclick="window._restStart('${exKey}',${ex.rest})">Start</button>
      <button class="btn btn-ghost btn-sm" onclick="window._restReset('${exKey}',${ex.rest})">Reset</button>
    </div>`;
  }

  return `<div class="ex-card">
    <div class="ex-top" onclick="window._toggleExBody('${date}-${idx}')">
      <div class="ex-demo">${demo(ex.demo,false)}</div>
      <div class="ex-info">
        <div class="ex-name ${allDone?'struck':''}">${ex.n}</div>
        <div class="ex-target">${ex.type==='time'?'Στόχος '+fmtT(ex.targetSec):ex.sets+' × '+ex.reps}</div>
      </div>
      <span class="ex-tag" style="color:${mc.c};background:${mc.bg}">${muscleName[ex.g]}</span>
    </div>
    <div class="ex-body" id="exb-${date}-${idx}">${body}</div>
  </div>`;
}

window._toggleExBody=id=>{ const el=$('#exb-'+id); if(el) el.classList.toggle('open'); };

/* set persistence */
async function getExerciseSets(date,exKey){
  const allSets=await all('sets');
  return allSets.filter(s=>s.date===date && s.exKey===exKey).sort((a,b)=>a.setNum-b.setNum);
}
async function getDaySets(date){ const a=await all('sets'); return a.filter(s=>s.date===date); }

window._toggleSet=async(date,exKey,n)=>{
  const id=setId(date,exKey,n);
  let s=await get('sets',id);
  if(!s){
    // capture current field values
    const repsEl=document.querySelector(`input[data-f="reps"][data-ex="${exKey}"][data-date="${date}"][data-n="${n}"]`);
    const noteEl=document.querySelector(`input[data-f="note"][data-ex="${exKey}"][data-date="${date}"][data-n="${n}"]`);
    s={id,date,exKey,setNum:n,reps:repsEl?repsEl.value:'',note:noteEl?noteEl.value:'',done:false};
  }
  s.done=!s.done;
  await put('sets',s);
  // refresh just the checkbox + name strike, cheaply re-render today
  renderToday();
  if(s.done) toast('Σετ '+n+' ✓');
};

window._addSet=async(date,exKey,n)=>{
  const id=setId(date,exKey,n);
  await put('sets',{id,date,exKey,setNum:n,reps:'',note:'',done:false});
  renderToday();
};

// live save field values on blur
document.addEventListener('blur',async e=>{
  if(e.target.classList&&e.target.classList.contains('field')&&e.target.dataset.ex){
    const{ex,date,n,f}=e.target.dataset;
    const id=setId(date,ex,n);
    let s=await get('sets',id)||{id,date,exKey:ex,setNum:+n,reps:'',note:'',done:false};
    s[f]=e.target.value;
    await put('sets',s);
  }
},true);

/* session done toggle */
async function getSessionDone(date){const s=await get('sessions',date);return s?s.status:false;}
window._toggleSession=async date=>{
  const s=await get('sessions',date);
  const ns=s?!s.status:true;
  await put('sessions',{date,status:ns});
  renderToday();
  toast(ns?'Προπόνηση ολοκληρώθηκε 💪':'Αναιρέθηκε');
};

async function dayProgress(date,wkey){
  const wk=WORKOUTS[wkey]; let total=0,done=0;
  if(!wk) return {doneSets:0,total:0,pct:0};
  const sets=await getDaySets(date);
  wk.ex.forEach(k=>{ total+=EX[k].sets; });
  done=sets.filter(s=>s.done).length;
  return {doneSets:done, total, pct: total?Math.min(100,Math.round(done/total*100)):0};
}

/* rest timers */
const restTimers={};
window._restStart=(key,sec)=>{
  if(restTimers[key]) clearInterval(restTimers[key].iv);
  let left = restTimers[key]?restTimers[key].left:sec;
  if(left<=0) left=sec;
  const disp=$('#rest-'+key); if(disp) disp.classList.add('run');
  restTimers[key]={left,iv:setInterval(()=>{
    restTimers[key].left--;
    const d=$('#rest-'+key);
    if(d) d.textContent=fmtT(Math.max(0,restTimers[key].left));
    if(restTimers[key].left<=0){
      clearInterval(restTimers[key].iv);
      if(d){d.classList.remove('run');d.textContent='Πάμε!';}
      if(navigator.vibrate) navigator.vibrate([120,60,120]);
      toast('Τέλος ξεκούρασης — πάμε σετ!');
    }
  },1000)};
};
window._restReset=(key,sec)=>{
  if(restTimers[key]) clearInterval(restTimers[key].iv);
  restTimers[key]={left:sec,iv:null};
  const d=$('#rest-'+key); if(d){d.classList.remove('run');d.textContent=fmtT(sec);}
};

/* ---------- calendar ---------- */
async function calendarHTML(){
  const {y,m}=calState;
  const months=["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"];
  const head=["Δε","Τρ","Τε","Πε","Πα","Σα","Κυ"];
  let first=new Date(y,m,1).getDay(); first=first===0?6:first-1;
  const days=new Date(y,m+1,0).getDate();
  const tod=new Date();
  const sessions=await all('sessions');
  const doneMap={}; sessions.forEach(s=>{if(s.status)doneMap[s.date]=true;});
  const plans=await all('plan');
  const planMap={}; plans.forEach(p=>{planMap[p.date]=p.workout;});

  let grid='';
  for(let i=0;i<first;i++) grid+='<div class="cal-d empty"></div>';
  for(let d=1;d<=days;d++){
    const jsd=new Date(y,m,d).getDay();
    const baseTrain=dayKeyByJs[jsd];      // suggested base-week training day
    const k=dkey(y,m,d);
    const done=doneMap[k];
    const assigned=planMap[k];            // user-assigned workout
    const hasWork = assigned || baseTrain;
    const isToday=(d===tod.getDate()&&m===tod.getMonth()&&y===tod.getFullYear());
    const isView=(k===viewDate);
    let cls='cal-d tappable';
    if(done)cls+=' done'; else if(assigned)cls+=' assigned'; else if(baseTrain)cls+=' train';
    if(isToday)cls+=' today';
    if(isView)cls+=' viewing';
    const dot = hasWork&&!done ? '<span class="dot"></span>' : '';
    grid+=`<div class="${cls}" onclick="window._openDate('${k}')">${d}${dot}</div>`;
  }
  return `<div class="card">
    <div class="cal-nav">
      <div class="cal-month">${months[m]} ${y}</div>
      <div style="display:flex;gap:8px">
        <button class="navbtn" onclick="window._calMove(-1)"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
        <button class="navbtn" onclick="window._calMove(1)"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>
      </div>
    </div>
    <div class="cal-grid">${head.map(h=>'<div class="cal-h">'+h+'</div>').join('')}</div>
    <div class="cal-grid" style="margin-top:5px">${grid}</div>
    <div class="cal-legend">
      <span><i class="lg done"></i> ολοκληρωμένη</span>
      <span><i class="lg assigned"></i> δικό σου</span>
      <span><i class="lg train"></i> προτεινόμενο</span>
    </div>
  </div>`;
}
window._calMove=dir=>{
  let m=calState.m+dir,y=calState.y;
  if(m<0){m=11;y--;} if(m>11){m=0;y++;}
  calState={y,m}; renderToday();
};

/* ============================================================
   PLANNER — "suggest me days"
   User picks how many sessions/week; we spread them across the
   coming days with rest gaps and assign workouts in rotation.
   ============================================================ */
const ROTATION=["upperA","lowerA","upperB","lowerB"]; // core gets sprinkled
function spreadDays(freq){
  // returns array of offsets (days from today) for `freq` sessions across next 7 days
  // even spacing, e.g. 3 -> [0,2,4] ; 4 -> [0,2,4,6] ; 2 -> [0,3]
  const map={1:[0],2:[0,3],3:[0,2,4],4:[0,2,4,6],5:[0,1,3,4,6],6:[0,1,2,4,5,6]};
  return map[freq]||map[3];
}
async function applyAutoPlan(freq){
  const offsets=spreadDays(freq);
  const today=new Date(); today.setHours(0,0,0,0);
  let rot=0;
  // clear existing future plan first (next 7 days) to avoid duplicates
  for(let i=0;i<7;i++){
    const d=new Date(today); d.setDate(d.getDate()+i);
    const k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    if(!offsets.includes(i)) await del('plan',k);
  }
  for(const off of offsets){
    const d=new Date(today); d.setDate(d.getDate()+off);
    const k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    let wkey=ROTATION[rot%ROTATION.length]; rot++;
    if(freq>=5 && off===offsets[offsets.length-1]) wkey="core"; // last session = core on high freq
    await put('plan',{date:k,workout:wkey});
  }
  await put('profile',{key:'freq',value:freq});
  toast(freq+'× την εβδομάδα — οι μέρες μπήκαν ✓');
  renderProgram(); renderToday();
}
window._autoPlan=freq=>applyAutoPlan(freq);

async function getFreq(){ const f=await get('profile','freq'); return f?f.value:null; }

/* days since last completed session — used for the reminder */
async function daysSinceLast(){
  const sessions=(await all('sessions')).filter(s=>s.status);
  if(!sessions.length) return null;
  let latest=0;
  sessions.forEach(s=>{ const [Y,M,D]=s.date.split('-').map(Number); const t=new Date(Y,M-1,D).getTime(); if(t>latest)latest=t; });
  const today=new Date(); today.setHours(0,0,0,0);
  return Math.round((today.getTime()-latest)/86400000);
}

async function plannerHTML(){
  const freq=await getFreq();
  const opts=[2,3,4,5].map(n=>`<button class="freq-btn ${freq===n?'on':''}" onclick="window._autoPlan(${n})">${n}×</button>`).join('');
  return `<div class="card planner">
    <div class="planner-head">
      <div><div class="planner-title">Πρότεινέ μου μέρες</div>
      <div class="planner-sub">Πόσες προπονήσεις θες την εβδομάδα; Θα τις μοιράσω με σωστή ξεκούραση.</div></div>
    </div>
    <div class="freq-row">${opts}</div>
    ${freq?`<div class="planner-note">✓ Ορισμένο: <b>${freq}× / εβδομάδα</b>. Δες τις μέρες στο ημερολόγιο (tab «Σήμερα»). Μπορείς πάντα να αλλάξεις χειροκίνητα οποιαδήποτε μέρα.</div>`:''}
  </div>`;
}

/* ============================================================
   PROGRAM panel
   ============================================================ */
async function renderProgram(){
  // planner at top
  $('#planner-mount').innerHTML=await plannerHTML();

  // show ALL available workouts as the catalog (the base week is just a suggestion)
  let html='<div class="section-lab">Διαθέσιμες προπονήσεις</div>';
  WORKOUT_ORDER.forEach(wkey=>{
    const p=WORKOUTS[wkey]; const mc=muscleColor[p.accent];
    html+=`<div class="card"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
      <div style="font-size:17px;font-weight:800">${p.name}</div>
      <span class="ex-tag" style="color:${mc.c};background:${mc.bg}">${p.focus}</span></div>`;
    p.ex.forEach(k=>{
      const ex=EX[k]; const m2=muscleColor[ex.g];
      html+=`<div class="ex-top" style="padding:9px 0;cursor:default">
        <div class="ex-demo" style="width:44px;height:44px">${demo(ex.demo,false)}</div>
        <div class="ex-info"><div class="ex-name">${ex.n}</div>
        <div class="ex-target">${ex.type==='time'?'κράτα '+fmtT(ex.targetSec):ex.sets+' × '+ex.reps}</div></div>
        <span class="ex-tag" style="color:${m2.c};background:${m2.bg}">${muscleName[ex.g]}</span></div>`;
    });
    html+='</div>';
  });
  $('#program-days').innerHTML=html;
}

/* ============================================================
   GUIDE panel
   ============================================================ */
function renderGuide(){
  const seen={}; let id=0;
  let html='';
  WORKOUT_ORDER.forEach(wkey=>{
    WORKOUTS[wkey].ex.forEach(k=>{
      if(seen[k])return; seen[k]=1;
      const ex=EX[k]; const g=GUIDES[k]; if(!g)return;
      id++; const gid='g'+id; const mc=muscleColor[ex.g];
      let steps=g.steps.map((s,i)=>`<div class="step"><span class="step-n">${i+1}</span><span>${s}</span></div>`).join('');
      html+=`<div class="ex-card">
        <div class="g-head" onclick="window._gToggle('${gid}')">
          <div class="ex-demo">${demo(ex.demo,false)}</div>
          <div class="ex-info"><div class="ex-name">${ex.n}</div>
          <div class="ex-target" style="color:${mc.c}">${muscleName[ex.g]}</div></div>
          <svg class="g-chev" id="chev-${gid}" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="g-body" id="body-${gid}">
          <div class="demo-big">${demo(ex.demo,true)}</div>
          ${steps}
          <div class="cue"><b>Συμβουλή:</b> ${g.cue}</div>
          <a class="photo-link" target="_blank" rel="noopener" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent(ex.n+' calisthenics technique')}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            Δες πραγματικές φωτό & βίντεο
          </a>
        </div>
      </div>`;
    });
  });
  $('#guide-list').innerHTML=html;
}
window._gToggle=id=>{ $('#body-'+id).classList.toggle('open'); $('#chev-'+id).classList.toggle('open'); };

/* expose engine bits to part 3 */
window.__CALIS_ENGINE__={ initDB, put, get, all, del, clearStore, $, todayKey, dkey, fmtT, toast,
  renderToday, renderProgram, renderGuide, PROGRAM, WORKOUTS, WORKOUT_ORDER, EX, dayKeyByJs, dayGr, dayOrder, muscleName, getDaySets, getFreq };
})();

/* ============================================================
   PART 3 — Coach (real AI), Progress, Entry
   ============================================================ */
(function(){
'use strict';
const E=window.__CALIS_ENGINE__;
const {initDB,put,get,all,del,clearStore,$,todayKey,fmtT,toast,renderToday,renderProgram,renderGuide,PROGRAM,WORKOUTS,WORKOUT_ORDER,EX,dayKeyByJs,dayGr,muscleName,getDaySets}=E;
const muscleColor=window.__CALIS__.muscleColor;

/* ---------- API key storage (kept on-device) ---------- */
async function getKey(){ const k=await get('profile','ai_key'); return k?k.value:''; }
async function getProvider(){ const p=await get('profile','ai_provider'); return p?p.value:'anthropic'; }
async function saveKey(key,provider){ await put('profile',{key:'ai_key',value:key}); await put('profile',{key:'ai_provider',value:provider}); }

/* ---------- readiness ---------- */
function readinessScore(s){ // s={sleep,energy,stress,soreness} 1..10
  return (s.sleep*0.35)+(s.energy*0.35)+((10-s.stress)*0.15)+((10-s.soreness)*0.15);
}
function tier(score){
  if(score>=7.5) return {label:'Υψηλό', color:'var(--moss)', key:'high'};
  if(score>=5.0) return {label:'Μέτριο', color:'var(--amber)', key:'mid'};
  return {label:'Χαμηλό', color:'var(--rust)', key:'low'};
}
function ruleAdvice(score){
  if(score>=7.5) return '🔥 <b>Υψηλό readiness.</b> Το σώμα είναι σε φόρμα — ιδανική μέρα για PR. Πρόσθεσε 1 επανάληψη ή ένα extra σετ στις βασικές ασκήσεις.';
  if(score>=5.0) return '💪 <b>Μέτριο readiness.</b> Ακολούθησε το πλάνο με σταθερή, καθαρή τεχνική. Μη ζορίζεις μέχρι αποτυχία σε κάθε σετ.';
  return '⚠️ <b>Χαμηλό readiness.</b> Φαίνεται κόπωση/στρες. Κάνε deload: μείωσε 1–2 σετ ανά άσκηση ή κάνε active recovery (χαλαρό jog + διατάσεις).';
}

async function renderCoach(){
  const key=await getKey();
  const prov=await getProvider();
  const date=todayKey();
  const saved=await get('profile','readiness_'+date);
  const s=saved||{sleep:5,energy:5,stress:5,soreness:5};
  const score=readinessScore(s); const t=tier(score);

  let html='';

  // API setup state
  if(!key){
    html+=`<div class="setup-banner">
      <b>Ο AI Coach δεν είναι ενεργός.</b> Για πραγματικές, προσωποποιημένες συμβουλές που διαβάζουν το ιστορικό σου, σύνδεσε ένα δικό σου κλειδί API.
      <br><button class="link-btn" onclick="window._openKeyModal()">Σύνδεση API key →</button>
    </div>`;
  } else {
    html+=`<div class="card" style="padding:12px 14px;display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:12.5px;color:var(--chalk-2)"><b style="color:var(--moss)">● AI ενεργό</b> · ${prov==='anthropic'?'Claude':'OpenAI'}</div>
      <button class="link-btn" onclick="window._openKeyModal()">Αλλαγή</button>
    </div>`;
  }

  // readiness engine
  html+=`<div class="card">
    <div class="sec-title"><svg viewBox="0 0 24 24"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>Πώς νιώθεις σήμερα</div>
    <div class="readiness-grid">
      ${slider('sleep','Ύπνος',s.sleep)}
      ${slider('energy','Ενέργεια',s.energy)}
      ${slider('stress','Στρες',s.stress)}
      ${slider('soreness','Μυϊκό πιάσιμο',s.soreness)}
    </div>
    <div class="score-ring" style="margin-top:18px">
      <div class="ring-num" id="ring-num" style="color:${t.color}">${score.toFixed(1)}</div>
      <div class="ring-lab">Readiness Score<br><span class="tier" id="ring-tier" style="color:${t.color}">${t.label}</span></div>
    </div>
    <button class="btn btn-amber" onclick="window._saveReadiness()">Αποθήκευση & ανάλυση</button>
  </div>`;

  // advice
  html+=`<div class="card">
    <div class="sec-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>Σύσταση προπόνησης</div>
    <div class="advice-box" id="advice">${ruleAdvice(score)}</div>
  </div>`;

  // chat
  html+=`<div class="card">
    <div class="sec-title"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Ρώτησε τον Coach</div>
    <div class="chat-box" id="chat-box">
      <div class="msg coach"><span class="who">Coach</span><div class="bubble">Γεια σου Παρασκευά! Είμαι ο προπονητής σου. ${key?'Μπορώ να δω το ιστορικό σου — ρώτα με ό,τι θες για την προπόνηση, την πρόοδο ή την τεχνική.':'Σύνδεσε API key για να σου δίνω πραγματικά έξυπνες απαντήσεις βάσει του ιστορικού σου.'}</div></div>
    </div>
    <div class="chat-in">
      <input class="chat-field" id="chat-field" placeholder="${key?'π.χ. Τι να προσέξω σήμερα;':'Σύνδεσε key πρώτα...'}" ${key?'':'disabled'}
        onkeydown="if(event.key==='Enter')window._sendChat()">
      <button class="send-btn" onclick="window._sendChat()"><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></button>
    </div>
  </div>`;

  $('#coach-content').innerHTML=html;
}

function slider(id,label,val){
  return `<div class="slider-row">
    <label>${label} <b id="lab-${id}">${val}/10</b></label>
    <input type="range" min="1" max="10" value="${val}" id="rng-${id}" oninput="window._updReadiness()">
  </div>`;
}

window._updReadiness=()=>{
  const g=id=>+$('#rng-'+id).value;
  const s={sleep:g('sleep'),energy:g('energy'),stress:g('stress'),soreness:g('soreness')};
  ['sleep','energy','stress','soreness'].forEach(id=>$('#lab-'+id).textContent=$('#rng-'+id).value+'/10');
  const score=readinessScore(s); const t=tier(score);
  $('#ring-num').textContent=score.toFixed(1); $('#ring-num').style.color=t.color;
  $('#ring-tier').textContent=t.label; $('#ring-tier').style.color=t.color;
  $('#advice').innerHTML=ruleAdvice(score);
};

window._saveReadiness=async()=>{
  const g=id=>+$('#rng-'+id).value;
  const s={sleep:g('sleep'),energy:g('energy'),stress:g('stress'),soreness:g('soreness')};
  const date=todayKey();
  await put('profile',{key:'readiness_'+date,...s,date});
  const score=readinessScore(s);
  toast('Readiness αποθηκεύτηκε');
  // if AI active, get a tailored recommendation
  const key=await getKey();
  if(key){
    $('#advice').innerHTML='<span class="typing">Ο Coach αναλύει το ιστορικό σου…</span>';
    const ctx=await buildContext();
    const reply=await askAI(key, await getProvider(),
      `Με βάση το σημερινό μου readiness (${score.toFixed(1)}/10: ύπνος ${s.sleep}, ενέργεια ${s.energy}, στρες ${s.stress}, πιάσιμο ${s.soreness}) και το ιστορικό μου, δώσε μου μια σύντομη, συγκεκριμένη σύσταση για τη σημερινή προπόνηση. Μέγιστο 3 προτάσεις.`,
      ctx, []);
    $('#advice').innerHTML=reply.replace(/\n/g,'<br>');
  }
};

/* ---------- BUILD CONTEXT for the AI from real history ---------- */
async function buildContext(){
  const sessions=(await all('sessions')).filter(s=>s.status);
  const sets=(await all('sets')).filter(s=>s.done);
  const profiles=await all('profile');
  const readiness=profiles.filter(p=>p.key.startsWith('readiness_')).sort((a,b)=>(a.date<b.date?1:-1)).slice(0,7);

  // aggregate volume per muscle
  const vol={}; Object.keys(muscleName).forEach(k=>vol[k]=0);
  sets.forEach(s=>{ const ex=EX[s.exKey]; if(ex) vol[ex.g]=(vol[ex.g]||0)+1; });

  // recent sessions (last 10)
  const recent=sessions.map(s=>s.date).sort((a,b)=>(a<b?1:-1)).slice(0,10);

  // last logged values per exercise (progression signal)
  const lastByEx={};
  sets.forEach(s=>{
    if(!lastByEx[s.exKey]||s.date>lastByEx[s.exKey].date)
      lastByEx[s.exKey]={date:s.date,reps:s.reps,note:s.note};
  });
  const progLines=Object.keys(lastByEx).map(k=>`${EX[k]?EX[k].n:k}: τελευταίο ${lastByEx[k].reps||'-'}${lastByEx[k].note?' ('+lastByEx[k].note+')':''}`).slice(0,12);

  // weekly frequency preference + upcoming planned sessions
  const freqP=profiles.find(p=>p.key==='freq');
  const weeklyTarget=freqP?freqP.value:null;
  const plans=await all('plan');
  const todayT=new Date(); todayT.setHours(0,0,0,0);
  const upcoming=plans.filter(p=>{
    const [Y,M,D]=p.date.split('-').map(Number);
    return new Date(Y,M-1,D).getTime()>=todayT.getTime();
  }).sort((a,b)=>(a.date<b.date?-1:1)).slice(0,7)
    .map(p=>`${p.date}: ${WORKOUTS[p.workout]?WORKOUTS[p.workout].name:p.workout}`);

  return {
    totalSessions:sessions.length,
    totalSets:sets.length,
    volume:vol,
    recentDates:recent,
    weeklyTarget,
    upcomingPlan:upcoming,
    readiness:readiness.map(r=>({date:r.date,score:readinessScore(r).toFixed(1),sleep:r.sleep,energy:r.energy,stress:r.stress,soreness:r.soreness})),
    progression:progLines,
    workouts:WORKOUT_ORDER.map(wk=>`${WORKOUTS[wk].name}: ${WORKOUTS[wk].ex.map(k=>EX[k].n).join(', ')}`)
  };
}

/* ---------- REAL AI CALL ---------- */
async function askAI(key, provider, userMsg, ctx, history){
  const sys=`Είσαι ο προσωπικός προπονητής calisthenics του Παρασκευά μέσα στην εφαρμογή "Calisthenia".
Μιλάς ΕΛΛΗΝΙΚΑ, φιλικά και άμεσα, με σύντομες πρακτικές απαντήσεις (συνήθως 2–4 προτάσεις).
Βασίζεσαι ΣΤΟ ΠΡΑΓΜΑΤΙΚΟ ΙΣΤΟΡΙΚΟ του χρήστη που σου δίνεται παρακάτω σε JSON. Αναφέρσου σε αριθμούς όταν βοηθάει.
Δίνεις προοδευτική καθοδήγηση (progressive overload), σέβεσαι το readiness, και ποτέ δεν προτείνεις επικίνδυνη υπερπροπόνηση.

ΙΣΤΟΡΙΚΟ ΧΡΗΣΤΗ (JSON):
${JSON.stringify(ctx,null,1)}`;

  try{
    if(provider==='anthropic'){
      const msgs=[...history,{role:'user',content:userMsg}];
      const res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
        body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:500,system:sys,messages:msgs})
      });
      if(!res.ok){const t=await res.text();throw new Error('API '+res.status+': '+t.slice(0,120));}
      const data=await res.json();
      return data.content.filter(b=>b.type==='text').map(b=>b.text).join('\n').trim()||'(κενή απάντηση)';
    } else {
      const msgs=[{role:'system',content:sys},...history,{role:'user',content:userMsg}];
      const res=await fetch('https://api.openai.com/v1/chat/completions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
        body:JSON.stringify({model:'gpt-4o-mini',max_tokens:500,messages:msgs})
      });
      if(!res.ok){const t=await res.text();throw new Error('API '+res.status+': '+t.slice(0,120));}
      const data=await res.json();
      return data.choices[0].message.content.trim();
    }
  }catch(err){
    return '⚠️ Δεν μπόρεσα να συνδεθώ με το AI ('+err.message+'). Έλεγξε το key και τη σύνδεση. Στο μεταξύ: ακολούθησε το πλάνο με καθαρή τεχνική.';
  }
}

/* chat */
let chatHistory=[];
window._sendChat=async()=>{
  const field=$('#chat-field'); const msg=field.value.trim(); if(!msg)return;
  const key=await getKey(); if(!key){toast('Σύνδεσε API key πρώτα');return;}
  const box=$('#chat-box');
  box.innerHTML+=`<div class="msg you"><span class="who">Εσύ</span><div class="bubble">${escapeHtml(msg)}</div></div>`;
  field.value=''; box.scrollTop=box.scrollHeight;
  const loadId='load'+Date.now();
  box.innerHTML+=`<div class="msg coach" id="${loadId}"><span class="who">Coach</span><div class="bubble"><span class="typing">σκέφτεται…</span></div></div>`;
  box.scrollTop=box.scrollHeight;
  const ctx=await buildContext();
  const reply=await askAI(key,await getProvider(),msg,ctx,chatHistory);
  chatHistory.push({role:'user',content:msg},{role:'assistant',content:reply});
  if(chatHistory.length>12)chatHistory=chatHistory.slice(-12);
  const el=$('#'+loadId); if(el) el.querySelector('.bubble').innerHTML=reply.replace(/\n/g,'<br>');
  box.scrollTop=box.scrollHeight;
};
function escapeHtml(s){return s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}

/* ---------- KEY MODAL ---------- */
window._openKeyModal=async()=>{
  const cur=await getKey(); const prov=await getProvider();
  const bg=$('#modal-bg');
  bg.innerHTML=`<div class="modal">
    <h3>Σύνδεση AI Coach</h3>
    <p>Το κλειδί μένει <b>μόνο στο κινητό σου</b> (IndexedDB) — δεν στέλνεται πουθενά αλλού εκτός από τον πάροχο AI. Πάρε δωρεάν/φθηνό κλειδί από το <b>console.anthropic.com</b> (Claude) ή <b>platform.openai.com</b> (OpenAI).</p>
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button class="btn btn-ghost btn-sm" id="prov-anthropic" onclick="window._setProv('anthropic')" style="flex:1">Claude (Anthropic)</button>
      <button class="btn btn-ghost btn-sm" id="prov-openai" onclick="window._setProv('openai')" style="flex:1">OpenAI</button>
    </div>
    <input type="password" id="key-input" placeholder="sk-..." value="${cur||''}">
    <button class="btn btn-amber" onclick="window._saveKey()">Αποθήκευση</button>
    <button class="btn btn-ghost" style="margin-top:8px" onclick="window._closeModal()">Άκυρο</button>
  </div>`;
  bg.classList.add('open');
  window._setProv(prov);
  bg.onclick=e=>{if(e.target===bg)window._closeModal();};
};
let _selProv='anthropic';
window._setProv=p=>{_selProv=p;
  const a=$('#prov-anthropic'),o=$('#prov-openai');
  if(a&&o){
    a.style.borderColor=p==='anthropic'?'var(--amber)':'var(--line-2)';
    a.style.color=p==='anthropic'?'var(--amber)':'var(--chalk)';
    o.style.borderColor=p==='openai'?'var(--amber)':'var(--line-2)';
    o.style.color=p==='openai'?'var(--amber)':'var(--chalk)';
  }
};
window._saveKey=async()=>{
  const k=$('#key-input').value.trim();
  if(!k){toast('Βάλε ένα key');return;}
  await saveKey(k,_selProv);
  window._closeModal(); toast('AI Coach ενεργό 🎉'); renderCoach();
};
window._openModal=(title,bodyHtml)=>{
  const bg=document.querySelector('#modal-bg');
  bg.innerHTML=`<div class="modal">
    <h3>${title}</h3>
    ${bodyHtml}
    <button class="btn btn-ghost" style="margin-top:10px" onclick="window._closeModal()">Κλείσιμο</button>
  </div>`;
  bg.classList.add('open');
  bg.onclick=e=>{if(e.target===bg)window._closeModal();};
};
window._closeModal=()=>{const bg=$('#modal-bg');bg.classList.remove('open');bg.innerHTML='';};

/* ============================================================
   PROGRESS panel
   ============================================================ */
async function renderProgress(){
  const sessions=(await all('sessions')).filter(s=>s.status);
  const sets=(await all('sets')).filter(s=>s.done);

  // week count
  const tod=new Date();
  const dow=tod.getDay()===0?6:tod.getDay()-1;
  const ws=new Date(tod); ws.setDate(tod.getDate()-dow); ws.setHours(0,0,0,0);
  const we=new Date(ws); we.setDate(ws.getDate()+6); we.setHours(23,59,59,999);
  let week=0;
  sessions.forEach(s=>{const p=s.date.split('-');const d=new Date(+p[0],+p[1]-1,+p[2]);if(d>=ws&&d<=we)week++;});

  // streak (training days within 3-day gap)
  const dts=sessions.map(s=>{const p=s.date.split('-');return new Date(+p[0],+p[1]-1,+p[2]);}).sort((a,b)=>b-a);
  let streak=0;
  if(dts.length){let cur=new Date(dts[0]);for(const d of dts){const diff=Math.round((cur-d)/86400000);if(diff<=3){streak++;cur=d;}else break;}}
  $('#topStreak').innerHTML=`<b>${streak}</b><br>μέρες σερί`;

  // volume per muscle
  const vol={}; Object.keys(muscleName).forEach(k=>vol[k]=0);
  sets.forEach(s=>{const ex=EX[s.exKey];if(ex)vol[ex.g]++;});
  const maxVol=Math.max(1,...Object.values(vol));

  const pct=Math.min(100,Math.round(week/4*100));

  let html=`<div class="stat-grid">
    <div class="stat-box"><div class="n amber">${week}</div><div class="l">προπονήσεις βδομάδα</div></div>
    <div class="stat-box"><div class="n">${sessions.length}</div><div class="l">σύνολο προπονήσεων</div></div>
    <div class="stat-box"><div class="n moss">${streak}</div><div class="l">σερί</div></div>
    <div class="stat-box"><div class="n sky">${sets.length}</div><div class="l">σετ ολοκληρωμένα</div></div>
  </div>`;

  html+=`<div class="card"><div class="sec-title"><svg viewBox="0 0 24 24"><path d="M4 19V11M10 19V5M16 19v-7M22 19H2"/></svg>Όγκος ανά μυϊκή ομάδα</div>`;
  if(sets.length===0){
    html+='<div class="empty">Δεν υπάρχουν δεδομένα ακόμα.<br>Ξεκίνα να τικάρεις σετ στην καρτέλα «Σήμερα».</div>';
  } else {
    Object.keys(muscleName).forEach(k=>{
      const mc=muscleColor[k]; const w=Math.round(vol[k]/maxVol*100);
      html+=`<div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px">
          <span style="color:var(--chalk-2)">${muscleName[k]}</span><span class="mono" style="color:${mc.c};font-weight:700">${vol[k]}</span></div>
        <div class="track"><div class="track-fill" style="width:${w}%;background:${mc.c}"></div></div>
      </div>`;
    });
  }
  html+='</div>';

  html+=`<div class="card"><div class="sec-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Στόχος εβδομάδας</div>
    <div style="font-size:13px;color:var(--chalk-2);margin-bottom:2px">${week} από 4 προπονήσεις</div>
    <div class="track"><div class="track-fill" style="width:${pct}%"></div></div>
    <div style="font-size:12px;color:var(--chalk-3)">${pct}% ολοκληρωμένο</div>
  </div>`;

  html+=`<button class="danger-btn" onclick="window._resetAll()">Μηδενισμός όλων των δεδομένων</button>`;
  $('#progress-content').innerHTML=html;
}

window._resetAll=async()=>{
  if(confirm('Σίγουρα; Όλα τα δεδομένα (προπονήσεις, σετ, readiness) θα διαγραφούν οριστικά. Το API key παραμένει.')){
    await clearStore('sessions'); await clearStore('sets');
    // keep ai key, clear readiness
    const profs=await all('profile');
    for(const p of profs){ if(p.key.startsWith('readiness_')){ const tx=window.indexedDB; } }
    // simpler: clear profile then restore key
    const key=await get('profile','ai_key'); const prov=await get('profile','ai_provider');
    await clearStore('profile');
    if(key)await put('profile',key); if(prov)await put('profile',prov);
    toast('Δεδομένα διαγράφηκαν'); renderProgress(); renderToday();
  }
};

/* expose */
window.__CALIS_P3__={renderCoach,renderProgress};

/* ============================================================
   ENTRY
   ============================================================ */
initDB().then(()=>{
  renderToday();
  renderProgram();
  renderGuide();
});
})();
