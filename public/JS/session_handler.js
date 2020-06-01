var cookieParser = require('cookie-parser')
var session = require('express-session')

/*
var MSSQLStore = require('connect-mssql')(session)
var mssql = require('mssql')
*/

module.exports = {
    createStore: () =>{
        var config = {
            user: 'test',
            password: '12345',
            server: 'localhost',
            database: 'testdb',
            port: 1433,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMills: 30000
            }
        }
        return new MSSQLStore(config);
    }
    
}