const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();
const PORT = 3001;
const FILE_NAME = 'datos.xlsx';

app.use(cors());
app.use(bodyParser.json());

app.post('/api/formulario', (req, res) => {
  const datos = req.body;

  let workbook, worksheet;

  if (fs.existsSync(FILE_NAME)) {
    workbook = XLSX.readFile(FILE_NAME);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    jsonData.push(datos);
    const nuevaHoja = XLSX.utils.json_to_sheet(jsonData);
    workbook.Sheets[workbook.SheetNames[0]] = nuevaHoja;
  } else {
    const nuevaHoja = XLSX.utils.json_to_sheet([datos]);
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, nuevaHoja, 'Datos');
  }

  XLSX.writeFile(workbook, FILE_NAME);
  res.status(200).send('Guardado exitoso en Excel');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// ... código anterior
app.get('/api/exportar', (req, res) => {
  if (fs.existsSync(FILE_NAME)) {
    res.download(FILE_NAME, 'datos.xlsx');
  } else {
    res.status(404).send('No hay datos aún');
  }
});

