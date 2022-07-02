import React, { Fragment } from "react";
import CustomButton from "../../../../../component/customButton";
import color from "../../../../../utility/color";
import { defaultSortedDataset } from "../../../../../dummy/dataset";
import TableData from "../../../../../component/table";
import EditedModal from "../../../../../component/editedModal";
import services from "../../../../../process/service";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { getDatatrain } from "../../../../../state";
import swal from "sweetalert";

const TableTrain = () => {

  const data = useRecoilValue(getDatatrain);
  const reload = useResetRecoilState(getDatatrain);

  const handleDelete = (id) => {
    swal({
      title: "Apakah anda yakin ingin menghapus semua data?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        services.deleteBerita(id).then((_) => { 
          swal("Data berhasil dihapus", {
            icon: "success",
          });
          reload(); 
        });
      }
    });
  };

  const columns = [
    {
      dataField: "judul_berita",
      text: "Judul",
      sort: true,
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "sumber_berita",
      text: "Sumber",
      sort: true,
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "label",
      text: "Label",
      headerStyle: {
        backgroundColor: color["blue-navy"],
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "id",
      text: "Action",
      headerStyle: {
        backgroundColor: color["blue-navy"],
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
            </div>{" "}
            <div className="mb-1" onClick={() => handleDelete(id)}>
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
      data={data}
      columns={columns}
      defaultSorted={defaultSortedDataset}
    />
  );
};

export default TableTrain;
