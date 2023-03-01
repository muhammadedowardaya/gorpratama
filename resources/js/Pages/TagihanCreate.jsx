import Label from "@/Components/Label";
import { router, useForm } from "@inertiajs/react";

export default function TagihanCreate() {
    const { data, setData } = useForm({
        amount: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        router.post("/tagihan/create", data);
    };

    return (
        <fieldset>
            <legend>CREATE DATA TAGIHAN</legend>
            <div className="row">
                <div className="col-md-12">
                    <a
                        href="{{ route('tagihan.list') }}"
                        className="btn btn-primary"
                    >
                        KEMBALI
                    </a>
                    <hr />
                    <form onSubmit={submit}>
                        <div>
                            <Label forInput="amount" value="Amount" />

                            <input
                                type="text"
                                name="amount"
                                value={data.amount}
                                className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                autoComplete="amount"
                                autoFocus={true}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData(amount, e.target.value);
                                }}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label forInput="description" value="Description" />

                            <textarea
                                className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData(description, e.target.value);
                                }}
                                name="description"
                                value={data.description}
                                readOnly
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </fieldset>
    );
}
