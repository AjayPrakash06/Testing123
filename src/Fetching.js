import React, { useState } from "react";
import axios from "axios";

function Fetching(props) {
  var data = props ? props.decodedText.length : null;
  const [error  , setError] = useState("")
  console.log(data);


  function axiosTest() {
    // ${props.decodedText[0].decodedText}

    axios
      .get(
        `http://localhost:8000/patient/${
          props.decodedText[data - 1].decodedText
        }`
      )

      .then(function (response) {
        // I need this data here ^^
        console.log(response.data.data);
        return response.data.data != null ? props.handleFetchedData(response.data): setError("Error");
      })
      .catch(function (error) {
        console.log("React",error);
      });
  }
  // console.log(props.testing[0].data.Subject.FullName)

  return (
    <>
      {props.decodedText &&
      props.decodedText.length > 0 &&
      props.decodedText &&
      props.decodedText.length > props.testing.length ? (
        <button
          onClick={axiosTest}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Subject
        </button>
      ) : null}

      {props.testing.length > 0 ? (
        <>
          <div class="flex flex-col mt-12">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full border text-center">
                    <thead class="border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                        >
                          Full Name
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                        >
                          Country
                        </th>
                      </tr>
                    </thead>

                    {props.testing.map((details) => (
                      <tbody>
                        <tr class="border-b">
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {details.data.Subject.FullName}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {details.data.Subject.Country}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Fetching;
