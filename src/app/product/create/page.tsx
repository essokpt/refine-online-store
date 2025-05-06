"use client";
import React, { useState } from "react";
import { Create, getValueFromEvent, useForm } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
import { useSelect } from "@refinedev/antd";
import { ICategory, IProductType } from "../interface";
import { PlusCircleFilled } from "@ant-design/icons";
import { useApiUrl, useCustom } from "@refinedev/core";

export default function ProductCreatePage() {
  const { formProps, saveButtonProps, onFinish } = useForm();
  const [imageFile, setImageFile] = useState<FileList | []>([]);

  const handleChangeFile = (event: any) => {
    console.log("handleChangeFile", event.target.files);
    setImageFile(event.target.files);
  };

  const handleFileChange = (e: any) => {
    console.log("handleFileChange:", e);
    if (e.fileList.length > 0) {
      setImageFile(
        e.fileList.map((file: any) => {
          return file.originFileObj;
        })
      );
      // setImageFile(e.fileList[0].originFileObj)
    }
    console.log("add file:", imageFile);
  };

  const handleOnFinish = async (values: any) => {
    const formData = new FormData();
    console.log("image  data:", imageFile);
    formData.append("model", values.model);
    formData.append("brand", values.productName);
    formData.append("productName", values.productName);
    formData.append("description", values.model);
    formData.append("size", values.productName);
    formData.append("price", values.price);
    formData.append("weight", values.weight);
    formData.append("categoryId", values.categoryId);
    formData.append("productTypeId", values.productTypeId);
    formData.append("status", values.status);
    formData.append("remark", values.remark);
    if (imageFile.length > 0) {
      //formData.append(`files`, [null]);
      for (let index = 0; index < imageFile.length; index++) {
        formData.append(`files`, imageFile[index]);
      }
    }

    onFinish?.(formData);
    
  };

  const { selectProps } = useSelect<ICategory>({
    resource: "category",
    optionLabel: (item) => `${item.name}`,
  });

  const { selectProps: selectType} = useSelect<IProductType>({
    resource: "productType",
    optionLabel: (item) => `${item.typeName}`,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      {/* <input type="file" name="image"  onChange={handleChangeFile}  multiple/> */}
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="Model"
          name={["model"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Brand"
          name={["brand"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Name"
          name={["productName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
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
          label="Product Type"
          name={["productTypeId"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            placeholder="Select a product Type"
            style={{ width: 300 }}
            {...selectType}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["categoryId"]}
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
          label="Price"
          name={["price"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Selling Price"
          name={["sellingPrice"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="size"
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
          label="weight"
          name={["weight"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
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
          label="remark"
          name={["remark"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload
              name="image"
              listType="picture-circle"
              //fileList={fileList}
              maxCount={10}
              // onPreview={handlePreview}
              onChange={handleFileChange}
              multiple
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusCircleFilled />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
            {/* <Upload.Dragger
              name="file"
            
              listType="picture"
              maxCount={5}
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger> */}
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
}
