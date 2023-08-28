import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Record } from "../models";
import Container from "./Container";
import Protected from "./Protected";
import UpdateRecordModal from "./records/UpdateRecordModal";
import DeleteRecordModal from "./records/DeleteRecordModal";

export default function Records() {

  const [records, setRecords] = useState([]);
  const [isFetchingRecords, setIsFetchingRecords] = useState(false)

  const [showUpdateModal, setShowUpdateModal] = useState({
    visible: false,
    record: null
  });
  const [showDeleteModal, setShowDeleteModal] = useState({
    visible: false,
    record: null
  })


  const fetchRecords = async () => {
    setIsFetchingRecords(true);

    try {
      const records = await DataStore.query(Record);

      setRecords(records);

      setIsFetchingRecords(false)
      return records
    } catch (error) {
      console.log("Error retrieving posts", error);
      setIsFetchingRecords(false)
    }


  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return <Protected>
    {isFetchingRecords ? <>Loading...</> :
      <> <div class="w-full lg:w-[50rem]">
        <table class="w-full text-sm text-left text-gray-600 ">
          <thead class="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Make
              </th>
              <th scope="col" class="px-6 py-3">
                Colour
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>

            {records.map(record => <tr class="bg-white border-b">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {record.name}
              </th>
              <td class="px-6 py-4">
                {record.make}
              </td>
              <td class="px-6 py-4">
                {record.color}
              </td>
              <td class="px-6 py-4">
                <div className="flex gap-4">
                  <button onClick={() => setShowUpdateModal({ visible: true, record })} className="btn text-gray-600">
                    Edit
                  </button>
                  <button onClick={() => setShowDeleteModal({ visible: true, record })} className="btn text-red-500">
                    Delete
                  </button>
                </div>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
        <UpdateRecordModal record={showUpdateModal.record} isOpen={showUpdateModal.visible} onClose={() => setShowUpdateModal({ visible: false, record: null })}
          fetchRecords={fetchRecords} />
        <DeleteRecordModal record={showDeleteModal.record} isOpen={showDeleteModal.visible} onClose={() => setShowDeleteModal({ visible: false, record: null })}
          fetchRecords={fetchRecords} />
      </>}
  </Protected>
}
