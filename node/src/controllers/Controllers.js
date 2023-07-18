import consumoTramoModel from "../models/Models.js";
import { QueryTypes } from 'sequelize';

export const getHistTramos = async (req, res) => {
  try {
  const consuTramos = await consumoTramoModel.sequelize.query('SELECT c.Linea, SUM(c.Residencial + c.Comercial + c.Industrial) AS consumo, SUM(p.Residencial + p.Comercial + p.Industrial) AS perdidas, SUM(co.Residencial + co.Comercial + co.Industrial) AS costo FROM consumo_tramo c JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea WHERE c.Fecha BETWEEN ? AND ? GROUP BY c.Linea ORDER BY c.Linea', {
  type: QueryTypes.SELECT,
  replacements: [
    req.query.inicio,
    req.query.fin
  ]
  });
  res.json(consuTramos);
  } catch (error) {
  res.json({
  message: error.message
  });
  }
  }

export const getHistCliente = async (req, res) => {
  try {
    const consuTramos = await consumoTramoModel.sequelize.query("SELECT c.Linea, SUM(c.Residencial) AS consumo_residencial, SUM(c.Comercial) AS consumo_comercial, SUM(c.Industrial) AS consumo_industrial, SUM(p.Residencial) AS perdidas_residencial, SUM(p.Comercial) AS perdidas_comercial, SUM(p.Industrial) AS perdidas_industrial, SUM(co.Residencial) AS costo_residencial, SUM(co.Comercial) AS costo_comercial, SUM(co.Industrial) AS costo_industrial FROM consumo_tramo c JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea WHERE c.Fecha BETWEEN ? AND ? GROUP BY c.Linea ORDER BY c.Linea", {
      type: QueryTypes.SELECT,
      replacements: [
        req.query.inicio,
        req.query.fin
      ]
    });
    res.json(consuTramos);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
}

export const getTramosCliente = async (req, res) => {
  try {
    const consuTramos = await consumoTramoModel.sequelize.query("SELECT TipoConsumo, Linea, Perdidas FROM ( SELECT 'Residencial' AS TipoConsumo, pt.Linea, pt.Residencial AS Perdidas FROM perdidas_tramo pt WHERE pt.Fecha BETWEEN ? AND ? UNION ALL SELECT 'Comercial' AS TipoConsumo, pt.Linea, pt.Comercial AS Perdidas FROM perdidas_tramo pt WHERE pt.Fecha BETWEEN ? AND ? UNION ALL SELECT 'Industrial' AS TipoConsumo, pt.Linea, pt.Industrial AS Perdidas FROM perdidas_tramo pt WHERE pt.Fecha BETWEEN ? AND ? ) AS combined_data ORDER BY TipoConsumo, Perdidas DESC LIMIT 20", {
      type: QueryTypes.SELECT,
      replacements: [
        req.query.inicio,
        req.query.fin,
        req.query.inicio,
        req.query.fin,
        req.query.inicio,
        req.query.fin
      ]
    });
    res.json(consuTramos);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
}

export const getAllConsumoTramo = async (req, res) => {
  try {
    const consuTramos = await consumoTramoModel.findAll();
    res.json(consuTramos);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

export const getConsumoTramo = async (req, res) => {
  try {
    const consuTramo = await consumoTramoModel.findAll({
      where: {
        id: req.params.id
      }
    });
    res.json(consuTramo[0]);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

export const createConsumoTramo = async (req, res) => {
  try {
    await consumoTramoModel.create(req.body);
    res.json({
      "message": "Registro creado."
    });
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

export const updateConsumoTramo = async (req, res) => {
  try {
    await consumoTramoModel.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      "message": "Registro actualizado."
    });
  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

export const deleteConsumoTramo = async (req, res) => {
  try {
    await consumoTramoModel.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      "message": "Registro eliminado."
    });
  } catch (error) {
    res.json({
      message: error.message
    });
  }
}
