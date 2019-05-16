import { InvestmentTransaction } from '../Models/InvestmentTransaction';

export class Common {
    GetBookValueFromTransactions(transactions: InvestmentTransaction[]): number {
        let totalCost = 0;
        if (transactions) {
            if (transactions.length > 0) {
                transactions.forEach(element => {
                    totalCost += element.pricePerUnit * element.numUnits;
                });
            }
        }
        return totalCost;
      }
}
