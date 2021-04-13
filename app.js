const {app, BrowserWindow, Menu, BrowserView, globalShortcut} = require('electron');

let win = null;
let view = null;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    win.on('close', (e) => {
        win.hide();
        win.setSkipTaskbar(true);
        e.preventDefault();
    });
    win.loadFile('index.html');

    view = new BrowserView();
    win.setBrowserView(view);
    view.setBounds({x: 0, y: 0, width: 300, height: 300});
    view.setAutoResize({width: true, height: true, horizontal: true, vertical: false});
    view.webContents.loadURL('https://www.google.com');
    Menu.setApplicationMenu(null);
}

function registerShortcut() {
    globalShortcut.register('CommandOrControl+Alt+y', () => {
        if (win.isVisible()) {
            win.hide();
            win.setSkipTaskbar(false);
        } else {
            win.show();
            win.setSkipTaskbar(true);
        }
    });
}


app.whenReady()
    .then(createWindow)
    .then(registerShortcut)
;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

