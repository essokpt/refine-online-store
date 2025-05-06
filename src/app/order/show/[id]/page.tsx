"use client";
import React from "react";
import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  DateField,
} from "@refinedev/antd";
import { Card, Divider, List, Tag, Typography } from "antd";
import { OrderItems } from "@components/order/order-items-list";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  InfoOutlined,
  PayCircleOutlined,
  StarOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toCurrency } from "@utils/formatCurrency";
import { OrderStatus } from "@components/order/order-status";

const { Title } = Typography;

export default function OrderShow() {
  const { query } = useShow();
  const { data, isLoading } = query;

  const record = data?.data;

  const { data: customerData, isLoading: customerIsLoading } = useOne({
    resource: "customer",
    id: record?.customerId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <>
      <Show>
        <Card
          bordered={false}
          styles={{
            body: {
              padding: "0 16px 0 16px",
            },
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                title: "Order Information.",
                icon: <InfoCircleOutlined />,
                value: (
                  <div
                    style={{
                      display: "inline-flex",
                      padding: "5px",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >
                    <span>
                      <Tag icon={<TagOutlined />}>Code :</Tag>
                      <Typography.Text>{record?.code}</Typography.Text>
                    </span>
                    <span>
                      <Tag icon={<UserOutlined />}>Customer :</Tag>
                      <Typography.Text>
                        {record?.customer?.engName}
                      </Typography.Text>
                    </span>
                    <span>
                      <Tag icon={<CalendarOutlined />}>Date :</Tag>
                      <Typography.Text>{record?.createdAt}</Typography.Text>
                    </span>
                  </div>
                ),
              },
              {
                title: "Payment",
                icon: <PayCircleOutlined />,
                value: (
                  <div
                    style={{
                      display: "inline-flex",
                      padding: "5px",
                      flexWrap: "wrap",
                      gap: "30px",
                    }}
                  >
                    <span>
                      <Tag icon={<TagOutlined />}>Order Type :</Tag>
                      <Typography.Text>{record?.orderType}</Typography.Text>
                    </span>
                    <span>
                      <Tag icon={<UserOutlined />}>Payment Type :</Tag>
                      <Typography.Text>{record?.paymentType}</Typography.Text>
                    </span>
                    <span>
                      <Tag icon={<CalendarOutlined />}>Discount :</Tag>
                      <Typography.Text>{record?.discount}</Typography.Text>
                    </span>
                    <span>
                      <Tag icon={<CalendarOutlined />}>Vat :</Tag>
                      <Typography.Text>
                        {toCurrency(record?.vat)}
                      </Typography.Text>
                    </span>
                    <span>
                      <Tag icon={<CalendarOutlined />}>Total :</Tag>
                      <Typography.Text>
                        {toCurrency(record?.total)}
                      </Typography.Text>
                    </span>
                  </div>
                ),
              },
              {
                title: "Status",
                icon: <StarOutlined />,
                value: <OrderStatus status={record?.status} />,
              },
            ]}
            renderItem={(item) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={
                      <Typography.Text type="secondary">
                        {item.title}
                      </Typography.Text>
                    }
                    description={item.value}
                  />
                </List.Item>
              );
            }}
          />
        </Card>
        <Divider />

        <OrderItems order={record} />
      </Show>
    </>
  );
}
