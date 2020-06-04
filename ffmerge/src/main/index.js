'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const win = new BrowserWindow({webPreferences: {nodeIntegration: true}})

  if (isDevelopment) {
    win.webContents.openDevTools()
  }

  if (isDevelopment) {
    win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    
  }
  else {
    win.loadURL(`http://www.elesos.com`)
   // win.loadURL(formatUrl({
    //  pathname: path.join(__dirname, 'index.html'),
    //  protocol: 'file',
    //  slashes: true
    //}))
  }


  win.on('resize', updateSizeInfo)

  win.on('closed', () => {
    mainWindow = null
  })

  win.webContents.on('devtools-opened', () => {
    win.focus()
    setImmediate(() => {
      win.focus()
    })
  })

  return win
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})


function updateSizeInfo () {
  
  const msg = `Size: ${mainWindow.getSize()} Position: ${mainWindow.getPosition()}`
  console.log(msg)
  
}