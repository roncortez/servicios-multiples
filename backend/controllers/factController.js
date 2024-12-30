const factModel = require('../controllers/factController');

const factController = {
    getArticulos: async(req, res) => {
        const result = await factModel.getArticulos();
        return(res.json);
    }
}

module.exports = factController;