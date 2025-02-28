const model = require('../../models/gestion/model');

const controller = {
    obtenerTiposDocumento: async (req, res) => {
        try {
            const tiposDocumento = await model.obtenerTiposDocumento();
            res.json(tiposDocumento);
        } catch (error) {
            console.log(error);
        }
    },

    obtenerDestinatarios: async (req, res) => {
        try {
            const destinatarios = await model.obtenerDestinatarios();
            res.json(destinatarios);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = controller;