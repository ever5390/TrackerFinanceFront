export class TransactionFilters {
  
    constructor(
        public startDate: string = '',
        public endDate: string = '',
        public type: string = '',
        public status: string = '',
        public category: string = '',
        public description: string = '',
        public segment: string = '',
        public account: string = '',
        public paymentMethod: string = '',
        public block: string = '',
        public action: string = ''
    ) {}
}