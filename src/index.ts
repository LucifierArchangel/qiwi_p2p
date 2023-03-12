import * as types from './types'

class QiwiP2P {
    apiUrl: string = 'https://api.qiwi.com/partner'
    publicKey: string
    privateKey: string

    constructor(publicKey: string, privateKey: string) {
        this.publicKey = publicKey
        this.privateKey = privateKey
    }

    async createBill(
        billId: string,
        billData: types.BillCreate
    ): Promise<types.Bill> {
        return await this.sendRequest(
            `/bill/v1/bills/${billId}`,
            'PUT',
            billData
        )
    }

    async checkBillStatus(billId: string): Promise<types.Bill> {
        return await this.sendRequest(`/bill/v1/bills/${billId}`)
    }

    async cancelBill(billId: string): Promise<types.Bill> {
        return await this.sendRequest(`/bill/v1/bills/${billId}/reject`, 'POST')
    }

    async sendRequest(
        endpoint: string,
        method: string = 'GET',
        data: types.BillCreate | null = null
    ): Promise<types.Bill> {
        const requestOptions: RequestInit = {
            method: method,
            headers: {
                Authorization: `Bearer ${this.privateKey}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }

        if (method !== 'GET' && data !== null) {
            requestOptions.body = JSON.stringify(data)
        }

        const response = await fetch(this.apiUrl + endpoint, requestOptions)
        const json = await response.json()

        return json as types.Bill
    }
}

export { QiwiP2P, types }
