export function showScreen(id) {
  document.querySelectorAll('section').forEach(sec => {
    sec.classList.toggle('d-none', sec.id !== id);
  });
}

export function renderQuestion(question, selectedIndex) {
  const qText      = document.getElementById('question-text');
  const answersList= document.getElementById('answers-list');
  const feedback   = document.getElementById('feedback');

  qText.textContent     = question.text;
  answersList.innerHTML = '';
  feedback.textContent  = '';
  feedback.className    = '';

  question.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'list-group-item list-group-item-action';
    btn.textContent = opt;
    if (idx === selectedIndex) btn.classList.add('active');
    btn.addEventListener('click', () => {
      if (answersList.dataset.locked === 'true') return;
      document.querySelectorAll('.list-group-item')
        .forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      document.dispatchEvent(new CustomEvent('answer-selected', { detail: idx }));
    });
    answersList.appendChild(btn);
  });

  delete answersList.dataset.locked;
}

export function showFeedback(correctIdx, selectedIdx) {
  const items = document.querySelectorAll('#answers-list .list-group-item');
  items.forEach((btn, idx) => {
    if (idx === correctIdx) {
      btn.classList.add('correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('wrong');
    }
  });
  document.getElementById('answers-list').dataset.locked = 'true';
}

export function setActionButton(label, enabled = true) {
  const btn = document.getElementById('btn-action');
  btn.textContent = label;
  btn.disabled   = !enabled;
}

export function renderResult(score, total) {
  document.getElementById('score-text').textContent = `${score} / ${total}`;
}