import { BillPaySource } from './BillPaySource'

type BillCustomFields = {
    paySourceFilter: BillPaySource | BillPaySource[]
    themeCode?: string
}

export { BillCustomFields }
