/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import arrow from "@/public/icon-arrow.png"
import "./page.css";

function App() {

  let [dayInput, setDayInput] = useState("");
  let [monthInput, setMonthInput] = useState("");
  let [yearInput, setYearInput] = useState("");
  const [mainErrorText, setMainErrorText] = useState("This Field is Required");
  const [hidden, setHidden] = useState(false);
  const [notFilled, setNotFilled] = useState(false);
  const [dayFocus, setDayFocus] = useState(true);
  const [monthFocus, setMonthFocus] = useState(false);
  const [yearFocus, setYearFocus] = useState(false);

  const dayInputRef = useRef<HTMLInputElement | null>(null);
  const monthInputRef = useRef<HTMLInputElement | null>(null);
  const yearInputRef = useRef<HTMLInputElement | null>(null);

  let inputP;
  let inputArr;
  let errMessage;
  let mainError;
  
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

  useEffect(() => {
    inputP! = document.querySelectorAll(".inputP");
    inputArr! = document.querySelectorAll("input");
    errMessage! = document.querySelectorAll(".error");
    mainError! = document.querySelector(".mainError");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Enter") {
        calculate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])


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
    if (value.length === 4) {
      console.log("Year is now complete")
      calculate();
    }
    else if (value.length > 4) {
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

  function validateInput() {

      const wrongDate = () => {
        setNotFilled(true);
        setHidden(false);
        setDayFocus(false);
        setMonthFocus(false);
        setYearFocus(false);
      }

      let currentYear = new Date().getFullYear();

      let inputArray = [dayInput, monthInput, yearInput];

      for (let i = 0; i < inputArray.length; i++) {
      let x = inputArray[i];
      if (x === "") {
        setNotFilled(true);
        setHidden(false);
      }
      else if ((parseInt(inputArray[0]) > 28) && (parseInt(inputArray[1]) === 2)) {
        wrongDate();
        setMainErrorText("Must be a real date");
      }
      else if ((parseInt(inputArray[0]) > 30) && (parseInt(inputArray[1]) === 4 || 5 || 9 || 11)) {
        wrongDate();
        setMainErrorText("Must be a real date");
      }
      else if ((parseInt(inputArray[0]) > 31) && (parseInt(inputArray[1]) === 1 || 3 || 6 || 7 || 8 || 10 || 12)) {
        wrongDate();
        setMainErrorText("Must be a real date");
      }
      else if (parseInt(inputArray[1]) > 12) {
        wrongDate();
        setMainErrorText("Must be a valid month");
      }
      else if (parseInt(inputArray[2]) > currentYear) {
        wrongDate()
        setMainErrorText("Date cannot be in the future");
      }
      else if (parseInt(inputArray[2]) < (currentYear - 1000)) {
        wrongDate()
        setMainErrorText("That's not right");
      }
      

      else {
        let monthInput = inputArray[1];
        let dateInput = inputArray[0];
        let yearInput = inputArray[2];

        if (monthInput.length === 1) {
          monthInput = '0' + monthInput
        }

        if (dateInput.length === 1) {
          dateInput = '0' + dateInput
        }
        let dateString = monthInput + "-" + dateInput + "-" + yearInput;
        getAge(dateString);
      }
    }
  }

  let [ageOutput, setAgeOutput] = useState(
    {
      years: "--",
      yearsSufText: "years",
      months: "--",
      monthsSufText: "months",
      days: "--",
      daysSufText: "days",
    }
  )


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
    var now = new Date();

    var yearNow = now.getFullYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    var dob = new Date(parseInt(dateString.substring(6, 10)),
      parseInt(dateString.substring(0, 2)) - 1,
      parseInt(dateString.substring(3, 5))
    );

    var yearDob = dob.getFullYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var yearString = "";
    var monthString = "";
    var dayString = "";


    let yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
      var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
      var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    let age = {
      years: yearAge,
      months: monthAge,
      days: dateAge
    };

    if (age.years > 1) yearString = " years";
    else yearString = " year";
    if (age.months > 1) monthString = " months";
    else monthString = " month";
    if (age.days > 1) dayString = " days";
    else dayString = " day";

    setAgeOutput({
      years: age.years.toString(),
      yearsSufText: yearString,
      months: age.months.toString(),
      monthsSufText: monthString,
      days: age.days.toString(),
      daysSufText: dayString,
    })

  }

  return (
    <div className="root">
      <div className="card">
        <div className="top-bar">
          <label htmlFor="day"><p className={`inputP mb-1.5 ${notFilled && `pNotFilled`}`}>DAY</p>
            <input ref={dayInputRef} className={`text-black ${notFilled && `notFilled`}`} onChange={handleDayChange} autoFocus={true} onClick={removeError} type="number" name="day" id="day" placeholder="DD" value={dayInput} />
            <i><p className={`error hidden mainError ${hidden && `hidden`}`}>{mainErrorText}</p></i>
          </label>
          <label htmlFor="month"><p className={`inputP mb-1.5 ${notFilled && `pNotFilled`}`}>MONTH</p>
            <input ref={monthInputRef} className={`text-black ${notFilled && `notFilled`}`} onChange={handleMonthChange} onClick={removeError} type="number" name="month" id="month" placeholder="MM" value={monthInput} />
            <i><p className={`error hidden ${hidden && `hidden`}`}>This field is required</p></i>
          </label>
          <label htmlFor="year"><p className={`inputP mb-1.5 ${notFilled && `pNotFilled`}`}>YEAR</p>
            <input ref={yearInputRef} className={`text-black ${notFilled && `notFilled`}`} onChange={handleYearChange} onClick={removeError} type="number" name="year" id="year" placeholder="YYYY" value={yearInput} />
            <i><p className={`error hidden ${hidden && `hidden`}`}>This field is required</p></i>
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