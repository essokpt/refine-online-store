/* eslint-disable jsx-a11y/alt-text */
"use client";

import { PrinterOutlined } from "@ant-design/icons";
import { IProductItem } from "@app/product/interface";
import { getUniqueListWithCount } from "@utils/unique";

import { Avatar, Badge, Button, Divider, Flex, Image, List } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type Props = {
  items: IProductItem[];
  productSplit: boolean;
};

export const ShowBarcode = ({ items, productSplit }: Props) => {
  // const { listProps: productListProps } = useSimpleList<IProductItem>({
  //   resource: "product/productItem",
  //   filters: {
  //     initial: [
  //       {
  //         field: "code",
  //         operator: "contains",
  //         value: "1",
  //       },
  //     ],
  //   },
  //   pagination: {
  //     current: 1,
  //     pageSize: 12,
  //   },
  // });
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  console.log("product item:", items);
  const uniqueProducts = getUniqueListWithCount({
    list: items || [],
    field: "id",
  });

  const barcodeProductSplit = (item: any) => {
    return Array.from({ length: item.quantity }, (_, i) => (
      <div
        key={i}
        style={{
          padding: 5,
          width: "auto",
          height: "auto",

          border: "1px solid #40a9ff",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 10,
          }}
        >
          Model:{item.product.model}
        </p>
        <Image
          src={`http://127.0.0.1:3001/${item?.barCodeUrl}`}
          width={220}
          height={70}
        />
        <p>
          {i + 1}/{item.quantity}
        </p>
      </div>
    ));
  };
  return (

    <>
    
      <Flex>
      <Button type="primary" icon={<PrinterOutlined/>} onClick={reactToPrintFn}>Print</Button>
      </Flex>
      <div ref={contentRef}>
        <Flex
          wrap
          justify="start"
          gap="middle"
          style={{
            marginTop: "20px",
            marginLeft: "50px",
            width: "1080px",
            height: "auto",
            // overflowX: "auto",
          }}
        >
          {uniqueProducts?.map((item: IProductItem) => {
            return productSplit ? (
              <>
                <span key={item.id} style={{ width: "100%" }}>
                 <span>{item.product?.model}</span> <span>{item.product?.productName}</span>
                </span>

                {barcodeProductSplit(item)}
                <Divider />
              </>
            ) : (
              Array.from({ length: item.quantity }, (_, i) => (
                <div
                  key={i}
                  style={{
                    padding: 5,
                    width: "auto",
                    height: "auto",

                    border: "1px solid #40a9ff",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 10,
                    }}
                  >
                    Model:{item.product.model}
                  </p>
                  <Image
                    src={`http://127.0.0.1:3001/${item?.barCodeUrl}`}
                    width={220}
                    height={70}
                  />
                  <p style={{
                      margin: 0,
                      fontSize: 10,                  
                    }}>
                    {i + 1}/{item.quantity}
                  </p>
                </div>
              ))
            );
          })}
        </Flex>
      </div>
    </>
  );
};
