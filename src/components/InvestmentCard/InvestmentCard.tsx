import React from "react";
import { IInvestment } from "../../types";
import { getFormattedAmount } from "../../utils";

import "./InvestmentCard.css";

interface Props {
  investment?: IInvestment;
}

const InvestmentCard: React.FC<Props> = (props) => {
  const { investment } = props;

  if (!investment) return null;

  const investedAmountText = getFormattedAmount(investment.investedAmount, {
    currency: investment.currency,
  });
  const currentAmountText = getFormattedAmount(investment.currentAmount, {
    currency: investment.currency,
  });
  const returns = investment.currentAmount - investment.investedAmount;
  const isProfit = returns >= 0;
  const returnsText = getFormattedAmount(returns);
  const returnsPerc = Number(
    100 * (returns / investment.investedAmount)
  ).toFixed(2);

  return (
    <div className="investment-card">
      <div className="investment-header">
        <strong>{investment.investmentName}</strong>
        <span className="investment-asset-type">{investment.assetType}</span>
      </div>
      <div>
        <div className="investment-stats-wrapper">
          <div className="investment-stat">
            <strong>Invested:</strong> {investedAmountText}
          </div>
          <div className="investment-stat">
            <strong>Current: </strong> {currentAmountText}
          </div>
          <div className="investment-stat">
            <strong>Returns: </strong>
            <span data-isprofit={isProfit}>{returnsText}</span>
          </div>
          <div className="investment-stat">
            <strong>Returns &#x25;: </strong>
            <span data-isprofit={isProfit}>{returnsPerc}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
