# Qiwi P2P API

Node.js SDK модуль для внедрения единого платежного протокола эквайринга и QIWI Кошелька.

## Установка и подключение

Установка с помощью npm:

```bash
$ npm install <npm_package_name> --save
```

Подключение:

```javascript
const { QiwiP2P } = require('<npm_package_name>')
const qiwiApi = new QiwiP2P(PUBLIC_KEY, SECRET_KEY)
```

## Документация

**Пошаговое руководство по работе с SDK (для физических лиц)**: https://developer.qiwi.com/ru/p2p-sdk-guide/#integration-sdk <br>
**API P2P-счетов (для физических лиц)**: https://developer.qiwi.com/ru/p2p-payments <br>
**API QIWI Кассы (для юридических лиц)**: https://developer.qiwi.com/ru/bill-payments

## Авторизация

Для использования SDK требуется `SECRET_KEY`, подробности в документации — [для физ.лиц](https://developer.qiwi.com/ru/p2p-payments/#auth), [для юр.лиц](https://developer.qiwi.com/ru/bill-payments/#auth).

### Выставление счета

Надежный способ для интеграции. Параметры передаются server2server с использованием авторизации. Метод позволяет выставить счет, при успешном выполнении запроса в ответе вернется параметр `payUrl` - ссылка для редиректа пользователя на платежную форму.

Метод `createBill` выставляет новый счет. В параметрах нужно указать: идентификатор счета `billId` внутри вашей системы и дополнительными параметрами `fields`. В результате будет получен ответ с данными о выставленном счете.

Подробное описание параметров для выставления счёта представлено в [руководстве по работе с SDK](https://developer.qiwi.com/ru/p2p-sdk-guide/#step4), а так же в документации [для физ.лиц](https://developer.qiwi.com/ru/p2p-payments/#create) и [для юр. лиц](https://developer.qiwi.com/ru/bill-payments/#create)

```javascript
const billId = 'cc961e8d-d4d6-4f02-b737-2297e51fb48e';

const fields = {
    amount: {
        value: 10.00
        currency: 'RUB',
    },
    comment: 'test',
    expirationDateTime: '2018-03-02T08:44:07',
    customer: {
        phone: '79009009090',
        email: 'example@mail.org',
        account : 'client4563',
    }
};

const bill = await qiwiApi.createBill( billId, fields )
```

В результате:

```json
{
    "siteId": "270305",
    "billId": "cc961e8d-d4d6-4f02-b737-2297e51fb48e",
    "amount": {
        "currency": "RUB",
        "value": "200.34"
    },
    "status": {
        "value": "WAITING",
        "changedDateTime": "2018-07-12T10:28:38.855+03:00"
    },
    "comment": "test",
    "creationDateTime": "2018-07-12T10:28:38.855+03:00",
    "expirationDateTime": "2018-08-26T10:28:38.855+03:00",
    "payUrl": "https://oplata.qiwi.com/form/?invoice_uid=bb773791-9bd9-42c1-b8fc-3358cd108422&successUrl=http%3A%2F%2Ftest.ru%2F"
}
```

### Информация о счете

Метод `getBillInfo` возвращает информацию о счете. В параметрах нужно указать идентификатор счета `billId` внутри вашей системы, в результате будет получен ответ со статусом счета. Подробнее в документации — [для физ.лиц](https://developer.qiwi.com/ru/p2p-payments/#invoice-status), [для юр.лиц](https://developer.qiwi.com/ru/bill-payments/#invoice-status).

```javascript
const billId = 'cc961e8d-d4d6-4f02-b737-2297e51fb48e'

const billData = qiwiApi.checkBill(billId)
```

Ответ:

```json
{
    "siteId": "270305",
    "billId": "cc961e8d-d4d6-4f02-b737-2297e51fb48e",
    "amount": {
        "currency": "RUB",
        "value": "200.34"
    },
    "status": {
        "value": "WAITING",
        "changedDateTime": "2018-07-12T10:31:06.846+03:00"
    },
    "comment": "test",
    "creationDateTime": "2018-07-12T10:31:06.846+03:00",
    "expirationDateTime": "2018-08-26T10:31:06.846+03:00",
    "payUrl": "https://oplata.qiwi.com/form/?invoice_uid=ee3ad91d-cfb8-4dbf-8449-b6859fdfec3c"
}
```

### Отмена неоплаченного счета

Метод `cancelBill` отменяет неоплаченный счет. В параметрах нужно указать идентификатор счета `billId` внутри вашей системы, в результате будет получен ответ с информацией о счете. Подробнее в документации — [для физ.лиц](https://developer.qiwi.com/ru/p2p-payments/#cancel), [для юр.лиц](https://developer.qiwi.com/ru/bill-payments/#cancel).

```javascript
const billId = 'cc961e8d-d4d6-4f02-b737-2297e51fb48e'

const canceledBill = qiwiApi.cancelBill(billId)
```

Ответ:

```json
{
    "siteId": "270305",
    "billId": "cc961e8d-d4d6-4f02-b737-2297e51fb48e",
    "amount": {
        "currency": "RUB",
        "value": "200.34"
    },
    "status": {
        "value": "REJECTED",
        "changedDateTime": "2018-07-12T10:32:17.595+03:00"
    },
    "comment": "test",
    "creationDateTime": "2018-07-12T10:32:17.481+03:00",
    "expirationDateTime": "2018-08-26T10:32:17.481+03:00",
    "payUrl": "https://oplata.qiwi.com/form/?invoice_uid=cc961e8d-d4d6-4f02-b737-2297e51fb48e"
}
```
