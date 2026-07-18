require('dotenv').config();
const {Sequelize} = require('sequelize');

const PostgrySQL = new Sequelize(process.env.PostgresURL , {
    dialect: 'postgres',
    logging: false,
}); 


const ConntingDBPg = async () => {
    try {
        await PostgrySQL.authenticate();
        console.log('PostgreySQL Connected');
    } catch (error) {
        console.log('PostgreySQL error', error);
        throw error;
    }
}



module.exports = {PostgrySQL, ConntingDBPg};
