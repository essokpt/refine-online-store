"use client";

import { StockItems } from "@components/stock/StockItems";
import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Divider, Typography } from "antd";

const { Title } = Typography;

export default function CategoryShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;
console.log('store:', record);

  return (
    <Show isLoading={isLoading}>
     
      <Title level={5}>{"Store"}</Title>
      <TextField value={record?.storeName} />

      <Divider />
      <StockItems stock={record} />
    </Show>
  );
}
