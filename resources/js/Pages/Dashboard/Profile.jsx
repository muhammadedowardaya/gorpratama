// import Dashboard from "@/Layouts/Dashboard";

const Profile = (props) => {
    sessionStorage.setItem("id", props.auth.user.id);
    sessionStorage.setItem("nama", props.auth.user.nama);

    return (
        <>
            <div className="container w-full mx-auto pt-20">
                <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <div className="flex flex-wrap">
                        <div className="card card-side bg-base-100 shadow-xl mx-auto">
                            <figure>
                                <img
                                    src="https://placeimg.com/200/280/arch"
                                    alt="Movie"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {props.auth.user.nama}
                                </h2>
                                <p>{props.auth.user.email}</p>
                                {/* <div className="card-actions justify-end">
                                    <button className="btn btn-primary">
                                        Watch
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

const auth_value = {
    user: {
        id: sessionStorage.getItem("id"),
        nama: sessionStorage.getItem("nama"),
    },
};

Profile.layout = (page) => (
    <Dashboard auth={auth_value} children={page} title="Profile" />
);
