"use client";

import { Edit, getValueFromEvent, useForm } from "@refinedev/antd";
import { useApiUrl } from "@refinedev/core";
import { Form, Input, Upload } from "antd";

export default function ProductTypeEdit() {
  const { formProps, saveButtonProps } = useForm({});
  const apiUrl = useApiUrl();

  const handleOnFinish = async (values: any) => {
    console.log("handle submit:", values);

    formProps.onFinish?.({
      typeName: values.typeName,
      remark: values.remark,
      //image: values.image[0].name,
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label={"Type Name"}
          name={["typeName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item label="Image">
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
        </Form.Item> */}
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
