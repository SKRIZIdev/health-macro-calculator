const $ = id => document.getElementById(id);
let sex = 'm';
const round = n => Math.round(n).toLocaleString('en-US');

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
  $('bmr').textContent = round(bmr) + ' kcal';
  $('tdee').textContent = round(tdee);
  $('loss').textContent = round(tdee - 275) + ' kcal';
  $('gain').textContent = round(tdee + 275) + ' kcal';
  const bmi = h ? w / Math.pow(h / 100, 2) : 0;
  $('bmi').textContent = bmi.toFixed(1);
  const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese';
  $('bmiCat').textContent = cat;
}
['age', 'height', 'weight', 'activity'].forEach(id => $(id).addEventListener('input', calc));
calc();
