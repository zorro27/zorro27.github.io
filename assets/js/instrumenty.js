// Калькуляторы страницы "Инструменты для проектировщиков"
// Вынесено в отдельный файл, чтобы страница не требовала 'unsafe-inline'
// в Content-Security-Policy (script-src 'self').
document.addEventListener('DOMContentLoaded', function () {
  var rainBtn = document.getElementById('calc-rain-btn');
  if (rainBtn) {
    rainBtn.addEventListener('click', function () {
      var q20 = parseFloat(document.getElementById('calc-q20').value) || 0;
      var f = parseFloat(document.getElementById('calc-area').value) || 0;
      var psi = parseFloat(document.getElementById('calc-psi').value) || 0;
      var q = q20 * f * psi;
      document.getElementById('calc-rain-result').textContent = 'Q ≈ ' + q.toFixed(1) + ' л/с';
    });
  }
  var hozBtn = document.getElementById('calc-hoz-btn');
  if (hozBtn) {
    hozBtn.addEventListener('click', function () {
      var n = parseFloat(document.getElementById('calc-n').value) || 0;
      var q = parseFloat(document.getElementById('calc-q').value) || 0;
      var res = n * q / 1000;
      document.getElementById('calc-hoz-result').textContent = 'Q ≈ ' + res.toFixed(1) + ' м³/сутки';
    });
  }
});
