function clearFields() {
  document.getElementById("prevUnits").value = "";
  document.getElementById("currentUnits").value = "";
  document.getElementById("result").innerHTML = "";
}

function calculateBill() {
  const prevUnits = parseFloat(document.getElementById("prevUnits").value);
  const currentUnits = parseFloat(document.getElementById("currentUnits").value);
  let result = '';

  if (isNaN(prevUnits) || isNaN(currentUnits) || prevUnits < 0 || currentUnits < 0) {
    document.getElementById("result").innerHTML = "Please enter valid numbers for both fields.";
    return;
  }

  if (currentUnits < prevUnits) {
    document.getElementById("result").innerHTML = "Current unit reading cannot be less than previous month units.";
    return;
  }

  const units = currentUnits - prevUnits;
  let remaining = units;
  let total = 0;
  const breakdown = [];

  if (remaining > 0) {
    const slab = Math.min(remaining, 100);
    const cost = slab * 3.40;
    total += cost;
    breakdown.push(`First 100 units @ ₹3.40 = ₹${cost.toFixed(2)}`);
    remaining -= slab;
  }

  if (remaining > 0) {
    const slab = Math.min(remaining, 100);
    const cost = slab * 4.30;
    total += cost;
    breakdown.push(`Next 100 units @ ₹4.30 = ₹${cost.toFixed(2)}`);
    remaining -= slab;
  }

  if (remaining > 0) {
    const slab = Math.min(remaining, 200);
    const cost = slab * 6.70;
    total += cost;
    breakdown.push(`Next 200 units @ ₹6.70 = ₹${cost.toFixed(2)}`);
    remaining -= slab;
  }

  if (remaining > 0) {
    const cost = remaining * 7.35;
    total += cost;
    breakdown.push(`Remaining ${remaining} units @ ₹7.35 = ₹${cost.toFixed(2)}`);
  }

  const fixedCharge = 80;
  const electricityDuty = units * 0.06;
  const grandTotal = total + fixedCharge + electricityDuty;

  result += `Units Consumed: ${units}<br>`;
  result += `(Current: ${currentUnits} - Previous: ${prevUnits})<br><br><strong>Breakdown:</strong><br>${breakdown.join('<br>')}`;
  result += `<br>Fixed Charges: ₹${fixedCharge.toFixed(2)}`;
  result += `<br>Electricity Duty @ ₹0.06/unit: ₹${electricityDuty.toFixed(2)}`;
  result += `<br><br><strong>Total Payable: ₹${grandTotal.toFixed(2)}</strong>`;

  document.getElementById("result").innerHTML = result;
}

// Netlify counter
window.addEventListener('DOMContentLoaded', () => {
  fetch('/.netlify/functions/counter')
    .then(response => response.json())
    .then(data => {
      document.getElementById('visitCount').textContent = data.totalVisits;
    })
    .catch(err => {
      console.error('Error loading counter:', err);
      document.getElementById('visitCount').textContent = 'N/A';
    });
});
