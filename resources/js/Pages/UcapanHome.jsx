import { Inertia } from "@inertiajs/inertia";
import { IoRocketSharp } from "react-icons/io5";

export default function UcapanHome({ props }) {
    if (props.auth.user != null && props.auth.user.type == "user") {
        return (
            <>
                <button
                    className="btn bg-blue-500"
                    onClick={(e) => {
                        e.preventDefault();
                        Inertia.get("/pilihan");
                    }}
                >
                    Gaskeun Booking Lapangan!{" "}
                    <IoRocketSharp className="ml-4" size="2em" />
                </button>
            </>
        );
    } else if (props.auth.user != null && props.auth.user.type == "admin") {
        return (
            <>
                <button
                    className="btn bg-blue-500"
                    onClick={(e) => {
                        e.preventDefault();
                        Inertia.get(route("tempat-lapangan.index"));
                    }}
                >
                    Kelola Tempat Lapangan!
                    <IoRocketSharp className="ml-4" size="2em" />
                </button>
            </>
        );
    } else {
        return (
            <>
                <div className="grid gap-x-20 gap-y-5 grid-cols-1">
                    <button
                        className="btn bg-green-500"
                        onClick={(e) => {
                            e.preventDefault();

                            Inertia.get("/register");
                        }}
                    >
                        Register
                    </button>
                </div>
                <div className="grid gap-5">
                    <div className="card my-4 w-full bg-neutral text-neutral-content">
                        <div className="p-3 card-body items-center text-center">
                            <p>Sudah punya akun?</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn bg-orange-500"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        Inertia.get("/login");
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    // console.info(props.auth.user);

    // return <h1>test</h1>
}
