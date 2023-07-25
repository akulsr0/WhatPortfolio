import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Chart } from "react-google-charts";
import { useAppContext } from "../../contexts/AppContext";

import "./Summary.css";

const Summary: React.FC = () => {
  const { investments } = useAppContext();

  const chartData = investments.map((inv) => {
    const currentAmountInINR =
      inv.currency === "USD" ? inv.currentAmount * 82 : inv.currentAmount;
    return [inv.investmentName, currentAmountInINR];
  });

  let content;

  if (investments.length) {
    content = (
      <>
        <Chart
          chartType="PieChart"
          data={[["a", "b"], ...chartData]}
          options={{ title: "Portfolio Split", is3D: true }}
          width={"100%"}
          height={"600px"}
        />
      </>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Summary</IonTitle>
          </IonToolbar>
        </IonHeader>
        {content}
      </IonContent>
    </IonPage>
  );
};

export default Summary;
