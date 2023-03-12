import { BillAmount } from './BillAmount'
import { BillCustomer } from './BillCustomer'
import { BillCustomFields } from './BillCustomFields'
import { BillStatus } from './BillStatus'

type Bill = {
    siteId: string
    billId: string
    amount: BillAmount
    status: BillStatus
    customFields?: BillCustomFields
    customer?: BillCustomer
    comment?: string
    creationDateTime: string
    expirationDateTime: string
    payUrl: string
}

export { Bill }
