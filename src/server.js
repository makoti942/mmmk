const express = require('express');
const bodyParser = require('body-parser');
const wifi = require('node-wifi');
const crack = require('./crack');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/networks', (req, res) => {
 wifi.init({
 iface: null
 });

 wifi.scan((error, networks) => {
 if (error) {
 return res.status(500).json({ error: 'Error scanning networks' });
 }
 res.json(networks);
 });
});

app.post('/hack', async (req, res) => {
 const { ssid, method } = req.body;
 try {
 const password = await crack.crackPassword(ssid, method);
 res.send(`Password for ${ssid}: ${password}`);
 } catch (error) {
 res.status(500).send(`Error: ${error.message}`);
 }
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});
