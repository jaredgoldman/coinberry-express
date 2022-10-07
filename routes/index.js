var express = require('express')
var router = express.Router()
const axios = require('axios')
const convert = require('xml-js')
var database = require('../database')

const balanceBody = {
  corrId: 'testCorrId005',
  userId: 'wsdemo8153',
  password: 'kExCbg8X25N9dujY',
  token: '0xf52ad35ce653d661b4d6d290feeb4009',
}

const registerBody = {
  corrId: 'testCorrId001',
  userid: 'wsdemo8153',
  password: 'kExCbg8X25N9dujY',
  token: '0xf52ad35ce653d661b4d6d290feeb4009',
  firstName: 'Hacka',
  lastName: 'Thon',
  email: 'charles.kim@bitbuy.ca',
  address: '290 Bremner Blvd',
  city: 'Toronto',
  StateProvince: 'Ontario',
  countryIso: 'ca',
  phone: '4168948258',
  securityQ: 'What is name of your pet',
  securityA: 'Bitberry',
  zipPostal: 'M5V 2T6',
  memberId: 'testMemberId001',
  loyaltyPassword: 'password123',
  IDType: 'DLNo',
  IDNumber: 'K12341234512345',
  address2: '',
}

const activateBody = {
  corrId: 'testCorrId003',
  userid: 'wsdemo8153',
  password: 'kExCbg8X25N9dujY',
  token: '0xf52ad35ce653d661b4d6d290feeb4009',
  loadAmount: '1',
  txnDesc: 'Load from Coinberry',
}

router.get('/test', (req, res) => {
  res.send('test')
})

router.post('/balance', async (req, res, next) => {
  try {
    const { user } = req.query
    if (!database[user].balance) {
      res.send({ data: 'user not found', success: false })
    }
    const response = await axios.post(
      'https://ws2.trucash.com:452/cardserviceV2.asmx/Balance',
      database[user].balance,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (response.status === 200) {
      const xml = response.data
      const json = JSON.parse(convert.xml2json(xml, {}))
      const text = json.elements[0].elements[1].elements[0].text
      const data = text.split(',')[2]
      console.log('>>> data', data)
      res.send({ data: data, success: true })
    } else {
      res.send({ data: 'error', success: false })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/activate', async (req, res, next) => {
  try {
    const { user } = req.body
    if (!database[user].balance) {
      res.send({ data: 'user not found', success: false })
    }
    const response = await axios.post(
      'https://ws2.trucash.com:452/cardserviceV2.asmx/Activate',
      database[user].activation,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (response.status === 200) {
      const xml = response.data
      const json = convert.xml2json(xml, {})
      res.send({ data: JSON.parse(json), success: true })
    } else {
      res.send({ data: 'error', success: false })
    }
  } catch (error) {
    console.log(error.response.data)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const { user } = req.body
    if (!database[user].balance) {
      res.send({ data: 'user not found', success: false })
    }
    const response = await axios.post(
      'https://ws2.trucash.com:452/cardserviceV2.asmx/Register',
      database[user].register,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (response.status === 200) {
      const xml = response.data
      const json = convert.xml2json(xml, {})
      res.send({ data: JSON.parse(json), success: true })
    } else {
      res.send({ data: 'error', success: false })
    }
  } catch (error) {
    console.log(error.response.data)
  }
})

module.exports = router

// balance
// inputs: token, corrId

// register
// inputs:

// activate
// inputs:
