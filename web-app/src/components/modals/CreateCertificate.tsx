import React, { forwardRef, useEffect, useState } from "react";
import KeyUsageFlags from "../../utils/KeyUsageFlags";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreateCertificate from "../../dtos/create-certificate-dto";
import { HttpStatusCode } from "../../utils/http-status-code.enum";
import LoadingSpinner from "../common/LoadingSpinner";

interface iCraeteCertificateModalProps {
  modalVisible: boolean;
  certificates: string[];
  hideModal: (refresh: boolean | null) => void;
}
const CreateCerfiticateModal = (props: iCraeteCertificateModalProps) => {
  const { modalVisible, hideModal } = props;
  const [subject, setSubject] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [error, setError] = React.useState("");
  const [fetching, setFetching] = useState(false);
  const [issuerSerialNumber, setIssuerSerialNumber] = React.useState<
    string | undefined
  >(undefined);
  const [selectedFlags, setSelectedFlags] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | any>(new Date());
  const [endDate, setEndDate] = useState<Date | any>(
    new Date().setMonth(startDate.getMonth() + 1)
  );

  useEffect(() => {
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);

  const changeIssuer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const data = event.target.value;
    setIssuerSerialNumber(data);
  };

  const changeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };
  const changeOwner = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(event.target.value);
  };

  const clickOnFlag = (flag: number) => {
    const index = selectedFlags.findIndex((e) => e == flag);

    if (index != -1) {
      setSelectedFlags(selectedFlags.filter((e) => e != flag));
    } else {
      setSelectedFlags([...selectedFlags, flag]);
    }
  };

  const getDate = (date: Date | number) => new Date(date).toISOString();

  const createSertificate = async () => {
    if (!subject) {
      setError("Subject is required");
      return;
    }
    setFetching(true);
    const flags = selectedFlags.length ? selectedFlags : [0];
    const flagsString = flags.join(",");
    const data: CreateCertificate = {
      keyUsageFlagsCommaSeparated: flagsString,
      subject: subject,
      userOwner: owner,
      validFrom: getDate(startDate),
      validTo: getDate(endDate),
      issuerSerialNumber: issuerSerialNumber,
    };
    const url: string = "/api/Certificates";

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    switch (resp.status) {
      case HttpStatusCode.OK:
        hideModal(true);
        setFetching(false);
        break;
      case HttpStatusCode.BAD_REQUEST:
        setError(await resp.text());
        setFetching(false);
        break;
      default:
        setFetching(false);
    }
  };

  const closeModal = () => {
    hideModal(false);
  };

  const selectedFlagClass = "bg-green-300";
  return (
    <>
      {modalVisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create sertificate</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-row">
                    <div className="flex-1">
                      <div className="w-96">
                        <label htmlFor="Select certificate">
                          Select sertificate
                        </label>
                        <select
                          onChange={changeIssuer}
                          className="form-select appearance-none
                                    block
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    min-w-full
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                        >
                          <option selected>None</option>
                          {props.certificates.map((cert, index) => {
                            return <option key={cert}>{cert}</option>;
                          })}
                        </select>
                      </div>
                      <div className="w-96">
                        <label htmlFor="Select certificate">Subject</label>
                        <input
                          className="form-select appearance-none
                                    block

                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    min-w-full
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          type="text"
                          placeholder="Enter subject..."
                          name="subject"
                          onChange={changeSubject}
                        />
                      </div>
                      <div className="w-96">
                        <label htmlFor="Select certificate">Owner</label>
                        <input
                          className="form-select appearance-none
                                    block

                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    min-w-full
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          type="text"
                          placeholder="Enter owner..."
                          name="owner"
                          onChange={changeOwner}
                        />
                      </div>
                    </div>
                    <div className="flex-1 px-4">
                      <div>
                        <label htmlFor="Select certificate">Valid from</label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date: Date) => setStartDate(date)}
                          className="form-select appearance-none
                          block

                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          min-w-full
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="Select certificate">Valid until</label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date: Date) => setEndDate(date)}
                          className="form-select appearance-none
                          block

                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          min-w-full
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row flex-wrap">
                      {KeyUsageFlags.map((flag, index) => {
                        const isSelected = selectedFlags.includes(flag.value)
                          ? selectedFlagClass
                          : "";
                        return (
                          <button
                            key={index}
                            className={`px-4 py-2 rounded-md mx-2 my-2  ${isSelected}`}
                            onClick={() => {
                              clickOnFlag(flag.value);
                            }}
                          >
                            {flag.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/*footer*/}
                {!!error && (
                  <div className="px-8 text-red-500 text-right font-bold">
                    Error: {error}
                  </div>
                )}
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createSertificate}
                  >
                    {fetching ? <LoadingSpinner /> : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateCerfiticateModal;
