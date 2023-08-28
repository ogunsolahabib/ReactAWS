import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Record } from "../models";
import Protected from "./Protected";
import UpdateRecordModal from "./records/UpdateRecordModal";
import DeleteRecordModal from "./records/DeleteRecordModal";
import Button from "./Button";
import { propertyRenderer } from "../config";



export default function Records() {

  const [records, setRecords] = useState();
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

      setRecords(records ?? []);

      setIsFetchingRecords(false)
      return records
    } catch (error) {
      console.log("Error retrieving posts", error);
      setIsFetchingRecords(false);
      setRecords([])
    }


  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return <Protected><div className="w-full lg:w-[50rem] m-auto flex justify-between flex-wrap items-center p-4">
    <h2 className="text-xl font-semibold">Records</h2>

    <a href="create/basic"><Button>Add new</Button></a>
  </div>
    {isFetchingRecords ? <div className="flex justify-center">Loading...</div> : !records?.length ? <p className="flex justify-center">Nothing to see yet. <a href="create/basic" className="text-primary underline">Add a new Record</a></p> :
      <>

        <div class="w-full lg:w-[50rem] m-auto overflow-x-scroll">
          <table class="w-full text-sm text-left text-gray-600 m-auto">
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
                  Created By
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
                  {propertyRenderer[record.make]}
                </td>
                <td class="px-6 py-4">
                  <div className="flex gap-1 items-center">
                    {propertyRenderer[record.color]}
                    <span style={{
                      background: record.color.toLowerCase()
                    }} className={`inline-block w-4 h-4 rounded-sm`}></span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  {hideEmail(record.createdBy)}
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

function hideEmail(email) {
  if (!email) return '';
  const [username, domain] = email.split('@');
  const hiddenUsername = username.slice(0, Math.max(username.length - 3, 1)) + '***';
  return hiddenUsername + '@' + domain;
}
