require('dotenv').config();
const express = require('express');
const {PostgrySQL, ConntingDBPg} = require('./Config/PostgrySQL');
const { Sequelize } = require('sequelize');


const userRoutes = require('./Routes/UserRouter');
const EducationRoutes = require('./Routes/EducationRoutes');
const SkillRoutes = require('./Routes/SkillRoutes');

const app = express();
app.use(express.json());


app.get('/health', (req, res) => {
    res.status(200).json({ status: "success", message: "Server is running!" });
});


app.use((req, res, next)=>{
    console.log(`${req.method} Request to: ${req.url}`);
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/education', EducationRoutes);
app.use('/api/skill', SkillRoutes);


app.use((req, res)=>{
    res.status(404).json({status: 'failed', message: 'Pagen not found'} )
});



const startserver = async()=> {
    try {
        await ConntingDBPg();
        await PostgrySQL.sync({alter: true});
        const PORT = process.env.PORT || 5400; 
        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT}`)
        });
    } catch (error) {
        console.log('server failed:', error.message);
        process.exit(1);
    }
};

startserver();
