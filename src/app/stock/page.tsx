"use client";

import { PlusOutlined } from "@ant-design/icons";
import { IProduct } from "@app/product/interface";
import { IStore } from "@app/stores/type";
import {
  DeleteButton,
  EditButton,
  List,
  useTable,
  useModalForm,
  getValueFromEvent,
  useSelect,
  CreateButton,
  DateField,
  ShowButton,
  Create,
} from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import {
  Modal,
  Space,
  Table,
  Form,
  Input,
  Divider,
  Avatar,
  Upload,
  UploadFile,
  Image,
  Select,
} from "antd";
import { useState } from "react";
import { IStock } from "./type";
import { StockTableColumnProducts } from "@components/stock/column-product";

export default function StockList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });



  return (
    <>
      <List
        headerButtons={<CreateButton resource="stock" />}
        // createButtonProps={{
        //   onClick: () => {
        //     createModalShow();
        //   },
        // }}

       // resource="stock"
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="createdAt" title={"Date"} render={(value) => <DateField value={value} format="LLL" />}/>
          <Table.Column dataIndex="code" title={"Code"} />
          <Table.Column
          key="products"
          dataIndex="products"
          title={"Products"}
          render={(_, record) => {
            return <StockTableColumnProducts stock={record} />;
          }}
        />
          {/* <Table.Column
            title={"Items List"}
            dataIndex="productItems"
            key="productItems"
            render={(products: IStock["productItems"]) => {
              return products?.length;
            }}
          /> */}
          <Table.Column dataIndex="stockBy" title={"Stock By"} />

          <Table.Column dataIndex="note" title={"Remark"} />

          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />

              </Space>
            )}
          />
        </Table>
      </List>

     
    </>
  );
}
