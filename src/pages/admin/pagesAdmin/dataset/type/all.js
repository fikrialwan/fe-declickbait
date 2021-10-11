import React, { Fragment} from "react";
import CustomButton from "../../../../../component/customButton";
import color from "../../../../../utility/color";
import { defaultSortedDataset } from "../../../../../dummy/dataset";
import TableData from "../../../../../component/table";
import EditedModal from "../../../../../component/editedModal";
import services from "../../../../../process/service";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { getDataset } from "../../../../../state";

const TableAll = () => {
  const data = useRecoilValue(getDataset);
 
  const reload = useResetRecoilState(getDataset);

  const handleDelete = (id) => {
    services.deleteBerita(id).then((_) => reload());
  };

  const columns = [
    {
      dataField: "judul_berita",
      text: "Judul",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "sumber_berita",
      text: "Sumber",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "status_data",
      text: "Kategori Data",
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
        const { id, judul_berita, sumber_berita, status_data, label } = row;
        return (
          <Fragment>
            <div className="mb-1">
              <EditedModal
                judul={judul_berita}
                sumber={sumber_berita}
                typeData={status_data}
                label={label}
                id={id}
              />
            </div>
            <div className="mb-1" onClick={() => handleDelete(id)}>
              <CustomButton
                title="Delete"
                textColor={color.gray}
                bgColor={color.red}
                id={id}
              />
            </div>
          </Fragment>
        );
      },
    },
  ];
  return (
    <TableData
      data={data}
      columns={columns}
      defaultSorted={defaultSortedDataset}
    />
  );
};

export default TableAll;
