let incidentLog = [];

function logIncident(msg) {
  const entry = `[${new Date().toLocaleString()}] ${msg}`;
  incidentLog.push(entry);
}

function saveToLocalStorage() {
  localStorage.setItem("incidentLog", JSON.stringify(incidentLog));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem("incidentLog");
  if (saved) incidentLog = JSON.parse(saved);
}
loadFromLocalStorage();

function detectPhishing() {
  const input = document.getElementById('emailInput').value.toLowerCase();
  const result = document.getElementById('emailResult');
  const keywords = ['urgent', 'verify', 'click here', 'password', 'bank', 'suspend'];

  const isPhishing = keywords.some(k => input.includes(k));
  const today = new Date().toLocaleDateString();

  if (isPhishing) {
    result.textContent = "⚠️ Potential phishing detected!";
    updatePhishingChart(today);
  } else {
    result.textContent = "✅ No phishing indicators found.";
  }

  logIncident("Phishing detection executed.");
  saveToLocalStorage();
}

function simulateUserBehavior() {
  const activities = ["Login at odd hour", "Accessed restricted file", "Normal usage", "Failed password attempt"];
  const activity = activities[Math.floor(Math.random() * activities.length)];
  document.getElementById("behaviorResult").textContent = `Detected: ${activity}`;
  logIncident(`User activity simulated: ${activity}`);
  saveToLocalStorage();
}

function shareThreat() {
  const threats = ["Zero-day malware", "Ransomware variant", "Credential stuffing attempt"];
  const threat = threats[Math.floor(Math.random() * threats.length)];
  document.getElementById("sharedThreat").textContent = `Shared threat: ${threat}`;
  logIncident(`Threat shared: ${threat}`);
  saveToLocalStorage();
}

function showIncidentLog() {
  document.getElementById("incidentLog").textContent = incidentLog.join('\n');
}

function downloadLogs() {
  const blob = new Blob([incidentLog.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "incident-log.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function generateAIResponse() {
  const email = document.getElementById('emailInput').value;
  const responseEl = document.getElementById('aiResponse');
  if (!email.trim()) {
    responseEl.textContent = "Please paste an email above to analyze.";
    return;
  }

  const response = `Based on your email content, it is recommended to:
1. Avoid clicking any unknown links.
2. Do not provide personal information.
3. Report this email to your IT security team.`;
  responseEl.textContent = response;
  logIncident("AI response generated.");
  saveToLocalStorage();
}

let mapInitialized = false;
function simulateLoginActivity() {
  if (!mapInitialized) {
    const map = L.map('loginMap').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    window.loginMap = map;
    mapInitialized = true;
  }

  const cities = [
    { name: "New York", coords: [40.7128, -74.006] },
    { name: "Tokyo", coords: [35.6895, 139.6917] },
    { name: "London", coords: [51.5074, -0.1278] },
    { name: "Berlin", coords: [52.52, 13.405] },
    { name: "Delhi", coords: [28.6139, 77.2090] },
    { name: "São Paulo", coords: [-23.5505, -46.6333] }
  ];

  cities.forEach(city => {
    L.marker(city.coords).addTo(window.loginMap).bindPopup(`Login from ${city.name}`).openPopup();
  });

  logIncident("Simulated login activity on map.");
  saveToLocalStorage();
}

// Phishing Detection Chart
const phishingData = {
  labels: [],
  datasets: [{
    label: 'Phishing Detections',
    data: [],
    backgroundColor: 'rgba(255, 99, 132, 0.6)'
  }]
};

const phishingChart = new Chart(
  document.getElementById('phishingChart'),
  {
    type: 'bar',
    data: phishingData,
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  }
);

function updatePhishingChart(date) {
  const idx = phishingData.labels.indexOf(date);
  if (idx > -1) {
    phishingData.datasets[0].data[idx]++;
  } else {
    phishingData.labels.push(date);
    phishingData.datasets[0].data.push(1);
  }
  phishingChart.update();
}

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', mode);
}

(function applySavedTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
})();
function detectPhishing() {
    const input = document.getElementById('emailInput').value.toLowerCase();
    const result = document.getElementById('emailResult');
  
    // Keywords with risk scoring
    const highRiskKeywords = ['urgent', 'verify', 'click here', 'password', 'bank', 'suspend', 'reset', 'login now'];
    const moderateRiskKeywords = ['account', 'security', 'update', 'confirm', 'invoice', 'unusual'];
  
    let highHits = 0;
    let moderateHits = 0;
  
    highRiskKeywords.forEach(keyword => {
      if (input.includes(keyword)) highHits++;
    });
  
    moderateRiskKeywords.forEach(keyword => {
      if (input.includes(keyword)) moderateHits++;
    });
  
    const today = new Date().toLocaleDateString();
  
    if (highHits >= 2 || (highHits >= 1 && moderateHits >= 2)) {
      result.textContent = "❌ High Risk: Potential phishing detected!";
      result.style.color = "#ff4d4f";
      updatePhishingChart(today);
      logIncident("High risk phishing detected.");
    } else if (moderateHits > 0 || highHits === 1) {
      result.textContent = "⚠️ Moderate Risk: Suspicious elements found.";
      result.style.color = "#ffa500";
      logIncident("Moderate risk phishing suspicion.");
    } else {
      result.textContent = "✅ Safe: No phishing indicators found.";
      result.style.color = "#2ea043";
      logIncident("Email analyzed as safe.");
    }
  
    saveToLocalStorage();
  }
  const threatSamples = [
    "🚨 Malware detected in email attachment.",
    "🔒 Multiple failed login attempts from IP: 192.168.1.101",
    "🧬 Zero-day vulnerability detected in endpoint.",
    "📦 Suspicious file download from untrusted source.",
    "🌐 DNS poisoning attempt blocked.",
    "📧 Phishing email reported by user.",
    "🔄 Data exfiltration attempt stopped.",
    "🛡️ Firewall blocked inbound attack.",
    "🕵️‍♂️ Unusual user behavior detected.",
    "💣 Ransomware signature identified."
  ];
  
  function startThreatFeed() {
    const feed = document.getElementById('threatFeed');
  
    function updateFeed() {
      const randomThreat = threatSamples[Math.floor(Math.random() * threatSamples.length)];
      const timestamp = new Date().toLocaleTimeString();
      const newEntry = `[${timestamp}] ${randomThreat}`;
      feed.textContent = newEntry + '\n' + feed.textContent;
    }
  
    setInterval(updateFeed, 4000); // Update every 4 seconds
  }
  
  // Start threat feed on load
  document.addEventListener("DOMContentLoaded", startThreatFeed);
  