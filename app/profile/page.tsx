import ProfilePage from "@/src/views/ProfilePage";
import PrivateRoute from "@/src/components/PrivateRoute";

export default function Page() {
    return (
        <PrivateRoute>
            <ProfilePage />
        </PrivateRoute>
    );
}