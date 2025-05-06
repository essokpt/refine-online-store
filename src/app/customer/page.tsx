"use client";

import React from "react";
import { BaseRecord, HttpError } from "@refinedev/core";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
//import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Space, Table } from "antd";
import Link from "next/link";

type ICustomer = {
  id: number;
  shortName: string;
  thaiName: string;
};


export default function CustomerList () {
  const { tableProps } = useTable({
    syncWithLocation: true,  
});

  return (
    <div>
          <List headerButtons={<CreateButton resource="customer" />} />
        
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="shortName" title="Name" />
            <Table.Column dataIndex="thaiName" title="Customer Name" />
            <Table.Column dataIndex="description" title="Description" />
            <Table.Column dataIndex="address" title="Address" />
            <Table.Column dataIndex="subdistrict" title="sub-district" />  
            <Table.Column dataIndex="district" title="District" />
            <Table.Column dataIndex="province" title="Province" />
            <Table.Column dataIndex="zipcode" title="Zipcode" />
            <Table.Column dataIndex="phone" title="Phone" />
            <Table.Column
              title="Actions"
              render={(_, record) => (
                <Space>
                  <ShowButton hideText size="small" recordItemId={record.id} />
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </div>
      );
}
