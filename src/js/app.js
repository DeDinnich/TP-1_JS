import { QuizController } from './controllers/quizController.js';
import {
  showScreen, renderQuestion, showFeedback,
  setActionButton, renderResult
} from './ui/renderer.js';

const quiz       = new QuizController();
const btnStart   = document.getElementById('btn-start');
const btnPrev    = document.getElementById('btn-prev');
const btnAction  = document.getElementById('btn-action');
const btnRestart = document.getElementById('btn-restart');

let selected   = null;
let answered   = false;

// démarrage
btnStart.addEventListener('click', () => {
  showScreen('screen-quiz');
  answered = false;
  updateUI();
});

// sélection réponse
document.addEventListener('answer-selected', e => {
  selected = e.detail;
  setActionButton(answered ? 'Suivant' : 'Valider', true);
});

// précédent
btnPrev.addEventListener('click', () => {
  quiz.prev();
  selected = quiz.userAnswers[quiz.currentIndex];
  answered = false;
  updateUI();
});

// valider / suivant
btnAction.addEventListener('click', () => {
  const current = quiz.getCurrentQuestion();
  // si pas encore validée → on valide
  if (!answered) {
    quiz.answerCurrent(selected);
    showFeedback(current.answer, selected);
    const ok = selected === current.answer;
    const msg = ok ? 'Bonne réponse ! 🎉' : `Mauvaise réponse… c’était « ${current.options[current.answer]} »`;
    const fb  = document.getElementById('feedback');
    fb.textContent = msg;
    answered = true;
    setActionButton('Suivant', true);
    // masquage du bouton Précédent si on est au début
    btnPrev.style.visibility = 'hidden';
  }
  // sinon on passe à la question suivante (ou résultat)
  else {
    if (quiz.isLast()) {
      showScreen('screen-result');
      renderResult(quiz.calculateScore(), quiz.questions.length);
    } else {
      quiz.next();
      selected = quiz.userAnswers[quiz.currentIndex];
      answered = false;
      updateUI();
    }
  }
});

// recommencer
btnRestart.addEventListener('click', () => {
  quiz.reset();
  selected = null;
  answered = false;
  showScreen('screen-start');
});

// mise à jour interface
function updateUI() {
  const q = quiz.getCurrentQuestion();
  const total = quiz.questions.length;
  const current = quiz.currentIndex + 1;
  // mise à jour question/réponses
  renderQuestion(q, selected);
  // boutons
  btnPrev.style.visibility = quiz.isFirst() ? 'hidden' : 'visible';
  setActionButton(answered ? 'Suivant' : 'Valider', selected !== null);

  // mise à jour de la barre de progression
  const pct = Math.round((current / total) * 100);
  const bar = document.getElementById('progress-bar');
  bar.style.width = `${pct}%`;
  bar.setAttribute('aria-valuenow', pct);
  bar.textContent = `${current}/${total}`;
}