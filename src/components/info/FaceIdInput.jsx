import { MoreVertical } from "lucide-react";

export default function FaceIdInput() {
  return (
    <>
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg - shadow-sm border border-gray-200 flex flex-col mt-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-4xl bg-gray-100 w-1/3 text-gray-500 outline-none"
          />
          <div className="flex items-center space-x-2">
          <button className="px-6 py-2 bg-blue-900 text-white rounded-full shadow">
            Add
          </button>
          <MoreVertical className="text-blue-900 cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-between">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border border-gray-200"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
