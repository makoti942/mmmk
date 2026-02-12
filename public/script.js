document.addEventListener('DOMContentLoaded', () => {
 fetch('/networks')
 .then(response => response.json())
 .then(data => {
 const ssidSelect = document.getElementById('ssid');
 data.forEach(network => {
 const option = document.createElement('option');
 option.value = network.ssid;
 option.textContent = network.ssid;
 ssidSelect.appendChild(option);
 });
 })
 .catch(error => console.error('Error fetching networks:', error));

 document.getElementById('wifiForm').addEventListener('submit', async (event) => {
 event.preventDefault();

 const ssid = document.getElementById('ssid').value;
 const method = document.getElementById('method').value;
 const response = await fetch('/hack', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({ ssid, method })
 });

 const result = await response.text();
 document.getElementById('result').innerText = result;
 });
});
