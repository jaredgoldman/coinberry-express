var express = require('express');
var router = express.Router();
const axios = require('axios');
const convert = require('xml-js');
var database = require('../database');

const balanceBody = {
  corrId: 'testCorrId005',
  userId: 'wsdemo8153',
  password: 'kExCbg8X25N9dujY',
  token: '0xf52ad35ce653d661b4d6d290feeb4009',
};

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
};

const activateBody = {
  corrId: 'testCorrId003',
  userid: 'wsdemo8153',
  password: 'kExCbg8X25N9dujY',
  token: '0xf52ad35ce653d661b4d6d290feeb4009',
  loadAmount: '1',
  txnDesc: 'Load from Coinberry',
};

router.get('/test', (req, res) => {
  res.send('test');
});

router.get('/balance', async (req, res) => {
  try {
    const { user } = req.query;
    if (!database[user].balance) {
      res.send({ data: 'user not found', success: false });
    }
    const response = await axios.post(
      'https://ws2.trucash.com:452/cardserviceV2.asmx/Balance',
      database[user].balance,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      const xml = response.data;
      const json = JSON.parse(convert.xml2json(xml, {}));
      const text = json.elements[0].elements[1].elements[0].text;
      const balance = Number(text.split(',')[2]);
      if (Number.isNaN(balance)) {
        return res.send({ success: false });
      }
      const points = balance * 1000;
      const data = {
        balance,
        points,
      };
      console.log('>>> data', data);
      res.send({ data: data, success: true });
    } else {
      res.send({ data: 'error', success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/register/activate', async (req, res) => {
  try {
    const { user } = req.query;
    if (!database[user].registration) {
      return res.send({
        data: 'user registration details not found',
        success: false,
      });
    }

    const registerResponse = await axios.post(
      'https://ws2.trucash.com:452/cardserviceV2.asmx/RegisterCardholder',
      database[user].registration,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (registerResponse.status === 200) {
      console.log('>>> register success!', registerResponse.data);
      if (!database[user].activation) {
        console.log('>>> user activation details not found');
        return res.send({
          data: 'user activation details not found',
          success: false,
        });
      }
      const activationResponse = await axios.post(
        'https://ws2.trucash.com:452/cardserviceV2.asmx/Activate',
        database[user].activation,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      );
      if (activationResponse.status === 200) {
        console.log('>>> activation success!');
        const xml = activationResponse.data;
        const json = convert.xml2json(xml, {});
        res.send({ data: JSON.parse(json), success: true });
      } else {
        console.log('>>> activation failed', activationResponse);
        return res.send({
          data: 'activation failed, could not activate card',
          success: false,
        });
      }
    } else {
      res.send({
        console.log('>>> registration failed', registerResponse);
        data: 'registration failed, could not register user',
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/load', async (req, res) => {
  try {
    const { user } = req.query;
    if (!database[user].load) {
      res.send({ data: 'user not found', success: false });
    }
    const response = await axios.post(
      'https://ws2.trucash.com:452/cardserviceV2.asmx/Load',
      database[user].load,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      const xml = response.data;
      const json = convert.xml2json(xml, {});
      res.send({ data: JSON.parse(json), success: true });
    } else {
      res.send({ data: 'error loading card', success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
