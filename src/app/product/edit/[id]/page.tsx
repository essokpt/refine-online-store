"use client";

import { UploadOutlined } from "@ant-design/icons";
import {
  ICategory,
  IProduct,
  IProductImages,
  IProductType,
} from "@app/product/interface";
import { Edit, getValueFromEvent, useForm, useSelect } from "@refinedev/antd";
import { useApiUrl } from "@refinedev/core";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Select,
  Tabs,
  TabsProps,
  Upload,
} from "antd";
import { useParams } from "next/navigation";

export default function ProductEdit() {
  const { formProps, saveButtonProps } = useForm({});
  const { id } = useParams();
  const { selectProps } = useSelect<ICategory>({
    resource: "category",
    optionLabel: (item) => `${item.name}`,
  });

  const { selectProps: selectType } = useSelect<IProductType>({
    resource: "productType",
    optionLabel: (item) => `${item.typeName}`,
  });

  const items: TabsProps["items"] = [
    { key: "1", label: "Tab 1", children: "Content of Tab Pane 1" },
    { key: "2", label: "Tab 2", children: "productImages" },
  ];

  const images = Form.useWatch("images", formProps.form);
  const image = images?.[0] || null;
  const previewImageURL =
    `http://127.0.0.1:3001${image?.url}/${image?.name}` || image?.response?.url;

  const apiUrl = useApiUrl();

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
          <Input.TextArea rows={5} />
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
        <Form.Item
          name="images"
          valuePropName="fileList"
          getValueFromEvent={getValueFromEvent}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Upload.Dragger
            name="files"
            action={`${apiUrl}/product/upload/${id}`}
            maxCount={10}
            accept=".png,.jpg,.jpeg"
            // className={styles.uploadDragger}
            showUploadList={false}
            multiple
          >
            <Flex
              vertical
              align="center"
              justify="center"
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              <Avatar.Group>
                {images?.map((item: any) => (
                  <Avatar
                    shape="square"
                    style={{
                      aspectRatio: 1,
                      objectFit: "contain",
                      // width: previewImageURL ? "100%" : "48px",
                      width: "80px",
                      height: "80px",
                      marginTop: "auto",
                      transform: "translateY(50%)",
                    }}
                    key={item.id}
                    src={`http://127.0.0.1:3001/product_images/${item?.name}`}
                    onClick={() => console.log(id)}
                  />
                ))}
              </Avatar.Group>
              <Button
                icon={<UploadOutlined />}
                style={{
                  marginTop: "auto",
                  marginBottom: "16px",
                  // backgroundColor: theme.colorBgContainer,
                  // ...(!!previewImageURL && {
                  //   position: "absolute",
                  //   bottom: 0,
                  // }),
                }}
              >
                {"Upload Images"}
              </Button>
            </Flex>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
}
