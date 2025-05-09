import { Flex, Popover, Typography, Badge, Avatar, theme } from "antd";
import { getUniqueListWithCount } from "@utils/unique";
import { useTranslate } from "@refinedev/core";
import { IStock } from "@app/stock/type";

const visibleProductCount = 4;

type Props = {
  stock: any;
};

export const StockTableColumnProducts = ({ stock }: Props) => {
  const t = useTranslate();
  const { token } = theme.useToken();

  const uniqueProducts = getUniqueListWithCount({
    list: stock.productItems || [],
    field: "id",
  });
  const visibleProducts = uniqueProducts.slice(0, visibleProductCount);
  const unvisibleProducts = uniqueProducts.slice(visibleProductCount);

  return (
    <Flex gap={12}>
      {visibleProducts.map((item) => {
        const image = item.product?.images[0];
        return (
          <Popover
            key={item.id}
            content={
              <Typography.Text>{item.product?.productName}</Typography.Text>
            }
          >
            <Badge
              style={{
                color: "#fff",
              }}
              count={item.count === 1 ? 0 : item.count}
            >
              <Avatar
                shape="square"
                //src={image?.thumbnailUrl || image?.url}
                src={`http://127.0.0.1:3001/product_images/${image?.name}`}
                alt={image?.name}
              />
            </Badge>
          </Popover>
        );
      })}
      {!!unvisibleProducts.length && (
        <Popover
          title={"Products"}
          content={
            <Flex gap={8}>
              {unvisibleProducts.map((product) => {
                const image = product.product?.images[0];
                return (
                  <Popover
                    key={product.id}
                    content={<Typography.Text>{product.product.productName}</Typography.Text>}
                  >
                    <Badge
                      style={{
                        color: "#fff",
                      }}
                      count={
                        product.count === 1
                          ? 0
                          : product.count
                      }
                    >
                      <Avatar
                        shape="square"
                        src={`http://127.0.0.1:3001/product_images/${image?.name}`}
                        alt={image?.name}
                      />
                    </Badge>
                  </Popover>
                );
              })}
            </Flex>
          }
        >
          <Avatar
            shape="square"
            style={{
              backgroundColor: token.colorPrimaryBg,
            }}
          >
            <Typography.Text
              style={{
                color: token.colorPrimary,
              }}
            >
              +{unvisibleProducts.length}
            </Typography.Text>
          </Avatar>
        </Popover>
      )}
    </Flex>
  );
};
