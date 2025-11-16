document.getElementById("dietForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const goal = document.getElementById("goal").value;
  const foodPreference = document.getElementById("foodPreference").value;
  const age = parseInt(document.getElementById("age").value, 10);

  const body = {
    heightCm: height,
    weightKg: weight,
    age,
    goal,
    foodPreference
  };

  document.getElementById("result").innerHTML = `
    <div class="alert alert-info">
      <strong>Generating your personalized diet plan...</strong>
    </div>
  `;

  try {
    const res = await fetch("https://diet-backend-3.onrender.com/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const r = data.recommendation;

    document.getElementById("result").innerHTML = `
      <div class='p-4 bg-dark rounded shadow-lg fadeIn'>
        ${r.summary}
        <h5 class='text-success mt-4 mb-3'>Recommended Meals:</h5>
        ${r.mealsHtml}
        <div class="mt-4 p-3 bg-success bg-opacity-25 rounded">
          <h5 class="text-success">AI Recommendation</h5>
          <p>${r.aiSummary}</p>
        </div>
      </div>
    `;

  } catch {
    document.getElementById("result").innerHTML = `
      <div class="alert alert-danger">Server error.</div>
    `;
  }
});






