import app from './app.js'
import './database.js'
import 'dotenv'

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));