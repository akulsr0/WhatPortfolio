import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IInvestment } from "../../types";
import { useAppContext } from "../../contexts/AppContext";

interface IProps {
  location: {
    state: {
      investment?: IInvestment;
    };
  };
}

const EditInvestment: React.FC<IProps> = (props) => {
  const { setInvestments } = useAppContext();
  const history = useHistory();
  const investment = props.location.state?.investment;
  const headerTitle = investment ? "Edit Investment" : "Add Investment";

  const [investmentName, setInvestmentName] = useState(
    investment?.investmentName || ""
  );
  const [investedAmount, setInvestedAmount] = useState(
    investment?.investedAmount
  );
  const [currentAmount, setCurrentAmount] = useState(investment?.currentAmount);
  const [assetType, setAssetType] = useState(investment?.assetType);
  const [currency, setCurrency] = useState(investment?.currency);

  // const [showErrorToast, setShowErrorToast] = useState(false);
  const [presentToast] = useIonToast();

  function save() {
    if (
      !investmentName ||
      !investedAmount ||
      !currentAmount ||
      !assetType ||
      !currency
    ) {
      presentToast({
        message: "Please fill all the fields",
        position: "bottom",
        color: "danger",
        duration: 2000,
      });
      return;
    }
    const isEdit = Boolean(investment);
    const currentInvestmentsDataStr = localStorage.getItem("@investments");
    const currentInvestmentsData: IInvestment[] = currentInvestmentsDataStr
      ? JSON.parse(currentInvestmentsDataStr)
      : [];
    if (isEdit) {
      const targetIdx = currentInvestmentsData.findIndex(
        (inv) => inv.id === investment?.id
      );
      currentInvestmentsData[targetIdx] = {
        ...currentInvestmentsData[targetIdx],
        investmentName,
        investedAmount,
        currentAmount,
        assetType,
        currency,
      };
      setInvestments(currentInvestmentsData);
      localStorage.setItem(
        "@investments",
        JSON.stringify(currentInvestmentsData)
      );
      presentToast({
        message: "Updated Investment",
        position: "bottom",
        color: "success",
        duration: 2000,
      });
      history.goBack();
      return;
    }
    const newInvestment = {
      id: currentInvestmentsData.length + 1,
      investmentName,
      investedAmount,
      currentAmount,
      assetType,
      currency,
    };
    const updatedInvestments = [...currentInvestmentsData, newInvestment];
    setInvestments(updatedInvestments);
    localStorage.setItem("@investments", JSON.stringify(updatedInvestments));
    presentToast({
      message: "Added Investment",
      position: "bottom",
      color: "success",
      duration: 2000,
    });
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: 8 }}>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                history.goBack();
              }}
            >
              <IonIcon slot="icon-only" icon={arrowBack} color="dark"></IonIcon>
            </IonButton>
          </IonButtons>
          <h2 style={{ margin: 0, lineHeight: "normal" }}>{headerTitle}</h2>
          <IonButtons slot="end">
            <IonButton onClick={save}>Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonInput
              label="Investment"
              placeholder="Eg: Stocks"
              value={investmentName}
              onIonInput={(e) => setInvestmentName(String(e.target.value))}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Invested"
              placeholder="Invested Amount"
              type="number"
              inputMode="numeric"
              value={investedAmount}
              onIonInput={(e) => setInvestedAmount(Number(e.target.value))}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Current"
              placeholder="Current Amount"
              type="number"
              inputMode="numeric"
              value={currentAmount}
              onIonInput={(e) => setCurrentAmount(Number(e.target.value))}
            />
          </IonItem>
          <IonItem>
            <IonSelect
              label="Asset type"
              defaultValue="Others"
              placeholder="Select"
              value={assetType}
              onIonChange={(e) => setAssetType(e.target.value)}
            >
              <IonSelectOption value="IN Stocks">IN Stocks</IonSelectOption>
              <IonSelectOption value="US Stocks">US Stocks</IonSelectOption>
              <IonSelectOption value="Mutual Funds">
                Mutual Funds
              </IonSelectOption>
              <IonSelectOption value="Fixed Deposit">
                Fixed Deposit
              </IonSelectOption>
              <IonSelectOption value="Cryptocurrency">
                Cryptocurrency
              </IonSelectOption>
              <IonSelectOption value="EPF">EPF</IonSelectOption>
              <IonSelectOption value="PPF">PPF</IonSelectOption>
              <IonSelectOption value="NPS">NPS</IonSelectOption>
              <IonSelectOption value="Others">Others</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              label="Currency"
              defaultValue="INR"
              placeholder="Select"
              value={currency}
              onIonChange={(e) => setCurrency(e.target.value)}
            >
              <IonSelectOption value="INR">INR</IonSelectOption>
              <IonSelectOption value="USD">USD</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EditInvestment;
