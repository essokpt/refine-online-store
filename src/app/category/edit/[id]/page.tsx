"use client";

import { IProductType } from "@app/product/interface";
import { Edit, getValueFromEvent, useForm, useSelect } from "@refinedev/antd";
import { useApiUrl } from "@refinedev/core";
import { Form, Input, Select, Upload } from "antd";

export default function CategoryEdit() {
  const { formProps, saveButtonProps } = useForm({});
  const apiUrl = useApiUrl();

  const { selectProps } = useSelect<IProductType>({
      resource: "productType",
      optionLabel: (item) => `${item.typeName}`,
    });

  const handleOnFinish = async (values: any) => {
    console.log("handle submit:", values);

    formProps.onFinish?.({
      productTypeId: Number(values.productTypeId),
      name: values.name,
      remark: values.remark,
      iconUrl: values.image[0]?.name ? values.image[0].name : null,
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
      <Form.Item
          label="Type"
          name={["productTypeId"]}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            placeholder="Select a type"
            style={{ width: 300 }}
            {...selectProps}
          />
        </Form.Item>
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/category/upload`}
              listType="picture"
              maxCount={1}
              
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
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
    </Edit>
  );
}
