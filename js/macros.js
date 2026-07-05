const $ = id => document.getElementById(id);
function calc() {
  const cals = +$('cals').value || 0;
  const [pp, cp, fp] = $('split').value.split(',').map(Number);
  const protein = Math.round(cals * pp / 100 / 4);
  const carbs = Math.round(cals * cp / 100 / 4);
  const fat = Math.round(cals * fp / 100 / 9);
  $('protein').textContent = protein + ' g'; $('pc').textContent = pp + '%';
  $('carbs').textContent = carbs + ' g'; $('cc').textContent = cp + '%';
  $('fat').textContent = fat + ' g'; $('fc').textContent = fp + '%';
  $('bar').innerHTML =
    `<div style="width:${pp}%;background:var(--p)"></div>
     <div style="width:${cp}%;background:var(--c)"></div>
     <div style="width:${fp}%;background:var(--f)"></div>`;
}
['cals', 'split'].forEach(id => $(id).addEventListener('input', calc));
calc();
