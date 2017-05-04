const electron = require('electron');  
const app = electron.app;  
const BrowserWindow = electron.BrowserWindow;  
const updater = require('electron-updater');

var mainWindow = null;

app.on('window-all-closed', function() {  
    app.quit();
});

app.on('ready', function() {

    updater.on('ready', function() {

        mainWindow = new BrowserWindow({
            name: "ea-todo",
            width: 400,
            height: 600,
            toolbar: false
        });

        mainWindow.loadURL('file://' + __dirname + "/app/index.html");

        mainWindow.on('closed', function() {
            mainWindow = null;
        });

    });

    updater.on('update-required', function() {
        app.quit();
    });

    updater.on('update-available', function() {
        if(mainWindow) {
            mainWindow.webContents.send('update-available');
        }
    });

    updater.start();

});