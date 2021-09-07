import React, { Fragment } from "react";
import CustomButton from "../../../../../component/customButton";
import color from "../../../../../utility/color";
import dataset, { defaultSortedDataset } from "../../../../../dummy/dataset";
import TableData from "../../../../../component/table";
import EditedModal from "../../../../../component/editedModal";

const TableTrain = () => {
  const columns = [
    {
      dataField: "judul",
      text: "Judul",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "sumber",
      text: "Sumber",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "label",
      text: "Label",
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "id",
      text: "Action",
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
      formatter: (_, row) => {
        const { judul, sumber, kategoriData, label } = row;
        return (
          <Fragment>
            <div className="mb-1">
              <EditedModal
                judul={judul}
                sumber={sumber}
                typeData={kategoriData}
                label={label}
              />
            </div>{" "}
            <div className="mb-1">
              <CustomButton
                title="Delete"
                link=""
                textColor={color.gray}
                bgColor={color.red}
              />
            </div>
          </Fragment>
        );
      },
    },
  ];
  return (
    <TableData
      data={dataset.filter((e) => e.kategoriData === "Data Train")}
      columns={columns}
      defaultSorted={defaultSortedDataset}
    />
  );
};

export default TableTrain;
