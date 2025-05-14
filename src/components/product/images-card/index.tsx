import {
  Flex,
  Typography,
  Card,
  Tag,
  Image,
  Popconfirm,
} from "antd";
import { getUniqueListWithCount } from "@utils/unique";
import { useDelete, useInvalidate, useTranslate } from "@refinedev/core";
import { IProductImages } from "@app/product/interface";
import { DeleteOutlined } from "@ant-design/icons";

const visibleProductCount = 4;

type Props = {
  onDelete : (data:any) => void;
  product: IProductImages[];
};

export const ProductImages = ({ product, onDelete }: Props) => {
  const t = useTranslate();
  //const { mutate } = useDelete();
  //const invalidate = useInvalidate();

  const uniqueProducts = getUniqueListWithCount({
    list: product || [],
    field: "id",
  });
  const visibleProducts = uniqueProducts.slice(0, visibleProductCount);
  // const unvisibleProducts = uniqueProducts.slice(visibleProductCount);
  //console.log("visibleProducts", visibleProducts);

//  const handleDelete = (name: string) => {
//     mutate( 
//       {
//         resource: "product/image",
//         id: name,
//       },
//       {
//         onSuccess: (data, variables, context) => {
       
//           console.log("delete success:", data.data?.data.productId);

//           invalidate({
//             resource: "product",
//             invalidates: ["detail"],
//             id: data.data?.data?.productId,
//           });
//         },
//       }
//     );
//   };
 
  return (
    <Flex
      wrap
      justify="center"
      color="primary"
      align="center"
      gap="middle"
      style={{
        height: "auto",
       //border: '1px solid #40a9ff',
       // overflowX: "auto",
      }}
    >
      {product?.map((item) => {
        return (
          
          <div
            key={item.id}
            style={{
              width: "15%",
              height: "15%",
            }}
          >
            <Card
              key={item.id}
              hoverable
              bordered={false}
              style={{
                width: "auto",
                height: "auto",
              }}
              // className={styles.card}
              styles={{
                body: {
                  padding: 10,
                },
                cover: {
                  position: "relative",
                },
                actions: {
                  marginTop: "auto",
                },
              }}
              cover={
                <>
                  {/* <Tag
                  className={cx(styles.viewButton, "viewButton")}
                  icon={<EyeOutlined />}
                >
                  View
                </Tag> */}
                  <Image
                    src={`http://127.0.0.1:3001/product_images/${item.name}`}
                    alt="alt"
                    style={{
                      aspectRatio: 250 / 180,
                      // width: "70%",
                      // height: "70%",

                      objectFit: "cover",
                    }}
                  />
                </>
              }
              //actions={}
            >
              <Card.Meta
                title={
                  <Flex>
                    <Typography.Title
                      level={5}
                      ellipsis={{
                        rows: 1,
                        tooltip: item.name,
                      }}
                    >
                      {item.name}
                    </Typography.Title>

                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => onDelete(item.name)}
                    >
                      <Tag
                        color="danger"
                        style={{
                          paddingLeft: "8px",
                          marginLeft: "auto",
                        }}
                        // className={cx(styles.viewButton, "viewButton")}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Tag>
                    </Popconfirm>
                  </Flex>
                }
              />
            </Card>
          </div>
        );
      })}
    </Flex>
  );
};
