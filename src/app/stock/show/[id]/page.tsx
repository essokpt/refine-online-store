"use client";

import { IProductItem } from "@app/product/interface";
import { IStock } from "@app/stock/type";
import { StockItems } from "@components/stock/StockItems";
import { Show, TextField } from "@refinedev/antd";
import { BaseKey, useShow } from "@refinedev/core";
import { Divider, List, Table, Typography } from "antd";

const { Title } = Typography;

export default function StockShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;
  //const items = record?.productItems || []
// console.log(items);


 
  return (
    <Show isLoading={isLoading}>
     
      <Title level={5}>{"Date"}</Title>
      <TextField value={record?.createdAt} />
      <Title level={5}>{"Code"}</Title>
      <TextField value={record?.code} />
      <Title level={5}>{"Stock By"}</Title>
      <TextField value={record?.stockBy} />
    

<Divider/>
      <StockItems stock={record} />
    
    </Show>
  );
}
