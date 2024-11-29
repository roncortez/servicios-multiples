const loginModel = require('../models/loginModel');

const loginController = {
    getCredentials: async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await loginModel.getCredentials({ email });
            console.log(result);
            
            if (!result) {
                return res.status(404).json({message: 'Usuario no encontrado'}); 
            }
            return res.json(result);

        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = loginController;
