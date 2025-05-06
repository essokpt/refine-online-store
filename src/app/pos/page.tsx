"use client";

import _ from "lodash";
import { useApiUrl, useCustom, useNotification } from "@refinedev/core";
import { useModalForm, useSelect } from "@refinedev/antd";
import type { IProductItem } from "@app/product/interface";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  theme,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  CheckCircleOutlined,
  CreditCardFilled,
  DeleteOutlined,
  QrcodeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useStyles } from "@components/product/list-card/styled";
import { ProductListCard } from "@components/product";
import { toCurrency } from "@utils/formatCurrency";

import { QrModal } from "@components/qrModal";
import type { GetProps } from "antd";

const { Title } = Typography;
const { Meta } = Card;
//
interface DataType {
  key: React.Key;
  code: string;
  model: string;
  productName: string;
  image: string;
  productId: number;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface IOptions {
  label: string | React.ReactNode;
  //options: IOptionGroup[];
}

type SearchProps = GetProps<typeof Input.Search>;

export default function Pos() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [count, setCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [change, setChange] = useState(0);
  const [cash, setCash] = useState(0);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [vat, setVat] = useState(0);
  const [value, setValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const [options, setOptions] = useState<IOptions[]>([]);

  const { styles, cx } = useStyles();
  const { token } = theme.useToken();

  const { Text } = Typography;

  const renderItem = (title: string, imageUrl: string, desc: string) => ({
    value: title,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        {imageUrl && (
          <Avatar
            size={32}
            src={imageUrl}
            style={{ minWidth: "32px", marginRight: "16px" }}
          />
        )}
        <Text>{`${title}- ${desc}`}</Text>
      </div>
    ),
  });

  const apiUrl = useApiUrl();
  const { open } = useNotification();

  const {
    data: searchData,
    isLoading,
    refetch: refetchSearch,
  } = useCustom<IProductItem>({
    url: `${apiUrl}/product/searchProductItem/${searchValue}`,
    method: "get",

    successNotification: (data, values) => {
      console.log("find data", data);
      if (data?.data.id) {
        addToCart(data.data);

        return {
          message: `Successfully fetched.`,
          description: "Success with no errors",
          type: "success",
        };
      } else {
        console.log("no data");
        open?.({
          type: "error",
          message: "not found item. Please try again!",
          description: "no data",
        });
      }
    },
  });

  const handleDelete = (key: React.Key, total: number) => {
    const newData = dataSource.filter((item) => item.key !== key);

    let reducePrice = subTotal - total;
    setDataSource(newData);
    setSubTotal(reducePrice);
    setVat(reducePrice * 0.07);
    setGrandTotal(reducePrice + reducePrice * 0.07);
  };

  const inreaseCash = (money: number) => {
    setCash((prev) => prev + money);
    setChange(grandTotal - (cash + money));
  };

  const addToCart = (values: any) => {
    const existingItem = dataSource.find(
      (item: DataType) => item.code == values?.productItems[0]?.code
    );
    console.log("add to cart:", values);

    if (!existingItem && values?.stockQuantity != 0) {
      values.key = count;
      console.log("no existing Item -> add new item", values);

      const item = {
        key: count,
        code: values.productItems[0]?.code,
        model: values.model,
        productName: values.productName,
        productId: values.id,
        productItemId: values.productItems[0]?.id,
        quantity: 1,
        image: values.images[0] ? values.images[0].name : null,
        unitPrice: values.price,
        total: 1 * parseFloat(values.price),
      };
      setDataSource([...dataSource, item]);
      setCount(count + 1);
    } else {
      // console.log("existing item:", existingItem);

      const newData = [...dataSource];
      const index = newData.findIndex((item) => values.id === item.productId);
      const item = newData[index];

      if (item.quantity >= values.productItems[0]?.quantity) {
        console.log("maximum qty:", existingItem);
        return;
      }

      item.quantity += 1;
      item.total = item.quantity * item.unitPrice;
      newData.splice(index, 1, {
        ...item,
        ...values,
      });
      setDataSource(newData);
    }

    let includeVat = (subTotal + values.price - discount) * 0.07;
    setSubTotal((prev) => prev + values.price);
    setVat(includeVat);
    setGrandTotal(subTotal + values.price - discount + includeVat);
    setValue("");
    //setSearchValue('')
    setOptions([]);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setValue(inputValue);
  };

  const handleChangeCash = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      //onChange(inputValue);

      console.log("handleChangeCash:", inputValue);
      setChange(grandTotal - Number(inputValue));
      setCash(Number(inputValue));
    }
  };

  const handleSubmit = (value: any) => {
    const orderValue = {
      code: `OR-${Date.now().toString()}-${count}`,
      customerId: value.customerId,
      subTotal: subTotal,
      discount: discount,
      vat: vat,
      grandTotal: grandTotal,
      orderItems: dataSource,
      orderType: "POS",
      paymentType: "Cash",
    };

    console.log("handleFinish", orderValue);
    onFinish?.(orderValue);
    closeModal();
  };

  const { selectProps } = useSelect({
    resource: "customer",
    optionLabel: (item) => `${item.engName}`,
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    close: closeModal,
    show: createModalShow,
    onFinish,
  } = useModalForm({
    action: "create",
    resource: "order",
  });

  useEffect(() => {}, [searchData]);

  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={14}>
          <ProductListCard
            enableAddToCart={true}
            onAddCart={(e) => addToCart(e)}
          />
        </Col>
        <Col
          className="gutter-row"
          span={10}
          style={{
            height: 630,
            overflow: "auto",
            padding: "5px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              maxWidth: "550px",
            }}
          >
            <Input
              style={{
                marginRight: "5px",
              }}
              size="middle"
              placeholder={"search"}
              prefix={<SearchOutlined />}
              value={value}
              onChange={handleChangeSearch}
              onPressEnter={() => setSearchValue(value)}
            />

            <QrModal />
          </div>
          <div
            id="scrollableDiv"
            style={{
              height: 350,
              overflow: "auto",
              padding: "0 16px",
              // border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <InfiniteScroll
              dataLength={dataSource.length}
              next={() => console.log("next")}
              hasMore={dataSource.length < 50}
              loader={<></>}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                // header={
                //   <div
                //     style={{
                //       display: "inline-block",
                //       width: "100%",
                //       justifyContent: "center",
                //     }}
                //   >
                //     <span style={{ marginRight: 5 }}>Product Lists.</span>

                //     <span style={{ float: "right" }}>Order No: #3C8618</span>
                //   </div>
                // }
                size="small"
                className="demo-loadmore-list"
                //loading={initLoading}
                itemLayout="horizontal"
                //loadMore={loadMore}

                dataSource={dataSource}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <div
                        key={item.key}
                        style={{
                          width: "10px",
                          padding: 2,
                          border: "1px solid rgba(140, 140, 140, 0.35)",
                        }}
                      >
                        <Popconfirm
                          title="Sure to delete?"
                          onConfirm={() => handleDelete(item.key, item.total)}
                        >
                          <Button
                            type="primary"
                            size="small"
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </div>,
                    ]}
                  >
                    {/* <Skeleton avatar title={false}> */}
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={
                            item.image
                              ? `http://127.0.0.1:3001/product_images/${item.image}`
                              : null
                          }
                        />
                      }
                      title={item.model}
                      description={
                        <p style={{ width: 200 }}>{item.productName}</p>
                      }
                    />
                    <div style={{ display: "inline-block", padding: "5px" }}>
                      <Input
                        size={"small"}
                        style={{
                          float: "left",
                          width: "50px",
                          marginLeft: "15px",
                        }}
                        value={toCurrency(item.quantity)}
                        // onChange={handleChangeCash}
                      />

                      <span
                        style={{
                          textAlign: "left",
                          width: "60px",
                          margin: "10px",
                        }}
                      >
                        {toCurrency(item.unitPrice)}
                      </span>
                      <span
                        style={{ font: "bold", width: "200px", margin: "10px" }}
                      >
                        {toCurrency(item.total)}
                      </span>
                      {/* <Typography >{item.total}</Typography> */}
                    </div>

                    {/* </Skeleton> */}
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
          <Divider />

          <div
            style={{
              display: "flex",
              margin: 2,
              padding: 5,
              height: 130,
              width: "auto",

              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <div style={{ width: "100%" }}>
              <p>Payment</p>

              <Radio.Group defaultValue="cash" buttonStyle="solid">
                <Radio.Button
                  value="cash"
                  style={{ height: "70px", padding: 3 }}
                >
                  <Avatar shape="square" size={64}>
                    Cash
                  </Avatar>
                </Radio.Button>
                <Radio.Button
                  value="credit"
                  style={{ height: "70px", padding: 3 }}
                >
                  <Avatar
                    shape="square"
                    size={64}
                    icon={<CreditCardFilled />}
                  />
                </Radio.Button>
                <Radio.Button value="qr" style={{ height: "70px", padding: 3 }}>
                  <Avatar shape="square" size={64} icon={<QrcodeOutlined />} />
                </Radio.Button>
              </Radio.Group>
            </div>
            <div style={{ width: "35%", float: "right" }}>
              <Title level={5}>Sub Total: {toCurrency(subTotal)}</Title>
              <Title level={5}>Discount: {discount}</Title>
              <Title level={5}>Vat 7%: {toCurrency(vat)}</Title>
            </div>
          </div>
          <Space>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              style={{
                width: "310px",
                height: "50px",
                fontSize: 26,
                fontWeight: "bold",
              }}
            >
              Total : {toCurrency(grandTotal)}
            </Button>
            <Button
              onClick={() => {
                console.log("place order:", dataSource);
                const productGroup = _(dataSource)
                  .groupBy("productId")
                  .map((items, productId) => ({
                    productId: Number(productId),
                    // quantity: _.sumBy(items, "quantity"),
                  }))
                  .value();

                console.log("group product :", productGroup);

                setCash(0);
                setChange(0);
                setScanResult(null);
                createModalShow();
              }}
              variant="solid"
              type="primary"
              color="orange"
              icon={<CheckCircleOutlined />}
              style={{
                width: "180px",
                height: "50px",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              Place Order
            </Button>
          </Space>
        </Col>
      </Row>

      <Modal {...createModalProps} width={450}>
        {/* <Divider /> */}

        <Form {...createFormProps} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Customer"
            name={["customerId"]}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              placeholder="Select a customer"
              style={{ width: "100%" }}
              {...selectProps}
            />
          </Form.Item>
        </Form>

        {/* <div style={{ display: "inline-flex" }}> */}
        <Card
          title={
            <div style={{ display: "inline-flex" }}>
              <Title
                style={{
                  height: "40px",
                  margin: 0,
                  width: "200px",
                  //border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
                level={3}
              >
                TOTAL
              </Title>
              <Title
                style={{
                  float: "right",
                  height: "40px",
                  margin: 0,
                  width: "200px",
                  //border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
                level={3}
              >
                {toCurrency(grandTotal)}
              </Title>
            </div>
          }
          style={{ width: "auto" }}
        >
          <div style={{ display: "inline-flex" }}>
            <Title level={3} style={{ marginRight: "2px", width: "200px" }}>
              CASH :
            </Title>
            <Input
              style={{ height: "40px", width: "150px" }}
              value={cash}
              onChange={handleChangeCash}
            />
          </div>
          <Flex gap="5px 0" wrap style={{ marginTop: "10px" }}>
            <Tag
              style={{ width: "60px", height: "20px" }}
              onClick={() => inreaseCash(20)}
              color="green"
            >
              +20
            </Tag>
            <Tag
              style={{ width: "60px", height: "20px" }}
              onClick={() => inreaseCash(50)}
              color="blue"
            >
              +50
            </Tag>
            <Tag
              style={{ width: "60px", height: "20px" }}
              onClick={() => inreaseCash(100)}
              color="red"
            >
              +100
            </Tag>
            <Tag
              style={{ width: "60px", height: "20px" }}
              onClick={() => inreaseCash(500)}
              color="magenta"
            >
              +500
            </Tag>
            <Tag
              style={{ width: "60px", height: "20px" }}
              onClick={() => inreaseCash(1000)}
              color="gold"
            >
              +1000
            </Tag>
          </Flex>
          <Divider />
          <div style={{ display: "inline-flex" }}>
            <Title
              style={{
                height: "40px",
                margin: 0,
                width: "200px",
                //border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
              level={3}
            >
              CHANGE
            </Title>
            <Title
              style={{
                float: "right",
                height: "40px",
                margin: 0,
                width: "200px",
                //border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
              level={3}
            >
              {toCurrency(change)}
            </Title>
          </div>
        </Card>
        {/* </div> */}
      </Modal>
    </>
  );
}
