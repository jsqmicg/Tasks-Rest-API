import express from 'express';
import TasksRoutes from './routes/tasks.routes.js'
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//routes
app.get('/', (req, res)=>{
    res.json({message: 'welcome to my application'})
})

app.use('/api/tasks', TasksRoutes);

export default app;