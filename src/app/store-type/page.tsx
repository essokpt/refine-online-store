"use client";

import { PlusOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,  
  useTable,
  useModalForm,
  getValueFromEvent,
  useSelect,  
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
  Select,
} from "antd";
import { useState } from "react";

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function StoreTypeList() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  
    const { selectProps } = useSelect({
      resource: "store-type",
      optionLabel: (item) => `${item.name}`,
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

        resource="store-type"
      >
        <Table {...tableProps} rowKey="id">
          
          <Table.Column dataIndex="typeName" title={"Type Name"} />
          <Table.Column dataIndex="description" title={"Description"} />
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

      <Modal {...createModalProps} width={500} onClose={() => setImageFile(null)}>
        <Divider />
        <Form {...createFormProps} layout="vertical">
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
      </Modal>
    </>
  );
}
