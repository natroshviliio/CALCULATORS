import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Spinner } from 'react-bootstrap'
import { IoAdd } from "react-icons/io5";
import { BsTrash3Fill } from "react-icons/bs";

const CalculateFromXLSX = () => {
    const [leftvalues, setLeftValues] = useState([{ value: 0 }]);
    const [rightValues, setRightValues] = useState([{ value: 0 }]);
    const [leftFiltered, setLeftFiltered] = useState([]);
    const [rightFiltered, setRightFiltered] = useState([]);
    const [leftJoinedValues, setLeftJoinedValues] = useState([]);
    const [rightJoinedValues, setRightJoinedValues] = useState([]);

    const [loading, setLoading] = useState(false);

    const addLeftValue = () => {
        const _leftValues = [...leftvalues];
        _leftValues.push({ value: '' });
        setLeftValues(_leftValues);
    }
    const removeLeftValue = (i) => {
        let _leftValues = [...leftvalues];
        _leftValues = _leftValues.filter((_, idx) => idx !== i);
        setLeftValues(_leftValues);
    }
    const changeLeftValue = (e, i) => {
        const _leftValues = [...leftvalues];
        _leftValues[i].value = e.target.value;
        setLeftValues(_leftValues);
    }


    const addRightValues = () => {
        const _rightValues = [...rightValues];
        _rightValues.push({ value: '' });
        setRightValues(_rightValues);
    }
    const removeRightValues = (i) => {
        let _rightValues = [...rightValues];
        _rightValues = _rightValues.filter((_, idx) => idx !== i);
        setRightValues(_rightValues);
    }
    const changeRightValue = (e, i) => {
        const _rightValues = [...rightValues];
        _rightValues[i].value = e.target.value;
        setRightValues(_rightValues);
    }

    const getUniques = (variant) => {
        setLoading(true);
        let _leftValues = leftvalues.map(x => Number(x.value));
        let _rightValues = rightValues.map(x => Number(x.value));
        const _leftJoinedValues = [];
        const _rightJoinedValues = [];


        const rightUnique = (left, right = []) => {
            for (let k = 0, u = 0; ;) {
                let _right = [...right];
                const sum = right.slice(k, k + u + 1).reduce((a, b) => a + b, 0);
                const indexes = right.slice(k, k + u + 1).map(x => right.indexOf(x));
                _right.splice(k, k + u + 1);

                for (let j = 0; j < _right.length; j++) {
                    const _sum = sum + _right[j];
                    if (left === _sum) {
                        const _joinedValues = [...right.slice(k, k + u + 1), _right[j]];
                        const index13 = _leftValues.indexOf(_leftValues.find(x => x === left));
                        _rightJoinedValues.push([_joinedValues.join(' + '), `${left} - left`, left]);
                        right = right.filter((_, idx) => !indexes.includes(idx));
                        const index12 = right.indexOf(_right[j]);
                        right = right.filter((_, idx) => idx !== index12);
                        _leftValues = _leftValues.filter((_, idx) => idx !== index13);
                        _rightValues = right;
                        return 0;
                    }
                }
                u >= right.length ? (() => { k++; u = 0 })() : u++;
                if (k >= right.length - 1 && u >= right.length - 1) break;
            }
            _rightValues = right;
        };

        const leftUnique = (right, left = []) => {
            let sum;
            let _left = [];
            let indexes = [];
            for (let k = 0, u = 0; ;) {
                _left = [...left];
                sum = left.slice(k, k + u + 1).reduce((a, b) => a + b, 0);
                indexes = left.slice(k, k + u + 1).map(x => left.indexOf(x))
                _left.splice(k, k + u + 1);

                for (let j = 0; j < _left.length; j++) {
                    const _sum = sum + _left[j];
                    if (right === _sum) {
                        const _joinedValues = [...left.slice(k, k + u + 1), _left[j]];
                        const index13 = _rightValues.indexOf(_rightValues.find(x => x === right));
                        _leftJoinedValues.push([_joinedValues.join(' + '), `${right} - right`, right]);
                        left = left.filter((_, idx) => !indexes.includes(idx));
                        const index12 = left.indexOf(_left[j]);
                        left = left.filter((_, idx) => idx !== index12);
                        _rightValues = _rightValues.filter((_, idx) => idx !== index13);
                        _leftValues = left;
                        return 0
                    }
                }
                u >= left.length ? (() => { k++; u = 0 })() : u++;
                if (k >= left.length - 1 && u >= left.length - 1) break;
            }
            _leftValues = left;
        };


        if (variant === 1) {
            _leftValues.map((x, i) => {
                rightUnique(x, _rightValues, []);
            });

            _rightValues.map(x => {
                leftUnique(x, _leftValues, []);
            });
        } else {
            _rightValues.map(x => {
                leftUnique(x, _leftValues, []);
            });

            _leftValues.map((x, i) => {
                rightUnique(x, _rightValues, []);
            });
        }

        setRightJoinedValues([..._rightJoinedValues]);
        setRightFiltered(_rightValues);

        setLeftJoinedValues([..._leftJoinedValues]);
        setLeftFiltered(_leftValues);
    }

    useEffect(() => {
        setLoading(false);
    }, [leftFiltered, rightFiltered]);

    const setTestValues = () => {
        const leftVal = [];
        const rightVal = [];

        Array.from({ length: 150 }, () => leftVal.push({ value: Math.floor(Math.random() * 200) }));
        Array.from({ length: 150 }, () => rightVal.push({ value: Math.floor(Math.random() * 200) }));

        setLeftValues(leftVal);
        setRightValues(rightVal);
    }

    return (
        <Col className='bpg-arial-caps d-flex flex-column' style={{ height: '100vh' }}>
            <Col className='fs-4 d-flex align-items-center border border-0 border-bottom border-secondary py-1 px-3' style={{ fontWeight: "bold", flex: 0 }}>
                UNIQUE NUMBERS + SUM
                <Col className='col-2 p-3 ms-auto'>
                    <Button variant='warning' className='col-12' onClick={setTestValues}>Test Data</Button>
                </Col>
            </Col>
            <Col className='col-12 mx-auto d-flex gap-3 p-2 overflow-hidden' style={{ flex: 1 }}>
                <Col className='d-flex flex-column gap-2 col-3 pe-2 pb-2 rounded-2 shadow'>
                    <Col className='col-12 bg-white p-2 border border-0 border-bottom'>
                        <Button className='col-12' onClick={addLeftValue}><IoAdd style={{ fontWeight: "bold" }} /></Button>
                    </Col>
                    <Col className='d-flex flex-column gap-2 p-2 overflow-v'>
                        {leftvalues.map((x, i) => {
                            return (
                                <Col key={i} className='col-12 d-flex gap-2'>
                                    <Form.Control type='number' className='shadow-sm rounded-1' size='lg' value={x.value} placeholder={`left value ${i}`} onChange={(e) => changeLeftValue(e, i)} />
                                    {i > 0 && <Button variant='danger' className='px-3' onClick={() => removeLeftValue(i)}><BsTrash3Fill /></Button>}
                                </Col>
                            )
                        })}
                    </Col>
                </Col>
                <Col className='d-flex flex-column gap-2 col-3 pe-2 pb-2 rounded-2 shadow'>
                    <Col className='col-12 bg-white p-2 border border-0 border-bottom'>
                        <Button className='col-12' onClick={addRightValues}><IoAdd style={{ fontWeight: "bold" }} /></Button>
                    </Col>
                    <Col className='d-flex flex-column gap-2 p-2 overflow-v'>
                        {rightValues.map((x, i) => {
                            return (
                                <Col key={i} className='col-12 d-flex gap-2'>
                                    <Form.Control type='number' className='shadow-sm rounded-1' size='lg' value={x.value} placeholder={`right value ${i}`} onChange={(e) => changeRightValue(e, i)} />
                                    {i > 0 && <Button variant='danger' className='px-3' onClick={() => removeRightValues(i)}><BsTrash3Fill /></Button>}
                                </Col>
                            )
                        })}
                    </Col>
                </Col>
                <Col className='p-3 shadow rounded-2 overflow-v'>
                    <Col className='d-flex align-items-center gap-3'>
                        <Button variant='warning' onClick={() => getUniques(1)}>Get Uniques Variant 1</Button>
                        <Button variant='warning' onClick={() => getUniques(2)}>Get Uniques Variant 2</Button>
                        {loading && <Spinner animation='border' variant='success' />}
                    </Col>
                    <Col className='mt-3'>
                        <Col className='d-flex gap-2'>
                            <Col className='d-flex gap-2 shadow-sm p-2'><span className='col-auto' style={{ fontWeight: "bold" }}>LEFT UNIQUES LENGTH:</span>{leftFiltered?.length}</Col>
                            <Col className='d-flex gap-2 shadow-sm p-2'><span className='col-auto' style={{ fontWeight: "bold" }}>RIGHT UNIQUES LENGTH:</span>{rightFiltered?.length}</Col>
                            <Col className='d-flex gap-2 shadow-sm p-2'><span className='col-auto' style={{ fontWeight: "bold" }}>AVERAGE:</span>{(rightFiltered?.length + leftFiltered?.length) / 2}</Col>
                        </Col>
                        <Col className='d-flex align-items-center gap-2 shadow-sm p-2 mt-3'><span className='col-auto' style={{ fontWeight: "bold" }}>LEFT UNIQUES:</span>{leftFiltered?.join(', ')}</Col>
                        <Col className='d-flex align-items-center gap-2 flex-wrap shadow-sm p-2 mt-3'><span style={{ fontWeight: "bold" }}>INDEXES:</span>
                            {leftJoinedValues.map((x, i) => {
                                return (
                                    <Col key={i} className='col-auto p-2 border border-1 shadow-sm'>{x[2]} = {x[0]}</Col>
                                )
                            })}
                        </Col>
                        <Col className='d-flex align-items-center gap-2 shadow-sm p-2 mt-3'><span style={{ fontWeight: "bold" }}>UNIQUES SUM:</span>{leftFiltered?.reduce((a, b) => a + b, 0)}</Col>
                    </Col>
                    <hr />
                    <hr />
                    <Col className='mt-3'>
                        <Col className='d-flex align-items-center gap-2 shadow-sm p-2'><span className='col-auto' style={{ fontWeight: "bold" }}>RIGHT UNIQUES:</span>{rightFiltered?.join(', ')}</Col>
                        <Col className='d-flex align-items-center gap-2 flex-wrap shadow-sm p-2 mt-3'><span style={{ fontWeight: "bold" }}>INDEXES:</span>
                            {rightJoinedValues.map((x, i) => {
                                return (
                                    <Col key={i} className='col-auto p-2 border border-1 shadow-sm'>{x[2]} = {x[0]}</Col>
                                )
                            })}
                        </Col>
                        <Col className='d-flex align-items-center gap-2 shadow-sm p-2 mt-3'><span style={{ fontWeight: "bold" }}>UNIQUES SUM:</span>{rightFiltered?.reduce((a, b) => a + b, 0)}</Col>
                    </Col>
                </Col>
            </Col>
        </Col>
    )
}

export default CalculateFromXLSX