import express from 'express';
import cors from "cors";
import bookingRoutes from "./routes/bookings.routes.js";


const app = express()

const port = 3000

app.use(express.json());
app.use(cors());
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('djshf')    
})

app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({status: 'ok'})
})
// only requests to /api/bookings will be sent to our "router"
app.use('/api/bookings', bookingRoutes);
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

