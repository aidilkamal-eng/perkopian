import { Suspense } from "react";
import CafeListPage from "@/src/views/CafeListPage";

export default function Page() {
    return (
        <Suspense>
            <CafeListPage />
        </Suspense>
    );
}