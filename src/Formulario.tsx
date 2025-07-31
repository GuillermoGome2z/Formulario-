import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const UpdateInformationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    deporte: '',
    genero: '',
    residencia: '',
    mayorDe21: false,
    modelosAutos: [] as string[],
  });

  // Aquí guardamos todos los formularios llenados
  const [registros, setRegistros] = useState<typeof formData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;

      if (name === 'mayorDe21') {
        setFormData({ ...formData, mayorDe21: target.checked });
      } else {
        const modelosActuales = formData.modelosAutos;
        const nuevaLista = target.checked
          ? [...modelosActuales, value]
          : modelosActuales.filter((item) => item !== value);

        setFormData({ ...formData, modelosAutos: nuevaLista });
      }
    } else if (type === 'radio') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistros(prev => [...prev, formData]); // Guardar el formulario actual
    alert('Información guardada correctamente');

    // Limpiar el formulario
    setFormData({
      nombre: '',
      apellido: '',
      deporte: '',
      genero: '',
      residencia: '',
      mayorDe21: false,
      modelosAutos: [],
    });
  };

  const exportToExcel = () => {
    if (registros.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registros');
    XLSX.writeFile(wb, 'registros_formulario.xlsx');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label>
      <br />

      <label>
        Apellido:
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
      </label>
      <br />

      <label>
        Deporte Favorito:
        <select name="deporte" value={formData.deporte} onChange={handleChange}>
          <option value="">Seleccione uno</option>
          <option value="Futbol">Fútbol</option>
          <option value="Basketball">Basketball</option>
          <option value="Tenis">Tenis</option>
          <option value="Natación">Natación</option>
        </select>
      </label>
      <br />

      <label>Género:</label>
      <label>
        <input type="radio" name="genero" value="Masculino" checked={formData.genero === 'Masculino'} onChange={handleChange} />
        Masculino
      </label>
      <label>
        <input type="radio" name="genero" value="Femenino" checked={formData.genero === 'Femenino'} onChange={handleChange} />
        Femenino
      </label>
      <br />

      <label>
        Residencia:
        <select name="residencia" value={formData.residencia} onChange={handleChange}>
          <option value="">Seleccione un departamento</option>
           <option value="Alta Verapaz">Alta Verapaz</option>
    <option value="Baja Verapaz">Baja Verapaz</option>
    <option value="Chimaltenango">Chimaltenango</option>
    <option value="Chiquimula">Chiquimula</option>
    <option value="El Progreso">El Progreso</option>
    <option value="Escuintla">Escuintla</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Huehuetenango">Huehuetenango</option>
    <option value="Izabal">Izabal</option>
    <option value="Jalapa">Jalapa</option>
    <option value="Jutiapa">Jutiapa</option>
    <option value="Petén">Petén</option>
    <option value="Quetzaltenango">Quetzaltenango</option>
    <option value="Quiché">Quiché</option>
    <option value="Retalhuleu">Retalhuleu</option>
    <option value="Sacatepéquez">Sacatepéquez</option>
    <option value="San Marcos">San Marcos</option>
    <option value="Santa Rosa">Santa Rosa</option>
    <option value="Sololá">Sololá</option>
    <option value="Suchitepéquez">Suchitepéquez</option>
    <option value="Totonicapán">Totonicapán</option>
    <option value="Zacapa">Zacapa</option>
        </select>
      </label>
      <br />

      <label>
        <input type="checkbox" name="mayorDe21" checked={formData.mayorDe21} onChange={handleChange} />
        Mayor de 21 años
      </label>
      <br />

      <label>Modelos que posee de autos:</label>
      <label>
        <input type="checkbox" name="modelosAutos" value="Ford" checked={formData.modelosAutos.includes('Ford')} onChange={handleChange} />
        Ford
      </label>
      <label>
        <input type="checkbox" name="modelosAutos" value="Chrysler" checked={formData.modelosAutos.includes('Chrysler')} onChange={handleChange} />
        Chrysler
      </label>
      <label>
        <input type="checkbox" name="modelosAutos" value="Toyota" checked={formData.modelosAutos.includes('Toyota')} onChange={handleChange} />
        Toyota
      </label>
      <label>
        <input type="checkbox" name="modelosAutos" value="Nissan" checked={formData.modelosAutos.includes('Nissan')} onChange={handleChange} />
        Nissan
      </label>
      <br />

      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={exportToExcel}>Exportar a Excel</button>
    </form>
  );
};

export default UpdateInformationForm;
