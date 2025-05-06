import {
  type HttpError,
  getDefaultFilter,
  useGo,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  NumberField,
  ShowButton,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import type { IProduct, ICategory } from "../../../app/product/interface";
import {
  Avatar,
  Button,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  theme,
} from "antd";
import { ProductStatus } from "../status";
//import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined, SearchOutlined, StopOutlined, TagOutlined } from "@ant-design/icons";

export const ProductListTable = () => {
  const { token } = theme.useToken();
  const t = useTranslate();
  const go = useGo();
  const { showUrl } = useNavigation();

  const { tableProps, sorters, filters } = useTable<IProduct, HttpError>({
    filters: {
      initial: [
        {
          field: "categoryId",
          operator: "in",
          value: [],
        },
        {
          field: "description",
          operator: "contains",
          value: "",
        },
        {
          field: "name",
          operator: "contains",
          value: "",
        },
       
        {
          field: "isActive",
          operator: "in",
          value: [],
        },
      ],
    },
  });

  const { selectProps: categorySelectProps, query: queryResult } =
    useSelect<ICategory>({
      resource: "category",
      optionLabel: "name",
      optionValue: "id",
      defaultValue: getDefaultFilter("categoryId", filters, "in"),
    });

  const categories = queryResult?.data?.data || [];

  const showProductImages = (images: any) => {
    if (images.length > 0) {
      return (
        <Avatar.Group>
          {images.map((item: any) => (
            <Avatar
              shape="square"
              key={item.id}
              src={`http://127.0.0.1:3001/product_images/${item?.name}`}
            />
          ))}
        </Avatar.Group>
      );
    } else {
      return <Avatar shape="square" icon={<StopOutlined />} />;
    }
  };

  return (
    <Table
      {...tableProps}
      rowKey="id"
      scroll={{ x: true }}
      // pagination={{
      //   ...tableProps.pagination,
      //   showTotal: (total) => (
      //     <PaginationTotal total={total} entityName="products" />
      //   ),
      // }}
    >
      <Table.Column
        title={
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            ID #
          </Typography.Text>
        }
        dataIndex="id"
        key="id"
        width={80}
        render={(value) => (
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            #{value}
          </Typography.Text>
        )}
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }}
          />
        )}
        defaultFilteredValue={getDefaultFilter("id", filters, "eq")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <InputNumber
              addonBefore="#"
              style={{ width: "100%" }}
              placeholder={t("products.filter.id.placeholder")}
            />
          </FilterDropdown>
        )}
      />
      <Table.Column
        title={"Images"}
        dataIndex="images"
        key="images"
        render={(images: IProduct["images"]) => {
          return showProductImages(images);
        }}
      />
      <Table.Column
        title={"Model"}
        dataIndex="model"
        key="name"
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }}
          />
        )}
        defaultFilteredValue={getDefaultFilter("model", filters, "contains")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={"model"} />
          </FilterDropdown>
        )}
        render={(value: string) => {
          return (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </Typography.Text>
          );
        }}
      />
      <Table.Column
        title={"Brand"}
        dataIndex="brand"
        key="name"
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }}
          />
        )}
        defaultFilteredValue={getDefaultFilter("brand", filters, "contains")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={"brand"} />
          </FilterDropdown>
        )}
        render={(value: string) => {
          return (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </Typography.Text>
          );
        }}
      />
      <Table.Column
        title={"Product Name"}
        dataIndex="productName"
        key="productName"
        width={600}
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }}
          />
        )}
        defaultFilteredValue={getDefaultFilter(
          "productName",
          filters,
          "contains"
        )}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={"productName"} />
          </FilterDropdown>
        )}
        render={(value: string) => {
          return (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </Typography.Text>
          );
        }}
      />

      <Table.Column
        title={"Description"}
        dataIndex="description"
        key="description"
        width={432}
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }}
          />
        )}
        defaultFilteredValue={getDefaultFilter(
          "description",
          filters,
          "contains"
        )}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={"description"} />
          </FilterDropdown>
        )}
        render={(description: string) => {
          return (
            <Typography.Paragraph
              ellipsis={{ rows: 1, tooltip: true }}
              style={{
                maxWidth: "400px",
                marginBottom: 0,
              }}
            >
              {description}
            </Typography.Paragraph>
          );
        }}
      />
      <Table.Column
        title={"Price"}
        dataIndex="price"
        key="price"
        align="right"
        sorter
        defaultSortOrder={getDefaultSortOrder("price", sorters)}
        render={(price: number) => {
          return (
            <NumberField
              value={price}
              style={{
                width: "80px",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}
              options={{
                style: "currency",
                currency: "THA",
              }}
            />
          );
        }}
      />
      <Table.Column<IProduct>
        title={"Category"}
        dataIndex={["category", "name"]}
        key="categoryId"
        width={128}
        defaultFilteredValue={getDefaultFilter("categoryId", filters, "in")}
        filterDropdown={(props) => {
          return (
            <FilterDropdown
              {...props}
              selectedKeys={props.selectedKeys.map((item) => Number(item))}
            >
              <Select
                {...categorySelectProps}
                style={{ width: "200px" }}
                allowClear
                mode="multiple"
                placeholder={t("products.filter.category.placeholder")}
              />
            </FilterDropdown>
          );
        }}
        render={(_, record) => {
          const category = categories.find(
            (category) => category?.id === record.category?.id
          );

          return (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {category?.name || "-"}
            </Typography.Text>
          );
        }}
      />
      <Table.Column
        title={"Status"}
        dataIndex="status"
        key="status"
        sorter
        defaultSortOrder={getDefaultSortOrder("status", sorters)}
        defaultFilteredValue={getDefaultFilter("status", filters, "in")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              style={{ width: "200px" }}
              allowClear
              mode="multiple"
              placeholder={t("products.filter.isActive.placeholder")}
            >
              <Select.Option value="true">
                {t("products.fields.isActive.true")}
              </Select.Option>
              <Select.Option value="false">
                {t("products.fields.isActive.false")}
              </Select.Option>
            </Select>
          </FilterDropdown>
        )}
        render={(status) => {
          return <ProductStatus status={status} />;
        }}
      />
      <Table.Column
        title={"Stock"}
        dataIndex="stockQuantity"
        key="stockQuantity"
        render={(qty: number) => {
          return  <Tag icon={<TagOutlined />} color="cyan">
          {qty}
        </Tag>;
        }}
      />
      <Table.Column
        title={"Actions"}
        key="actions"
        fixed="right"
        align="center"
        render={(_, record: IProduct) => (
          <Space>
            <ShowButton hideText size="small" recordItemId={record.id} />

            <EditButton hideText size="small" recordItemId={record.id} />
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        )}
      />
    </Table>
  );
};
