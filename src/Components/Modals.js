import { useEffect } from "react";

const MyModel = (props) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  });
  return (
    <>
      <div className="model-wrapper" onClick={props.closeModel}></div>
      <div className="model-container">
        <h2>my model</h2>
        <p>
          asda, lkasnda afklna.fn akfnkfn kjdf hkfj.fj kajbf. kbkfjdbjkadjbk ksn
        </p>
        <button onClick={props.closeModel}>Accept it</button>
      </div>
    </>
  );
};
export default MyModel;
