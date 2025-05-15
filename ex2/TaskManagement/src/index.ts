import express  from "express";
import path from "path";
import taskRoutes from './routes/taskRoutes';
import open from 'open';

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',taskRoutes);

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
    // const open = await import('open');
    open('http://localhost:3000/task.html');
});