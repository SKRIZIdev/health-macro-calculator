const $ = id => document.getElementById(id);
let sex = 'm';

function animateNum(el, to, suffix = '') {
  const from = el._v || 0, start = performance.now(), dur = 550;
  function step(t) {
    const p = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * e).toLocaleString('en-US') + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  el._v = to; requestAnimationFrame(step);
}

document.querySelectorAll('#sex button').forEach(b => b.onclick = () => {
  document.querySelectorAll('#sex button').forEach(x => x.classList.remove('on'));
  b.classList.add('on'); sex = b.dataset.v; calc();
});

function calc() {
  const age = +$('age').value || 0;
  const h = +$('height').value || 0;
  const w = +$('weight').value || 0;
  const act = +$('activity').value;
  const bmr = 10 * w + 6.25 * h - 5 * age + (sex === 'm' ? 5 : -161);
  const tdee = bmr * act;
  animateNum($('bmr'), bmr, ' kcal');
  animateNum($('tdee'), tdee);
  animateNum($('loss'), tdee - 275, ' kcal');
  animateNum($('gain'), tdee + 275, ' kcal');
  const bmi = h ? w / Math.pow(h / 100, 2) : 0;
  $('bmi').textContent = bmi.toFixed(1);
  const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese';
  $('bmiCat').textContent = cat;
  // marker on a 15–40 BMI scale
  const pos = Math.max(0, Math.min(100, (bmi - 15) / (40 - 15) * 100));
  $('bmiMarker').style.left = pos + '%';
}
['age', 'height', 'weight', 'activity'].forEach(id => $(id).addEventListener('input', calc));
calc();
