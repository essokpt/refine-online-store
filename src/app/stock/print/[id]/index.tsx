import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import React from "react";

type Props = {};

export default function Print() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;
  return (
    <div>
      <div>Print Barcode</div>
    </div>
  );
}
