// import Dashboard from "@/Layouts/Dashboard";

const Profile = (props) => {
    sessionStorage.setItem("id", props.auth.user.id);
    sessionStorage.setItem("nama", props.auth.user.nama);

    return (
        <>
            <div className="container w-full mx-auto pt-20">
                <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <div className="flex flex-wrap">
                        <div class="card w-96 bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title">Pesanan Saya</h2>
                                <p>Mana atuh euy iyeu pesanan</p>
                                {/* <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
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
