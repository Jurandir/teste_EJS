const axios = require('axios')

const getImageEasydocs = async (empresa,numero) => {
  const url         = 'http://batchimageintegration.easydocs.com.br/Service/wsimagens.asmx?WSDL'
  const CodEasydocs = 160
  let montaBody     = (empresa,numero) => `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soapenv:Header/>
  <soapenv:Body>
      <tem:Recupera_ImagemQtd>
          <tem:CodigoCliente>${CodEasydocs}</tem:CodigoCliente>
          <tem:ListaImagens>
              <tem:EImagemKey>
              <tem:CodigoFilial>${empresa}</tem:CodigoFilial>
              <tem:NumeroConhecimento>${numero}</tem:NumeroConhecimento>
              <tem:file_s3_key>
              </tem:file_s3_key>
              </tem:EImagemKey>
          </tem:ListaImagens>
      </tem:Recupera_ImagemQtd>
  </soapenv:Body>
  </soapenv:Envelope>
`
  const config = {
    headers: { 
        "Content-Type": "text/xml;charset=UTF-8",
        "Accept-Encoding": "gzip,deflate",
        "Accept": "*/*"
        }
    }
  const bodyParameters = montaBody(empresa,numero)
    
    try {
        let ret = await axios.post(url,  bodyParameters, config)

        // Resposta da API SOAP da Easydocs
        const xml = ret.data

        const regexNumero  = /<NumeroConhecimento>(.+?)<\/NumeroConhecimento>/
        const regexEmpresa = /<CodEmpresa>(.+?)<\/CodEmpresa>/
        const regexFilial  = /<CodigoFilial>(.+?)<\/CodigoFilial>/
        const regexImagem  = /<Imagem>(.+?)<\/Imagem>/

        const matchNumero  = regexNumero.exec(xml)
        const matchEmpresa = regexEmpresa.exec(xml)
        const matchFilial  = regexFilial.exec(xml)
        const matchImagem  = regexImagem.exec(xml)
        
        const result = {
            CodEmpresa: `${matchEmpresa[1]}`,
            CodigoFilial: `${matchFilial[1]}`,
            NumeroConhecimento: `${matchNumero[1]}`,
            Imagem: `${matchImagem[1]}`,
            isErr: false
        }    
        return result
        
    } catch (err) { 
        return {err, isErr: true, url: url };
    }
}

module.exports = getImageEasydocs
