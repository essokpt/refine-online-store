"use client";

import { StopOutlined } from "@ant-design/icons";
import { IProductItem } from "@app/product/interface";
import { IStock } from "@app/stock/type";
import { StockItems } from "@components/stock/StockItems";
import { Show, TextField } from "@refinedev/antd";
import { BaseKey, useShow } from "@refinedev/core";
import {
  Avatar,
  Carousel,
  Col,
  Divider,
  Image,
  List,
  Row,
  Table,
  Typography,
} from "antd";

const { Title } = Typography;
const contentStyle: React.CSSProperties = {
  margin: 0,
  width: "220px",
  height: "220px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function ProductShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;
  console.log(record);

  return (
    <Show isLoading={isLoading}>
      <Row>
        <Col span={8}>
          <Title level={5}>{"Model"}</Title>
          <TextField value={record?.model} />
          <Title level={5}>{"Product Name"}</Title>
          <TextField value={record?.productName} />
          <Title level={5}>{"Description"}</Title>
          <TextField value={record?.description} />
        </Col>

        <Col span={8}>
          <Title level={5}>{"Brand"}</Title>
          <TextField value={record?.brand} />
          <Title level={5}>{"Price"}</Title>
          <TextField value={record?.price} />
          <Title level={5}>{"Status"}</Title>
          <TextField value={record?.status} />
        </Col>

        <Col span={8}>
          {record?.images?.length > 0 ? (
            <Carousel arrows dotPosition="bottom" infinite={false}  
             style={{width: "300px", }}>
              {record?.images?.map((item: any) => (
                <>
                  <Avatar
                  key={item.id}
                    shape="square"
                    style={contentStyle}
                    src={`http://127.0.0.1:3001/product_images/${item?.name}`}
                  />
                </>
              ))}
            </Carousel>
          ) : (
            <Avatar
              shape="square"
              style={contentStyle}
              icon={<StopOutlined />}
            />
          )}
        </Col>
      </Row>

      <Divider />
      <StockItems stock={record} />
    </Show>
  );
}
