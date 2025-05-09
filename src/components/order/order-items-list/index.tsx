import { Avatar, Badge, Flex, Table, Tag, Typography } from "antd";
import { getUniqueListWithCount } from "../../../utils/unique";
import { NumberField, TagField } from "@refinedev/antd";
import { IStock } from "@app/stock/type";
import { BaseRecord } from "@refinedev/core";
import { CheckCircleOutlined } from "@ant-design/icons";
import { IOrder } from "@app/order/interface";

type Props = {
  order?: IOrder | BaseRecord;
};

export const OrderItems = ({ order }: Props) => {
  const items = order?.orderItems || [];
  const uniqueOrder = getUniqueListWithCount({
    list: items,
    field: "id",
  });

  return (
    <Table
      dataSource={uniqueOrder}
      loading={!order}
      pagination={false}
      scroll={{
        x: 1300,
      }}
      //   footer={(products) => {
      //     return (
      //       <Flex justify="flex-end" gap={16}>
      //         <Typography.Text>Total</Typography.Text>
      //         <NumberField
      //           value={products.reduce(
      //             (acc, product) => acc + product.count * product.price,
      //             0,
      //           )}
      //           options={{ style: "currency", currency: "USD" }}
      //         />
      //       </Flex>
      //     );
      //   }}
    >
      {/* <Table.Column
        title="Product"
        dataIndex="name"
        key="name"
        render={(_, record) => {
          const image = record.images?.[0];

          return (
            <Flex
              gap={16}
              align="center"
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <Avatar
                shape="square"
                src={image?.thumbnailUrl || image?.url}
                alt={image?.name}
              />
              <Typography.Text>{record.name}</Typography.Text>
            </Flex>
          );
        }}
      /> */}
      <Table.Column
        title="Product"
        dataIndex={["productItem", "product"]}
        key="productItem"
        width={"30%"}
        render={(value) => {
          return (
            <>
            <p>
              <Tag color={"green"} icon={<CheckCircleOutlined />}>
                {`${value.model}`}
              </Tag>
            </p>
            <span>{value.productName}</span>
          </>
          );
        }}
      />
      <Table.Column
        title="Item Code"
        dataIndex={["productItem", "code"]}
        key="productItem"
      />
      <Table.Column
        title="Serial Number"
        dataIndex="serialNumber"
        key="serialNumber"
      />

      <Table.Column
        title="Quantity"
        dataIndex="quantity"
        key="quantity"
        render={(value) => {
          return (
            <NumberField
              value={value}
              style={{
                whiteSpace: "nowrap",
              }}
            />
          );
        }}
      />
      <Table.Column title="Unit" dataIndex={"unit"} key="unit" />
      <Table.Column title="Unit Price" dataIndex="unitPrice" key="unitPrice" />

      <Table.Column title="Discount" dataIndex="discount" key="discount" />

      <Table.Column title="Total" dataIndex="total" key="total" />

      <Table.Column
        title="Store"
        dataIndex={["productItem", "stockIn", "storeName"]}
        key="stockIn"
        render={(value) => {
          return (
            <Tag color={"orange"} icon={<CheckCircleOutlined />}>
              {value}
            </Tag>
          );
        }}
      />
    </Table>
  );
};
