"use client"
import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export default function VenderCreatePage () {
    const { formProps, saveButtonProps, onFinish } = useForm();

    // const handleOnFinish = (values:any) => {
    //     onFinish({
    //       ...values,
    //       distance: parseInt(values.distance)
    //     });
    //     console.log(values);
        
    //   };
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" >
                <Form.Item
                    label="Eng Name"
                    name={["engName"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thai Name"
                    name={["thaiName"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Short Name"
                    name={["shortName"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tax ID"
                    name={["taxId"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name={["address"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Subdistrict"
                    name={["subdistrict"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="District"
                    name={["district"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Province"
                    name={["province"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Zipcode"
                    name={["zipcode"]}
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
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name={["phone"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contact Name"
                    name={["contactName"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
             
                <Form.Item
                    label="Remark"
                    name={["remark"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                
            </Form>
        </Create>
    );
};
