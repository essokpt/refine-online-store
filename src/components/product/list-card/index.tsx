import {
  type HttpError,
  useGo,
  useList,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import { NumberField, useModal, useSimpleList } from "@refinedev/antd";
import type {
  ICategory,
  IProduct,
  IProductItem,
} from "../../../app/product/interface";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  List,
  Modal,
  Skeleton,
  Tag,
  Typography,
  theme,
} from "antd";
import { ProductStatus } from "../status";
import {
  ClockCircleOutlined,
  EyeOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useStyles } from "./styled";
import { toCurrency } from "@utils/formatCurrency";
import InfiniteScroll from "react-infinite-scroll-component";

interface cardProps {
  enableAddToCart: boolean;
  onAddCart: (data: any) => void;
}

export const ProductListCard: React.FC<cardProps> = ({
  enableAddToCart,
  onAddCart,
}) => {
  const [product, setProduct] = useState<IProduct>();
  const { styles, cx } = useStyles();
  const { token } = theme.useToken();
  const t = useTranslate();
  const go = useGo();
  const { showUrl } = useNavigation();
  const { show, modalProps } = useModal();

  const {
    listProps: productListProps,
    filters,
    setFilters,
  } = useSimpleList<IProduct, HttpError>({
    resource: "product",
    pagination: {
      current: 1,
      pageSize: 12,
    },
    filters: {
      initial: [
        {
          field: "categoryId",
          operator: "in",
          value: [],
        },
      ],
    },
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useList<
    ICategory,
    HttpError
  >({
    resource: "category",
    pagination: {
      mode: "off",
    },
  });
  const categories = categoryData?.data || [];

  const categoryFilters = useMemo(() => {
    const filter = filters.find((filter) => {
      if ("field" in filter) {
        return filter.field === "categoryId";
      }

      return false;
    });

    const filterValues = filter?.value?.map((value: string | number) =>
      Number(value)
    );

    return {
      operator: filter?.operator || "in",
      value: (filterValues || []) as number[],
    };
  }, [filters]).value;

  const hasCategoryFilter = categoryFilters?.length > 0;

  const handleOnTagClick = (categoryId: number) => {
    const newFilters = categoryFilters;
    const hasCurrentFilter = newFilters.includes(categoryId);
    console.log("handleOnTagClick:", categoryId);
    if (hasCurrentFilter) {
      newFilters.splice(newFilters.indexOf(categoryId), 1);
    } else {
      newFilters.push(categoryId);
    }

    setFilters([
      {
        field: "categoryId",
        operator: "in",
        value: newFilters,
      },
    ]);
  };

  // const addCart =(item:any) => {
  //   console.log("add cart:", item);
  //   onAddCart(item)
  // }

  const handleAllSelect = () => {
    const newFilters = categoryFilters.map((item: any) => item.categoryId);

    console.log("handleAllSelect:", newFilters);
    // if (hasCurrentFilter) {
    //   newFilters.splice(newFilters.indexOf(categoryId), 1);
    // } else {
    //   newFilters.push(categoryId);
    // }

    // setFilters([
    //   {
    //     field: "categoryId",
    //     operator: "in",
    //     value: newFilters,
    //   },
    // ]);
  };

  return (
    <>
      {/* <Divider style={{ margin: "16px 0px" }} /> */}
      <Flex
        wrap="nowrap"
        gap={12}
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Tag
          style={{ padding: "4px 10px 4px 10px", cursor: "pointer" }}
          color={!hasCategoryFilter ? token.colorPrimary : undefined}
          icon={<TagOutlined />}
          //onClick={handleAllSelect}
          onClick={() => {
            setFilters([
              {
                field: "categoryId",
                operator: "in",
                value: [],
              },
            ]);
          }}
        >
          {"AllCategories"}
        </Tag>
        {!categoryIsLoading &&
          categories.map((category) => (
            <Tag
              key={category.id}
              color={
                categoryFilters?.includes(category.id) ? "orange" : undefined
              }
              style={{
                padding: "4px 10px 4px 10px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleOnTagClick(category.id);
              }}
            >
              <Avatar
                shape="circle"
                size={20}
                src={`http://127.0.0.1:3001/product_category/${category?.iconUrl}`}
              />
              {category.name}
            </Tag>
          ))}

        {categoryIsLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton.Button
              key={index}
              style={{
                width: "108px",
                height: "30px",
              }}
              active
            />
          ))}
      </Flex>
      <Divider style={{ margin: "16px 0px" }} />
      <List
        {...productListProps}
        // pagination={{
        //   ...productListProps.pagination,
        //   showTotal: (total) => (
        //     <PaginationTotal total={total} entityName={"products"} />
        //   ),
        // }}
        grid={{
          gutter: [16, 16],
          column: 4,
          xxl: 4,
          xl: 4,
          lg: 3,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        renderItem={(item) => (
          <List.Item style={{ height: "100%" }}>
            <Card
              hoverable
              bordered={false}
              className={styles.card}
              styles={{
                body: {
                  padding: 16,
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
                  <Tag
                    // onClick={() => {
                    //   return go({
                    //     to: `${showUrl("product", item.id)}`,
                    //     query: {
                    //       to: 'product',
                    //     },
                    //     options: {
                    //       keepQuery: true,
                    //     },
                    //     type: "replace",
                    //   });
                    // }}
                    className={cx(styles.viewButton, "viewButton")}
                    icon={<EyeOutlined />}
                  >
                    View
                  </Tag>
                  <Image
                    src={`http://127.0.0.1:3001/product_images/${item.images[0]?.name}`}
                    alt="alt"
                    style={{
                      aspectRatio: 250 / 180,
                      objectFit: "cover",
                    }}
                  />
                </>
              }
              actions={[
                <Flex
                  key="actions"
                  justify="space-between"
                  style={{
                    padding: "0 16px",
                  }}
                >
                  {/* <Tag
                   className={cx(styles.viewButton, "viewButton")}
                    icon={<TagOutlined />}
                  >
                    <Typography.Text key="category.name">
                      {
                        categories.find(
                          (category) => category.id === item.category.id
                        )?.name
                      }
                    </Typography.Text>
                  </Tag> */}
                  {item.status == "Instock" ? (
                    <Badge style={{ backgroundColor: "#52c41a" }} size="small">
                      <Tag color="success">
                        Stock :{" "}
                        {item.stockQuantity > 0 ? item.stockQuantity : 0}
                      </Tag>
                    </Badge>
                  ) : (
                    <Badge style={{ backgroundColor: "#52c41a" }} size="small">
                      <Tag color={"orange"}>
                        <Typography.Text>{item.status}</Typography.Text>
                      </Tag>
                    </Badge>
                  )}

                  {enableAddToCart ? (
                    item.status != "Instock" ? (
                      <></>
                    ) : item.productItems?.length > 1 ? (
                      <Tag
                        color={"blue"}
                        onClick={() => {
                          console.log("select product:", item);

                          setProduct(item);
                          show();
                        }}
                      >
                        <Typography.Text>Select..</Typography.Text>
                      </Tag>
                    ) : (
                      <Tag color={"green"} onClick={() => onAddCart(item)}>
                        <Typography.Text>Add to Card</Typography.Text>
                      </Tag>
                    )
                  ) : (
                    <>
                      <Tag
                        // className={cx(styles.viewButton, "viewButton")}
                        icon={<TagOutlined />}
                      >
                        <Typography.Text key="category.name">
                          {
                            categories.find(
                              (category) => category.id === item.category.id
                            )?.name
                          }
                        </Typography.Text>
                      </Tag>
                    </>
                  )}
                </Flex>,
              ]}
            >
              <Card.Meta
                title={
                  <Flex>
                    <Typography.Title
                      level={5}
                      ellipsis={{
                        rows: 1,
                        tooltip: item.model,
                      }}
                    >
                      {item.model}
                    </Typography.Title>

                    <span
                      style={{
                        paddingLeft: "8px",
                        marginLeft: "auto",
                      }}
                    >
                      {toCurrency(item.price)}
                    </span>
                  </Flex>
                }
                description={enableAddToCart ? null : item.productName}
              />
            </Card>
          </List.Item>
        )}
      />
      <Modal {...modalProps}>
        <div
          id="scrollableDiv"
          style={{
            height: 350,
            overflow: "auto",
            padding: "0 16px",
            // border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          {/* <InfiniteScroll
            dataLength={product?.productItems?.length}
            next={() => console.log("next")}
            hasMore={product?.productItems?.length < 50}
            loader={<></>}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          > */}
          <List
            header={
              <div
                style={{
                  display: "inline-block",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: 5 }}>Seletc Product Items.</span>
              </div>
            }
            size="small"
            className="demo-loadmore-list"
            //loading={initLoading}
            itemLayout="horizontal"
            //loadMore={loadMore}

            dataSource={product?.productItems}
            renderItem={(item: IProductItem) => (
              <List.Item
                actions={[
                  <div
                    key={item.id}
                    style={{
                      width: "10px",
                      padding: 2,
                      border: "1px solid rgba(140, 140, 140, 0.35)",
                    }}
                  >
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusCircleOutlined />}
                      onClick={() => {
                        const newData: any = { ...product };
                        delete newData.productItems;
                        newData.productItems = [item];
                        console.log("add item", newData);

                        onAddCart(newData);
                      }}
                    >
                      Add to cart
                    </Button>
                  </div>,
                ]}
              >
                {/* <Skeleton avatar title={false}> */}
                <List.Item.Meta
                  avatar={<Avatar>{item.stockIn.storeName}</Avatar>}
                  title={item.code}
                  description={
                    <p style={{ width: 200 }}>
                      {item.serialNumber ? item.serialNumber : item.sku}
                    </p>
                  }
                />
                <div style={{ display: "inline-block", padding: "5px" }}>
                  <span
                    style={{
                      textAlign: "left",
                      width: "60px",
                      margin: "10px",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <span
                    style={{ font: "bold", width: "200px", margin: "10px" }}
                  >
                    store
                  </span>
                  {/* <Typography >{item.total}</Typography> */}
                </div>

                {/* </Skeleton> */}
              </List.Item>
            )}
          />
          {/* </InfiniteScroll> */}
        </div>
      </Modal>
    </>
  );
};
