import useDeliveryStore from "../store/Customer-store";
import { Navigate } from "react-router-dom";

const ProtectCustomer = ({ element }) => {
  const customer = useDeliveryStore((state) => state.customer);

  // ถ้ายังไม่ login  เด้งกลับไปหน้า login
  return customer ? element : <Navigate to="/login" replace />;
};

export default ProtectCustomer;
