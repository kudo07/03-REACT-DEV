import { useForm } from '../context/FormContext';

function Summary() {
  const { state, dispatch } = useForm();
  const { personalInfo, addressInfo } = state;

  return (
    <div className="p-4 space-y-2">
      <div>
        <strong>Name:</strong> {personalInfo.name}
      </div>
      <div>
        <strong>Email:</strong> {personalInfo.email}
      </div>
      <div>
        <strong>Street:</strong> {addressInfo.street}
      </div>
      <div>
        <strong>City:</strong> {addressInfo.city}
      </div>
      <div>
        <strong>Zip:</strong> {addressInfo.zip}
      </div>
      <button
        onClick={() => dispatch({ type: 'SUBMIT' })}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Submit
      </button>
    </div>
  );
}
export default Summary;
