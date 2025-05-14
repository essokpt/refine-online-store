"use client";

import { IProduct, IProductItem } from "@app/product/interface";
import { ShowBarcode } from "@components/product/barcode";
import {
  
  List,
  useSimpleList,
} from "@refinedev/antd";
import { useState } from "react";


export default function BarcodeList() {
  const [previewImage, setPreviewImage] = useState("");
  const { listProps } = useSimpleList<IProductItem>({
    resource: "product/productItem",
    filters: {
      initial: [
        {
          field: "code",
          operator: "contains",
          value: "1",
        },
      ],
    },
    pagination: {
      current: 1,
      pageSize: 12,
    },
  });

  const record = listProps?.dataSource || [];
 console.log("recore item:", record);

  return (
    <List>
      <ShowBarcode items={record} productSplit={false}/>

    </List>
    
  );
}
