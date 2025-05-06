"use client";

import { PlusOutlined } from "@ant-design/icons";
import { IProductItem } from "@app/product/interface";
import {
  DeleteButton,
  EditButton,
  List,
  useTable,
  useModalForm,
  getValueFromEvent,
  useSelect,
  ShowButton,
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
import { IStore } from "./type";

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function StoresList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { selectProps } = useSelect({
    resource: "store-type",
    optionLabel: (item) => `${item.typeName}`,
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm({
    action: "create",
  });

  const handleOnFinish = async (values: any) => {
    console.log("handle submit:", values);
  };

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createModalShow();
          },
        }}
        resource="stores"
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="storeName" title={"Store Name"} />
          <Table.Column dataIndex="description" title={"Description"} />
          <Table.Column dataIndex={["type", "typeName"]} title={"Type"} />
          <Table.Column
            title={"On-Stock"}
            dataIndex="productItems"
            key="productItems"
            render={(products: IStore["productItems"]) => {
              return products?.length;
            }}
          />
          <Table.Column dataIndex="status" title={"status"} />
          <Table.Column dataIndex="remark" title={"Remark"} />

          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <ShowButton hideText size="small" recordItemId={record.id} />
                <EditButton hideText size="small" recordItemId={record.id} />
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
    </>
  );
}
