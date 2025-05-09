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
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import { IProduct } from "@app/product/interface";
import { IStore } from "@app/stores/type";
import BarcodeScanner from "@components/barCodeScanner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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

  const handleOnFinish = (values: any) => {
    console.log("handleOnFinish", values);

    const uniCode = `${Date.now().toString()}`;
    const storeName = selectStore?.options?.find(
      (item) => item.value == values.storeId
    );
    values.store = storeName?.label;

    const productName = selectProps?.options?.find(
      (item) => item.value == values.productId
    );
    values.product = productName?.label;
    values.quantity = Number(values.quantity);
    const newData = [...dataSource];
    const index = newData.findIndex((item) => values.code === item.code);
    console.log("find index", index);

    if (index == -1) {
      values.key = count;
      values.code = values.code == undefined ? uniCode : values.code;

      console.log("New value", values);
      setDataSource([...dataSource, values]);
      setCount((prev) => prev + 1);
    } else {
      console.log("Update value:", values);

      // const newData = [...dataSource];
      // const index = newData.findIndex((item) => values.code === item.code);
      const item = newData[index];

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
      hidden: true,
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "15%",
    },
    {
      title: "Product",
      dataIndex: "product",
      width: "40%",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      width: "25%",
    },
    {
      title: "Color",
      dataIndex: "color",
      width: "12%",
    },
    {
      title: "Size",
      dataIndex: "size",
      width: "20%",
    },
    {
      title: "MFG",
      dataIndex: "mfg",
      width: "20%",
      render: (_, record) =>
        record.mfg ? dayjs(record.mfg).format("DD-MM-YYYY") : null,
    },
    {
      title: "EXP",
      dataIndex: "exp",
      width: "20%",
      render: (_, record) =>
        record.exp ? dayjs(record.exp).format("DD-MM-YYYY") : null,
    },
    {
      title: "Lot Number",
      dataIndex: "lot",
      width: "25%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "15%",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "10%",
    },
    {
      title: "Stock-In",
      dataIndex: "store",
      minWidth: 100,
      width: "20%",
    },
    {
      title: "operation",
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            color="primary"
            variant="solid"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />

          {/* <EditButton onClick={() => handleEdit(record)} /> */}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              color="danger"
              variant="solid"
              shape="circle"
              icon={<DeleteOutlined />}
            />
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
    //console.log(dayjs(date).format('DD-MM-YYYY') );
    createFormProps.setFieldValue("mfg", date);
  };

  const onChangeExpDate: DatePickerProps["onChange"] = (date, dateString) => {
    //console.log(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ') );
    createFormProps.setFieldValue("exp", date);
  };

  const handleEdit = (data: DataType) => {
    // const newData = dataSource.filter((item) => item.key !== key);

    createFormProps.setFieldValue("key", data.key);
    createFormProps.setFieldValue("product", data.product);
    createFormProps.setFieldValue("productId", data.productId);
    createFormProps.setFieldValue("store", data.store);
    createFormProps.setFieldValue("storeId", data.storeId);
    createFormProps.setFieldValue("serialNumber", data.serialNumber);
    createFormProps.setFieldValue("code", data.code);
    createFormProps.setFieldValue("color", data.color);
    createFormProps.setFieldValue("mfg", data.mfg);
    createFormProps.setFieldValue("exp", data.exp);

    createFormProps.setFieldValue("size", data.size);
    // createFormProps.setFieldValue(
    //   "mfg",
    //   dayjs(data.mfg).format("YYYY-MM-DDTHH:mm:ssZ")
    // );
    // createFormProps.setFieldValue(
    //   "exp",
    //   dayjs(data.exp).format("YYYY-MM-DDTHH:mm:ssZ")
    // );
    createFormProps.setFieldValue("lot", data.lot);
    createFormProps.setFieldValue("quantity", Number(data.quantity));
    createFormProps.setFieldValue("unit", data.unit);
    console.log("edit data:", data);

    createModalShow();
  };

  const handleSubmit = () => {
    console.log("submit:", dataSource);
    // values.exp = dayjs(values.exp).format("YYYY-MM-DDTHH:mm:ssZ");

    createForm?.onFinish?.(dataSource);
  };

  return (
    <Create
      headerButtons={
        <Button
          onClick={() => {
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
        //style={{ minWidth: "100%"}}
        scroll={{ x: 1800 }}
      />

      <Modal {...createModalProps} width={650}  style={{ top: 10, height: "auto" }}  >
        <Divider />
        {/* <div>
          <BarcodeScanner onScanSuccess={handleScanResult} />
        </div> */}

        <Form
        //  style={{ padding: 5, margin: 10 }} 
          form={createFormProps}
          onFinish={handleOnFinish}
          layout="vertical"
        >
          <Row gutter={16}   >
            <Col span={12}>
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
            </Col>

            <Col span={12}>
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
                  style={{ width: "100%" }}
                  {...selectProps}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                  style={{ width: "100%" }}
                  placeholder="Select a store"
                  {...selectStore}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>

            <Col span={12}>
              <Form.Item
                label={"Color"}
                name={["color"]}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Form.Item
                label={"MFG"}
                name={["mfg"]}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format={"DD-MM-YYYY"}
                  onChange={onChangeMfgDate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"EXP"}
                name={["exp"]}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format={"DD-MM-YYYY"}
                  onChange={onChangeExpDate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>

            <Col span={12}>
              <Form.Item
                label={"Quantity"}
                name={["quantity"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Unit"}
                name={["unit"]}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider/>
        </Form>
      </Modal>
    </Create>
  );
}
