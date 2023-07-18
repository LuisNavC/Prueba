import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const consumoTramoModel = db.define('consumo_tramo', {
    Linea: { type: DataTypes.STRING },
    Fecha: { type: DataTypes.DATE },
    Residencial: { type: DataTypes.DOUBLE },
    Comercial: { type: DataTypes.DOUBLE },
    Industrial: { type: DataTypes.DOUBLE },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: "consumo_tramo"
});

export const conHistTramo = db.define('', {
    Linea: { type: DataTypes.STRING },
    consumo: { type: DataTypes.STRING },
    perdidas: { type: DataTypes.STRING },
    costo: { type: DataTypes.STRING },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: "consumo_tramo"
});

export default consumoTramoModel;
