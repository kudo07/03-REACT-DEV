import { useForm } from '../context/FormContext';
import AddressForm from './AddressForm';
import PersonalForm from './PersonalForm';
import Summary from './Summary';

function StepCount() {
  const { state } = useForm();
  switch (state.activeStep) {
    case 0:
      return <PersonalForm />;
    case 1:
      return <AddressForm />;
    case 2:
      return <Summary />;
    default:
      return null;
  }
}
export default StepCount;
