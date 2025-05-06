"use client";

import React from "react";
import { BaseRecord, HttpError } from "@refinedev/core";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useModalForm,
  useSelect,
  useTable,
} from "@refinedev/antd";
//import { AntdInferencer } from "@refinedev/inferencer/antd";
import { Divider, Form, Input, Modal, Select, Space, Table } from "antd";
import Link from "next/link";
import { OrderStatus } from "@components/order/order-status";
import { toCurrency } from "@utils/formatCurrency";

type ICustomer = {
  id: number;
  shortName: string;
  thaiName: string;
};

export default function OrderList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm({
    action: "create",
  });
  const { selectProps } = useSelect({
    resource: "customer",
    optionLabel: (item) => `${item.engName}`,
  });

  return (
    <div>
      <List
        createButtonProps={{
          onClick: () => {
            createModalShow();
          },
        }}
        resource="order"
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="createdAt" title="Date" />
          <Table.Column dataIndex="code" title="Code" />
          <Table.Column
            dataIndex={["customer", "engName"]}
            title="Customer Name"
          />
          <Table.Column dataIndex="orderType" title="Type " />
          <Table.Column dataIndex="paymentType" title="Payment " />
          <Table.Column
            dataIndex="total"
            title="Amount"
            render={(item) => {
              return toCurrency(item);
            }}
          />
          <Table.Column
            dataIndex="status"
            title="Status"
            render={(item) => {
              return <OrderStatus status={item} />;
            }}
          />
          <Table.Column dataIndex="createBy" title="Create By" />

          <Table.Column
            title="Actions"
            render={(_, record) => (
              <Space>
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>

      <Modal {...createModalProps} width={600}>
        <Divider />
        <Form {...createFormProps} layout="vertical">
          <Form.Item
            label={"Store Name"}
            name={["storeName"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"description"}
            name={["description"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name={["storeTypeId"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              placeholder="Select a category"
              style={{ width: 300 }}
              {...selectProps}
            />
          </Form.Item>
          <Form.Item
            label={"status"}
            name={["status"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Remark"}
            name={["remark"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
