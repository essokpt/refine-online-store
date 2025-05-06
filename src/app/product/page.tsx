"use client"
import { useGo, useNavigation, useTranslate } from "@refinedev/core";
import { CreateButton, List } from "@refinedev/antd";
import { ProductListCard, ProductListTable } from "../../components/product";
import { type PropsWithChildren, useState } from "react";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

type View = "table" | "card";

export default function ProductList ({ children }: PropsWithChildren) {
//export const ProductList = () => {
 // const go = useGo();
  const { replace } = useNavigation();
 // const { createUrl } = useNavigation();

  const [view, setView] = useState<View>("table"
   // (localStorage.getItem("product-view") as View) || "table",
  );

  const handleViewChange = (value: View) => {
    // remove query params (pagination, filters, etc.) when changing view
    replace("");

    setView(value);
    localStorage.setItem("product-view", value);
  };

  //const t = useTranslate();

  return (
    <List
      breadcrumb={false}
      headerButtons={(props) => [
        <Segmented<View>
          key="view"
          size="large"
          value={view}
          style={{ marginRight: 24 }}
          options={[
            {
              label: "",
              value: "table",
              icon: <UnorderedListOutlined />,
            },
            {
              label: "",
              value: "card",
              icon: <AppstoreOutlined />,
            },
          ]}
          onChange={handleViewChange}
        />,
        <CreateButton
          {...props.createButtonProps}
          key="create"
          size="large"
          resource="product"
        >
          {"Add"}
        </CreateButton>,
      ]}
    >
      {view === "table" && <ProductListTable />}
      {view === "card" && <ProductListCard enableAddToCart={false} onAddCart={(e) => console.log('add cart',e)}/>}
      {children}
    </List>
  );
};
