import React, { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function DatePicker() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                clearable
                value={selectedDate}
                onChange={handleDateChange}
                format="dd-MM-yyyy"
                placeholder="dd-mm-yyyy"
                inputVariant="outlined"
            />
        </MuiPickersUtilsProvider>
    );
}
