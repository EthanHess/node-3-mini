const sessions = {}; 
let nextSessionId = 1; 

module.exports = (req, res, next) => {

    console.log('--- req.body ---', req.body); 
    console.log('--- req.headers ---', req.headers); 

    function createSession() {
        console.log('--- new session created ---'); 
        const newSession = {}; 
        sessions[nextSessionId] = newSession; 
        req.session = newSession; 
        res.setHeader('set-cookie', 'cookieId=' + nextSessionId + '; path=/;') 
        nextSessionId++; 
    }
    if (req.headers.cookie) {
        //cookieId=1 >>> ['cookieId', '1']
        const sessionId = req.headers.cookie.split('=')[1];
        console.log('--- SESSION ID ---', sessionId); 
        if (sessions[sessionId]) {
            req.session = sessions[sessionId]; 
        } else {
            createSession();
        }
    } else {
        createSession(); 
    }
    //No matter our flow, we call next
    next(); 
}