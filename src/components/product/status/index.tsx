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
    status: "Avilable" | "New" | "Out of stock" | "Instock";
  };
  
  export const ProductStatus: React.FC<OrderStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;
    let icon;
  
    switch (status) {
      case "Avilable":
        color = "orange";
        icon = <ClockCircleOutlined />;
        break;
      case "New":
        color = "cyan";
        icon = <BellOutlined />;
        break;
      case "Out of stock":
        color = "red";
        icon = <CloseCircleOutlined />;
        break;
     case "Instock":
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