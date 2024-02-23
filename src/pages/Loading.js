import { Clock } from "react-svg-spinners";
import '../styles/pages/Loading.css';

function Loading() {
  return (
    <div className="LoadingWrapper">
    <div className="SpinnerWrapper">
      <h2>ScanVoucher</h2>
      <Clock color="white" width='100px' height='100px'/>
    </div>
    </div>
  );
}

export default Loading;