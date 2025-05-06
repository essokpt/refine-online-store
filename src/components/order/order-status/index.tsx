import {
    BellOutlined,
    CarOutlined,
    CheckCircleOutlined,
    CheckSquareOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    StopOutlined,
  } from "@ant-design/icons";
  import { useTranslate } from "@refinedev/core";
  import { Tag } from "antd";
  
  type OrderStatusProps = {
    status: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled" | "Completed";
  };
  
  export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;
    let icon;
  
    switch (status) {
      case "Pending":
        color = "orange";
        icon = <ClockCircleOutlined />;
        break;
      case "Ready":
        color = "cyan";
        icon = <BellOutlined />;
        break;
      case "On The Way":
        color = "blue";
        icon = <CarOutlined />;
        break;
      case "Delivered":
        color = "green";
        icon = <CheckCircleOutlined />;
        break;
      case "Cancelled":
        color = "red";
        icon = <CloseCircleOutlined />;
        break;
     case "Completed":
          color = "green";
          icon = <CheckSquareOutlined />;
          break;
      default :
        color = "default";
        icon = <StopOutlined />
        break;
    }
  
    return (
      <Tag color={color} icon={icon}>
        {status}
      </Tag>
    );
  };