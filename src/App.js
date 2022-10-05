// import logo from './logo.svg';
// import './App.css';
// import Fetching from './Fetching';

// function App() {
//   return (
//     <div className="App">
//       <Fetching></Fetching>
//     </div>
//   );
// }

// export default App;


import QuickResponse from "./QuickResponse";
import React, { useState } from "react";
import Fetching from './Fetching';

function App() {
  const [decodedText, setDecodedText] = useState([]);
  const [testing, setTesting] = useState([])
  function handleQuickResponse(data) {
    console.log(data);
    setDecodedText((prevState) => [...prevState, data]);
    console.log("decodedText", decodedText);
  }
  function handleFetchedData(data)
  {
    setTesting((prevState)=>[...prevState , data])
    console.log(data)
  }

  return (
    <div>
      {console.log(decodedText)}

      <QuickResponse
        handleQuickResponse={handleQuickResponse}
        decodedText={decodedText}
      ></QuickResponse>
      <div className="flex w-[80%] mx-auto justify-around ">
        <div>
          <Fetching decodedText={decodedText} testing={testing} handleFetchedData={handleFetchedData}  ></Fetching>
        </div>
        <div>
          {decodedText.length > 0 ? (



            <div class="flex flex-col mt-12">
              <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="overflow-hidden">
                    <table class="min-w-full border text-center">
                      <thead class="border-b">
                        <tr>

                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                            Count
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                            Format
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                            Result
                          </th>
                        </tr>
                      </thead>
                      {decodedText.map((data, i) => (
                        <tbody key={i}>
                          <tr class="border-b">

                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                              {i}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                              {data.result.format.formatName}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {data.decodedText}
                            </td>
                          </tr>
                        </tbody>
                      ))}

                    </table>
                  </div>
                </div>
              </div>
            </div>




          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;

