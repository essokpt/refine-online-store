"use client";

import { PrinterOutlined } from "@ant-design/icons";
import { IProductItem } from "@app/product/interface";
import { IStock } from "@app/stock/type";
import { ShowBarcode } from "@components/product/barcode";
import { StockItems } from "@components/stock/StockItems";
import {
  DeleteButton,
  ListButton,
  RefreshButton,
  Show,
  TextField,
} from "@refinedev/antd";
import { BaseKey, useGo, useNavigation, useShow } from "@refinedev/core";
import {
  Button,
  Divider,
  List,
  Table,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { useParams } from "next/navigation";

const { Title } = Typography;

export default function StockShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const go = useGo();
  const { editUrl } = useNavigation();
  const { id } = useParams();
  const record = data?.data;
  //const items = record?.productItems || []
  // console.log(items);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Detail",
      children: <StockItems stock={record} />,
    },
    {
      key: "2",
      label: "Barcode",
      children: (
        <ShowBarcode items={record?.productItems} productSplit={false} />
      ),
    },
  ];
  return (
    <Show
      isLoading={isLoading}
      headerButtons={({
        deleteButtonProps,
        listButtonProps,
        refreshButtonProps,
      }) => (
        <>
          
          {listButtonProps && <ListButton {...listButtonProps} />}
          {deleteButtonProps && <DeleteButton {...deleteButtonProps} />}
          <RefreshButton {...refreshButtonProps} />
        </>
      )}
    >
      <Title level={5}>{"Date"}</Title>
      <TextField value={record?.createdAt} />
      <Title level={5}>{"Code"}</Title>
      <TextField value={record?.code} />
      <Title level={5}>{"Stock By"}</Title>
      <TextField value={record?.stockBy} />

      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={items}
        //onChange={onChange}
        // indicator={{ size: (origin) => origin - 20, align: alignValue }}
      />
      {/* <StockItems stock={record} /> */}
    </Show>
  );
}
