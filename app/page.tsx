/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import arrow from "@/public/icon-arrow.png"
import "./page.css";

function App() {

  const [dayInput, setDayInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [mainErrorText, setMainErrorText] = useState("This Field is Required");
  const [hidden, setHidden] = useState(true);
  const [notFilled, setNotFilled] = useState(false);
  const [dayFocus, setDayFocus] = useState(true);
  const [monthFocus, setMonthFocus] = useState(false);
  const [yearFocus, setYearFocus] = useState(false);
  const [ageOutput, setAgeOutput] = useState(
    {
      years: "--",
      yearsSufText: "years",
      months: "--",
      monthsSufText: "months",
      days: "--",
      daysSufText: "days",
    }
  )

  const dayInputRef = useRef<HTMLInputElement | null>(null);
  const monthInputRef = useRef<HTMLInputElement | null>(null);
  const yearInputRef = useRef<HTMLInputElement | null>(null);
  
  // Set focus on day input when focusMonth becomes true
  useEffect(() => {
    if (dayFocus && dayInputRef.current) {
      dayInputRef.current.focus();
      setDayFocus(false); // Reset focus state to avoid unwanted re-focuses
    }
  }, [dayFocus]);

  // Set focus on month input when focusMonth becomes true
  useEffect(() => {
    if (monthFocus && monthInputRef.current) {
      monthInputRef.current.focus();
      setMonthFocus(false); // Reset focus state to avoid unwanted re-focuses
    }
  }, [monthFocus]);

  // Set focus on year input when focusMonth becomes true
  useEffect(() => {
    if (yearFocus && yearInputRef.current) {
      yearInputRef.current.focus();
      setYearFocus(false); // Reset focus state to avoid unwanted re-focuses
    }
  }, [yearFocus]);

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent): void => {
  //     if (event.key === "Enter") {
  //       calculate();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [])

  useEffect(() => {
    if (yearInput.length === 4) {
      calculate();
    }
  }, [dayInput, monthInput, yearInput])


  function handleDayChange(ev: { target: { name: string; value: string; }; }) {
    let { name, value } = ev.target
    removeError();
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    else if ((value.length < 2) && (value.length > 0)) {
      clearOutput();
    }
    else if (value.length === 2) {
      setDayFocus(false);
      setMonthFocus(true);
      setYearFocus(false);
    }
    setDayInput(value)
  }


  function handleMonthChange(ev: { target: { name: string; value: string; }; }) {
    let { name, value } = ev.target
    removeError();
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    else if ((value.length < 2) && (value.length > 0)) {
      clearOutput();
    }
    else if (value.length === 2) {
      setDayFocus(false);
      setMonthFocus(false);
      setYearFocus(true);
    }
    else if (value.length === 0) {
      setDayFocus(true);
      setMonthFocus(false);
      setYearFocus(false);
    }
    setMonthInput(value)
  }


  function handleYearChange(ev: { target: { name: string; value: string; }; }) {
    let { name, value } = ev.target
    removeError();
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    else if ((value.length < 4) && (value.length > 0)) {
      clearOutput();
    }
    else if (value.length === 0) {
      setMonthFocus(true);
    }
    else if (!hidden) {
      clearOutput()
      setDayFocus(false);
      setMonthFocus(false);
      setYearFocus(false);
    }
    setYearInput(value)
  }


  function clearOutput(): void {
    setAgeOutput({
      years: "--",
      yearsSufText: "years",
      months: "--",
      monthsSufText: "months",
      days: "--",
      daysSufText: "days",
    })
  }

  function removeError() {
      setNotFilled(false);
      setHidden(true);
      clearOutput();
  }

  const wrongDate = () => {
    setNotFilled(true);
    setHidden(false);
    setDayFocus(false);
    setMonthFocus(false);
    setYearFocus(false);
  }


  function validateInput() {
    const currentYear = new Date().getFullYear();
    
    if (!dayInput || !monthInput || !yearInput) {
        setNotFilled(true);
        setHidden(false);
        return;
    }

    const day = parseInt(dayInput);
    const month = parseInt(monthInput);
    const year = parseInt(yearInput);

    // Check if the month is valid
    if (month < 1 || month > 12) {
        wrongDate();
        setMainErrorText("Must be a valid month");
        return;
    }

    // Check if the year is within a realistic range
    if (year > currentYear || year < currentYear - 1000) {
        wrongDate();
        setMainErrorText("Be Realistic");
        return;
    }

    // Determine the number of days in the month and check if the day is valid
    const daysInMonth = new Date(year, month, 0).getDate();

    if (day < 1 || day > daysInMonth) {
        wrongDate();
        setMainErrorText("Must be a real date");
        return;
    }

    // If all validations pass, proceed to calculate the age
    const dateString = `${month}-${day}-${year}`;
    getAge(dateString);
}

  function calculate(): void {
    setHidden(true)
    setNotFilled(false)
    setDayFocus(false)
    setMonthFocus(false)
    setYearFocus(false)
    validateInput();
  }

  // Function to find the age from a given date input
  function getAge(dateString: string): void {
    const [monthStr, dayStr, yearStr] = dateString.split('-');
    const dob = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr));
    const now = new Date();

    let yearAge = now.getFullYear() - dob.getFullYear();
    let monthAge = now.getMonth() - dob.getMonth();
    let dateAge = now.getDate() - dob.getDate();

    // Adjust year and month if necessary
    if (monthAge < 0 || (monthAge === 0 && dateAge < 0)) {
        yearAge--;
        monthAge += 12;
    }

    // Adjust day if necessary
    if (dateAge < 0) {
        monthAge--;
        dateAge += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    // Update the age output
    setAgeOutput({
        years: yearAge.toString(),
        yearsSufText: yearAge === 1 ? "year" : "years",
        months: monthAge.toString(),
        monthsSufText: monthAge === 1 ? "month" : "months",
        days: dateAge.toString(),
        daysSufText: dateAge === 1 ? "day" : "days",
    });
}





  return (
    <div className="root">
      <div className="card">
        <div className="top-bar">
          <label htmlFor="day"><p className={`inputP mb-1.5 ${notFilled && `pNotFilled`}`}>DAY</p>
            <input ref={dayInputRef} className={`text-black ${notFilled && `notFilled`}`} onChange={handleDayChange} autoFocus={true} onClick={removeError} type="number" name="day" id="day" placeholder="DD" value={dayInput} />
            <i><p className={`error mainError ${hidden && `hidden`}`}>{mainErrorText}</p></i>
          </label>
          <label htmlFor="month"><p className={`inputP mb-1.5 ${notFilled && `pNotFilled`}`}>MONTH</p>
            <input ref={monthInputRef} className={`text-black ${notFilled && `notFilled`}`} onChange={handleMonthChange} onClick={removeError} type="number" name="month" id="month" placeholder="MM" value={monthInput} />
            <i><p className={`error ${hidden && `hidden`}`}>This field is required</p></i>
          </label>
          <label htmlFor="year"><p className={`inputP mb-1.5 ${notFilled && `pNotFilled`}`}>YEAR</p>
            <input ref={yearInputRef} className={`text-black ${notFilled && `notFilled`}`} onChange={handleYearChange} onClick={removeError} type="number" name="year" id="year" placeholder="YYYY" value={yearInput} />
            <i><p className={`error ${hidden && `hidden`}`}>This field is required</p></i>
          </label>
        </div>
        <div className="arrow-block">
          <div className="hr"></div>
          <Image onClick={calculate} src={arrow} alt="arrow-icon" className="arrow h-10 w-10" id="arrow" />
        </div>
        <div className='bottom-bar'>
          <div className='years'>
            <p><i id="yearsOutput"><span id="yearSpan">{ageOutput.years}</span>{ageOutput.yearsSufText}</i></p>
          </div>
          <div className='months'>
            <p><i id="monthsOutput"><span id="monthSpan">{ageOutput.months}</span>{ageOutput.monthsSufText}</i></p>
          </div>
          <div className='days'>
            <p><i id="daysOutput"><span id="daySpan">{ageOutput.days}</span>{ageOutput.daysSufText}</i></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;