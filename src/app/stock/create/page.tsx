"use client";

import dayjs from "dayjs";
import React, { useState } from "react";
import _ from "lodash";
import {
  Create,
  DateField,
  EditButton,
  useModalForm,
  useSelect,
} from "@refinedev/antd";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import { IProduct } from "@app/product/interface";
import { IStore } from "@app/stores/type";
import BarcodeScanner from "@components/barCodeScanner";

interface DataType {
  key: React.Key;
  serialNumber: string;
  code: string;
  lot: string;
  color: string;
  size: string;
  quantity: number;
  unit: string;
  mfg: string;
  exp: string;
  store: string;
  storeId: number;
  product: string;
  productId: number;
}

export default function StockCreate() {
  const [count, setCount] = useState(0);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanning, setscanning] = useState(false);
  const {
    modalProps: createModalProps,
    show: createModalShow,
    close: closeModal,
    formProps: createForm,
    form: createFormProps,
  } = useModalForm({
    action: "create",
  });

  const { selectProps } = useSelect<IProduct>({
    resource: "product",
    optionLabel: (item) => `${item.productName}`,
    filters: [
      {
        field: "categoryId",
        operator: "in",
        value: [],
      },
    ],
  });

  const { selectProps: selectStore } = useSelect<IStore>({
    resource: "stores",
    optionLabel: (item) => `${item.storeName}`,
  });

  const handleScanResult = (result: string) => {
    setScanResult(result);
    createFormProps.setFieldValue("code", result);
    console.log("Scanned QR code:", result);
  };

  const handleOnFinish = (values: any) => {
    const uniCode = `${Date.now().toString()}-${count}`;
    const storeName = selectStore?.options?.find(
      (item) => item.value == values.storeId
    );
    values.store = storeName?.label;

    const productName = selectProps?.options?.find(
      (item) => item.value == values.productId
    );
    values.product = productName?.label;
    values.quantity = Number(values.quantity);
    values.mfg = dayjs(values.mfg).format('YYYY-MM-DDTHH:mm:ssZ')
    values.exp = dayjs(values.exp).format('YYYY-MM-DDTHH:mm:ssZ')

    if (values.code == undefined) {
      values.key = count;
      values.code = uniCode;
    

      console.log("New value", values);
      setDataSource([...dataSource, values]);
      setCount(count + 1);
    } else {
      console.log("Update value:", values);

      const newData = [...dataSource];
      const index = newData.findIndex((item) => values.code === item.code);
      const item = newData[index];

     // item.mfg = dayjs(item.mfg).format('YYYY-MM-DDTHH:mm:ssZ')
     // item.exp = dayjs(item.exp).format('YYYY-MM-DDTHH:mm:ssZ')
      newData.splice(index, 1, {
        ...item,
        ...values,
      });
      setDataSource(newData);
    }

    closeModal();
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Product",
      dataIndex: "key",
     width : "300px",
      hidden: true,
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "22%",
    },
    {
      title: "Product",
      dataIndex: "product",
      width: "23%",
    },
    {
      title: "serialNumber",
      dataIndex: "serialNumber",
    },
    {
      title: "color",
      dataIndex: "color",
    },
    {
      title: "size",
      dataIndex: "size",
    },
    {
      title: "MFG",
      dataIndex: "mfg",
      width: "50%",
      // render: (_, record) => (
      //   <DateField value={record.mfg} />
      // ),
    },
    {
      title: "EXP",
      dataIndex: "exp",
      width: "50%",
      // render: (_, record) => (
      //   <DateField style={{ width: "100px" }} value={ record.exp? dayjs(record.exp).format("DD-MM-YYYY") : null} />
      // ),
    },
    {
      title: "lot",
      dataIndex: "lot",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "unit",
      dataIndex: "unit",
    },
    {
      title: "Stock-In",
      dataIndex: "store",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Space>
          <EditButton onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const onChangeMfgDate: DatePickerProps["onChange"] = (date, dateString) => {
    //console.log(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ') );
    createFormProps.setFieldValue("mfg", date);
  };

  const onChangeExpDate: DatePickerProps["onChange"] = (date, dateString) => {
    //console.log(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ') );
    createFormProps.setFieldValue("exp", date);
  };

  const handleEdit = (data: DataType) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    createModalShow();
    createFormProps.setFieldValue("key", data.key);
    createFormProps.setFieldValue("product", data.product);
    createFormProps.setFieldValue("productId", data.productId);
    createFormProps.setFieldValue("store", data.store);
    createFormProps.setFieldValue("storeId", data.storeId);
    createFormProps.setFieldValue("serialNumber", data.serialNumber);
    createFormProps.setFieldValue("code", data.code);
    createFormProps.setFieldValue("color", data.color);
   // createFormProps.setFieldValue("mfg", data.mfg);
    //createFormProps.setFieldValue("exp", data.exp);

    createFormProps.setFieldValue("size", data.size);
    createFormProps.setFieldValue(
      "mfg",
      dayjs(data.mfg).format("YYYY-MM-DDTHH:mm:ssZ")
    );
    createFormProps.setFieldValue(
      "exp",
      dayjs(data.exp).format("YYYY-MM-DDTHH:mm:ssZ")
    );
    createFormProps.setFieldValue("lot", data.lot);
    createFormProps.setFieldValue("quantity", Number(data.quantity));
    createFormProps.setFieldValue("unit", data.unit);
    console.log("edit data:", data);
  };

  const handleSubmit = () => {
    console.log("submit:", dataSource);
    createForm?.onFinish?.(dataSource);
  };

  return (
    <Create
      headerButtons={
        <Button
          onClick={() => {
            setScanResult(null);
            createModalShow();
            createFormProps.resetFields();
          }}
          type="primary"
        >
          Add Stock
        </Button>
      }
      footerButtons={
        <Button onClick={() => handleSubmit()} type="primary">
          Save
        </Button>
      }
    >
      <Table<DataType>
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        scroll={{
          x: true,
        }}
      />

      <Modal {...createModalProps} width={600}>
        <Divider />
        <div>
          <BarcodeScanner onScanSuccess={handleScanResult} />
        </div>

        <Form
          form={createFormProps}
          onFinish={handleOnFinish}
          layout="vertical"
        >
          <Form.Item
            label={"Code"}
            name={["code"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product"
            name={["productId"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a product"
              style={{ width: 300 }}
              {...selectProps}
            />
          </Form.Item>
          <Form.Item
            label={"Store"}
            name={["storeId"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a store"
              style={{ width: 300 }}
              {...selectStore}
            />
          </Form.Item>
          <Form.Item
            label={"Serial Number"}
            name={["serialNumber"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"color"}
            name={["color"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Size"}
            name={["size"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"MFG"}
            name={["mfg"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            {/* <DatePicker
              format={{
                format: "DD-MM-YYYY HH:mm:ss",
                type: "mask",
              }}
              onChange={onChangeMfgDate}
            /> */}
            <Input />
          </Form.Item>
          <Form.Item
            label={"EXP"}
            name={["exp"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            {/* <DatePicker
              format={{
                format: "DD-MM-YYYY HH:mm:ss",
                type: "mask",
              }}
              onChange={onChangeExpDate}
            /> */}
            <Input/>
          </Form.Item>
          <Form.Item
            label={"Lot Number"}
            name={["lot"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"quantity"}
            name={["quantity"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label={"unit"}
            name={["unit"]}
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
    </Create>
  );
}
