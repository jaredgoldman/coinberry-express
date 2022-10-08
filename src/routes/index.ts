import { Request, Response } from 'express'
import express from 'express'
import axios from 'axios'
import convert from 'xml-js'
import database from '../database'
import {
  updateActivationRecord,
  checkForActivation,
  queryPoints,
} from '../utils/fileSystem'
import { ClientResponse } from '../global'
const router = express.Router()

router.get('/test', (req: Request, res: Response) => {
  try {
    res.send('server is healthy')
  } catch (error) {
    console.log(error)
  }
})

router.get(
  '/balance',
  async (
    req: Request<{}, {}, {}, { user: string }>,
    res: Response<ClientResponse>
  ) => {
    try {
      const { user } = req.query
      if (!database[user].balance) {
        res.send({ data: 'user not found', success: false })
      }

      const userIsActivated = checkForActivation(database[user].load.token)
      if (!userIsActivated) {
        return res.send({
          data: 'user is not activated, please activate user first',
          success: false,
        })
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

      console.log('>>> response', response.data)

      if (response.status === 200) {
        const xml = response.data
        const json = JSON.parse(convert.xml2json(xml, {}))
        const text = json.elements[0].elements[1].elements[0].text
        const balance = Number(text.split(',')[2])
        if (Number.isNaN(balance)) {
          return res.send({ success: false, data: '' })
        }
        const points = queryPoints(database[user].load.token)
        const data = {
          balance,
          points,
        }
        console.log('>>> data', data)
        res.send({ data: data, success: true })
      } else {
        res.send({ data: 'error', success: false })
      }
    } catch (error) {
      console.log(error)
    }
  }
)

router.post(
  '/register/activate',
  async (
    req: Request<{}, {}, {}, { user: string }>,
    res: Response<ClientResponse>
  ) => {
    try {
      const { user } = req.query
      if (!database[user].registration) {
        return res.send({
          data: 'user registration details not found',
          success: false,
        })
      }

      const userIsActivated = checkForActivation(database[user].load.token)
      if (userIsActivated) {
        return res.send({
          data: 'user is already activated',
          success: false,
        })
      }

      const registerResponse = await axios.post(
        'https://ws2.trucash.com:452/cardserviceV2.asmx/RegisterCardholder',
        database[user].registration,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )

      if (registerResponse.status === 200) {
        console.log('>>> register success!', registerResponse.data)
        if (!database[user].activation) {
          console.log('>>> user activation details not found')
          return res.send({
            data: 'user activation details not found',
            success: false,
          })
        }

        const activationResponse = await axios.post(
          'https://ws2.trucash.com:452/cardserviceV2.asmx/Activate',
          database[user].activation,
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        )

        if (activationResponse.status === 200) {
          const token = database[user].registration.token
          updateActivationRecord(token, true)
          const xml = activationResponse.data
          const json = convert.xml2json(xml, {})
          res.send({ data: JSON.parse(json), success: true })
        } else {
          return res.send({
            data: 'activation failed, could not activate card',
            success: false,
          })
        }
      } else {
        console.log('>>> registration failed', registerResponse)
        res.send({
          data: 'registration failed, could not register user',
          success: false,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
)

router.post(
  '/load',
  async (
    req: Request<{}, {}, {}, { user: string }>,
    res: Response<ClientResponse>
  ) => {
    try {
      const { user } = req.query
      if (!database[user].load) {
        res.send({ data: 'user not found', success: false })
      }

      const userIsActivated = checkForActivation(database[user].load.token)
      if (!userIsActivated) {
        return res.send({
          data: 'user is not activated, please activate user first',
          success: false,
        })
      }

      const response = await axios.post(
        'https://ws2.trucash.com:452/cardserviceV2.asmx/Load',
        database[user].load,
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
        res.send({ data: 'error loading card', success: false })
      }
    } catch (error) {
      console.log(error)
    }
  }
)

router.get(
  '/status',
  (
    req: Request<{}, {}, {}, { user: string }>,
    res: Response<ClientResponse>
  ) => {
    const { user } = req.query
    const userIsActivated = checkForActivation(database[user].load.token)
    if (!userIsActivated) {
      return res.send({
        data: 'user is not activated, please activate user first',
        success: false,
      })
    } else {
      return res.send({ data: 'user is activated', success: true })
    }
  }
)

module.exports = router
