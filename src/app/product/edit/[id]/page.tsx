"use client";

import { UploadOutlined } from "@ant-design/icons";
import { ICategory, IProductType } from "@app/product/interface";
import { ProductImages } from "@components/product/images-card";
import {
  Edit,
  getValueFromEvent,
  useFileUploadState,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { useApiUrl, useDelete, useInvalidate } from "@refinedev/core";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  TabsProps,
  Upload,
} from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductEdit() {
  const [onRefresh, setOnRefresh] = useState(false)
  const { formProps, saveButtonProps } = useForm({});
  const invalidate = useInvalidate();

  const { id } = useParams();
  const { mutate } = useDelete();

  const { selectProps } = useSelect<ICategory>({
    resource: "category",
    optionLabel: (item) => `${item.name}`,
  });

  const { selectProps: selectType } = useSelect<IProductType>({
    resource: "productType",
    optionLabel: (item) => `${item.typeName}`,
  });

  const handleDelete = (name: string) => {
    mutate(
      {
        resource: "product/image",
        id: name,
      },
      {
        onSuccess: (data, variables, context) => {
          // console.log("delete success:", data.data?.data.productId);
          setOnRefresh(prev => !prev)
          //reFresh();
        },
      }
    );
  };

  const reFresh = () => {
    invalidate({
      resource: "product",
      invalidates: ["detail"],
      id: Number(id),
    });
  };
  const images = Form.useWatch("images", formProps.form);
  // const image = images?.[0] || null;
  // const previewImageURL =
  //   `http://127.0.0.1:3001${image?.url}/${image?.name}` || image?.response?.url;

  const apiUrl = useApiUrl();

  useEffect(() => {
    reFresh()
  }, [onRefresh]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      {/* <Tabs
        defaultActiveKey="2"
        items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: `Tab ${id}`,
            children: `Tab ${id}`,
            icon: <Icon />,
          };
        })}
      /> */}
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
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
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
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
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name={["description"]}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                style={{ width: "100%" }}
                {...selectType}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                style={{ width: "100%" }}
                {...selectProps}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Size"
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
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Remark"
              name={["remark"]}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Image"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Col span={24}>
                <Form.Item
                  name="images"
                  noStyle
                  valuePropName="fileList"
                  getValueFromEvent={getValueFromEvent}
                >
                  <Upload.Dragger
                    name="files"
                    action={`${apiUrl}/product/upload/${id}`}
                    maxCount={10}
                    accept=".png,.jpg,.jpeg"
                    // className={styles.uploadDragger}
                    showUploadList={false}
                    onChange={()=>setOnRefresh(prev => !prev)}
                    multiple
                  >
                    <Flex vertical align="center" justify="center">
                      <Button
                        icon={<UploadOutlined />}
                        style={{
                          marginTop: "auto",
                          marginBottom: "16px",
                        }}
                      >
                        {"Upload Images"}
                      </Button>
                    </Flex>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
            </Form.Item>
          </Col>
          <Col span={24}>
            <ProductImages product={images} onDelete={handleDelete} />
          </Col>
        </Row>
      </Form>
    </Edit>
  );
}
