import React, { useEffect, useState } from 'react';
import $axios from './axios';

const ProblemList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState('');
    const [inputs, setInputs] = useState({ title: '', description: '', tag: '' });
    const [inputs1, setInputs1] = useState({ email: '', password: '' });
    const [pages, setPages] = useState([])

    const getProblems = async (page = '1') => {
        try {

            const response = await $axios.get('/problem?limit=10&page=' + page);
            console.log(response);
            setData(response.data.rows.sort((a, b) => a.id - b.id));
            let arr = []

            for (let i = 0; i < Math.floor(response.data.count / 10); i++) {
                arr.push(i + 1)
            }
            if (response.data.count % 10 !== 0) {
                arr.push(Math.ceil(response.data.count / 10))
            }

            setPages(arr)
            console.log(pages);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(e.target.value);
        const { data } = await $axios.get('/problem?limit=20&q=' + value);
        console.log(data);
        setData(data.rows);
    };

    const handleFilter = async (e) => {
        const value = e.target.value;
        setTag(value)
        const { data } = await $axios.get('/problem?tag=' + value);
        console.log(data);
        setData(data.rows);
    };

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const handleChange1 = (e) => {
        setInputs1({ ...inputs1, [e.target.name]: e.target.value });
    };
    const handleClick = async () => {
        await $axios.post('/problem/create', inputs);
        getProblems();
    };
    const handleClick1 = async () => {
        const { data } = await $axios.post('/user/signup', inputs1);
        // console.log(data)
        localStorage.setItem('token', JSON.stringify(data))
        getProblems();
    };
    useEffect(() => {
        getProblems();

    }, []);
    return (
        <div>
            <input type="text" name="email" onChange={handleChange1} value={inputs1.email} />
            <input type="text" name="password" onChange={handleChange1} value={inputs1.password} />
            <button onClick={handleClick1}>Create</button>
            <br />
            <br />

            <input type="text" value={search} onChange={handleSearch} />
            <input type="text" name="title" onChange={handleChange} value={inputs.title} />
            <input type="text" name="description" onChange={handleChange} value={inputs.description} />
            <select name="tag" id="" onChange={handleChange} value={tag}>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Kotlin">Kotlin</option>
                <option value="Java">Java</option>
            </select>
            <div>
                <select name='tag' id="" onChange={handleFilter} value={tag}>

                    <option value="Select">Select tag</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Java">Java</option>
                </select>
            </div>
            <button onClick={handleClick}>Create</button>

            {data.map((p) => (
                <>
                    <li>{p.title}{p.description} </li>
                    {/* {p.pictures.map((picture) => (
                        <img src={'http://localhost:8006/' + picture.image} alt="" width={100} />
                    ))} */}
                </>
            ))}
            <div>
                {
                    pages.map((p, index) => (
                        <button onClick={() => getProblems(p)}>{p}</button>
                    ))
                }
            </div>
        </div>
    );
};

export default ProblemList;