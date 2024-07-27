import "react-step-progress-bar/styles.css";

function MultiStepProgressBar(props) {
  var stepPercentage = 0;

  if (props.currentStep === 1) {
    stepPercentage = 0;
  } else if (props.currentStep === 2) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <div className="mb-4">
      <div className="bg-gray-100 rounded-full overflow-hidden">
        {stepPercentage === 0 ? (
          <div className="bg-blue-500 text-white font-semibold text-xs h-12 w-4/12 flex flex-col items-center justify-center">
            <div className="deskView hidden lg:block text-center">
              <p>Step 1 of 2</p>
              <h3>Getting started</h3>
            </div>
            <div className="block lg:hidden">Step 1</div>
          </div>
        ) : (
          stepPercentage === 100 && (
            <div className="bg-blue-500 text-xs text-white font-semibold h-12 flex flex-col items-center w-full justify-center">
              <div className="deskView hidden lg:block text-center">
                <p>Step 2 of 2</p>
                <h3>Billing info</h3>
              </div>
              <div className="block lg:hidden">Step 2</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MultiStepProgressBar;
