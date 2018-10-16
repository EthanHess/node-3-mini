const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `./controllers/messages_controller` );
const devMtnSession = require('./middlewares/devmtn-session'); 
const createInitialSession = require('./middlewares/session'); 
const filter = require('./middlewares/filter'); 

const app = express();

app.use( bodyParser.json() );
app.use( devMtnSession );
app.use( createInitialSession );
app.use((req, res, next) => {
    if (req.method === 'POST'|| req.method === 'PUT') {
        filter(req, res, next); 
        return; 
    } 
    next(); 
}); 
app.use( express.static( `${__dirname}/../build` ) );

//Can also pass 'filter' as param in post or get, or do 'app.use' logic above
const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );
app.get( `${messagesBaseUrl}/history`, mc.history) ; 

const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );