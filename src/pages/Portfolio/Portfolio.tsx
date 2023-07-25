import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import InvestmentCard from "../../components/InvestmentCard/InvestmentCard";
import { useAppContext } from "../../contexts/AppContext";
import { IInvestment } from "../../types";
import { getFormattedAmount } from "../../utils";

import "./Portfolio.css";

const Portfolio: React.FC = () => {
  const { investments, setInvestments } = useAppContext();
  const history = useHistory();

  function gotoAddInvestment() {
    history.push("/portfolio/update");
  }
  function gotoEditInvestment(investment: IInvestment) {
    history.push("/portfolio/update", { investment });
  }

  function onDeleteInvestment(investment: IInvestment) {
    const currentInvestmentsDataStr = localStorage.getItem("@investments");
    const currentInvestmentsData: IInvestment[] = currentInvestmentsDataStr
      ? JSON.parse(currentInvestmentsDataStr)
      : [];
    const targetIdx = currentInvestmentsData.findIndex(
      (inv) => inv.id === investment.id
    );
    delete currentInvestmentsData[targetIdx];
    const updatedInvestments = currentInvestmentsData.filter(Boolean);
    setInvestments(updatedInvestments);
    localStorage.setItem("@investments", JSON.stringify(updatedInvestments));
  }

  const haveInvestments = Boolean(investments.length);
  const totalInvestedAmount = investments.reduce((acc, val) => {
    if (val.currency === "USD") {
      return acc + val.investedAmount * 82;
    }
    return acc + val.investedAmount;
  }, 0);
  const totalCurrentAmount = investments.reduce((acc, val) => {
    if (val.currency === "USD") {
      return acc + val.currentAmount * 82;
    }
    return acc + val.currentAmount;
  }, 0);
  const totalReturns = totalCurrentAmount - totalInvestedAmount;
  const totalReturnsPerc = Number(
    100 * (totalReturns / totalInvestedAmount)
  ).toFixed(2);
  const isConsolidatedProfit = totalReturns >= 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: 8 }}>
          <h2 style={{ margin: 0 }}>My Portfolio</h2>
          <IonButtons slot="end">
            <IonButton onClick={gotoAddInvestment}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {haveInvestments ? (
          <div
            className="consolidated-wrapper"
            style={{
              background: isConsolidatedProfit ? "#c8f7c580" : "#f2261399",
            }}
          >
            <div className="consolidated-amount-wrapper">
              <h3>
                {getFormattedAmount(totalInvestedAmount)} ➡{" "}
                {getFormattedAmount(totalCurrentAmount)}
              </h3>
            </div>
            <div className="consolidated-returns-wrapper">
              <div>
                <strong>Returns: </strong>
                {getFormattedAmount(totalReturns)}
              </div>
              <div>
                <strong>Returns %: </strong> {totalReturnsPerc}%
              </div>
            </div>
          </div>
        ) : null}
        <IonList>
          {investments.map((investment) => (
            <IonItemSliding key={investment.id} style={{ overflow: "hidden" }}>
              <IonItem
                className="ion-no-padding"
                style={{ "--inner-padding-end": 0 }}
              >
                <InvestmentCard investment={investment} />
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="light"
                  style={{ width: 100 }}
                  onClick={() => gotoEditInvestment(investment)}
                >
                  Edit
                </IonItemOption>
                <IonItemOption
                  color="danger"
                  style={{ width: 100 }}
                  onClick={() => onDeleteInvestment(investment)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;
