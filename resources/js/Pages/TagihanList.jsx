export default function TagihanList({ data }) {
    return (
        <>
            <fieldset>
                <legend>LIST DATA TAGIHAN</legend>
                <div class="row">
                    <div class="col-md-12">
                        <a
                            href="{{ route('tagihan.create') }}"
                            class="btn btn-primary"
                        >
                            TAMBAH DATA
                        </a>
                        <hr />
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>DOC NO</th>
                                    <th>AMOUNT</th>
                                    <th>DESCRIPTION</th>
                                    <th>PAYMENT STATUS</th>
                                    <th>PAYMENT LINK</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.doc_no}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.description}</td>
                                        <td>{item.payment_status}</td>
                                        <td>{item.payment_link}</td>
                                    </tr>;
                                })}
                                {/* @foreach ($data as $index => $dt)
                                <tr>
                                    <td>{{ $index + 1 }}</td>
                                    <td>{{ $dt->doc_no }}</td>
                                    <td>{{ number_format($dt->amount, 0, ',', '.') }}</td>
                                    <td>{{ $dt->description }}</td>
                                    <td>{{ $dt->payment_status }}</td>
                                    <td>{{ $dt->payment_link }}</td>
                                </tr>
                            @endforeach */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </fieldset>
        </>
    );
}
