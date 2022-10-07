var express = require('express');
var router = express.Router();
const axios = require('axios');
const convert = require('xml-js');

const body = {
  corrId: 'testCorrId005',
  userId: 'wsdemo8153',
  password: 'kExCbg8X25N9dujY',
  token: '0xf52ad35ce653d661b4d6d290feeb4009',
};

router.post('/balance', async function (req, res, next) {
  const { userId, password } = res.params;
  try {
    const response = await axios.post(
      'https://ws2.trucash.com:452/cardserviceV2.asmx/Balance',
      body,
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
      res.send({ data: 'error', success: false });
    }
  } catch (error) {
    console.log(error.response.data);
  }
});

module.exports = router;
