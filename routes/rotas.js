const express                    = require('express')
const login                      = require('../controllers/login')
const logout                     = require('../controllers/logout')
const home                       = require('../controllers/home')
const checkLogin                 = require('../controllers/checkLogin') 
const rootCheck                  = require('../controllers/rootCheck')
const downloadEaseDocs           = require('../controllers/downloadEaseDocs')
const downloadXML                = require('../controllers/downloadXML')
const downloadServeSACdcte       = require('../controllers/downloadServeSACdcte')
const montaTelaCTRC              = require('../controllers/montaTelaCTRC')
const montaTelaTesteAPI          = require('../controllers/montaTelaTesteAPI')
const obterDadosAPI              = require('../controllers/obterDadosAPI')
const montaTelaResultadoAPI      = require('../controllers/montaTelaResultadoAPI')
const montaTelaPosicaoCarga      = require('../controllers/montaTelaPosicaoCarga')
const montaTelaPosicaoCargaLista = require('../controllers/montaTelaPosicaoCargaLista')
const setCredencialCargas        = require('../midwares/setCredencialCargas')
const chacaLogado                = require('../midwares/chacaLogado')

const montaTelaPosicaoCobranca      = require('../controllers/montaTelaPosicaoCobranca')
const montaTelaPosicaoCobERP        = require('../controllers/montaTelaPosicaoCobERP')
const validaPeriodo                 = require('../midwares/validaPeriodo')
const montaTelaPosicaoCobrancaLista = require('../controllers/montaTelaPosicaoCobrancaLista')
const montaTelaPosicaoCobERPlista   = require('../controllers/montaTelaPosicaoCobERPlista')
const montaTelaPosicaoCobERPfatura  = require('../controllers/montaTelaPosicaoCobERPfatura')


//const { JSONCookie } = require('cookie-parser')

const router                  = express.Router()

//require('dotenv').config()


// Verifica se está autenticado
router.get('/', rootCheck ) 

// Verifica se está autenticado
router.get('/home', home ) 

// FORM - Documento API
router.get('/documento', montaTelaTesteAPI )

// CHECK - Documento API
router.post('/documento/check', obterDadosAPI )

// SHOW - Resultado API
router.get('/resultado', montaTelaResultadoAPI )

// FORM - Logout
router.get('/logout', logout ) 

// FORM - Login
router.get('/login', login )

// CHECK - Login
router.post('/login/check', setCredencialCargas,  checkLogin )

// FORM - Posição da Carga API
router.get('/posicaocarga', chacaLogado , montaTelaPosicaoCarga )

// CHECK - Posição da Carga API
router.post('/posicaocarga/lista', chacaLogado , validaPeriodo , montaTelaPosicaoCargaLista )

// SHOW - Resultado Posição de Carga API
router.get('/posicaocarga/ctrc', montaTelaCTRC )

// DOWNLOAD - DCTE - Usa ServeSAC Fortes
router.get('/posicaocarga/download/dcte',  downloadServeSACdcte )

// DOWNLOAD - XML - Usa API Cliente
router.get('/posicaocarga/download/xml', downloadXML )

// DOWNLOAD - COMPROVANTE - Usa WS Easydocs
router.get('/posicaocarga/download/easydocs', downloadEaseDocs )

// FORM - Posição da Cobrança (CARGAS) API
router.get('/posicaocobranca', chacaLogado , montaTelaPosicaoCobranca )

// CHECK - Posição da Cobrança lista (CARGAS) API
router.post('/posicaocobranca/lista', chacaLogado , validaPeriodo, montaTelaPosicaoCobrancaLista )

// FORM - Posição da Cobrança (ERP) API
router.get('/posicaocoberp', chacaLogado , montaTelaPosicaoCobERP )

// FORM LIST - Posição da Cobrança lista (ERP) API
router.post('/posicaocoberp/lista', chacaLogado , validaPeriodo, montaTelaPosicaoCobERPlista )

// FORM - Posição da Cobrança - Detalhes da Fatura (ERP) API
router.get('/posicaocoberp/fatura', chacaLogado,  montaTelaPosicaoCobERPfatura ) 


module.exports = router
