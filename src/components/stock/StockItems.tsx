import { Avatar, Badge, Flex, Table, Tag, Typography } from "antd";
import { getUniqueListWithCount } from "../../utils/unique";
import { DateField, NumberField, TagField } from "@refinedev/antd";
import { IStock } from "@app/stock/type";
import { BaseRecord } from "@refinedev/core";
import { CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";

type Props = {
  stock?: IStock | BaseRecord;
};

export const StockItems = ({ stock }: Props) => {
  const items = stock?.productItems || [];
  const uniqueProducts = getUniqueListWithCount({
    list: items,
    field: "id",
  });

  return (
    <Table
      style={{ width: "100%" }}
      dataSource={uniqueProducts}
      loading={!stock}
      pagination={false}
      scroll={{
        x: true,
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
        dataIndex={["product"]}
        key="product"
        width={"100%"}
        render={(value) => (
          <>
            <Tag color={"green"} icon={<CheckCircleOutlined />}>
              {`${value.model}`}
            </Tag>
            <span>{value.productName}</span>
          </>
        )}
      />
      <Table.Column title="Code" dataIndex="code" key="code" />

      <Table.Column
        title="Serial Number"
        dataIndex="serialNumber"
        key="serialNumber"
      />
      <Table.Column title="color" dataIndex="color" key="color" />
      <Table.Column title="Size" dataIndex="size" key="size" />
      <Table.Column
        title="MFG"
        dataIndex="mfg"
        key="mfg"
        width="60%"
        render={(value) => <DateField value={value} />}
      />
      <Table.Column
        title="EXP"
        dataIndex="exp"
        key="exp"
        render={(value) => (
          <DateField style={{ width: "100px" }} value={value} />
        )}
      />
      <Table.Column title="Lot Number" dataIndex="lot" key="lot" />
      <Table.Column
        title="Stock in value"
        dataIndex="stockInValue"
        key="stockInValue"
      />
      <Table.Column
        title="Stock out value"
        dataIndex="stockOutValue"
        key="stockOutValue"
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
      <Table.Column title="Unit" dataIndex="unit" key="unit" />
      <Table.Column
        title="Stock In"
        dataIndex={["stockIn", "storeName"]}
        key="stockIn"
        render={(value) => {
          return (
            <Tag color={"orange"} icon={<CheckCircleOutlined />}>
              {value}
            </Tag>
          );
        }}
      />
      {/* <Table.Column        
        title="QR-Code"
        dataIndex={"qrCodeUrl"}
        key="qrCodeUrl"
        render={(item) => {
          return (                
            <h3>  {`http://127.0.0.1:3001/${item?.qrCodeUrl}`}</h3>
          );
        }}
      /> */}
      {/* <Table.Column        
        title="QR-Code"
        dataIndex={"qrCodeUrl"}
        key="qrCodeUrl"
        render={(_, record) => {
            return (                
              <Avatar            
                shape="square"
               
                  src={
                    record.qrCodeUrl
                      ? `http://127.0.0.1:3001/${record.qrCodeUrl}`
                      : null
                  }
              />
             
            );
          }}
      /> */}
      <Table.Column
        title="BarCode"
        dataIndex={"barCodeUrl"}
        key="barCodeUrl"
        render={(_, record) => {
          return (
            <Avatar
              shape="square"
              style={{ width: 120 }}
              src={
                record.qrCodeUrl
                  ? `http://127.0.0.1:3001/${record.barCodeUrl}`
                  : null
              }
            />
          );
        }}
      />
    </Table>
  );
};
