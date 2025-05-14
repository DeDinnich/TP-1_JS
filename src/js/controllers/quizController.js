import { questions } from '../data/questions.js';

export class QuizController {
  constructor() {
    this.questions = questions;
    this.currentIndex = 0;
    this.userAnswers = new Array(questions.length).fill(null);
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  answerCurrent(index) {
    this.userAnswers[this.currentIndex] = index;
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  isFirst() {
    return this.currentIndex === 0;
  }

  isLast() {
    return this.currentIndex === this.questions.length - 1;
  }

  calculateScore() {
    return this.userAnswers.reduce((score, ans, idx) => {
      return score + (ans === this.questions[idx].answer ? 1 : 0);
    }, 0);
  }

  reset() {
    this.currentIndex = 0;
    this.userAnswers.fill(null);
  }
}