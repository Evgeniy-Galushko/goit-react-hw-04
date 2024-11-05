import { ProgressBar } from "react-loader-spinner";

export default function BtnUp() {
  return (
    <ProgressBar
      visible={true}
      height="80"
      width="120"
      color="#06f42c"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progressar"
    />
  );
}
