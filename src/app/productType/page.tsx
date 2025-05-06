"use client";

import { PlusOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,  
  useTable,
  useModalForm,
  getValueFromEvent,  
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
} from "antd";
import { useState } from "react";

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function ProductTypeList() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { tableProps } = useTable({
    syncWithLocation: true,
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
    const formData = new FormData();
    if (imageFile) {     
      formData.append("file", imageFile);
    }

    formData.append("typeName", values.typeName);
    formData.append("remark", values.remark);

    createFormProps.onFinish?.(formData);    
    setImageFile(null)
  };

  const handleFileChange = (e: any) => {
   // console.log("handleFileChange:", e.file.originFileObj);
    if (e.file.originFileObj) {
      setImageFile(e.file.originFileObj);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            setImageFile(null)
            createModalShow();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="image"
            title={"ID"}
            render={(_, record) => {
              return (
                <Avatar
                  shape="square"
                  src={
                    record.iconUrl
                      ? `http://127.0.0.1:3001/product_category/${record.image}`
                      : null
                  }
                  // alt={record.iconUrl?.name}
                />
              );
            }}
          />
          <Table.Column dataIndex="typeName" title={"Type Name"} />

          <Table.Column dataIndex="remark" title={"Remark"} />

          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>

      <Modal {...createModalProps} width={400} onClose={() => setImageFile(null)}>
        <Divider />
        <Form {...createFormProps} onFinish={handleOnFinish} layout="vertical">
          <Form.Item
            label={"Type Name"}
            name={["typeName"]}
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
          <Form.Item>
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
                maxCount={1}
                onPreview={handlePreview}
                onChange={handleFileChange}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
              {previewImage && (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
