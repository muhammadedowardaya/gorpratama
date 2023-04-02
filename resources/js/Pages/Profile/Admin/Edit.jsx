import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "../Partials/DeleteUserForm";
import UpdatePasswordForm from "../Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "../Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />

            <div>
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <AdminLayout children={page} title="Edit Profile" />;
