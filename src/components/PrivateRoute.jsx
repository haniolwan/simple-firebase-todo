import { useContext } from "react";
import {
    Outlet,
    Navigate
} from "react-router-dom";
import { AuthContext } from "./Auth";
const ProtectedRoute = ({
    children
}) => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Navigate to="/login" replace />
    }
    return !children ? <Outlet /> : children;
}


export default ProtectedRoute;