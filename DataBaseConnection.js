const http = require('http');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://proiectWEB:facultate@obvi.mvao4jl.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ObVi';

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/fetch-and-insert') {
    try {
      const response = await axios.get('https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/SDG_02_10?format=JSON&lang=en&freq=A&unit=PC&bmi=BMI_GE30&geo=EU27_2020&geo=EU28&geo=EU27_2007&geo=EA19&geo=EA18&geo=BE&geo=BG&geo=CZ&geo=DK&geo=DE&geo=EE&geo=IE&geo=EL&geo=ES&geo=FR&geo=HR&geo=IT&geo=CY&geo=LV&geo=LT&geo=LU&geo=HU&geo=MT&geo=NL&geo=AT&geo=PL&geo=PT&geo=RO&geo=SI&geo=SK&geo=FI&geo=SE&geo=IS&geo=NO&geo=CH&geo=UK&geo=MK&geo=RS&geo=TR&time=2008&time=2014&time=2017&time=2019');
      const data = response.data;

      const client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();

      const db = client.db(dbName);
      const collection = db.collection('Countries');

      const documents = Object.entries(data.value).map(([countryCode, obesityRate]) => ({
        country_code: countryCode,
        obesity_rate: obesityRate
      }));

      const result = await collection.insertMany(documents);

      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Data inserted successfully', insertedCount: result.insertedCount }));

      await client.close();
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Error fetching data from Eurostat API or inserting into MongoDB' }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
