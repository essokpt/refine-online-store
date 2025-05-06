"use client";
import { Create, SaveButton, useSelect } from "@refinedev/antd";
import { IProduct } from "@app/product/interface";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Button, Form, Input, Popconfirm, Select, Table } from "antd";
import { IStore } from "../../stores/type";
import { IStock } from "../type";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: React.Key;
  serialNumber: string;
  code: string;
  lot: string;
  color: string;
  size: string;
  quantity: number;
  unit: string;
  mfg: string;
  exp: string;
  storeId: number;
  store: string;
  stockId: number;
  product: string;
  productId: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  // const selectRef = useRef<BaseSelec>(null);
  const form = useContext(EditableContext)!;
  const { selectProps } = useSelect<IProduct>({
    resource: "product",
    optionLabel: (item) => `${item.productName}`,
    optionValue: (item) => `${item.id},${item.productName}`

  });

  const { selectProps: storeList } = useSelect<IStore>({
    resource: "stores",
    optionLabel: (item) => `${item.storeName}`,
    optionValue: (item) => `${item.id},${item.storeName}`
  });

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  
  };
  const handleSelectStore = async (e:any) => {
    console.log('select data:', e);
  }

  const handleSelectProduct = async () => {
    console.log('select data:', );
    
    
  }

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    //console.log('edit data index:', dataIndex);

    childNode = editing ? (
      dataIndex == "product" ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Select
            key={dataIndex}
            //onBlur={save}
            placeholder={`please select a ${dataIndex}.`}
            {...selectProps}
          />
        </Form.Item>
      ) : dataIndex == "store" ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Select
           key={dataIndex}
            onSelect={save}
            onBlur={save}
            placeholder={`please select a ${dataIndex}.`}
            {...storeList}
          />
        </Form.Item>
      ) : (
        <Form.Item
          style={{ margin: 0, minWidth: 120}}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      )
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  serialNumber: string;
  code: string;
  lot: string;
  color: string;
  size: string;
  quantity: number;
  unit: string;
  mfg: string;
  exp: string;
  store: string;
  storeId: number;
  product: string;
  productId: number;
}

type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

export default function StockCreate() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [count, setCount] = useState(0);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Product",
      dataIndex: "product",
      width: "20%",
      editable: true,
    },
    {
      title: "code",
      dataIndex: "code",
      width: "20%",

      editable: true,
    },
    {
      title: "serialNumber",
      dataIndex: "serialNumber",
      editable: true,
    },
    {
      title: "color",
      dataIndex: "color",
      editable: true,
    },
    {
      title: "size",
      dataIndex: "size",
      editable: true,
    },
    {
      title: "mfg",
      dataIndex: "mfg",
      width: "12%",
      editable: true,
    },
    {
      title: "exp",
      dataIndex: "exp",
      width: "12%",
      editable: true,
    },
    {
      title: "lot",
      dataIndex: "lot",
      editable: true,
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "unit",
      dataIndex: "unit",
      editable: true,
    },
    {
      title: "Stock-In",
      dataIndex: "store",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      product: "product",
      store: "store",
      serialNumber: "serial number",
      code: "code",
      lot: "lot",
      color: "color",
      size: "size",
      quantity: 0,
      unit: "pcs",
      mfg: "dd-mm-YYY",
      exp: "dd-mm-YYY",
      storeId: 0,
      productId: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

 
  const handleSave = (row: DataType) => {
    const saveStore = row.store.includes(',')
    const saveProduct = row.product.includes(',')
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];

    if(saveStore){
        const store = row.store.split(',')
        item.storeId = Number(store[0])
        item.store = store[1]
    }
    
    if(saveProduct){
      const pro = row.product.split(',')
      item.productId = Number(pro[0])
      item.product = pro[1]
  }
    

    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    console.log('save item:', newData);

  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
   <Create>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table<DataType >
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      <SaveButton onClick={()=> console.log('save data', dataSource)
      }/>
    </Create>
  );
}
