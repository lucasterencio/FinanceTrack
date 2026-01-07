import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import type {
  FinanceCategoryProps,
  FinanceTypeProps,
} from "@/contexts/FinanceContext";
import { db } from "@/service/firebaseConnection";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PieChart, Sector, Pie } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { formatedValue } from "../helpers/formatPrice";

import { FcPieChart } from "react-icons/fc";
import { AuthContext } from "@/contexts/AuthContext";

export const description = "A donut chart with an active sector";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  alimentacao: {
    label: "Alimentação",
    color: "var(--chart-1)",
  },
  transporte: {
    label: "Transporte",
    color: "var(--chart-2)",
  },
  entretenimento: {
    label: "Entretenimento",
    color: "var(--chart-3)",
  },
  saude: {
    label: "Saúde",
    color: "var(--chart-4)",
  },
  contas: {
    label: "Contas",
    color: "var(--chart-4)",
  },
  educacao: {
    label: "Educação",
    color: "var(--chart-4)",
  },
  outros: {
    label: "Outros",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

interface PieProps {
  id: string;
  type: FinanceTypeProps;
  value: string;
  category: FinanceCategoryProps;
}

export function ChartPieDonutActive() {
  const [pieData, setPieData] = useState<PieProps[]>([]);
  const [alimentacaoValue, setAlimentacaoValue] = useState<number>(0);
  const [entretenimentoValue, setEntretenimentoValue] = useState<number>(0);
  const [saudeValue, setSaudeValue] = useState<number>(0);
  const [contasValue, setContasValue] = useState<number>(0);
  const [educacaoValue, setEducacaoValue] = useState<number>(0);
  const [outrosValue, setOutrosValue] = useState<number>(0);
  const [transporteValue, setTransporteValue] = useState<number>(0);

  const { user } = useContext(AuthContext);


  useEffect(() => {
    if (!user || !user.uid) return;

    const docsRef = collection(db, "finance");
    const q = query(
      docsRef,
      where("type", "==", "despesa"),
      where("uid", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      let financeList: PieProps[] = [];

      snapshot.forEach((doc) => {
        financeList.push({
          id: doc.id,
          category: doc.data().category,
          type: doc.data().type,
          value: doc.data().value,
        });
      });

      setPieData(financeList);

      const alim = financeList
        .filter((item) => item.category === "alimentacao")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);
      const trans = financeList
        .filter((item) => item.category === "transporte")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);
      const entr = financeList
        .filter((item) => item.category === "entretenimento")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);
      const saud = financeList
        .filter((item) => item.category === "saude")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);
      const cont = financeList
        .filter((item) => item.category === "contas")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);
      const educ = financeList
        .filter((item) => item.category === "educacao")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);
      const outr = financeList
        .filter((item) => item.category === "outros")
        .reduce((acc, current) => acc + parseFloat(current.value), 0);

      setAlimentacaoValue(alim);
      setEntretenimentoValue(entr);
      setTransporteValue(trans);
      setSaudeValue(saud);
      setContasValue(cont);
      setEducacaoValue(educ);
      setOutrosValue(outr);
    });

    return () => unsub();
  }, [user?.uid]);

  const chartData = [
    { category: "alimentacao", value: alimentacaoValue, fill: "#35BDF8" },
    { category: "transporte", value: transporteValue, fill: "#5DA3F9" },
    { category: "entretenimento", value: entretenimentoValue, fill: "#94A3B8" },
    { category: "saude", value: saudeValue, fill: "#637288" },
    { category: "contas", value: contasValue, fill: "#DB2424" },
    {
      category: "educacao",
      value: educacaoValue,
      fill: "#465467",
    },
    { category: "outros", value: outrosValue, fill: "#437a65" },
  ];

  return (
    <Card className="flex flex-col w-full mt-15">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-semibold text-lg">
          Despesas por categoria
        </CardTitle>
      </CardHeader>

      {pieData.length === 0 ? (
        <div className="ml-6 flex flex-col items-center justify-center mt-10">
          <h1 className="font-semibold text-md">
            Adicione suas despesas para visualizar no gráfico
          </h1>

          <div>
            <FcPieChart size={200} />
          </div>
        </div>
      ) : (
        <div>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-62.5"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p className="font-semibold capitalize">
                            {data.category}
                          </p>
                          <p>{formatedValue(data.value)}</p>{" "}
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  )}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm w-full">
            <div className="grid grid-cols-3 lg:grid-rows-1 place-items-start  gap-2 leading-none font-medium  w-full">
              {chartData.map((data, index) => {
                if (data.value !== 0) {
                  return (
                    <div
                      key={index}
                      className="flex justify-center items-center gap-2"
                    >
                      <div
                        className="h-3 w-5"
                        style={{ backgroundColor: data.fill }}
                      ></div>
                      <span className="capitalize font-semibold">
                        {data.category}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </CardFooter>
        </div>
      )}
    </Card>
  );
}
