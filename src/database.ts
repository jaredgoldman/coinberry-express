import {
  ActivationRequest,
  BalanceRequest,
  LoadRequest,
  RegisterRequest,
} from './global'

// this mimicks a call to a coinberry service
type UserData = {
  [key: string]: {
    registration: RegisterRequest
    activation: ActivationRequest
    balance: BalanceRequest
    load: LoadRequest
  }
}

export default {
  jared: {
    registration: {
      corrId: 'testCorrId100',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0xfce3f92e161795bdeadc4980d2cdcd52',
      firstName: 'Jared',
      lastName: 'Goldman',
      email: 'jared@bitbuy.ca',
      address: '100 King St',
      city: 'Toronto',
      StateProvince: 'Ontario',
      countryIso: 'ca',
      phone: '6474548412',
      securityQ: 'What is name of your pet',
      securityA: 'Bitberry',
      zipPostal: 'M5V 2T6',
      memberId: 'testMemberId002',
      loyaltyPassword: 'password123',
      IDType: 'DLNo',
      IDNumber: 'K12341234512345',
      address2: '',
    },
    activation: {
      corrId: 'testCorrId200',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0xf52ad35ce653d661b4d6d290feeb4009',
      loadAmount: '1',
      txnDesc: 'Load from Coinberry',
    },
    balance: {
      corrId: 'testCorrId005',
      userId: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0xfce3f92e161795bdeadc4980d2cdcd52',
    },
    load: {
      corrId: 'testCorrId001',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0xfce3f92e161795bdeadc4980d2cdcd52',
      loadAmount: '1',
      txnDesc: 'Load from Coinberry',
    },
  },
  sreyas: {
    registration: {
      corrId: 'testCorrId300',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0x17110536903e181e7e4773eb1ed9601c',
      firstName: 'Sreyas',
      lastName: 'Karayi Vengilat',
      email: 'sreyas@bitbuy.ca',
      address: '100 King St',
      city: 'Toronto',
      StateProvince: 'Ontario',
      countryIso: 'ca',
      phone: '6474548412',
      securityQ: 'What is name of your pet',
      securityA: 'Bitberry',
      zipPostal: 'M5V 2T6',
      memberId: 'testMemberId002',
      loyaltyPassword: 'password123',
      IDType: 'DLNo',
      IDNumber: 'K12341234512345',
      address2: '',
    },
    activation: {
      corrId: 'testCorrId002',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0x17110536903e181e7e4773eb1ed9601c',
      loadAmount: '1',
      txnDesc: 'Load from Coinberry',
    },
    balance: {
      corrId: 'testCorrId005',
      userId: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0x17110536903e181e7e4773eb1ed9601c',
    },
    load: {
      corrId: 'testCorrId001',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0x17110536903e181e7e4773eb1ed9601c',
      loadAmount: '1',
      txnDesc: 'Load from Coinberry',
    },
  },
  charles: {
    registration: {
      corrId: 'testCorrId300',
      userid: 'wsdemo8154',
      password: 'kExCbg8X25N9dujY',
      token: '0xf52ad35ce653d661b4d6d290feeb4009',
      firstName: 'Charles',
      lastName: 'Kim',
      email: 'charles.kim@bitbuy.ca',
      address: '100 King St',
      city: 'Toronto',
      StateProvince: 'Ontario',
      countryIso: 'ca',
      phone: '6474548412',
      securityQ: 'What is name of your pet',
      securityA: 'Bitberry',
      zipPostal: 'M5V 2T6',
      memberId: 'testMemberId002',
      loyaltyPassword: 'password123',
      IDType: 'DLNo',
      IDNumber: 'K12341234512345',
      address2: '',
    },
    activation: {
      corrId: 'testCorrId301',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0xf52ad35ce653d661b4d6d290feeb4009',
      loadAmount: '1',
      txnDesc: 'Load from Coinberry',
    },
    balance: {
      corrId: 'testCorrId302',
      userId: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0xf52ad35ce653d661b4d6d290feeb4009',
    },
    load: {
      corrId: 'testCorrId001',
      userid: 'wsdemo8153',
      password: 'kExCbg8X25N9dujY',
      token: '0xf52ad35ce653d661b4d6d290feeb4009',
      loadAmount: '1',
      txnDesc: 'Load from Coinberry',
    },
  },
} as UserData
