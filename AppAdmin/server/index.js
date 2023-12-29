const path = require('path');
const ip = require('ip')
// const chalk = require('chalk')
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8080);
app.use('/',express.static('dist'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'))
});
app.get('/ip',()=>{
    res.json({
      "ip" : headers['x-forwarded-for'] || req.connection.remoteAddress,
    })
})
const server = app.listen(app.get('port'), function() {  
  // console.log(`Server started  ${chalk.green('✓')}`)
  // console.log(`               
  // Localhost: ${chalk.magenta(`http://localhost:${server.address().port}`)}
  // LAN: ${chalk.magenta(`http://${ip.address()}:${server.address().port}`)}     
  // ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}              
  // `)
})