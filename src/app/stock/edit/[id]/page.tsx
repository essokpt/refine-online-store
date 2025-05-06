"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export default function CategoryEdit() {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps } = useSelect({
    resource: "store-type",
    optionLabel: (item) => `${item.typeName}`,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
    </Edit>
  );
}
