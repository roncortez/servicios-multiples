import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    numero: '',
    cliente: '',
    fechaEmision: '',
    fechaVencimiento: '',
    bodega: '',
  });

  const [formDetailData, setFormDetailData] = useState({
    cantidad: 0,
    articulo: null,
  });

  const [details, setDetails] = useState([]);

  const bodegas = ['VIVERES Y BEBIDAS', 'EVENTOS', 'ACTIVOS FIJOS'];
  const [articulos, setArticulos] = useState([]);

  const useEffect = () => {
    const fetchArticulos = () => {
        const response = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/facturacion/articulos`)
        setArticulos(response.data);
    }
  }

  // Manejar cambios genéricamente
  const handleChange = (event, setState) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar cambios de react-select
  const handleSelectChange = (selectedOption, setState, fieldName) => {
    setState((prevState) => ({
      ...prevState,
      [fieldName]: selectedOption,
    }));
  };

  // Agregar un nuevo detalle
  const addDetail = () => {
    setDetails([...details, { ...formDetailData }]);
    setFormDetailData({ cantidad: 0, articulo: null }); // Reiniciar detalle
  };

  return (
    <div>
      <h2>Datos Generales</h2>
      <div>
        <label>Número</label>
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={(e) => handleChange(e, setFormData)}
        />
        <label>Emisión</label>
        <input
          type="date"
          name="fechaEmision"
          value={formData.fechaEmision}
          onChange={(e) => handleChange(e, setFormData)}
        />
        <label>Vencimiento</label>
        <input
          type="date"
          name="fechaVencimiento"
          value={formData.fechaVencimiento}
          onChange={(e) => handleChange(e, setFormData)}
        />
        <label>Cliente</label>
        <input
          type="text"
          name="cliente"
          value={formData.cliente}
          onChange={(e) => handleChange(e, setFormData)}
        />
        <label>Bodega</label>
        <select
          name="bodega"
          value={formData.bodega}
          onChange={(e) => handleChange(e, setFormData)}
        >
          <option value="">Seleccione una bodega</option>
          {bodegas.map((bodega, index) => (
            <option key={index} value={bodega}>
              {bodega}
            </option>
          ))}
        </select>
      </div>

      <h2>Detalle de Factura</h2>
      <table>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Artículo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td>{detail.cantidad}</td>
              <td>{detail.articulo?.label}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="number"
                name="cantidad"
                value={formDetailData.cantidad}
                onChange={(e) => handleChange(e, setFormDetailData)}
                min={0}
              />
            </td>
            <td>
              <Select
                options={articulos}
                value={formDetailData.articulo}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, setFormDetailData, 'articulo')
                }
                placeholder="Seleccione un artículo"
                required
              />
            </td>
            <td>
              <button type="button" onClick={addDetail}>
                Agregar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Resumen</h2>
      <p>Bodega seleccionada: {formData.bodega}</p>
      <p>Cliente: {formData.cliente}</p>
      <p>
        Detalles:
        <ul>
          {details.map((detail, index) => (
            <li key={index}>
              {detail.cantidad} - {detail.articulo?.label}
            </li>
          ))}
        </ul>
      </p>
    </div>
  );
};

export default Dashboard;
