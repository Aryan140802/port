// Function to fetch JSON and render the alert widget
async function fetchAndRenderAlerts() {
  const jsonUrl = 'main_alerts.json'; // Replace with the actual path to your JSON file

  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    renderAlertWidget(data);
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
}

// Function to render the fixed alert box and the alert table
function renderAlertWidget(jsonData) {
  const container = document.getElementById('alert-widget-container');
  if (!container) return;

  // Find all non-"No issue." alerts
  const allAlerts = [];
  for (const ipAddress in jsonData) {
    for (const sys in jsonData[ipAddress]) {
      for (const key in jsonData[ipAddress][sys]) {
        if (jsonData[ipAddress][sys][key] !== "No issue.") {
          allAlerts.push({
            ip: ipAddress,
            system: sys,
            component: key,
            message: jsonData[ipAddress][sys][key]
          });
        }
      }
    }
  }

  // Calculate the total number of non-"No issue." alerts
  const alertCount = allAlerts.length;

  // Create the alert box
  const alertBox = document.createElement('div');
  alertBox.id = 'alert-box';
  alertBox.innerHTML = `
    <span class="icon">🔔</span>
    <span class="count">${alertCount}</span>
    <div class="message">Alerts</div>
  `;
if (alertCount > 0){
	alertBox.className = "blink";
}
  container.appendChild(alertBox);

  // Create the table and make it initially hidden
  const alertTable = document.createElement('div');
  alertTable.id = 'alert-table';
  alertTable.style.display = 'none';

  if (alertCount > 0) {
    const tableHtml = `
      <h3>Active Alerts (${alertCount})</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Server</th>
              <th>Broker</th>
              <th>EG</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            ${allAlerts.map(alert => `
              <tr>
                <td>${alert.ip}</td>
                <td>${alert.system}</td>
                <td>${alert.component}</td>
                <td>${alert.message}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <button id="close-table-btn">Close</button>
    `;
    alertTable.innerHTML = tableHtml;
  } else {
    alertTable.innerHTML = `<h3>No Active Alerts</h3><button id="close-table-btn">Close</button>`;
  }
  
  container.appendChild(alertTable);

  // Add event listeners for showing/hiding the table
  alertBox.addEventListener('click', () => {
    alertTable.style.display = 'block';
  });

  document.getElementById('close-table-btn').addEventListener('click', () => {
    alertTable.style.display = 'none';
  });
}

// Call the main function to start everything
fetchAndRenderAlerts();
