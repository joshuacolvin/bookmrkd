import React from 'react';

function RecommendationForm({ handleSubmit, onCancel, recommendation }) {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-center mb-4">
        {recommendation ? `Edit` : `Add`} Recommendation
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="recommendedBy"
          >
            Recommended By <span className="text-gray-500">(required)</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
            type="text"
            id="recommendedBy"
            defaultValue={recommendation ? recommendation.recommendedBy : null}
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="url"
          >
            Url
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="url"
            defaultValue={recommendation ? recommendation.url : null}
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="notes"
          >
            Notes
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            id="notes"
            defaultValue={recommendation ? recommendation.notes : null}
          />
        </div>
        <div className="flex justify-end mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            type="submit"
          >
            {recommendation ? `Edit` : `Add`}
          </button>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold py-2 px-4 border border-gray-700 hover:border-transparent rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecommendationForm;
