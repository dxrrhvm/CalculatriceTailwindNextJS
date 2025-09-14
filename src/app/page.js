'use client'

//imports
import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import BtnBox from "./components/BtnBox";
import Btn from "./components/Btn";

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


export default function Calculatrice() {
    const [activeBtn, setActiveBtn] = useState(null);
    const [input, setInput] = useState({
        sign: "",
        num: 0,
        res: 0,
    })

    const handleNums = (e) => {
        e.preventDefault();
        const val = e.target.innerHTML

        if (removeSpaces(input.num).length < 16) {
            setInput({
                ...input,
                num:
                    input.num === 0 && val === "0"
                        ? "0"
                        : removeSpaces(input.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(input.num + val)))
                            : toLocaleString(input.num + val),
                res: !input.sign ? 0 : input.res,
            })
        }
    }

    const handleSigns = (e) => {
        e.preventDefault();
        const val = e.target.innerHTML

        setInput({
            ...input,
            num: 0,
            sign: val,
            res: !input.res && input.num ? input.num : input.res,
        })
    }

    const handleCommas = (e) => {
        e.preventDefault();
        const val = e.target.innerHTML

        setInput({
            ...input,
            num: !input.num.toString().includes(".") ? input.num + val : input.num,
        })
    }

    const handleEquals = () => {
        if (input.sign && input.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                        ? a - b
                        : sign === "X"
                            ? a * b
                            : a / b

            setInput({
                ...input,
                res:
                    input.num === "0" && input.sign === "/"
                        ? "NaN"
                        : toLocaleString(
                            math(
                                Number(removeSpaces(input.res)),
                                Number(removeSpaces(input.num)),
                                input.sign
                            )
                        ),
                sign: "",
                num: 0,
            })
        }
    }

    const handleInverts = () => {
        setInput({
            ...input,
            num: input.num ? toLocaleString(removeSpaces(input.num) * -1) : 0,
            res: input.res ? toLocaleString(removeSpaces(input.res) * -1) : 0,
            sign: "",
        })
    }

    const handlePercents = () => {
        let num = input.num ? parseFloat(removeSpaces(input.num)) : 0
        let res = input.res ? parseFloat(removeSpaces(input.res)) : 0

        setInput({
            ...input,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        })
    }

    const handleReset = () => {
        setInput({
            ...input,
            num: 0,
            res: 0,
            sign: "",
        })
    }

    return (
        <Wrapper>
            {/*             
            <Screen value={input.num ? input.num : input.res} /> */}

            <Screen value={
                input.sign
                    ? `${input.res ? input.res : 0} ${input.sign} ${input.num ? input.num : 0}`
                    : input.num
                        ? input.num
                        : input.res
            } />

            <BtnBox>
                {btnValues.flat().map((btn, i) => {
                    return (
                        <Btn
                            key={i}
                            className={
                                `${btn === "=" ? "equals col-span-2 bg-yellow-600 text-black" : ""} 
                                ${activeBtn === btn ? "ring-2 ring-white-500" : ""}`}                          
                            value={btn}
                            onClick={(e) =>{
                                setActiveBtn(btn)
                                setTimeout(() => setActiveBtn(null), 150);
                                btn === "C"
                                    ? handleReset()
                                    : btn === "+-"
                                    ? handleInverts()
                                    : btn === "%"
                                    ? handlePercents()
                                    : btn === "="
                                    ? handleEquals()
                                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                    ? handleSigns(e)
                                    : btn === "."
                                    ? handleCommas(e)
                                    : handleNums(e)
                            }}
                        />
                    )
                })}
            </BtnBox>
        </Wrapper>
    )
}