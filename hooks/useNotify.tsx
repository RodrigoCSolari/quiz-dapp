import { getErrorMessage } from "@/utils/getErrorMessage";
import { Modal, message } from "antd";
import { useCallback } from "react";

export default function useNotify() {
  const showSuccessMsg = useCallback(() => {
    message.open({
      content: "Successful transaction!",
      type: "success",
    });
  }, []);

  const setErrorMsg = useCallback((error: unknown) => {
    const errorMsg = getErrorMessage(error);
    Modal.error({
      content: errorMsg,
      title: "Error",
    });
  }, []);

  return { setErrorMsg, showSuccessMsg };
}
