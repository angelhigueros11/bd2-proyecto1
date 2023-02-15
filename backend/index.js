const express = require('express')
const app = express()
const server = require('http').Server(app)

const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('multer')


//Configuraciones adicionales
const config = require('./src/config')
const db = require('./src/db')
const router = require('./network/routes')

// habilitar CORS para aceptar consultas de otros domiminios
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost') //Frontend url
  next()
})

// Conexion con MongoDB
db(config.dbUrl);

// Formatear peticiones
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configurar proxy
app.set('trust proxy', true)

// Manejo de rutas
router(app)

//Archivos staticos
app.use(express.static(path.join(__dirname, 'images')))


app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/')
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.jpg`)
  },
})

const upload = multer({ storage: storage })

app.post('/api/image/:id', upload.single('profileImg'), function (req, res) {
  res.json({})
})

//Iniciar servidor
server.listen(config.port, () => {
  console.log(`La aplicacion esta escuchando en ${config.host}:${config.port}`)
})
